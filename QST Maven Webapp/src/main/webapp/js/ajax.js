jQuery.axse = function(type, url, data, successfn, errorfn) {
		$.ajax({
			type: type,
			data: data,
//			url: "http://219.143.76.130:8888" + url,
			url: "http://localhost:8080" + url,
			contentType:'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: "json",
			success: function(res) {
				successfn(res);
			},
			error: function(res) {
				errorfn(res);
			}
		});
}

// const ip="http://219.143.76.130:8888";
// const ip="http://219.143.76.130:8888";
// const imgUrl ="http://219.143.76.130:8888/x5/UI2";   //图片路径 /phont 之前得路径
 const ip="http://localhost:8080";
 const imgUrl ="http://localhost:8080/x5/UI2";   //图片路径 /phont 之前得路径
