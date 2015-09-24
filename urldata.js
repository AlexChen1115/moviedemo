var request = require('request');
var cheerio = require('cheerio');
function getdata(callback){
  request('http://www.atmovies.com.tw/home/movie_homepage.html', function (error, response, html) {
   if (!error && response.statusCode == 200) {
     var $ = cheerio.load(html);
     $('select[name="area"] option').each(function area(){
       var areaurl = $(this).attr('value');
       if(areaurl.match('a')){
         $('select[name="film_id"] option').each(function movie(){
           var movieurl = $(this).attr('value');
           if(movieurl.match('f')){
           var url= movieurl+"/"+areaurl+"/";
            callback(url);
          }
        });
       }
     });  
   }
 })
}
module.exports=getdata;