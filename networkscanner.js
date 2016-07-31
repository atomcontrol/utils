//NOTE: REQURIRES SUDO TO PULL MAC ADDRESSES
var phonehome = require('./phonehome');
var nmap = require('libnmap')
  , opts = {
      timeout: 900, // 900s = 10m and increases the reliability of scan results
      flags: [
        '-sn'
      ],
      ports: null,
      range: ['10.0.1.1/24']
    };

var run = function() {
  var devices = [];
  nmap.scan(opts, function(err, report) {
    if (err) throw new Error(err);

    for (var item in report) {
      var hosts = report[item]['host'];
      for(var host in hosts) {
        var hn = hosts[host]['hostnames'][0]['hostname'][0]['item']['name'];
        for( var eachAddress in hosts[host]['address']) {
          var item = hosts[host]['address'][eachAddress].item;
          if(item.addrtype=="mac") {
            devices.push({mac: item.addr, hostname: hn});
          }
        }
        
      //console.log('----------')
      }
    }
    //console.log(devices);
    phonehome.sendNetworkScan(devices);
  });
}
run();