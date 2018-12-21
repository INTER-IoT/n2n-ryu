$.getJSON( "/v1.0/topology/switches", function( switches ) {
  $.getJSON( "/v1.0/topology/links", function( links ) {
    $.getJSON( "/v1.0/topology/hosts", function( hosts ) {
      window.topology.initialize({switches: switches, links: links, hosts:hosts});
      initialize_gui();
      
    });
  });
});


function initialize_gui(){
  var hostEdges = [];
  var nodes = window.topology.nodes.map(function(node){
    var visnode = {};
    visnode.id = node.dpid;
    visnode.label = 'Switch ID: ' + parseInt(node.dpid, 16);
    visnode.shape = 'image';
    visnode.image = '/images/topology/switch.png';
    return visnode;
  });
  nodes = nodes.concat(window.topology.hosts.map(function(host){
    var visnode = {};
    visnode.id = 'host' + host.mac;
    visnode.label = 'Host MAC: ' + host.mac;
    visnode.shape = 'image';
    visnode.image = '/images/topology/host.png';
    visnode.ipv4 = host.ipv4;
    visnode.ipv6 = host.ipv6;
    // visnode.port = host.port;
    /*hostEdges = (function (host){
      window.topology.nodes.map(function(node){
        node.ports.map(function(port){
          if (host.port.name == port.name){
            var hostEdge = {};
            hostEdge.from = port.dpid;
            hostEdge.to = host.mac;
            debugger;
            return hostEdge;
          }
        });
      });
    });*/
    return visnode;
  }));
  var edges = window.topology.links.map(function(link){
    var vislink = {};
    vislink.from = link.port.src.dpid;
    vislink.to = link.port.dst.dpid;
    vislink.label = 's'+ parseInt(link.port.src.dpid, 16) + ':p' + parseInt(link.port.src.port_no) + ' - ' + 's' + parseInt(link.port.dst.dpid, 16) + ':p' + parseInt(link.port.dst.port_no);
    vislink.font = { align: 'top' };
    return vislink;
  });

  edges = edges.concat(window.topology.hosts.map(function(host){
    var vislink = {};
    vislink.from = 'host' + host.mac;
    vislink.to = host.port.dpid;    
    /*window.topology.nodes.reduce(function(old, node){
      return old.concat(node.ports);
    }, []).find(function(port){
      return port.name === host.port.name;
    }).port.dpid;*/    
    //vislink.label = 's'+ parseInt(link.port.src.dpid, 16) + ':p' + parseInt(link.port.src.port_no) + ' - ' + 's' + parseInt(link.port.dst.dpid, 16) + ':p' + parseInt(link.port.dst.port_no);
    vislink.label = 'if: ' + host.port.name;
    vislink.font = { align: 'top' };
    return vislink;
  }));

  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: nodes,
    edges: edges
  };

  var network = new vis.Network(container, data, options);

  var options = {
  autoResize: true,
  height: '100%',
  width: '100%',
  clickToUse: true
  }
  
  network.setOptions(options);
  network.on('click', onClick);
  function onClick(){
    console.log();
  }
}


