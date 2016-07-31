var speedTest = require('speedtest-net');
var os = require('os');
var phonehome = require('./phonehome');

var run = function() {
	test = speedTest({maxTime: 5000});
	test.on('data', function(data) {
	  var download = data.speeds.download;
	  var upload = data.speeds.upload;
	  var ping = data.server.ping;
	  
	  var data = {
	  	download: download.toFixed(2),
	  	upload: upload.toFixed(2),
	  	ping: ping.toFixed(2),
	  	hostname: os.hostname() 
	  }
	  phonehome.sendSpeedTest(data);
	});

	test.on('error', function(err) {
	  console.error(err);
	});
}
run();