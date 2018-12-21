

/*
REST API
# get switches
# GET /v1.0/topology/switches*/

function getSwitchesData(cb){
  const getSwitchFlowData = (dpid, cb) => {
    $.getJSON("/stats/flow/"+ dpid, (flow) => {
      cb(flow[dpid]);
    });
  };
  const getAllSwitchFlowData = (switches, id, cb) => {
    if(id === switches.length) cb(switches);
    else getSwitchFlowData(switches[id].dpid, (flow) => {
      switches[id].flows = flow;
      getAllSwitchFlowData(switches, id+1, cb);
    });
  };
  $.getJSON( "/v1.0/topology/switches", function(data) {
    var switchesModel = data.map(function(node){
      var s = {};
      s.dpid = parseInt(node.dpid, 16);
      s.port = [];
      node.ports.forEach( function (port){
          s.port.push(port);
      });  
      return s;
    });
    getAllSwitchFlowData(switchesModel, 0, () => cb(switchesModel));
  });
}

function getSwitchPortDescription(dpid, cb){
   $.getJSON( "/stats/portdesc/" + dpid, data => cb(data[dpid]));
}

function getSwitchFlow(dpid, cb){
    $.getJSON( "/stats/flow/" + dpid, data => cb(data[dpid]));
 }
 

/*function getSwitches(){
  $.getJSON( "/v1.0/topology/switches", function( data ) {        
      var switchesModel = data.map(function(node){
        var s = {};
        s.dpid = parseInt(node.dpid, 16);
        s.port = [];
        node.ports.forEach( function (port){
            s.port.push(port);
        });  
        return s;
      })
    getSwitchFlows();
    switchesView.switches = switchesModel;
    debugger;
  });
    //getSwitchDescription(switchesModel);
};

/*# get the desc stats of the switch
# GET /stats/desc/<dpid>*/
/*function getSwitchDescription(){
    switchesView.switches.forEach(function (s){
      $.getJSON( "/stats/desc/"+ s.dpid, function( desc ) { 
        s.desc = desc[s.dpid];
        //$(".select").append('<option value="' + s.dpid +'"> Switch:'+ s.dpid + '</option>');
      });
    });
};

 /*get flows stats of the switch
    GET /stats/flow/<dpid>*/
/*function getSwitchFlows(){
    switchesView.switches.forEach(function (s){
        $.getJSON( "/stats/flow/"+ s.dpid, function( flow ) {
          s.flow = flow[s.dpid];
          //$(".switches-table").append('<tr><td>ID: ' + s.dpid + '</td><td><p>' + s.port.length + '</p></td><td><p>' + s.flow[s.dpid].length + '</p></td></tr>');                
        }).done(function(){return;});
    });
}*/

/*
# get aggregate flows stats of the switch
# GET /stats/aggregateflow/<dpid>*/
function getAggregateFlows(switches){
    switches.forEach(function (s){
        $.getJSON( "/stats/aggregateflow/"+ s.dpid, function( flows ) {
                s.aggregateFlow = flows;       
        });
    });
}
/*
# get aggregate flows stats of the switch filtered by the fields
# POST /stats/aggregateflow/<dpid>

# get table stats of the switch
# GET /stats/table/<dpid>*/
function getTableStatus(switches){
    switches.forEach(function (s){
        $.getJSON( "/stats/table/"+ s.dpid, function( table ) {
                s.tables = table;       
        });
    });
}

function getTableStatus(dpid, cb){
   $.getJSON( "/stats/table/"+ dpid, function( table ) {
                s.tables = table;       
        });
}

/* get table features stats of the switch
# GET /stats/table/features/<dpid>*/
function getTableFeatures(switches){
    switches.forEach(function (s){
        $.getJSON( "/stats/table/features/"+ s.dpid, function( table ) {
                s.table_features= table;       
        });
    });
}



/*# get ports stats of the switch
# GET /stats/port/<dpid>[/<port>]
# Note: Specification of port number is optional

# get ports description of the switch
# GET /stats/portdesc/<dpid>[/<port_no>]
# Note: Specification of port number is optional (OpenFlow 1.5 or later)

# get group features stats of the switch
# GET /stats/groupfeatures/<dpid>

# get groups desc stats of the switch
# GET /stats/groupdesc/<dpid>[/<group_id>]
# Note: Specification of group id is optional (OpenFlow 1.5 or later)

# get groups stats of the switch
# GET /stats/group/<dpid>[/<group_id>]
# Note: Specification of group id is optional






# Update the switch stats
#
# add a flow entry
# POST /stats/flowentry/add
#
# modify all matching flow entries
# POST /stats/flowentry/modify
# to be modified to PUT /n2n/switches/{switchId}/tables/{tableId}/flows/{flowId}
#
# modify flow entry strictly matching wildcards and priority
# POST /stats/flowentry/modify_strict
#
# delete all matching flow entries
# POST /stats/flowentry/delete
#
# delete flow entry strictly matching wildcards and priority
# POST /stats/flowentry/delete_strict
#
# delete all flow entries of the switch
# DELETE /stats/flowentry/clear/<dpid>
#
# add a meter entry
# POST /stats/meterentry/add
#
# modify a meter entry
# POST /stats/meterentry/modify
#
# delete a meter entry
# POST /stats/meterentry/delete
#
# add a group entry
# POST /stats/groupentry/add
#
# modify a group entry
# POST /stats/groupentry/modify
#
# delete a group entry
# POST /stats/groupentry/delete
#
# modify behavior of the physical port
# POST /stats/portdesc/modify
#
# modify role of controller
# POST /stats/role*/




function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}