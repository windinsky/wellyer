var Controller = welly.controller;
var http = require('http');

var fn = {
	'index': function(){
		var interfaces = {
			'test': 'foothold::/test/'
		};
		console.log(this.req.cookie);
		this.send(interfaces);
		this.on('end',function(data){
			data.__title = 'Welly - index';
			data.__css = [''];
			this.render('index',data);
		});
	}
};

module.exports = Controller.create(fn);