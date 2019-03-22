$(document).ready(function() {
	login()
	Riskleaps();
	security(); //安全
	quality(); //质量管理
	centerWidth() //进度总览定位居中
	Overview(); //总览
	//  OverviewGX()   //进度总览 关联工序名称
	Time()
	setInterval(Riskleaps, 100000); //N毫秒刷新一次，1000毫秒＝1秒
	setInterval(Overview, 60000 * 60);
	setInterval(security, 58000 * 60);
	setInterval(quality, 59000 * 60);

	//关闭视频
	$(".off").click(function() {
		$("#iframeVideo").attr("src", " ")
		$(".videoBox").hide()

	})
	//退出登录
	$(".tcLOGIN span").click(function() {
		window.location.href = '../index.html';
	})

});

//声明全局变量  
var token = localStorage.getItem("token");
var lineName = []; //总览线路名称
var lineNum = []; //线路完成百分比
var md5 = [];
var lineColor = ["#8a58a1", "#0eca80", "#e7423e", "#4194fc", "#f3af02", "#00d5d8", "#6988a4", "#a1d71e", "#c18545"];
var progressArry = [] //map 进度
var a = 0
var index = 0 //用来计数得
var indexone = 4
var clearGCY = null //工程预览清理计时器
var clearPer = null //履职履职清理计时器
var mapName = [] //存储项目名称
//var urlSrc = "http://219.143.76.130:8888"
	var urlSrc = "http://localhost:8080"
	var xhTime;//Ernest
	var initializeState=0;
// 判断是否登录
function login() {
	if(token == null) {
		window.location.href = '../login.html';
	} else {

	}
}

//总览

function Overview() {
	$(".dataListUi").find("li").remove();
	lineName.length = 0;
	lineNum.length = 0;
	md5.length = 0;
	$.ajax({
		type: "get",
		url: urlSrc + "/baas/BZB03/pcCharts/getAllprojectrate",
		data: {
			md5Str: token
		},
		async: true,
		cache:false,
		dataType: "json",
		success: function(event) {
			//console.log(data)
			var data = event.data;
			mapName.length = 0
			progressArry.length = 0
			for(let j in data) {
//				console.info(data[j]);
				lineName.push(data[j].projectName);
				lineNum.push(data[j].number + "%");
				md5.push(data[j].projectId)
				progressArry.push({
					name: data[j].projectName,
					value: data[j].number
				})
				mapName.push(data[j].projectName)
//				
			}
			var arr = Object.keys(data);
			var len = arr.length;
			
			if(len > 9) { //判断传过来得数据有九条以上才在最后面追加
				for(let j in data) {
					if(j < 9) {
						lineName.push(data[j].projectName);
						lineNum.push(data[j].number + "%");
						md5.push(data[j].projectId);

					}
				}
			}
			
			for(var i = 0; i < lineName.length; i++) {
				var str = '<li value= "'+i+'" onclick="clickProject(this)">' +
					'<div class = "lineBOX" >' +
					'<div class = "BarGraph" style="background:' + lineColor[a] + ';height:' + lineNum[i] + '">' +
					'<div class = "dataNum" >' + lineNum[i] + '</div> </div> </div> <div class = "dataNme" >' + lineName[i] + '</div> </li>'
				if(a < lineColor.length) {
					a++

				} else {
					a = 0;
				}

				$(".dataListUi").append(str)
			}	
//			data.finish//竣工总量
//			data.building//待建总量
			$(".Building").html(event.building);
			$(".Finish").html(event.finish);
			
			
			//console.log($(".dataListUi").children().filter("li").length)
			OverviewGX() //进度总览 关联工序名称
			OverviewLeft();
			map(token) //地图坐标地址
		}
	});

}

//总览运动
function OverviewLeft() {
	// 算一个li得宽度
	var dataList = $(".dataList").width();
	if($(".dataListBox ul li").length >= 2) {
		var marginLeft = $(".dataListBox ul li").eq(1).css("margin-left").split("p");
	} else {
		var marginLeft = $(".dataListBox ul li").eq(0).css("margin-left").split("p");
	}
//	console.log("marginLeft", marginLeft)
	var endLI = dataList - (marginLeft[0] * 8);
	var liwidth = endLI / 9;
	$(".dataListBox ul li").css("width", liwidth + "px")
	var liMargin = $(".dataList").width() * 0.055;
	var width = $(".dataListBox ul li").eq(0).width() //获取 width
	var lineBOXWidth = ((marginLeft[0] * 1 + width) * lineName.length) + liMargin;
	$(".dataListBox ul li").css("margin-left", liMargin + "px")
	$('.dataListBox').css("width", lineBOXWidth + "px");
	var sum = marginLeft[0] * 1 + width;
	var sbsum = marginLeft[0] * 1 + width;
	var dateNUM = 2000;
	var backYD = liMargin + width; //后面背景得移动距离
	var numYD = 1;
	//console.log("shuliang", $(".dataListBox ul li").length)
	if(initializeState==0){
		if(lineName.length < 9) {
			$(".xbj").css("left", marginLeft[0] / 1.6 + "px"); //初始化背景得位置
		} else {
			$(".dataListBox ul li").eq(0).css("margin-left", "0px")
		}
	}
	
	xhTime=setInterval(function() {
		if(lineName.length >= 9) {
			if(numYD <= lineName.length - 9) {
				$(".dataListBox").animate({
					"left": -sbsum * numYD + "px"
				}, dateNUM, function() {
					indexone++;
					numYD++;
					//console.log("Pp", numYD)
					OverviewGX()
				});

			} else {
				
				$(".dataListBox").css("left", "0px");
				numYD = 1;
				dateNUM = 2000;
				indexone = 4;
				clearInterval(xhTime)
				OverviewLeft()
				initializeState=0;
			}
		} else {
			if(index <= lineName.length - 2) {
				index++;
				$(".xbj").css("left", marginLeft[0] / 1.6 + backYD * index + "px");
				OverviewGX();

			} else {
				index = 0;
				$(".xbj").css("left", marginLeft[0] / 1.6 + backYD * index + "px");
				OverviewGX();
				clearInterval(xhTime)
				OverviewLeft()
				initializeState=0;
			}

		}
	}, 1000*60)
	
}
//单击项目,轮播跳到指定的项目
function clickProject(event){
	// 算一个li得宽度
	var dataList = $(".dataList").width();
	if($(".dataListBox ul li").length >= 2) {
		var marginLeft = $(".dataListBox ul li").eq(1).css("margin-left").split("p");
	} else {
		var marginLeft = $(".dataListBox ul li").eq(0).css("margin-left").split("p");
	}
	var endLI = dataList - (marginLeft[0] * 8);
	var liwidth = endLI / 9;
	$(".dataListBox ul li").css("width", liwidth + "px")
	var liMargin = $(".dataList").width() * 0.055;
	var width = $(".dataListBox ul li").eq(0).width() //获取 width
	var lineBOXWidth = ((marginLeft[0] * 1 + width) * lineName.length) + liMargin;
	$(".dataListBox ul li").css("margin-left", liMargin + "px")
	$('.dataListBox').css("width", lineBOXWidth + "px");
	var sum = marginLeft[0] * 1 + width;
	var sbsum = marginLeft[0] * 1 + width;
	var dateNUM = 2000;
	var backYD = liMargin + width; //后面背景得移动距离
	var numYD = 1;
	if(lineName.length >= 9){
		indexone=event.value;
		numYD=event.value-4;
		$(".dataListBox").animate({
			"left": -sbsum * numYD + "px"
		},dateNUM,function(){
			OverviewGX()
			clearInterval(xhTime)
			OverviewLeft()
		});
	}else{
		index=event.value;
		$(".xbj").css("left", marginLeft[0] / 1.6 + backYD * index + "px");
		OverviewGX();
		clearInterval(xhTime)
		initializeState=1;
		OverviewLeft()
	}
}


// 进度总览 关联工序名称
function OverviewGX() {
	var md5Data = md5[0]
	if(md5.length > 9) {

		md5Data = md5[indexone];
		ztjxData(md5Data) //架线,组塔
		Engineering(md5Data) //工程预览 函数
		Todaysrisk(md5Data) //每日风险
		Workrecord(md5Data) //工作记录
		Perform(md5Data) //履职履责
		Construction(md5Data) //施工风采
	} else {
		md5Data = md5[index];
		if(index < md5.length) {
			ztjxData(md5Data) //架线,组塔
			Engineering(md5Data) //工程预览 函数
			Todaysrisk(md5Data) //每日风险
			Workrecord(md5Data) //工作记录
			Perform(md5Data) //履职履责
			Construction(md5Data) //施工风采
			//			index++
		} else {
			//			index = 0;
		}

	}

}
//架线,组塔
function ztjxData(md5Data) {
	$.ajax({
		type: "get",
		url: urlSrc + "/baas/BZB03/pcCharts/getOneprojectrate",
		data: {
			projectId: md5Data
		},
		async: true,
		cache:false,
		dataType: "json",
		success: function(data) {
			$(".xqIMGHear").html('<span class="animated fadeInUp" style="display:block;">' + data[0].projectName + '</span>');
			$(".Hear_1").html('<span class="animated fadeInUp" style="display:block;">工程预览</span>');
			$(".Hear3").html('<span class="animated fadeInUp" style="display:block;">每周风险预警</span>');
			$(".Hear4").html('<span class="animated fadeInUp" style="display:block;">今日工作记录</span>');
			$(".Hear7").html('<span class="animated fadeInUp" style="display:block;">施工风采</span>');
			$(".Hear7_1").html('<span class="animated fadeInUp" style="display:block;">履职履责</span>');
			$(".gcMsgWorld").addClass("animated fadeInUp");
			$(".left-xqIMG-JD ").addClass("animated fadeInUp");
			$(".fxBoxLI").addClass("animated fadeInUp");
			$(".gzjlBox").addClass("animated fadeInUp");
			$(".sgfcMsgBox").addClass("animated fadeInUp");
			$(".ygdtBox").addClass("animated fadeInUp");

			setTimeout(function() {
				$(".gcMsgWorld").removeClass("animated fadeInUp");
				$(".left-xqIMG-JD").removeClass("animated fadeInUp");
				$(".fxBoxLI").removeClass("animated fadeInUp");
				$(".gzjlBox").removeClass("animated fadeInUp");
				$(".sgfcMsgBox").removeClass("animated fadeInUp");
				$(".ygdtBox").removeClass("animated fadeInUp")
			}, 900)

			var dataOne = data[0].Base;
			var dataTWO = data[0].Tunn;
			var dataThree = data[0].string;
			charts1(dataOne, dataTWO, dataThree)
		}
	});
}

function centerWidth() {
	var BoxWidth = $(".dataList").width(); //获取宽度度
	var BoxHeight = $(".dataList").height(); // 获取高度
	$(".dataList").css({
		"margin-left": -BoxWidth / 2 + "px",
		"margin-top": -BoxHeight / 2 + "px"
	})
}

//浏览器全屏
function requestFullScreen(element) {
	// 判断各种浏览器，找到正确的方法
	var requestMethod = element.requestFullScreen || //W3C
		element.webkitRequestFullScreen || //Chrome等
		element.mozRequestFullScreen || //FireFox
		element.msRequestFullScreen; //IE11
	if(requestMethod) {
		requestMethod.call(element);
		$(".qp").hide()
		$(".tc").show()
		var widht = $("#main").children("div:first-child").width();
		var height = $("#main").children("div:first-child").height();
		$(".prebackImg").css({
			"width": widht + "px",
			"height": height + "px"
		})
		$(".wave").css({
			"width": widht + "px",
			"height": widht + "px",
			"margin-top": -widht / 2 - 15 + "px"
		})
		centerWidth()
	} else if(typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
		var wscript = new ActiveXObject("WScript.Shell");
		if(wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
}
//浏览器退出全屏
function exitFull() {
	// 判断各种浏览器，找到正确的方法
	var exitMethod = document.exitFullscreen || //W3C
		document.mozCancelFullScreen || //Chrome等
		document.webkitExitFullscreen || //FireFox
		document.webkitExitFullscreen; //IE11
	if(exitMethod) {
		exitMethod.call(document);
		$(".qp").show()
		$(".tc").hide()
		var widht = $("#main").children("div:first-child").width();
		var height = $("#main").children("div:first-child").height();
		$(".prebackImg").css({
			"width": widht + "px",
			"height": height + "px",
		})
		$(".wave").css({
			"width": widht + "px",
			"height": widht + "px",
			"margin-top": -widht / 2 + "px"
		})
		centerWidth()
	} else if(typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
		var wscript = new ActiveXObject("WScript.Shell");
		if(wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}

}
//ajax 获取 风险跨越文字内容
function Riskleaps() {
	$.ajax({
		type: "get",
		url: urlSrc + "/baas/BZB03/pcCharts/getAllRiskChartV1",
		data: {
			"md5Str": token
		},
		async: true,
		cache:false,
		dataType: "json",
		success: function(data) {
			var res = data.rows[0]
			//console.log("风险跨越",data)
			$(".bzfxd").html(res.风险点.value);
			$(".bzsjfx").html(res.四级.value);
			$(".bzThreeFx").html(res.三级.value);
			$(".bzfxky").html(res.风险点.value);
			$(".bzwwc").html(res.未完成.value);
			$(".bzywc").html(res.已完成.value);
			/*$(".bzfxd").html(2);
			$(".bzsjfx").html(0);
			$(".bzThreeFx").html(2);
			$(".bzfxky").html(0);
			$(".bzwwc").html(2);
			$(".bzywc").html(0);*/
			// 风险跨越 饼状图
			var myChart = echarts.init(document.getElementById('main'));

			// 指定图表的配置项和数据
			option = {
				tooltip: {
					trigger: 'item',
					formatter: "{b} : {c} ({d}%)"
				},
				series: [{

					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [
						//					{
						//							value: res.作业点.value,
						//							name: '风险跨越',
						//							itemStyle: {
						//
						//								color: '#3ecbfe'
						//
						//							}
						//
						//						},
						{
							/*value: res.已完成.value,*/
							value: 0,
							name: '已完成',
							itemStyle: {

								color: '#0eca80'

							}
						},
						{
							/*value: res.未完成.value,*/
							value: 5,
							name: '未完成',
							itemStyle: {

								color: '#e7423e'

							}
						}

					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);

		}
	});
}

// 折线图 右边第一个
function security() {
	var dateArry = []; //时间
	var passNumArry = []; //通过
	var warnNumArry = []; //警告
	var rectifyNumArry = []; //  未整改
	var rectifyPassArry = []; // 已整改
	$.ajax({
		type: "get",
		url: urlSrc + "/baas/BZB03/pcCharts/getAllQualityChartV1",
		data: {
			"insType": "安全检查",
			"md5Str": token
		},
		async: true,
		cache:false,
		dataType: "json",
		success: function(data) {
			//console.log("第一",data)
			var dateNum = data.jsonTime.rows
			var totalDATA = data.jsonAll.rows[0]
			$(".aqjc").html(totalDATA.allNum.value);
			$(".aqtg").html(totalDATA.passNum.value);
			$(".aqyzg").html(totalDATA.rectifyPass.value);
			$(".aqwzg").html(totalDATA.rectifyNum.value);
			$(".aqjg").html(totalDATA.warnNum.value);
			for(let i in dateNum) {
				dateArry.push(dateNum[i].ins_time.value)
				passNumArry.push(dateNum[i].passNum.value)
				warnNumArry.push(dateNum[i].warnNum.value)
				rectifyNumArry.push(dateNum[i].rectifyNum.value)
				rectifyPassArry.push(dateNum[i].rectifyPass.value)
			}
			//安全canvas图
			var passNum = [];      //通过 
			var ins_time = [];     //时间
			var rectifyNum = [];   // 未整改
			var rectifyPass = [];  //已整改
			var warnNum = [];      //警告 
			for(let i in data.jsonTime.rows){
				 passNum.push(data.jsonTime.rows[i].passNum);
				 ins_time.push(data.jsonTime.rows[i].ins_time);
				 rectifyNum.push(data.jsonTime.rows[i].rectifyNum);
				 rectifyPass.push(data.jsonTime.rows[i]. rectifyPass);
				 warnNum.push(data.jsonTime.rows[i]. warnNum);
			}
			var lineRightOne = echarts.init(document.getElementById('lineRightOne'));

			option = {
				color: ['#4194fc','#0eca80','#c43333', '#ffff43'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '12%',
					containLabel: true
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					name: '日期',
					axisTick: {
						show: true
					},
					axisLabel: {
						show: false,

						textStyle: {
							color: "#29bee0"
						}
					},
					splitLine: {
						show: false
					}, //去除网格线
					axisLine: {
						lineStyle: {
							color: '#29bee0',

						},
					},
					data: ins_time
				}],
				yAxis: [{
					name: '(次数)',
					type: 'value',
					splitLine: {
						show: false
					}, //去除网格线
					axisLabel: {
						show: true,
						rotate: 30,
						textStyle: {
							color: "#29bee0"
						}
					},
					axisLine: {
						lineStyle: {
							color: '#29bee0',

						},
					},
				}],
				series: [{
						name: '通过',
						type: 'bar',
						barGap: 0,
						label: '通过',
						data: passNum
					},
					{
						name: '已整改',
						type: 'bar',
						label: '已整改',
						data: rectifyPass
					},
					{
						name: '未整改',
						type: 'bar',
						label: '未整改',
						data:  rectifyNum
					},
					{
						name: '警告',
						type: 'bar',
						label: '警告',
						data: warnNum
					}
				]
			};
			lineRightOne.setOption(option);
		}
	})

}
//质量管理
function quality() {
	var dateArry = []; //时间
	var passNumArry = []; //通过
	var warnNumArry = []; //警告
	var rectifyNumArry = []; //  未整改
	var rectifyPassArry = []; // 已整改
	$.ajax({
		type: "get",
		url: urlSrc + "/baas/BZB03/pcCharts/getAllQualityChartV1",
		data: {
			"insType": "质量检查",
			"md5Str": token
		},
		async: true,
		cache:false,
		dataType: "json",
		success: function(data) {
			//console.log("第二",data)
			var dateNum = data.jsonTime.rows
			var totalDATA = data.jsonAll.rows[0]
			$(".zljc").html(totalDATA.allNum.value);
			$(".zltg").html(totalDATA.passNum.value);
			$(".zlyzg").html(totalDATA.rectifyPass.value);
			$(".zlwzg").html(totalDATA.rectifyNum.value);
			$(".zljg").html(totalDATA.warnNum.value);
			for(let i in dateNum) {
				dateArry.push(dateNum[i].ins_time.value)
				passNumArry.push(dateNum[i].passNum.value)
				warnNumArry.push(dateNum[i].warnNum.value)
				rectifyNumArry.push(dateNum[i].rectifyNum.value)
				rectifyPassArry.push(dateNum[i].rectifyPass.value)
			}
			var lineRightTwo = echarts.init(document.getElementById('lineRightTwo'));
			var passNum = [];      //通过 
			var ins_time = [];     //时间
			var rectifyNum = [];   // 未整改
			var rectifyPass = [];  //已整改
			var warnNum = [];      //警告 
            for(let i in data.jsonTime.rows){
				 passNum.push(data.jsonTime.rows[i].passNum);
				 ins_time.push(data.jsonTime.rows[i].ins_time);
				 rectifyNum.push(data.jsonTime.rows[i].rectifyNum);
				 rectifyPass.push(data.jsonTime.rows[i]. rectifyPass);
				 warnNum.push(data.jsonTime.rows[i]. warnNum);
			}
			option = {
				color: ['#4194fc','#0eca80','#c43333', '#ffff43'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '12%',
					containLabel: true
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					name: '日期',
					axisTick: {
						show: true
					},
					axisLabel: {
						show: false,

						textStyle: {
							color: "#29bee0"
						}
					},
					splitLine: {
						show: false
					}, //去除网格线
					axisLine: {
						lineStyle: {
							color: '#29bee0',

						},
					},
					data: ins_time
				}],
				yAxis: [{
					name: '(次数)',
					type: 'value',
					splitLine: {
						show: false
					}, //去除网格线
					axisLabel: {
						show: true,
						rotate: 30,
						textStyle: {
							color: "#29bee0"
						}
					},
					axisLine: {
						lineStyle: {
							color: '#29bee0',

						},
					},
				}],
				series: [{
						name: '通过',
						type: 'bar',
						barGap: 0,
						label: '通过',
						data: passNum
					},
					{
						name: '已整改',
						type: 'bar',
						label: '已整改',
						data: rectifyPass
					},
					{
						name: '未整改',
						type: 'bar',
						label: '未整改',
						data:  rectifyNum
					},
					{
						name: '警告',
						type: 'bar',
						label: '警告',
						data: warnNum
					}
				]
			};
			lineRightTwo.setOption(option);
		}
	})

}

//公司概览部分
$(function() {
	var total = 100; //公司总人数
	var zybzName = 5; //作业班组
	var core = 21; //班组骨干
	var construction = 50; //核心分包

	var coreRatio = Math.round((core / total) * 10); //算出核心成员得比例
	var constructionRatio = Math.round((construction / total) * 10); //算出核心成员得比例
	var zybz = Math.round((zybzName / total) * 10); //算出核心成员得比例
	//作业班组
	if(zybz > 1) {
		for(var i = 0; i < zybz; i++) {
			$('.zyba').find("i").eq(i).css("color", "#f1ba0a")
		}
	} else {
		$('.zyba').find("i").eq(0).css("color", "#f1ba0a")
	}
	//核心成员
	if(coreRatio > 1) {
		for(var i = 0; i < coreRatio; i++) {
			$('.hxNUm').find("i").eq(i).css("color", "#f1ba0a")
		}
	} else {
		$('.hxNUm').find("i").eq(0).css("color", "#f1ba0a")
	}

	//施工人员
	if(constructionRatio > 1) {
		for(var i = 0; i < constructionRatio; i++) {
			$('.sgnUM').find("i").eq(i).css("color", "#f1ba0a")
		}
	} else {
		$('.sgnUM').find("i").eq(0).css("color", "#f1ba0a")
	}
})
//地图

function getEcharts(progressArry, coordinateArry, mapName) {
	// Step:3 conifg ECharts's path, link to echarts.js from current page.
	// Step:3 为模块加载器配置echarts的路径，从当前页面链接到echarts.js，定义所需图表路径
	require.config({
		paths: {
			echarts: './js'
		}
	});

	// Step:4 require echarts and use it in the callback.
	// Step:4 动态加载echarts然后在回调函数中开始使用，注意保持按需加载结构定义图表路径
	require(
		[
			'echarts',
			'echarts/chart/map'
		],
		function(ec) {
			// --- 地图 ---
			var myChart2 = ec.init(document.getElementById('mainMap'));

			myChart2.setOption({
				dataRange: {
					min: 0,
					max: 100,
					calculable: true,
					color: ['aqua', 'lime', 'yellow', "orange", "#ff3333"],
					textStyle: {
						color: '#fff'
					}
				},
				series: [{
						name: '全国',
						type: 'map',
						roam: true,
						hoverable: false,
						mapType: 'china',
						tooltip: {
							trigger: 'item',
							formatter: function(params) {
								return params.name + ' : ' + params.value[2];
							}
						},
						itemStyle: {
							normal: {
								borderColor: '#59a3ea',
								borderWidth: 0.5,
								areaStyle: {
									color: '#2756a6'
								}
							}
						},
						data: [],
						markLine: {
							smooth: true,
							symbol: ['none', 'circle'],
							symbolSize: 1,
							itemStyle: {
								normal: {
									color: '#fff',
									borderWidth: 1,
									borderColor: '#2756a6'
								}
							},
							data: [],
						},
						geoCoord: coordinateArry,
						markPoint: {
							symbol: 'emptyCircle',
							symbolSize: function(v) {
								return 8 + v / 100;

							},
							effect: {
								show: true,
								shadowBlur: 0
							},
							itemStyle: {
								normal: {
									label: {
										show: false
									}
								},
								emphasis: {
									label: {
										position: 'top'
									}
								}
							},
							data: progressArry
						}
					},
					{
						name: '北京 Top10',
						type: 'map',
						mapType: 'china',
						data: [],

						markPoint: {
							symbol: 'emptyCircle',
							symbolSize: function(v) {
								return 0.1
							},
							effect: {
								show: false,
								shadowBlur: 0
							},

							itemStyle: {
								normal: {
									label: {
										show: true,
										position: 'top',
										textStyle: {
											fontSize: 12
										},
										formatter: function(params) {
											return params.name + ':' + params.value + '%';
										}
									}
								},
								emphasis: {
									label: {
										show: false
									}
								}
							},
							data: progressArry
						}
					}
				]
			});
			//			myChart2.on('click', function(params) {
			//				
			//				var name= params.name
			//				var r = mapName.filter(function (s) {
			//				    return s ==name ; // 注意：IE9以下的版本没有trim()方法
			//				});
			//		        if(r.length != 0){
			//				$.ajax({
			//					type: 'POST',
			//					url: 'http://120.27.15.16:8080/StandardApiAction_login.action?account=admin&password=admin',
			//					data: "",
			//					cache: false,
			//					dataType: 'jsonp',
			//					success:function(data) {
			//						$(".videoBox").show();
			//						if(data.result == 0) {
			//							$("#iframeVideo").attr("src", "http://120.27.15.16:8080/808gps/open/hls/index.html?lang=zh&devIdno=1234567&jsession="+data.jsession);
			//						} else {
			//							alert('加载视频失败！');
			//						}
			//					},
			//				});
			//				}
			//
			//			});
		});

}
//环形图
function charts1(dataOne, dataTWO, dataThree) {
	/*******************************第一个环形图******************************************************/
	var dataOne = dataOne;
	var Chart4 = echarts.init(document.getElementById('chart1'));
	option = {
		title: {
			show: true,
			text: dataOne + '%',
			x: 'center',
			y: 'center',
			textStyle: {
				fontSize: '15',
				color: '#f3af02',
				fontWeight: 'normal'
			}
		},
		tooltip: {
			trigger: 'item',
			formatter: "{d}%",
			show: false
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			show: false
		},
		series: {
			name: '',
			type: 'pie',
			radius: ['75%', '85%'],
			avoidLabelOverlap: true,
			hoverAnimation: false,
			label: {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: false
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data: [{
					value: dataOne,
					itemStyle: {

						color: '#f3af02'

					},
				},
				{
					value: 100 - dataOne,

					itemStyle: {

						color: '#4a4a4a'

					},
				}
			]
		}

	};
	Chart4.setOption(option);

	/*******************************第二个环形图******************************************************/
	var dataTWO = dataTWO;
	var Chart2 = echarts.init(document.getElementById('chart2'));
	option = {
		title: {
			show: true,
			text: dataTWO + '%',
			x: 'center',
			y: 'center',
			textStyle: {
				fontSize: '15',
				color: '#0eca80',
				fontWeight: 'normal'
			}
		},
		tooltip: {
			trigger: 'item',
			formatter: "{d}%",
			show: false
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			show: false
		},
		series: {
			name: '',
			type: 'pie',
			radius: ['75%', '85%'],
			avoidLabelOverlap: true,
			hoverAnimation: false,
			label: {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: false
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data: [{
					value: dataTWO,
					itemStyle: {

						color: '#0eca80'

					},
				},
				{
					value: 100 - dataTWO,
					itemStyle: {

						color: '#4a4a4a'

					},
				}
			]
		}

	};
	Chart2.setOption(option);

	/*******************************第三个个环形图******************************************************/
	var dataThree = dataThree;
	var Chart3 = echarts.init(document.getElementById('chart3'));
	option = {
		title: {
			show: true,
			text: dataThree + '%',
			x: 'center',
			y: 'center',
			textStyle: {
				fontSize: '15',
				color: '#e7423e',
				fontWeight: 'normal'
			}
		},
		tooltip: {
			trigger: 'item',
			formatter: "{d}%",
			show: false
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			show: false
		},
		series: {
			name: '',
			type: 'pie',
			radius: ['75%', '85%'],
			avoidLabelOverlap: true,
			hoverAnimation: false,
			label: {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: false
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data: [{
					value: dataThree,
					itemStyle: {

						color: '#e7423e'

					},
				},
				{
					value: 100 - dataThree,
					itemStyle: {

						color: '#4a4a4a'

					},
				}
			]
		}

	};
	Chart3.setOption(option);
}
//施工风采
function ConstructionS() {
	var mySwiper = new Swiper('.swiper-container', {
		autoplay: 5000, //可选选项，自动滑动
		loop: true,
		observer: true, //修改swiper自己或子元素时，自动初始化swiper  
		observeParents: true, //修改swiper的父元素时，自动初始化swiper  

	})

}
//工程预览
function Engineering(DATAmd5) {
	$.ajax({
		type: "get",
		url: urlSrc +"/baas/BZB03/pcCharts/getProjectInfoByID",
		data: {
			projectId: DATAmd5
		},
		async: true,
		cache:false,
		dataType: "json",
		success: function(data) {
			$(".gcMsgHear").html('<span class="animated fadeInUp" style="display:block;">' + data.rows[0].fProjectQuanName.value + '</span>');
			$(".gcMsgWorld1").html(data.rows[0].fProjectMessage.value);
			clearInterval(clearGCY);
			gcylLb() //文字轮播效果 
		}
	});

}
// 今日风险

function Todaysrisk(DATAmd5) {
	$.ajax({
		type: "get",
		url: urlSrc + "/baas/BZB03/pcCharts/getRiskByIdChartV1",
		data: {
			projectId: DATAmd5
		},
		async: true,
		cache:false,
		dataType: "json",
		success: function(data) {
			//console.log(data)
			$(".fxd").html(data.rows[0].风险点.value);
			$(".sjfx").html(data.rows[0].三级.value);
			$(".fjfx").html(data.rows[0].四级.value);
			$(".fxkyspan").html(data.rows[0].风险点.value);
			/*if(DATAmd5 == '17cdc34a-b5b6-4cd2-bbca-d76f4a15753c'){
				$(".fxd").html(0);
				$(".sjfx").html(0);
				$(".fjfx").html(0);
				$(".fxkyspan").html(0);
			}else if(DATAmd5 == '1e3287cd-cd35-4122-b2c4-1983c08e78ea' ){
				$(".fxd").html(2);
				$(".sjfx").html(2);
				$(".fjfx").html(0);
				$(".fxkyspan").html(0);
			}else{
				$(".fxd").html(0);
				$(".sjfx").html(0);
				$(".fjfx").html(0);
				$(".fxkyspan").html(0);
			}*/

		}
	});
}

function Workrecord(DATAmd5) {
	$.ajax({
		type: "get",
		url: urlSrc + "/baas/BZB03/pcCharts/getJobLogingChartV1",
		data: {
			projectId: DATAmd5
		},
		async: true,
		cache:false,
		dataType: "json",
		success: function(data) {
			/*if(DATAmd5 == '17cdc34a-b5b6-4cd2-bbca-d76f4a15753c'){
				var str = '<tr>' +
				'<td>今日作业点(个)</td>' +
				'<td class="colorFFF">2</td>' +
				'</tr>' +
				'<tr>' +
				'<td>作业班组(个)</td>' +
				'<td class="colorFFF">2</td>' +
				'</tr>' +
				'<tr>' +
				'<td>作业人员(人)</td>' +
				'<td class="colorFFF">36</td>' +
				'</tr>' +
				'<tr>' +
				'<td>班组核心人员(人)</td>' +
				'<td class="colorFFF">16</td>' +
				'</tr>'

			$(".tabOne").html(str);

			var str1 = '<tr>' +
				'<td class="colorye">站班(次)</td>' +
				'<td class="colorFFF">2</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="colorye">交底(次)</td>' +
				'<td class="colorFFF">0</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="colorye">跨越(次)</td>' +
				'<td class="colorFFF">0</td>' +
				'</tr>'
			$(".tabTWO").html(str1);
			}else if(DATAmd5 == '1e3287cd-cd35-4122-b2c4-1983c08e78ea' ){
				var str = '<tr>' +
				'<td>今日作业点(个)</td>' +
				'<td class="colorFFF">2</td>' +
				'</tr>' +
				'<tr>' +
				'<td>作业班组(个)</td>' +
				'<td class="colorFFF">2</td>' +
				'</tr>' +
				'<tr>' +
				'<td>作业人员(人)</td>' +
				'<td class="colorFFF">71</td>' +
				'</tr>' +
				'<tr>' +
				'<td>班组核心人员(人)</td>' +
				'<td class="colorFFF">34</td>' +
				'</tr>'

			$(".tabOne").html(str);

			var str1 = '<tr>' +
				'<td class="colorye">站班(次)</td>' +
				'<td class="colorFFF">2</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="colorye">交底(次)</td>' +
				'<td class="colorFFF">0</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="colorye">跨越(次)</td>' +
				'<td class="colorFFF">0</td>' +
				'</tr>'
			$(".tabTWO").html(str1);
			}else{
				var str = '<tr>' +
				'<td>今日作业点(个)</td>' +
				'<td class="colorFFF">0</td>' +
				'</tr>' +
				'<tr>' +
				'<td>作业班组(个)</td>' +
				'<td class="colorFFF">0</td>' +
				'</tr>' +
				'<tr>' +
				'<td>作业人员(人)</td>' +
				'<td class="colorFFF">0</td>' +
				'</tr>' +
				'<tr>' +
				'<td>班组核心人员(人)</td>' +
				'<td class="colorFFF">0</td>' +
				'</tr>'

			$(".tabOne").html(str);

			var str1 = '<tr>' +
				'<td class="colorye">站班(次)</td>' +
				'<td class="colorFFF">0</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="colorye">交底(次)</td>' +
				'<td class="colorFFF">0</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="colorye">跨越(次)</td>' +
				'<td class="colorFFF">0</td>' +
				'</tr>'
			$(".tabTWO").html(str1);
			}*/
			//console.log(data)
			var str = '<tr>' +
				'<td>今日作业点(个)</td>' +
				'<td class="colorFFF">' + data.numDay + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td>作业班组(个)</td>' +
				'<td class="colorFFF">' + data.squad + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td>作业人员(人)</td>' +
				'<td class="colorFFF">' + data.userNumDay + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td>班组核心人员(人)</td>' +
				'<td class="colorFFF">' + data.coreUser + '</td>' +
				'</tr>'

			$(".tabOne").html(str);

			var str1 = '<tr>' +
				'<td class="colorye">站班(次)</td>' +
				'<td class="colorFFF">' + data.num + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="colorye">交底(次)</td>' +
				'<td class="colorFFF">' + data.relayNum + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="colorye">跨越(次)</td>' +
				'<td class="colorFFF">' + data.risking + '</td>' +
				'</tr>'
			$(".tabTWO").html(str1);
		}
	});
}
// 履职
function Perform(DATAmd5) {
	$.ajax({
		type: "get",
		url: urlSrc+"/baas/BZB03/pcCharts/getBusinessById",
		data: {
			projectId: DATAmd5
		},
		async: true,
		cache:false,
		dataType: "json",
		success: function(data) {
			$(".ygdtUl").children('li').remove();
			for(var i in data.rows) {
				var nameresult = data.rows.filter(function(item, index, array) { //返回数组，filter函数获取满足条件的项
					return(index != null);
				});
				var time = data.rows[i].fCreateTime.value.split("T")
				var fBusinessType = data.rows[i].fBusinessType.value
				var fSubmitter = data.rows[i].fSubmitter.value
				var timeOne = time[0]
				var fContent = data.rows[i].fContent.value
				var fAddress = data.rows[i].fAddress.value
				if(data.rows[i].fAddress.value == "null") {
					fAddress = " "
				}
				if(data.rows[i].fBusinessType.value == "null") {
					fBusinessType = ""
				}
				if(data.rows[i].fSubmitter.value == "null") {
					fSubmitter = ""
				}
				if(time[0] == "null") {
					timeOne = ""
				}
				if(data.rows[i].fContent.value == "null") {
					fContent = ""
				}
				var str = '<li>' +
					'<div class="ygdtHer">' +
					'<div class="ygdtHerLeft" style="color: #ffbc27;">【' + fBusinessType + '】</div>' +
					'<div class="ygdtHerCenter" style="color: #ffbc27;">' + fSubmitter + '</div>' +
					'<div class="ygdtHerRight" style="color: #ffbc27;">' + timeOne + '</div>' +
					'</div>' +
					'<div class="ygdtMsg" style="color:#37b6e4;">&nbsp;桩号：' + fContent + '</div>' +
					'<div style= "color:#fff">&nbsp;' + fAddress + '</div>' +
					'</li>'
				$(".ygdtUl").append(str);
			}
			clearInterval(clearPer);
			PerformLb()
		}
	});
}

//履职履责 轮播效果
function PerformLb() {
	var index = 0;
	var height = $(".ygdtUl").height();
	var boxygdtBox = $(".ygdtBox").height();
	clearPer = setInterval(function() {
		$(".ygdtUl").css("top", -index + 'px')
		if(index <= height - boxygdtBox) {
			index++;
		} else {
			index = 0;
		}

	}, 100)
}
// 工程预览的轮播效果
function gcylLb() {
	var index = 0;

	var height = $(".gcMsgWorld1").height();
	var heightOne = $(".gcMsgWorld").height() - 10;
	if(height > heightOne) {
		clearGCY = setInterval(function() {
			$(".gcMsgWorld1").css("top", -index + 'px')
			if(index <= height - heightOne) {
				index++;
			} else {
				index = 0;
			}

		}, 500)
	} else {}
}
//施工风采
function Construction(DATAmd5) {
	$.ajax({
		type: "get",
		url: urlSrc+"/baas/BZB03/pcCharts/getDoingImgById",
		data: {
			projectId: DATAmd5
		},
		async: true,
		cache:false,
		dataType: "json",
		success: function(data) {
			$(".swiper-wrapper").children('div').remove();
			for(var i in data.imgURLArr) {
				var str = '<div class="swiper-slide">' +
					'<div class="sgfcImg">' +
					'<img src="' + data.imgURLArr[i] + '" />' +
					'</div>' +
					'<div class="sgfcMsg"></div>' +
					'</div>'
				$(".swiper-wrapper").append(str);
			}
			ConstructionS()
		}
	});
}

//地图

function map(token) {
	//console.log("地图",token)
	var coordinateArry = {} //地理坐标
	$.ajax({
		type: "get",
		url: urlSrc+"/baas/BZB03/pcCharts/getProjectMap",
		data: {
			md5Str: token
		},
		async: true,
		cache:false,
		dataType: "json",
		success: function(data) {
            
			coordinateArry.length = 0
			for(let i in data[0]) {
				var name = data[0][i].fPrjoectName
				var zbArry = [data[0][i].fLongitude * 1, data[0][i].fLatitude]
				coordinateArry[name] = zbArry;

			}

			/*var name = '张北换流站';
			var zbArry = [116.092894,41.660773]
			coordinateArry[name] = zbArry;
			coordinateArry.push()
			mapName.push(name);
			progressArry.push({
				name: name,
				value: 78.5
			})*/
			
			getEcharts(progressArry, coordinateArry, mapName); //地图
		}
	});
}

//时间
function Time() {
	setInterval(function() {
		var time = new Date();
		var year = time.getFullYear(); //获取完整的年份(4位,1970-????)
		var Month = time.getMonth() + 1; //获取当前月份(0-11,0代表1月)
		var day = time.getDate()
		var timeStr = year + '-' + Month + '-' + day
		var newTime = time.toLocaleString()
		$("#date").text(newTime);
	}, 1000)

}