
$.ajax({
    url: '/v1.0/topology/switches',
    type: 'GET',
    data: '',
    //async: false, //depreciated
    success: function(switches){
        window.qos.switches = switches;
        init();
    }
});

//old:
//$.getJSON( "/v1.0/topology/switches", function( switches ) {
//    window.qos.switches = switches;
//    init();
//});

function init(){
    //console.log ("Hello");
    var switches = window.qos.switches.map(function(node){
        var s = {};
        s.dpid = node.dpid;
        s.id = parseInt(node.dpid, 16);
        s.port = [];
        s.rules, s.meters, s.queues = null;
        s.selected = false;
        
        node.ports.forEach( function (port){
            s.port.push(port);
        });
        return s;
    });
    
    
    
    //set remote url
    setQOSRemoteURL(switches);
    //create switch table
    getSwitchTable(switches);
    //create selector
    document.getElementById("select").onchange = function(){switchSelector(switches);};
    //add queue
    document.getElementById("add-queue").style.display="none";
    document.getElementById("add-queue").onclick = function() {show_add_queue();};
    //del queues
    document.getElementById("del-queues").style.display="none";
    document.getElementById("del-queues").onclick = function() {del_queues();};
    //add rule
    document.getElementById("add-rule").style.display="none";
    document.getElementById("add-rule").onclick = function() {show_add_rule();};
    //del rules
    document.getElementById("del-rules").style.display="none";
    document.getElementById("del-rules").onclick = function() {del_rules();};
    
    window.qos.switches = switches;
};

//del queues
function del_queues(){
    var switches = window.qos.switches;
    var sw = null;
    
    switches.forEach(function (s){
        if (s.selected == true){
            sw = s;
        }
    });
    
    $.ajax({
        url: '/qos/queue/'+sw.dpid,
        type: 'DELETE',
        success: function(data) {
            alert(JSON.stringify(data));
            location.reload();
        },
        error: function(data){
            alert(JSON.stringify(data));
            location.reload();
        }
    });
}
//del rules
function del_rules(){
    var switches = window.qos.switches;
    var sw = null;
    
    switches.forEach(function (s){
        if (s.selected == true){
            sw = s;
        }
    });
    
    $.ajax({
        url: '/qos/rules/'+sw.dpid,
        type: 'DELETE',
        data: '{"qos_id":"all"}',
        dataType: 'json',
        contentType: "application/json",
        success: function(data) {
            alert(JSON.stringify(data));
            location.reload();
        },
        error: function(data){
            alert(JSON.stringify(data));
            location.reload();
        }
    });

}
//button add queue
function show_add_queue(){
    document.getElementById('queue_form').style.display = "block";
};

function hide_add_queue(){
    document.getElementById('queue_form').style.display = "none";
};


var firstime = true
var data_queue = ""
function check_and_add_queue(){
    var switches = window.qos.switches;
    var sw = null;
    
    switches.forEach(function (s){
        if (s.selected == true){
            sw = s;
        }
    });
    
    var port = document.getElementById('port_name').value ;
    var type = document.getElementById('type').value ;
    if (type != "linux-htb" && type != "linux-hfsc") {
        alert("Incorrect type entered");
        return;
    }
    var max_rate = document.getElementById('max_rate').value ;
    var max_rate_string = "";
    if (max_rate != "") max_rate_string = "\"max_rate\": \""+max_rate+"\""
    
    var min_rate = document.getElementById('min_rate').value ;
    var min_rate_string = "";
    if (min_rate != "") min_rate_string = "\"min_rate\": \""+min_rate+"\""
    
    
    if (min_rate != "" && max_rate != "")
    {
        if (firstime) data_queue += "{"+max_rate_string+"," +min_rate_string+"}";
        else data_queue += ",{"+max_rate_string+"," +min_rate_string+"}";
    } 
    else if (min_rate != "" || max_rate != ""){
        if (firstime) data_queue += "{"+max_rate_string+min_rate_string+"}";
        else data_queue += ",{"+max_rate_string+min_rate_string+"}";
    }
    //console.log("2"+data_queue+firstime);
    
    if(confirm("Add another queue ?")) {
        firstime = false;
        //console.log("d"+data_queue+firstime);
        return;
    }
    //console.log("1"+data_queue+firstime);
    //else:
    hide_add_queue()
    var datafull = ""
    if (port == ""){
        datafull = "{\"type\": \""+type+"\", \"max_rate\": \"1000000\", \"queues\": ["+data_queue+"]}";
    } else {
        datafull = "{\"port_name\": \""+port+"\", \"type\": \""+type+"\", \"max_rate\": \"1000000\", \"queues\": ["+data_queue+"]}";
    }
    
    data_queue = ""
    firstime = true
    
    $.ajax({
        url: '/qos/queue/'+sw.dpid,
        type: 'POST',
        data: datafull,
        dataType: 'json',
        contentType: "application/json",
        success: function(data){
            alert(JSON.stringify(data));
            location.reload();
        },
        error: function(data){
            alert(JSON.stringify(data));
            location.reload();
        }
    });
};


//add rule
function show_add_rule(){
    document.getElementById('rule_form').style.display = "block";
};

function hide_add_rule(){
    document.getElementById('rule_form').style.display = "none";
};

function check_and_add_rule(){
    hide_add_rule()
    var switches = window.qos.switches;
    var sw = null;
    
    switches.forEach(function (s){
        if (s.selected == true){
            sw = s;
        }
    });
    
    //prio
    var priority = parseInt(document.getElementById('priority').value) ;
    var priorityString = ""
    if (priority >= 0 && priority < 65535) {priorityString = '"priority":"'+priority+'",';};
    //conditions
    var in_port = parseInt(document.getElementById('in_port').value) ;
    var in_portString = ""
    if (in_port >= 0 && in_port < 65535) {in_portString = '"in_port":"'+in_port+'",';};
    var dl_src = document.getElementById('dl_src').value ;
    var dl_srcString = ""
    if (dl_src != "") {dl_srcString = '"dl_src":"'+dl_src+'",';};
    var dl_dst = document.getElementById('dl_dst').value ;
    var dl_dstString = ""
    if (dl_dst != "") {dl_dstString = '"dl_dst":"'+dl_dst+'",';};
    var dl_type = document.getElementById('dl_type').value ;
    var dl_typeString = ""
    if (dl_type != "") {dl_typeString = '"dl_type":"'+dl_type+'",';};
    var nw_src = document.getElementById('nw_src').value ;
    var nw_srcString = ""
    if (nw_src != "") {nw_srcString = '"nw_src":"'+nw_src+'",';};
    var nw_dst = document.getElementById('nw_dst').value ;
    var nw_dstString = ""
    if (nw_dst != "") {nw_dstString = '"nw_dst":"'+nw_dst+'",';};
    var nw_proto = document.getElementById('nw_proto').value ;
    var nw_protoString = ""
    if (nw_proto != "") {nw_protoString = '"nw_proto":"'+nw_proto+'",';};
    var tp_src = parseInt(document.getElementById('tp_src').value) ;
    var tp_srcString = ""
    if (tp_src >= 0 && tp_src < 65535) {tp_srcString = '"tp_src":"'+tp_src+'",';};
    var tp_dst = parseInt(document.getElementById('tp_dst').value) ;
    var tp_dstString = ""
    if (tp_dst >= 0 && tp_dst < 65535) {tp_dstString = '"tp_dst":"'+tp_dst+'",';};
    var ip_dscp = parseInt(document.getElementById('ip_dscp').value) ;
    var ip_dscpString = ""
    if (ip_dscp >= 0 && ip_dscp < 63) {ip_dscpString = '"ip_dscp":"'+ip_dscp+'",';};
    //actions
    var mark = parseInt(document.getElementById('mark').value) ;
    var markString = ""
    if (mark >= 0 && mark < 63) {markString = '"mark":"'+mark+'",';};
    var meter = document.getElementById('meter').value ;
    var meterString = ""
    if (meter != "") {meterString = '"meter":"'+meter+'",';};
    var queue = document.getElementById('queue').value ;
    var queueString = ""
    if (queue != "") {queueString = '"queue":"'+queue+'",';};
    
    var data = "{"+priorityString+"\"match\":{"+(in_portString+dl_srcString+dl_dstString+dl_typeString+nw_srcString+nw_dstString+nw_protoString+tp_srcString+tp_dstString+ip_dscpString).slice(0,-1)+"},\"actions\":{"+(markString+meterString+queueString).slice(0,-1)+"}}";
        
    $.ajax({
        url: '/qos/rules/'+sw.dpid,
        type: 'POST',
        data: data,
        dataType: 'json',
        contentType: "application/json",
        success: function(data){
            alert(JSON.stringify(data));
            location.reload();
        },
        error: function(){
            alert(JSON.stringify(data));
            location.reload();
        }
    });
};


/*get switch table*/
function getSwitchTable(switches){
    
    function swEntry(s,q,r,m){
        $(".switches-table").append('<tr><td>ID: ' + s.id + '</td><td><p>' + r + '</p></td><td><p>' + q + '</p></td><td><p>' + m + '</p></td></tr>');
    };
    
    switches.forEach(function (s){
        var q = "0";
        var r = "0";
        var m = "0";
        
        //Add table entries
        $.getJSON( "/qos/queue/"+ s.dpid, function( data ) {
            if (data[0]["command_result"]["result"] != "failure") {
                //console.log(data[0]["command_result"]["details"])
                q = Object.keys(data[0]["command_result"]["details"]).length; // ?
            }
            s.queues = data;
            //console.log(JSON.stringify(data, null, 2));
            
            $.getJSON( "/qos/rules/"+ s.dpid, function( data ) {
                //alert(JSON.stringify(data));
                //console.log(data[0]["command_result"])
                if (data[0]["command_result"].length != 0) {  
                    r = data[0]["command_result"][0]["qos"].length;
                    //console.log(data[0]["command_result"])
                }
                s.rules = data;
                
                $.getJSON( "/qos/meter/"+ s.dpid, function( data ) {
                    m = data[0]["command_result"][s.id].length;
                    s.meters = data;
                    
                    swEntry(s,q,r,m);
                    //everything ok
                });
            });
        });
        
        //Add switch entries
        $(".select").append('<option value="' + s.id +'"> '+ s.id + '</option>');     
    });
}

//wat appen wen selectin switch
function switchSelector(switches){
    val = $(".select")[0].value;
    
    //hide everything
    document.getElementById("add-queue").style.display="none";
    document.getElementById("add-rule").style.display="none";
    document.getElementById("del-queues").style.display="none";
    document.getElementById("del-rules").style.display="none";
    hide_add_queue();
    hide_add_rule();
    $(".switch-table").text('');
    $(".switch-table").append('<tr><td><p> Rules detail </p></td><td><p> Queues detail </p></td><td><p> Meters detail </p></td></tr>');
    
    switches.forEach(function(s){
        s.selected = false;
        if (s.id == val){
        
            //show all
            document.getElementById("add-queue").style.display="block";
            document.getElementById("add-rule").style.display="block";
            document.getElementById("del-queues").style.display="block";
            document.getElementById("del-rules").style.display="block";
            
            s.selected = true;
            $(".switch-table").append('<tr><td><p>' + JSON.stringify(s.rules[0]["command_result"],null,4) + '</p></td><td><p>' + JSON.stringify(s.queues[0]["command_result"]["details"],null,1) + '</p></td><td><p>' + JSON.stringify(s.meters[0]["command_result"],null,2) + '</p></td></tr>');
        };
    });
}

//Set remote URL
//get ovsdb addr, if empty we set.
function setQOSRemoteURL(switches){
    switches.forEach(function(s){
        $.ajax({
            url: '/v1.0/conf/switches/'+s.dpid+'/ovsdb_addr',
            type: 'GET',
            success: function(data){
                console.log("URL already in remote switch "+s.dpid+ JSON.stringify(data));
            },
            error: function(data){
                $.ajax({
                    url: '/v1.0/conf/switches/'+s.dpid+'/ovsdb_addr',
                    type: 'PUT',
                    data: '"tcp:127.0.0.1:6632"',
                    success: function(data) {
                        console.log("Successful init of QoS switch "+s.dpid + JSON.stringify(data));
                    },
                    error: function(data){
                        console.log("Failed init of QoS switch "+s.dpid + JSON.stringify(data));
                    }
                });
            }
        });
    });
}


/*
get queues stats of the switch
 	GET /stats/queue/<dpid>[/<port>[/<queue_id>]]
 	Note: Specification of port number and queue id are optional
       	If you want to omitting the port number and setting the queue id,
       	please specify the keyword "ALL" to the port number
       	e.g. GET /stats/queue/1/ALL/1

get queues config stats of the switch
 	GET /stats/queueconfig/<dpid>[/<port>]
 	Note: Specification of port number is optional

get queues desc stats of the switch
 	GET /stats/queuedesc/<dpid>[/<port>[/<queue_id>]]
 	Note: Specification of port number and queue id are optional
       If you want to omitting the port number and setting the queue id,
       please specify the keyword "ALL" to the port number
       e.g. GET /stats/queuedesc/1/ALL/1

get meter features stats of the switch
 	GET /stats/meterfeatures/<dpid>

get meter config stats of the switch
 	GET /stats/meterconfig/<dpid>[/<meter_id>]
 	Note: Specification of meter id is optional

get meter desc stats of the switch
 	GET /stats/meterdesc/<dpid>[/<meter_id>]
 	Note: Specification of meter id is optional

get meters stats of the switch
 	GET /stats/meter/<dpid>[/<meter_id>]
 	Note: Specification of meter id is optional

Get queue status¶
	GET /qos/queue/status/{switch}

Get Queue Configuration
 	GET /qos/queue/{switch}

Get meter stat
 	GET /qos/meter/{switch}

Set meter table
 	POST /qos/meter/{switch}
	
	meter_id:Meter ID
	bands:
		action:[DROP | DSCP_REMARK]
		flags:[KBPS | PKTPS | BURST | STATS]
		burst_size:[Burst size]
		rate:[Reception rate]
		prec_level:[Number of drop precedence level to add]


get QoS Rules
	GET /qos/rules/<dpid>[/vlanID]

create QoS Rule
	POST /qos/rules/<dpid>[/vlanID]

	priority:[ 0 - 65535 ]
	match:
	    in_port:[ 0 - 65535 ]
	    dl_src:”<xx:xx:xx:xx:xx:xx>”
	    dl_dst:”<xx:xx:xx:xx:xx:xx>”
	    dl_type:[ “ARP” | “IPv4” ]
	    nw_src:”<xxx.xxx.xxx.xxx/xx>”
	    nw_dst:”<xxx.xxx.xxx.xxx/xx>”
	    nw_proto”:[ “TCP” | “UDP” | “ICMP” ]
	    tp_src:[ 0 - 65535 ]
	    tp_dst:[ 0 - 65535 ]
	    ip_dscp:[ 0 - 63 ]
	actions:
	    [ “mark”: [ 0 - 63 ] ] | [ “meter”: [ Meter ID ] ] | [ “queue”: [ Queue ID ] ]

Delete qos rules
 	DELETE /qos/rules/{switch}[/{vlan}]
 	
	rule_id:[ “all” | 1 - ... ]

Set Queue
	POST /qos/queue/{switch}
 	
	port_name:[Port name]
	type:[linux-htb | linux-hfsc]
	max_rate:[Bandwidth(bps)]
	queues:		
		max_rate:[Bandwidth(bps)]
		min_rate:[Bandwidth(bps)]
		
Delete Queue
	DELETE /qos/queue/{swtich}


*/

