$(document).ready(function() {
	var tableObj = new Vue({
		el: "#table",
		data: {
			nav: [],
			token: "",
			inputShow: false,
			projectMsg: {
				name: "",
				jcName: "",
				startTime: "",
				endTime: "",
				address: "",
				proMeg: "",
			},
			sectionMsgArry: [], //区段信息
			fStateTime: "", //项目开始时间
			fEndTime: "", //项目结束时间
			projectId: "", //项目id
			jc: [], //基础
			zt: [], //组塔
			jx: [], //架线		
			MsgPostName: "",
			MsgPostNameState: "",
			MsgPostNameEnd: "",
			MsgSpanSum: "",
			sectionRowID: "",
			qdmsShow: false,
			zhfPostName: "",
			zhfCubeSum: "",
			zhfTonnageSum: "",
			zhfSpanSum: "",
			qdfPostName: "",
			qdfPostNameState: "",
			qdfPostNameEnd: "",
			addPileObj: {
				fMsterID: "",
			},

		},
		defaultProps: {
			children: 'children',
			label: 'label'
		},
		methods: {
			// 请求左边导航 和表格
			getMainTable: function() {
				var _this = this
				$.axse("get", "/baas/PC/project/SelectProjectGrid", {
						UserID: this.token.sID
					},
					function(res) {
						console.log(res)
						_this.nav = res.list;
						_this.projectId = res.list[0].children[0].id;
						_this.sectionMsg(_this.projectId);
						_this.projectMsgFUN(_this.projectId);
						_this.procedure(_this.projectId);
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
			//点击菜单得时候出发该函数
			handleSelectNav(key, keyPath) {
				this.projectId = key;
				this.sectionMsg(key);
				this.projectMsgFUN(key);
				this.procedure(key);
			},
			//项目区段信息
			sectionMsg(fProjectID) {
				var _this = this;
				$.axse("get", "/baas/PC/project/SelectZoneList", {
						fProjectID: fProjectID
					},
					function(res) {
						console.log(res)
						_this.sectionMsgArry = res.list;
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
			//区段桩编辑
			PileEditors(event) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				// this.qdmsShow = true;
				var el = event.target;
			
                 var xdjd = this.siblings(el.parentNode.parentNode.parentNode.parentNode);
				 for(let i of xdjd){
					i.lastElementChild.style.display = "block" ;
					i.firstElementChild.style.display = "none" ;
				 }
				 console.log(xdjd)
				 el.style.display = "none";
				 el.parentNode.style.display = "none";
				 el.parentNode.nextElementSibling.firstElementChild.style.display="block";
				 el.parentNode.nextElementSibling.style.display="block";

			},
			//过去所有得兄弟节点
			siblings(elm) {
				var a = [];
				var p = elm.parentNode.children;
				for (var i = 0, pl = p.length; i < pl; i++) {
					if (p[i] !== elm) a.push(p[i]);
				}
				return a;
			},
			//区段桩编辑保存
			PileSave(fID, fMsterID, fProjectCode, fPostName, fCubeSum, fTonnageSum, fSpanSum) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				var _this = this;
				$.axse("get", "/baas/PC/project/updateZhuang", {
						fID: fID,
						fMsterID: fMsterID,
						fProjectCode: fProjectCode,
						fPostName: fPostName,
						fCubeSum: fCubeSum,
						fTonnageSum: fTonnageSum,
						fSpanSum: fSpanSum,
					},
					function(res) {
						_this.qdmsShow = false;
						_this.$message({
							message: '修改信息成功~~',
							type: 'success'
						});
						_this.sectionMsg(_this.projectId);
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
			//项目信息
			projectMsgFUN(fProjectID) {
				var _this = this;
				$.axse("get", "/baas/PC/project/ProjectDetail", {
						fProjectID: fProjectID
					},
					function(res) {
						console.log(res)
						var starTime = _this.getLocalTime(res.fStateTime);
						var endTime = _this.getLocalTime(res.fEndTime);
						_this.fStateTime = starTime, //项目开始时间
							_this.fEndTime = endTime, //项目结束时间
							_this.projectMsg = res;
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
			//项目工序
			procedure(fProjectID) {
				var _this = this;
				$.axse("get", "/baas/PC/project/SelectProcess", {
						fProjectID: fProjectID
					},
					function(res) {
						console.log("dfd", res)
						_this.tableData3 = res.list;
						for(let i in res.list){
							if(res.list[i].lable =="架线"){
								_this.jx = res.list[i].children;
							}
							else if(res.list[i].lable =="组塔"){
								_this.zt = res.list[i].children;
							}
							else if(res.list[i].lable =="基础"){
								_this.jc = res.list[i].children;
							}
							
						}
						console.log(_this.jx)
						console.log(_this.zt)
						console.log(_this.jc)
						
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
			//区段编辑提交
			SectionUP() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				var _this = this;
				if (this.MsgPostName == "") {
					return this.$message({
						message: '桩号名称不能为空~~',
						type: 'error'
					});
				}
				if (this.MsgPostNameState == "") {
					return this.$message({
						message: '开始桩号名称不能为空~~',
						type: 'error'
					});
				}
				if (this.MsgPostNameEnd == "") {
					return this.$message({
						message: '结束桩号名称不能为空~~',
						type: 'error'
					});
				}
				$.axse("get", "/baas/PC/project/updateZone", {
						fID: this.sectionRowID,
						fPostName: this.MsgPostName,
						fPostNameState: this.MsgPostNameState,
						fPostNameEnd: this.MsgPostNameEnd,
					},
					function(res) {
						console.log("SAD", res)
						if (res.success == true) {
							_this.sectionMsg(_this.projectId);
							_this.$message({
								message: '修改区段信息成功~~',
								type: 'success'
							});
						} else {
							_this.$message({
								message: '修改区段信息错误~~',
								type: 'error'
							});
						}
						_this.MsgPostName = "",
							_this.MsgPostNameState = "",
							_this.MsgPostNameEnd = "",
							_this.MsgSpanSum = "",
							_this.fromOffNewEditors();
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
			//区段编辑
			SectionEditors(index, row) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				this.sectionRowID = row.fID;
				this.MsgPostName = row.fPostName;
				this.MsgPostNameState = row.fPostNameState;
				this.MsgPostNameEnd = row.fPostNameEnd;
				this.addMSGEditors();

			},
			//新增桩号
			addPile(index, row) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				this.addPileObj.fMsterID = row.fID;
				this.zhfPostName = "";
				this.zhfCubeSum = "";
			    this.zhfTonnageSum = "";
			    this.zhfSpanSum = "";
				$(".addMzh").show();

			},
			//提交新增桩号
			addPileUP() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				var _this = this;
				if (this.zhfPostName == "") {
					return this.$message({
						message: '桩号名称不能为空~~',
						type: 'error'
					});
				}
				if (this.zhfCubeSum == "") {
					return this.$message({
						message: '方量/M3不能为空~~',
						type: 'error'
					});
				}
				if (this.zhfTonnageSum == "") {
					return this.$message({
						message: '吨位/T不能为空~~',
						type: 'error'
					});
				}
				if (this.zhfSpanSum == "") {
					return this.$message({
						message: '档距/KM不能为空~~',
						type: 'error'
					});
				}
				$.axse("get", "/baas/PC/project/insertZhuang", {
						fMsterID: this.addPileObj.fMsterID,
						fProjectCode: this.projectId,
						fPostName: this.zhfPostName,
						fCubeSum: this.zhfCubeSum,
						fTonnageSum: this.zhfTonnageSum,
						fSpanSum: this.zhfSpanSum,
					},
					function(res) {
						console.log(res)
						_this.$message({
							message: '修改项目信息成功~~',
							type: 'success'
						});
						_this.sectionMsg(_this.projectId);
						$(".addMzh").hide();
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
			//项目信息编辑
			MsgEdit() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				this.inputShow = true;
			},
			//删除桩
			delZH(fID, fMsterID, fProjectCode) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				var _this = this;
				this.$confirm('此操作将永久删除该桩号, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					$.axse("get", "/baas/PC/project/deleteZhuang", {
							fID: fID,
							fMsterID: fMsterID,
							fProjectCode: fProjectCode,
						},
						function(res) {
							_this.$message({
								type: 'success',
								message: '删除成功!'
							});
							_this.sectionMsg(_this.projectId);

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

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			MsgPreservation() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				var _this = this;
				$.axse("get", "/baas/PC/project/updateProjectDetail", {
						fID: this.projectId,
						fPrjoectName: this.projectMsg.fPrjoectName,
						fProjectQuanName: this.projectMsg.fProjectQuanName,
						fProjectAddress: this.projectMsg.fProjectAddress,
						fProjectMessage: this.projectMsg.fProjectMessage,
						fStateTime: this.fStateTime,
						fEndTime: this.fEndTime,
					},
					function(res) {
						$.axse("get", "/baas/PC/project/SelectProjectGrid", {
								UserID: _this.token.sID
							},
							function(data) {
								_this.nav = data.list;
								_this.$message({
									message: '修改项目信息成功~~',
									type: 'success'
								});

							},
							function(data) {
								if (data) {
									_this.$notify({
										title: '失败',
										message: "系统错误~",
										type: 'error'
									});
								}
							});

						_this.inputShow = false;
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
			//新增区段
			addQD() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				$(".addMQd").show();
			},
			//新增区段保存
			addQdUP() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				var _this = this;
				if (this.qdfPostName == "") {
					return this.$message({
						message: '桩号名称不能为空~~',
						type: 'error'
					});
				}
				if (this.qdfPostNameState == "") {
					return this.$message({
						message: '开始桩号不能为空~~',
						type: 'error'
					});
				}
				if (this.qdfPostNameEnd == "") {
					return this.$message({
						message: '结束桩号不能为空~~',
						type: 'error'
					});
				}
//				console.log(this.projectId, this.qdfPostName, this.qdfPostNameState, this.qdfPostNameEnd, )
				$.axse("get", "/baas/PC/project/insertZone", {
						fProjectID: this.projectId,
						fPostName: this.qdfPostName,
						fPostNameState: this.qdfPostNameState,
						fPostNameEnd: this.qdfPostNameEnd,
						fSpanSum: 0,
					},
					function(res) {
						console.log(res)
						if (res.success == true) {
							_this.$message({
								message: '新增成功~~',
								type: 'success'
							});
							_this.sectionMsg(_this.projectId);
						} else {
							_this.$message({
								message: res.message,
								type: 'error'
							});
						}
                        _this.qdfPostName = "";
						_this.qdfPostNameState = "";
						_this.qdfPostNameEnd = "";
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
				$(".addMQd").hide();
			},
			//区段删除
			handleDelete(index, row) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				var _this = this;
				this.$confirm('此操作将永久删除该桩号, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					$.axse("get", "/baas/PC/project/deleteZone", {
							fProjectID: this.projectId,
							fID: row.fID,
						},
						function(res) {
							console.log(res)
							if (res.success = true) {
								_this.$message({
									message: '新增成功~~',
									type: 'success'
								});
								_this.sectionMsg(_this.projectId);
							} else {
								_this.$message({
									message: '新增失败~~',
									type: 'error'
								});
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

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//新增项目
			addProject() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				var _this = this;
				if (this.projectMsg.name == "") {
					return this.$message({
						message: '项目名称不能为空~~',
						type: 'error'
					});
				}
				if (this.projectMsg.jcName == "") {
					return this.$message({
						message: '项目简称不能为空~~',
						type: 'error'
					});
				}
				if (this.projectMsg.startTime == "") {
					return this.$message({
						message: '开始时间不能为空~~',
						type: 'error'
					});
				}
				if (this.projectMsg.endTime == "") {
					return this.$message({
						message: '结束时间不能为空~~',
						type: 'error'
					});
				}
				if (this.projectMsg.address == "") {
					return this.$message({
						message: '地址不能为空~~',
						type: 'error'
					});
				}
				if (this.projectMsg.proMeg == "") {
					return this.$message({
						message: '项目信息不能为空~~',
						type: 'error'
					});
				}
				 
				$.axse("get", "/baas/PC/project/CreateProjectgx", {
						UserID: this.token.sID,
						md5Str: this.token.sMd5Str,
						UserName: this.token.sName,
						fProjectQuanName: this.projectMsg.name,
						fPrjoectName: this.projectMsg.jcName,
						fProjectMessage: this.projectMsg.proMeg,
						fStateTime: this.projectMsg.startTime,
						fEndTime: this.projectMsg.endTime,
						fProjectAddress: this.projectMsg.address,
					},
					function(res) {
						console.log(res)
						if (res.success = true) {
							_this.$message({
								message: '新增成功~~',
								type: 'success'
							});
							_this.getMainTable();
							_this.fromOffNewWJJ();
						} else {
							_this.$message({
								message: '新增失败~~',
								type: 'error'
							});
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
			//删除项目
			delProject() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				var _this = this;
				this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					$.axse("get", "/baas/PC/project/delectProjectgx", {
							fProjectID: this.projectId
						},
						function(res) {
							console.log(res)
							if (res.success = true) {
								_this.$message({
									message: '新增成功~~',
									type: 'success'
								});
								_this.getMainTable();
							} else {
								_this.$message({
									message: '新增失败~~',
									type: 'error'
								});
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

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			addMSGWJJ() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				$(".addMSGWJJ").show();
			},
			fromOffNewWJJ() {
				$(".addMSGWJJ").hide();
			},
			addMSGEditors() {
				$(".addMSGEditors").show();
			},
			fromOffNewEditors() {
				$(".addMSGEditors").hide();
			},
			fromOffNewzh() {
				$(".addMzh").hide();
			},
			fromOffNewQd() {
				$(".addMQd").hide();
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
					rightMain.style.width = tableWidth - left + 'px'
				};
				document.onmouseup = (e) => {
					document.onmousemove = null;
					document.onmouseup = null;
				};
			},
			tokenARR() {
				var token = JSON.parse(localStorage.getItem("qstToken"));
				this.token = token
			},
			//时间戳转换成时间
			getLocalTime: function(time) {
				var date = new Date(time);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d;
			},
		},
		mounted: function() {
			this.tokenARR();
			this.getMainTable();


		},
	})
})
