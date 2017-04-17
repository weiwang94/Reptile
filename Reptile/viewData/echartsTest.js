var myChart = echarts.init(document.querySelector('.main'))

option = {
	title: {
		   text: '豆瓣电影 Top250 国家分布',
			subtext: '数据来源: http://movie.douban.com/top250',
		   textStyle: {
			   color: '#555'
		   },
        	x:'center',
	   },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none'
        },
        formatter: function (params) {
            return params[0].name + ': ' + params[0].value;
        }
    },
    xAxis: {
        data: ['美国', '中国', '法国', '意大利', '日本', '英国', '德国', '印度', '瑞士','新西兰'],
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {
            textStyle: {
                color: '#e54035'
            }
        }
    },
    yAxis: {
        splitLine: {show: false},
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {show: false}
    },
    color: ['#e54035'],
    series: [{
        name: 'hill',
        type: 'pictorialBar',
        barCategoryGap: '-130%',
        // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        itemStyle: {
            normal: {
                opacity: 0.5
            },
            emphasis: {
                opacity: 1
            }
        },
        data: [140, 40, 40, 30, 20, 20, 20, 10, 10, 10],
        z: 10
    }, {
        name: 'glyph',
        type: 'pictorialBar',
        barGap: '-100%',
        symbolPosition: 'end',
    	symbolSize: [70, 70],
        symbolOffset: [0, '-100%'],
        data: [{
            value: 140,
			movieName: '肖申克的救赎',
			symbol: 'image://./image/美国.png',
			// symbolSize: [80, 60],
        }, {
            value: 40,
            symbol: 'image://./image/中国.png',
            // symbolSize: [80, 80]
        }, {
			value: 40,
            symbol: 'image://./image/法国.png',
            // symbolSize: [50, 30]

        }, {
			value: 30,
            symbol: 'image://./image/意大利.png',
            symbolSize: [70, 50]
        }, {
            value: 20,
            symbol: 'image://./image/日本.png',
        	// symbolSize: [50, 50]
        }, {
            value: 20,
            symbol: 'image://./image/英国.png',
            // symbolSize: [60, 60]
        }, {
            value: 20,
            symbol: 'image://./image/德国.png',
            symbolSize: [70, 50]
        }, {
            value: 10,
            symbol: 'image://./image/印度.png',
            symbolSize: [70, 50]
        },{
            value: 10,
            symbol: 'image://./image/瑞士.png',
            // symbolSize: [40, 50]
        },{
            value: 10,
            symbol: 'image://./image/新西兰.png',
            symbolSize: [70, 50]
        }]
    }]
};

myChart.setOption(option);
