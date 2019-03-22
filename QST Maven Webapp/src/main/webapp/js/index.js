$(document).ready(function() {
	var PositionArry = ["人员管理"];
	var tableObj = new Vue({
		el: "#tabletow",
		data: {
			editableTabsValue2: '人员管理',
			editableTabs2: [
				{
				  title: '人员管理',
				  name: '人员管理',
				  content: 'rosl.html'
				}
			],
			tabIndex: 0,
			table:"rosl.html,人员管理"
		},
		methods: {
			getToken() {
				var token = localStorage.getItem("qstToken");
				if (token == null) {
					window.location.href = "./login.html"
				} else {
					var bToObj = JSON.parse(token);
					this.sMd5Str = bToObj.sMd5Str;

				}
			},
			SelectNav(key) {
				this.table=key
				var tab =  key.split(",")
				 if(tab[1] != undefined){
					if(PositionArry.indexOf(tab[1])==-1){
						 PositionArry.push(tab[1])
						 this.editableTabs2.push({
							title: tab[1],
							name: tab[1],
							content: tab[0]
						 });
						 this.editableTabsValue2 = tab[1];
					}else{
						this.editableTabsValue2 = tab[1];
					}
				}else{
					window.location.href=tab[0];
				}
			},
			removeTab(targetName) {
				let tabs = this.editableTabs2;
				let activeName = this.editableTabsValue2;
				if (activeName == targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name == targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}
				if(this.editableTabs2.length >1){
        let indexName=PositionArry.indexOf(targetName);
				PositionArry.splice(indexName, 1)
				this.editableTabsValue2 = activeName;
				this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
				}
			},
			positionTab(tab){
				 var index = tab.index
				 var name = this.editableTabs2[index].name;
				 var contentStr = this.editableTabs2[index].content;
				 this.table = contentStr+","+name;
			}
		},
        watch:{
			table(val, oldVal){
				this.table = val
			}
		},
		mounted: function() {
			this.getToken();
		},
	})

	new Vue({
		el: "#topNav",
		data: {
			time: "",
			uresName: ""
		},
		methods: {
			//获取当前时间 （头部得时间）
			getTime() {
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				this.time = currentdate;
			},
			getToken() {
				var token = localStorage.getItem("qstToken");
				if (token == null) {
					window.location.href = "./login.html"
				} else {
					var bToObj = JSON.parse(token);
					this.uresName = bToObj.sName;

				}
			},
			exit() {

				this.$confirm('本操作将要退出系统, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '退出成功!'
					});
					localStorage.removeItem("qstToken");
					window.location.reload()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});

			},
			//宽度适配
			spWidth() {
				var height = window.screen.height;
				if(height<720){
					var width = window.innerWidth  - 111;
					$(".box").css("width", width + "px");
				}else{
					var width = window.innerWidth  - 111;
					$(".box").css("width", width + "px");
				}
				
			}

		},
		mounted: function() {
			this.getToken();
			this.getTime();
			this.spWidth();

		}
	})

})
