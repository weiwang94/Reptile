// node.js 使用 es6 特性套路
"use strict"

// 引入 request 和 cheerio
// request 用于下载网页
// cheerio 用于解析网页数据
const request = require('request')
const cheerio = require('cheerio')

// 电影类, 用于保存电影信息
const MovieInfo =  function() {
    this.name= ''
    this.director = ''
    this.actor = ''
    this.time = ''
    this.nation = ''
    this.style = ''
    this.score = 0
    this.quote = ''
    this.ranking = 0
    this.coverUrl = ''
}

const log = function() {
    console.log.apply(console, arguments)
}

const formatMovie = function(info, infoName) {
    // console.log('info', info)
    var m = new MovieInfo()
    m.name = infoName

    m.director = info.split(':')[1].split('&')[0]
    if(info.split(':')[2] != null){
        m.actor = info.split(':')[2].split('<br>')[0]
    }
    m.time = info.split('>')[1].split('&')[0].split('\n')[1].split(' ').join('')
    m.nation = info.split('>')[1].split('&nbsp;')[2]
    m.style = info.split('>')[1].split('&nbsp;')[4].split('\n')[0]
    return m
}
const saveMovies = function(movieInfos) {
    // 将一个保存了所有电影对象的数组转成 JSON 字符串并将其存入文件中
    const fs = require('fs')
    const pathInfo = '../movieInfo.txt'
    // 第三个参数是 缩进层次
    const sInfo = JSON.stringify(movieInfos, null, 2)
    fs.writeFile(pathInfo, sInfo, function(error){
        if (error !== null) {
            log('*** 写入文件错误 ', error)
        } else {
            // log('--- 保存成功')
        }
    })
}
const moviesFromDiv = function(div) {
    // 从一个电影的 Div 中取出所需的信息
    var  movieInfo = new MovieInfo()
    // 使用 cheerio.load 获取一个可以查询的对象
    const options = {
        decodeEntities: false,
    }
    const e = cheerio.load(div, options)

    var info = e('.bd').find('p').first().html()
    var infoName = e('.hd').find('.title').first().text()
    // var info = info.split(' ').join('')
    movieInfo = formatMovie(info, infoName)
    movieInfo.score = e('.rating_num').text()
    movieInfo.quote = e('.inq').text()

    // log('movie',movieInfo)
    const pic = e('.pic')
    movieInfo.ranking = pic.find('em').text()
    // 元素的属性用 .attr('属性名') 确定
    movieInfo.coverUrl = pic.find('img').attr('src')
    return movieInfo
}

const moviesFromUrl = function(url, movies, movieInfos) {
    // 从一个 url 中获取所需的 div 并调用回调函数
    request(url, function(error, response, body){
        // 回调函数的三个参数分别是 错误, 响应, 响应数据
        // 检查请求是否成功, statusCode === 200 是成功代码
        if (error === null && response.statusCode === 200) {
            // cheerio.load 用字符串作为参数返回一个可以查询的特殊对象
            const options = {
                decodeEntities: false,
            }
            const e = cheerio.load(body, options)
            const movieDivs = e('.item')
            let i = 0
            for (let i = 0; i < movieDivs.length; i++) {
                let element = movieDivs[i]
                const div = e(element).html()
                const m = moviesFromDiv(div)
                movieInfos.push(m)
            }
            // 保存 movies 数组到文件中
            saveMovies(movieInfos)
        } else {
            log('*** ERROR 请求失败 ', error)
        }
    })
}

const __main = function() {
    const movies = []
    const movieInfos = []
    const path = 'http://movie.douban.com/top250'
    for (let i = 0; i <= 225; i+=25) {
        let url = path + `?start=${i}&filter=`
        log('url :', url)
        moviesFromUrl(path, movies, movieInfos)
    }
}

__main()
