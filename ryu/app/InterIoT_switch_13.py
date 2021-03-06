# -*- coding: utf-8 -*-
#  Copyright 2016-2018 Universitat Politècnica de València
#  Copyright 2016-2018 Università della Calabria
#  Copyright 2016-2018 Prodevelop, SL
#  Copyright 2016-2018 Technische Universiteit Eindhoven
#  Copyright 2016-2018 Fundación de la Comunidad Valenciana para la 
#  Investigación, Promoción y Estudios Comerciales de Valenciaport
#  Copyright 2016-2018 Rinicom Ltd
#  Copyright 2016-2018 Association pour le développement de la formation 
#  professionnelle dans le transport
#  Copyright 2016-2018 Noatum Ports Valenciana, S.A.U.
#  Copyright 2016-2018 XLAB razvoj programske opreme in svetovanje d.o.o.
#  Copyright 2016-2018 Systems Research Institute Polish Academy of Sciences
#  Copyright 2016-2018 Azienda Sanitaria Locale TO5
#  Copyright 2016-2018 Alessandro Bassi Consulting SARL
#  Copyright 2016-2018 Neways Technologies B.V.
#  
#  See the NOTICE file distributed with this work for additional information
#  regarding copyright ownership.
#  
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#  
#      http://www.apache.org/licenses/LICENSE-2.0
#  
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import CONFIG_DISPATCHER, MAIN_DISPATCHER
from ryu.controller.handler import set_ev_cls
from ryu.ofproto import ofproto_v1_3
from ryu.lib.packet import packet
from ryu.lib.packet import ethernet
from ryu.lib.packet import ether_types

class SimpleSwitch13(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]
    table_id = 1
    priority = 0

    dscp_fields = {
        'routine': [0x00, 0x04, 0x08, 0x0C, 0x10],
        'priority': [0x20, 0x28, 0x30, 0x38],
        'immediate' : [0x40, 0x48, 0x50, 0x58],
        'flash' : [0x60, 0x68, 0x70, 0x78],
        'flashoverride' : [0x80, 0x88, 0x90, 0x98],
        'critical' : [0xA0, 0xB0, 0xB8]}

    def __init__(self, *args, **kwargs):
        super(SimpleSwitch13, self).__init__(*args, **kwargs)
        self.mac_to_port = {}

    #When the switch connects during the conf stage to catch Switch features response event
    #Where any static flow entries are added to the switch that the controller app expects.
    #Here a table-miss flow is added so any unhandled packet is sent to the controller.
    @set_ev_cls(ofp_event.EventOFPSwitchFeatures, CONFIG_DISPATCHER)
    def switch_features_handler(self, ev):
        datapath = ev.msg.datapath
        ofproto = datapath.ofproto
        parser = datapath.ofproto_parser
        self.logger.info('OF Switch Features received: datapath ID=%r buffers=%d tables=%d auxiliary_id=%d capabilities=%r', ev.msg.datapath, ev.msg.n_buffers, ev.msg.n_tables, ev.msg.auxiliary_id, ev.msg.capabilities)

        # install table-miss flow entry
        #
        # We specify NO BUFFER to max_len of the output action due to
        # OVS bug. At this moment, if we specify a lesser number, e.g.,
        # 128, OVS will send Packet-In with invalid buffer_id and
        # truncated packet data. In that case, we cannot output packets
        # correctly.  The bug has been fixed in OVS v2.1.0.
        match = parser.OFPMatch()
        table_id = self.table_id
        priority = self.priority
        actions = [parser.OFPActionOutput(ofproto.OFPP_CONTROLLER,
                                          ofproto.OFPCML_NO_BUFFER)]
        self.add_flow(datapath, priority, match, actions, table_id)

    def add_flow(self, datapath, priority, match, actions, table_id, buffer_id=None):
        ofproto = datapath.ofproto
        parser = datapath.ofproto_parser

        inst = [parser.OFPInstructionActions(ofproto.OFPIT_APPLY_ACTIONS,
                                             actions)]
        if buffer_id:
            mod = parser.OFPFlowMod(datapath=datapath, buffer_id=buffer_id,
                                    priority=priority, match=match,
                                    instructions=inst, table_id=table_id)
        else:
            mod = parser.OFPFlowMod(datapath=datapath, priority=priority,
                                    match=match, instructions=inst, table_id=table_id)
        datapath.send_msg(mod)

    @set_ev_cls(ofp_event.EventOFPPacketIn, MAIN_DISPATCHER)
    def _packet_in_handler(self, ev):
        # If you hit this you might want to increase
        # the "miss_send_length" of your switch
        if ev.msg.msg_len < ev.msg.total_len:
            self.logger.debug("packet truncated: only %s of %s bytes",
                              ev.msg.msg_len, ev.msg.total_len)
        msg = ev.msg
        datapath = msg.datapath
        ofproto = datapath.ofproto
        parser = datapath.ofproto_parser
        in_port = msg.match['in_port']

        #if msg.match['ip_dscp']
        #    self.logger.info("IP_DSCP match: %r", parser)

        pkt = packet.Packet(msg.data)
        eth = pkt.get_protocols(ethernet.ethernet)[0]
        if eth.ethertype == ether_types.ETH_TYPE_LLDP:
            # ignore lldp packet
            # But not ARP = 2054
            # Neither IPv4 = 2048
            return
        self.logger.info('ETH TYPE %r', eth.ethertype)
        dst = eth.dst
        src = eth.src
        table_id = self.table_id
        dpid = datapath.id
        self.mac_to_port.setdefault(dpid, {})
        self.logger.info("DSCP %r", self.dscp_fields['critical'][1])


        # learn a mac address to avoid FLOOD next time.
        self.mac_to_port[dpid][src] = in_port
        self.logger.info("MacToPort: %s",self.mac_to_port)
        
        if dst in self.mac_to_port[dpid]:
            out_port = self.mac_to_port[dpid][dst]
            self.logger.info("Destination(%s) known.", dst)
        #elif dst == "ff:ff:ff:ff:ff:ff":
        #   self.logger.info('Packet to a Broadcast dsts')
        #    return
        else:
            out_port = ofproto.OFPP_FLOOD
            #self.logger.info("Destination(%s) unknown, flooding...", dst)
        actions = [parser.OFPActionOutput(out_port)]

        self.logger.info("packet in dpid:%s src:%s dst:%s in:%s out:%s OFF_FLOOD= %s", dpid, src, dst, in_port, out_port, ofproto.OFPP_FLOOD)

        # install a flow to avoid packet_in next time
        if out_port != ofproto.OFPP_FLOOD:
            match = parser.OFPMatch(in_port=in_port, eth_dst=dst)
            # verify if we have a valid buffer_id, if yes avoid to send both
            # flow_mod & packet_out
            if msg.buffer_id != ofproto.OFP_NO_BUFFER:
                self.add_flow(datapath, 1, match, actions, table_id,msg.buffer_id)
                return
            else:
                self.add_flow(datapath, 1, match, actions, table_id)
        data = None
        if msg.buffer_id == ofproto.OFP_NO_BUFFER:
            data = msg.data

        out = parser.OFPPacketOut(datapath=datapath, buffer_id=msg.buffer_id,
                                  in_port=in_port, actions=actions, data=data)
        
        datapath.send_msg(out)
        
        
app_manager.require_app('ryu.app.rest_qos')
app_manager.require_app('ryu.app.rest_conf_switch')

