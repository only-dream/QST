$(document).ready(function() {
	var tableObj = new Vue({
		el: "#table",
		data: {
			value2: "1",
			nav: [],
			token: [],
			authorArry: [],
			organfindArry: "",
			readFalge:false,
		},
		defaultProps: {
			children: 'children',
			label: 'label'
		},
		methods: {
			//获取左侧列表
			leftNav() {
				var _this = this
				$.axse("get", "/baas/PC/function/SelectRoleTier", {
						md5Str: this.token.sMd5Str
					},
					function(res) {
						_this.nav = res.list;
						let sID = res.list[0].children[0].id;
						let sName = res.list[0].children[0].label;
						_this.organfindArry = sName;
						_this.jsAuthor(sID);

					},
					function(res) {
						if (res) {
							_this.$notify({
								title: '失败',
								message: "系统错误~",
								type: 'error'
							});
							
						}
					});
			},
			//获取点击获取角色权限
			jsAuthor(key) {
				var _this = this
				$.axse("get", "/baas/PC/function/SelectFunctionTier", {
						sID: key,
						sMainOrgID: this.token.sMainOrgID
					},
					function(res) {
						
						_this.authorArry = res.list;
						var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
						if(onlyRead=="zd"){
							_this.readFalge=true;
						}
					},
					function(res) {
						if (res) {
							_this.$notify({
								title: '失败',
								message: "系统错误~",
								type: 'error'
							});
							
						}
					});
			},
			//左侧列表点击事件
			handleSelectNav(key, keyPath) {
				this.jsAuthor(key)
				var sName = this.nav[0].children;
				for (let i in sName) {
					if (sName[i].id == key) {
						this.organfindArry = sName[i].label;
					}
				}
			},
			SwitchFUN($event, sID) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				var _this = this
				$.axse("get", "/baas/PC/function/UpdateFunction", {
						sID: sID,
						isShow: $event
					},
					function(res) {
						if (res.success == true) {
							_this.$message({
								message: res.message,
								type: 'success'
							});
						} else {
							_this.$message.error(res.message);
						}

					},
					function(res) {
						if (res) {
							_this.$notify({
								title: '失败',
								message: "系统错误~",
								type: 'error'
							});
							
						}
					});
			},
			//获取token
			GetToken() {
				let tokenStr = localStorage.getItem("qstToken");
				this.token = JSON.parse(tokenStr);
			},
			move(e) {
				let odiv = e.target; //获取目标元素
				var leftMain = document.getElementById("leftMain");
				var rightMain = document.getElementById("rightMain");

				var table = document.getElementById("table");
				var rightMainWidth = rightMain.offsetWidth;
				var tableWidth = table.offsetWidth;
				//算出鼠标相对元素的位置
				let disX = e.clientX - odiv.offsetLeft;
				document.onmousemove = (e) => { //鼠标按下并移动的事件
					//用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
					let left = e.clientX - disX;

					//绑定元素位置到positionX和positionY上面
					this.positionX = top;
					//移动当前元素
					odiv.style.left = left + 'px';
					leftMain.style.width = (left-2) + 'px';
					rightMain.style.width = tableWidth - left - 20 + 'px'
				};
				document.onmouseup = (e) => {
					document.onmousemove = null;
					document.onmouseup = null;
				};
			},
			
		},
		mounted: function() {
			this.GetToken();
			this.leftNav();
			


		},
	})


})
