$.getJSON( "/v1.0/topology/switches", function( switches ) {  
      window.statistics.switches = switches;
      init();     
});



function init(){
    var switches = window.statistics.switches.map(function(node){
        var s = {};
        s.dpid = parseInt(node.dpid, 16);
        s.port = [];
        node.ports.forEach( function (port){
            s.port.push(port);
        });  
        return s;
    });
    getSwitchDesc(switches);
    getSwitchFlows(switches);
    getAggregateFlows(switches);
    document.getElementById("select").onchange = function(){switchSelector(switches);}
    console.log (switches);
};

function switchSelector(switches){
    $(".switches-port-table")[0].style.display = "block";
    val = $(".select")[0].value;
        switches.forEach(function(s){
            if (s.dpid == val){
                    s.port.forEach(function (port){
                        $(".switches-port-table").append('<tr><td> ' + port.port_no + '</td><td><p>' + port.name + '</p></td><td><p>' + port.hw_addr + '</p></td></tr>');
                });
            };
        })
}
/*
REST API
# get the desc stats of the switch
# GET /stats/desc/<dpid>*/
function getSwitchDesc(switches){
    switches.forEach(function (s){
      $.getJSON( "/stats/desc/"+ s.dpid, function( desc ) {            
          s.desc = desc[s.dpid];
          $(".select").append('<option value="' + s.dpid +'"> Switch:'+ s.dpid + '</option>');
      });
    });
}

 /*get flows stats of the switch
    GET /stats/flow/<dpid>*/
function getSwitchFlows(switches){
    switches.forEach(function (s){
        $.getJSON( "/stats/flow/"+ s.dpid, function( flow ) {
                s.flow = flow;
                $(".switches-table").append('<tr><td>ID: ' + s.dpid + '</td><td><p>' + s.port.length + '</p></td><td><p>' + s.flow[s.dpid].length + '</p></td></tr>');                
        });
    });
}

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
# POST /stats/role
#
#
# send a experimeter message
# POST /stats/experimenter/<dpid>*/