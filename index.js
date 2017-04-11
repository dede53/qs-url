var request     				= require('request');
var adapter 					= require('../../adapter-lib.js');

var url 						= new adapter({
	"name": "Url",
	"loglevel": 3,
	"description": "Führt http-requests aus.",
	"settingsFile": "",
	"version":"0.0.1"
});

process.on('message', function(request) {
	var status = request.status;
	var data = request.data;
	sendURL(status, data);
});

function sendURL(status, data){
	if(status == 1){
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
