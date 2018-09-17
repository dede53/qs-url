var request     				= require('request');
var adapter 					= require('../../adapter-lib.js');

var url 						= new adapter({
	"name": "Url",
	"loglevel": 3,
	"description": "Führt http-requests aus.",
	"settingsFile": "",
	"version":"0.0.1"
});

process.on('message', function(data) {
	switch(data.protocol){
		case "setSetting":
			url.setSetting(data.setSetting.name, data.setSetting.status);
			break;
		default:
			sendURL(data);
			break;
	}
});

function sendURL(data){
	if(data.newStatus == "toggle"){
		if(data.status == "1"){
			var msg = data.CodeOff;
		}else{
			var msg = data.CodeOn;
		}
	}else if(data.newStatus == 1){
		var msg = data.CodeOn;
	}else{
		var msg = data.CodeOff;
	}
	url.log.info(msg);
	request({
		url: msg,
		qs: '',
		method: 'GET'
	}, function(error, response, body){
		if(error) {
			url.log.error(error);
		} else {
			if(response.statusCode == 200){
				url.log.debug( "Erfolgreich die URL aufgerufen" );
			}else{
				url.log.error( "Die URL meldet keinen gültigen status:" + response.statusCode );
			}
		}
	});
}
