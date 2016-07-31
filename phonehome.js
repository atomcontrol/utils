var request = require('request');
var settings = require('./settings');

function sendNetworkScan(data) {
	phoneHome('networkscan',data);
}
function sendSpeedTest(data) {
	phoneHome('speedtest',data);
}
function sendDashButtonClick(data) {
	phoneHome('dashbutton',data)
}
function phoneHome(route,data) {
	console.log('phoning home',route,data);
	request({
                url: settings.API_BASE+'data/collect/'+route,
                method: "PUT",
                json: data
            });
}
module.exports = {
    sendSpeedTest: sendSpeedTest,
    sendNetworkScan: sendNetworkScan,
    sendDashButtonClick: sendDashButtonClick
};