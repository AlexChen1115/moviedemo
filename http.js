var express = require('express');
var Firebase = require('firebase');
var ref = new Firebase('https://moviestorage123.firebaseio.com/');
var app = express();
today = new Date();
today_hours = today.getHours(); //一天中的小時數
today_minutes = today.getMinutes(); //一天中的分鐘
var CurrentDate =today_hours+":"+today_minutes;
var Current=CurrentDate.replace(/:/g,"");
app.use(express.static('public'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/html.html');
});
app.get('/api', function(req, res){
	var address=req.query.address.substring(2,4);
	ref.orderByKey().on('value', function(snapshot) {
		snapshot.forEach(function(data) {
			    if(data.val().city==address && data.val().movie.match(req.query.movie))
				{
					var time=elm.val().time.replace(/:/g,"");
					var time=parseInt(time);
					if(Current<time)
					{
						console.log(elm.val());
					}
				}
			
		});
	});	
});
app.listen(3000);