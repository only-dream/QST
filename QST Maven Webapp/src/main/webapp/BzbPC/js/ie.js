$(document).ready(function(){
var a=null;
	$(document).mousemove(function(){
		$('.pmButt').show()
		clearTimeout(a)
		a=setTimeout(function(){
			$('.pmButt').hide()
		},5000)
		
		
	})
});
//判断IE浏览器的版本
function IEVersion() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
	var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
	var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
	if(isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if(fIEVersion == 7) {
			window.location.href = "../ie/index.html"
		} else if(fIEVersion == 8) {
			window.location.href = "../ie/index.html"
		} else if(fIEVersion == 9) {
			window.location.href = "../ie/index.html"
		} else if(fIEVersion == 10) {
			window.location.href = "../ie/index.html"
		} else {
			window.location.href = "../ie/index.html"
		}
	} else if(isEdge) {
		return 'edge'; //edge
	} else if(isIE11) {
		return 11; //IE11  
	} else {
		return -1; //不是ie浏览器
	}
}
IEVersion()
//	setInterval(OverviewGX,5000);
console.log('屏幕宽度：' + screen.availWidth);
console.log('屏幕高度：' + screen.availHeight);
if(screen.availWidth < 1920 && screen.availHeight < 1080) {
	alert("您屏幕得分辨率为：" + screen.availWidth + "*" + screen.availHeight + "建议您用1920*1080 屏幕观看")
}

// 鼠标移动事件


 