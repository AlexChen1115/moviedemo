var data=require('./urldata');
var request = require('request');
var cheerio = require('cheerio');
function alldata(callback){	
	data(function(url){	
		var dataurl='http://www.atmovies.com.tw/showtime/'+url;
		request(dataurl, function (error, response, body) {
			if(!error){  
				var $ = cheerio.load(body);
				var list=[];
				var city=$('.s_nav').text().replace(/\r\n/g,"").replace(/\s/g,"").substring(11,13);
				var moviename=$('.s_nav').text().replace(/\r\n/g,"").replace(/\s/g,"").substring(14);
				
				if(city!=""){
					$('.showtime01').each(function(ind,elm){
						var theater=$(elm).find('.row-1_2 a').text().replace(/\r\n/g,"").replace(/\s/g,"");
						var version=$(elm).find('.col-2 font').text().replace(/\s/g,"");
						var time=$(elm).find('.col-2 div').text().replace(/\r\n/g,"").replace(/\s/g,"").replace(version,"").match(/(.{1,5})/g);
						for (var i = 0;i<time.length; i++) {
							list.push({
								city:city,
								moviename:moviename,
								theater:theater,
								time:time[i],
								version:version
							});
						};
					});
				}
			}
			callback(list);
		});
	});
}
module.exports=alldata;
