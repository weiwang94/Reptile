var log = function() {
	console.log.apply(console, arguments)
}
// NationO 是国家的 名字 和 数量的统计对象
// { '美国': 140,
//   '法国': 40,
//   '中国': 40,
//   '意大利': 30,
//   '日本': 20,
//   '英国': 20,
//   '印度': 10,
//   '瑞士': 10,
//   '德国': 20,
//   '新西兰': 10 }
const NationO = {}
// NationA 是 NationO 对象转化为 供echarts用的 数组 对象
// [ { name: '美国', value: 140 },
//   { name: '法国', value: 40 },
//   { name: '中国', value: 40 },
//   { name: '意大利', value: 30 },
//   { name: '日本', value: 20 },
//   { name: '英国', value: 20 },
//   { name: '印度', value: 10 },
//   { name: '瑞士', value: 10 },
//   { name: '德国', value: 20 },
//   { name: '新西兰', value: 10 } ]
const NationA = []

const fs = require('fs')
const nation = function(option, callback) {
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

const divisonString = function(str) {
	var s = []
	var array = str.split(' ')
	for (var i = 0; i < array.length; i++) {
		if(array[i] == '中国大陆') {
			s.push('中国')
		}else if(array[i] == '香港') {
			s.push('中国')
		}else {
			s.push(array[i])
		}
	}
	return s
}

const findNation = function(movie) {
	var nationArray = []
	for(let i = 0; i < movie.length; i++) {
		var str = divisonString(movie[i].nation)
		for (var j = 0; j < str.length; j++) {
			nationArray.push(str[j])
		}
	}
	// nationArray.map(str => {
	// 	log(str)
	// })
	return nationArray
}
const nationOCount = function(movieNation) {
	for (var i = 0; i < movieNation.length; i++) {
		var m = movieNation[i]
		if(m in NationO) {
			NationO[m] ++
		}else {
			NationO[m] = 1
		}
	}
	log('nationOCount', NationO)
}
const nationACount = function() {
	var property
	for(property in NationO) {
		var count = {
			name:'',
			value: ''
		}
		count.name = property
		count.value = NationO[property]
		NationA.push(count)
	}
	log(NationA)
}

// 调用 nation 函数异步读取 存储有电影信息的文件
// data 是文件读取完后 回调的参数
nation('utf8', function(data) {
   var movie = JSON.parse(data)
   var nationArray =  findNation(movie)
   nationOCount(nationArray)
   nationACount()
})
