var superagent = require('superagent');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

superagent.get('http://car.autohome.com.cn/pic/series-s22044/771.html#pvareaid=2042220')
		.end(function(err,docs) {
			var $ = cheerio.load(docs.text);
			var imgArr = [];
			$('.grid-16 .uibox .carpic-list03 li img').each(function(idx, element) {
				var $el = $(element);
				imgArr.push($el.attr('src'));
			})
			for(var i=0;i<imgArr.length;i++) {
				downloadImg(imgArr[i], imgArr[i].split('/')[8]);
			}
		});
fs.mkdir('img', 0777, function(err){
	if(err){
		console.log(err);
	}else{
		console.log("creat done!");
	}
});
var downloadImg = function(url,  filename) {
	request.head(url, function(err, res, body) {
		request(url).pipe(fs.createWriteStream('./img/' + filename));
	});
};