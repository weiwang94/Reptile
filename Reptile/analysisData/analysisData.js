var log = function() {
	console.log.apply(console, arguments)
}
const NationO = {}
const NationA = []
const fs = require('fs')
var nation = function(option, callback) {
	var path = './movieInfo.txt'
	fs.readFile(path, option, function(err, data){
		if(err!=null) {
			log('err',err)
		}else {
			log('载入成功')
			callback(data)
		}
	})
}

var divisonString = function(str) {
	var s = []
	var array = str.split(' ')
	for (var i = 0; i < array.length; i++) {
		if(array[i] == '中国大陆') {
			s.push('中国')
		}else if(array[i] == '香港') {
		}else {
			s.push(array[i])
		}
	}
	return s
}

var findNation = function(movie) {
	var nationArray = []
	for(let i = 0; i < movie.length; i++) {
		var str = divisonString(movie[i].nation)
		for (var j = 0; j < str.length; j++) {
			nationArray.push(str[j])
		}
	}
	return nationArray
}
var nationOCount = function(movieNation) {
	for (var i = 0; i < movieNation.length; i++) {
		var m = movieNation[i]
		if(m in NationO) {
			NationO[m] ++
		}else {
			NationO[m] = 1
		}
	}
}
var nationACount = function() {
	var property
	for(property in NationO) {
		var count = {name:'',value: ''}
		count.name = property
		count.value = NationO[property]
		NationA.push(count)
	}
	log(NationA)
}

nation('utf8', function(data) {
   var movie = JSON.parse(data)
   var nationArray =  findNation(movie)
   nationOCount(nationArray)
   nationACount()
})
