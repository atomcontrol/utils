var dash_button = require('node-dash-button');
var phonehome = require('./phonehome');
var settings = require('./settings');
var buttons = settings.dashbuttons;

var dash = dash_button(Object.keys(buttons));
dash.on("detected", function (dash_id){
    console.log();
    phonehome.sendDashButtonClick(
    	{
    		name: buttons[dash_id],
    		mac: dash_id
    	});
});