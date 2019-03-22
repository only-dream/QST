$(document).ready(function() {
	var tableObj = new Vue({
		el: "#table",
		data: {
			nav: [],
			token: "",
			tableData: [],
			seek: "",
			radio: "岗位",
			source:[], //岗位
			key: "", //存放项目id
			ProjectName: "", //存放选中项目名称
			setPositionArry: "",
			postArry: [], //存放岗位的数组
			teamArry: [], //存放班组的数组 
			getTeamStr: "", //选择的班组
			getPostStr: "", //选择的岗位
			Unpersonnel: [], //未分配人员
			getBzStr: [], //选择的班组长
			getSgryStr: [], //选择的施工人员
			getBzStrArry: "", //选择的班组长的拼接字符串
			getSgryStrArry: "", //选择的施工人员的拼接字符串
			setAddPositionArry: [], //选择岗位人员
			setAddPositionStr: "", //选择岗位人员的拼接字符串
		},
		defaultProps: {
			children: 'children',
			label: 'label'
		},
		methods: {

			//关闭班组
			fromOff() {
				$(".xgMSG").css("display", "none");
				this.getTeamStr = "";
				this.getBzStr = [];
				this.getSgryStr = [];
			},
			//打开班组
			addBz() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				if (this.key == "") {
					this.$message({
						message: '请选择项目~~',
						type: 'warning'
					});
				} else {
					$(".xgMSG").css("display", "block");
					this.UnpersonnelFun();
				}
			},
			//关闭岗位
			fromOffNew() {
				$(".addMSG").css("display", "none");
				this.getPostStr = "";
				this.setAddPositionArry = [];

			},
			//打开岗位
			addGw() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				if (this.key == "") {
					this.$message({
						message: '请选择项目~~',
						type: 'warning'
					});
				} else {
					$(".addMSG").css("display", "block")
					this.UnpersonnelFun();
				}
			},
			roleShow() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				//找角色列表
				if (this.key == "") {
					this.$message({
						message: '请选择要修改的项目~~',
						type: 'warning'
					});
				} else {
					$(".roleCode").css("display", "block")
				}

			},
			roleOff() {
				$(".roleCode").css("display", "none")
			},
			organShow() {
				$(".organCode").css("display", "block")
			},
			organOff() {
				$(".organCode").css("display", "none")
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

			// 请求左边导航 和表格
			getMainTable: function() {
				var _this = this;
				$.axse("get", "/baas/PC/project/SelectProjectList", {
						UserID: this.token.sID
					},
					function(res) {
						//console.log(res)
						_this.nav = res.list;
						$.axse("get", "/baas/PC/project/SelectUserList", {
								id: res.list[0].children[0].id
							},
							function(res) {
								
								_this.tableData = res.Data;
								for(let i in _this.tableData){
									_this.tableData[i].hidePass = "* * * * * *" ;
								}
								for(let i in _this.tableData){
									_this.tableData[i].hidePass = "* * * * * *" ;
								}
								for (let j in res.Data) {
									orleIds = "";
									for (let i in res.Data[j].roleIds) {
										if (i == 0) {
											orleIds += res.Data[j].roleIds[i].sName;
										} else {
											orleIds += "/" + res.Data[j].roleIds[i].sName;
										}

									}
									_this.tableData[j].orleIdsONE = orleIds;
								}
								for (var i in _this.tableData) {
									var dataTime = _this.getLocalTime(_this.tableData[i].sTrainDate); // 将时间戳转换成标准时间
									_this.tableData[i].sTrainDate = dataTime; //将得到的时间赋给tableDATAS数组

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
			tableDataONE(id) {
				var _this = this
				$.axse("get", "/baas/PC/project/SelectUserList", {
						id: id
					},
					function(res) {
						_this.tableData = res.Data
						for(let i in _this.tableData){
							_this.tableData[i].hidePass = "* * * * * *" ;
						}
						for (let j in res.Data) {
							orleIds = "";
							for (let i in res.Data[j].roleIds) {
								if (i == 0) {
									orleIds += res.Data[j].roleIds[i].sName
								} else {
									orleIds += "/" + res.Data[j].roleIds[i].sName
								}

							}
							_this.tableData[j].orleIdsONE = orleIds
						}
						for (var i in _this.tableData) {

							var dataTime = _this.getLocalTime(_this.tableData[i].sTrainDate); // 将时间戳转换成标准时间
							_this.tableData[i].sTrainDate = dataTime //将得到的时间赋给tableDATAS数组

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
			//点击菜单得时候出发该函数
			handleSelectNav(key, keyPath) {
				this.key = key
				this.tableDataONE(key)
				this.quarters(key) //获取岗位列表
				this.getProjectName(key) //获取选中的项目名称
				this.source.length = 0;
			},
			//获取选中的项目名称
			getProjectName(key) {
				var pro = this.nav
				for (let i in pro) {
					for (let j in pro[i].children) {
						if (pro[i].children[j].id == key) {
							this.ProjectName = pro[i].children[j].label
						}
					}
				}
			},
			//班组提交
			submitForm() {
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
				var getTeamStr = this.getTeamStr; //班组
				var getBzStr = this.getBzStr; //选择班组长人员
				var getSgryStr = this.getSgryStr //选择施工人员
				this.getBzStrArry = "";
				this.getSgryStrArry = "";
				//将班组长id拼成字符串
				for (let i in getBzStr) {
					if (i == 0) {
						this.getBzStrArry = getBzStr[i]
					} else {
						this.getBzStrArry += "," + getBzStr[i]
					}

				}
				for (let i in getSgryStr) {
					if (i == 0) {
						this.getSgryStrArry = getSgryStr[i]
					} else {
						this.getSgryStrArry += "," + getSgryStr[i]
					}

				}
				if (getTeamStr == "") {
					this.$message.error("请选择班组~");
					return false;
				}
				if (getBzStr == "" && getSgryStr == "") {
					this.$message.error("请选择施工班长或施工人员~");
					return false;
				}
				var setRemoval = this.removal();
				if (setRemoval == false) {
					this.$message.error("相同人员不能重复选择~~");
				} else {
					$.axse("get", "/baas/PC/project/AddJobPeople", {
							fID: this.getTeamStr,
							BumchfID1: this.getBzStrArry,
							BumchfID2: this.getSgryStrArry,
							fProjectID: this.key,
							Class: "班组"
						},
						function(res) {
							if (res.success == true) {
								_this.$message({
									type: 'success',
									message: '分配成功~~'
								});
								_this.UnpersonnelFun();
								_this.tableDataONE(_this.key);
								_this.getTeamStr = "";
								_this.getBzStr = [];
								_this.getSgryStr = [];
							} else {
								_this.$message({
									type: 'warning',
									message: '分配失败~~'
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
				
				}

			},
			//遍历查看施工班长和施工人员
			removal() {
				for (let i in this.getBzStr) {
					for (let j in this.getSgryStr) {
						if (this.getBzStr[i] == this.getSgryStr[j]) {
							return false;
						}
					}
				}
			},
			//岗位提交
			addBmitForm() {
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
				var getPostStr = this.getPostStr; //班组
				var setAddPositionArry = this.setAddPositionArry; //选择班组长人员
				this.setAddPositionStr = ""
				if (getPostStr == " ") {
					this.$message.error("请选择班组~");
					return false;
				}
				if (setAddPositionArry == "") {
					this.$message.error("请选择添加人员~");
					return false;
				}
				for (let i in setAddPositionArry) {
					if (i == 0) {
						this.setAddPositionStr = setAddPositionArry[i]
					} else {
						this.setAddPositionStr += "," + setAddPositionArry[i]
					}

				}
				$.axse("get", "/baas/PC/project/AddJobPeople", {
						fID: this.getPostStr,
						BumchfID1: this.setAddPositionStr,
						BumchfID2: "",
						fProjectID: this.key,
						Class: "岗位"
					},
					function(res) {
						if (res.success == true) {
							_this.$message({
								type: 'success',
								message: '分配成功~~'
							});
							_this.UnpersonnelFun();
							_this.tableDataONE(_this.key);
							_this.getPostStr = "";
							_this.setAddPositionArry = [];
						} else {
							_this.$message({
								type: 'warning',
								message: '分配失败~~'
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
				// 				$.ajax({
				// 					url: "http://192.168.1.128:8181/baas/PC/project/AddJobPeople",
				// 					data: {
				// 						fID: this.getPostStr,
				// 						BumchfID1: this.setAddPositionStr,
				// 						BumchfID2: "",
				// 						fProjectID: this.key,
				// 						Class: "岗位"
				// 					},
				// 					type: "get",
				// 					dataType: "json",
				// 					success: function(res) {
				// 						if (res.success == true) {
				// 							_this.$message({
				// 								type: 'success',
				// 								message: '分配成功~~'
				// 							});
				// 							_this.UnpersonnelFun();
				// 							_this.tableDataONE(_this.key);
				// 							_this.getPostStr = "";
				// 							_this.setAddPositionArry = [];
				// 						} else {
				// 							_this.$message({
				// 								type: 'warning',
				// 								message: '分配失败~~'
				// 							});
				// 						}
				// 					}
				// 				});
			},
			//删除
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
				var slft = this
				this.$confirm('此操作将删除此条信息 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var _this = this;
					$.axse("get", "/baas/PC/project/DeleteJobPeople", {
							fID: row.fID
						},
						function(res) {
							if (res.success == true) {
								_this.$message({
									type: 'success',
									message: '删除成功!'
								});
								slft.tableData.splice(index, 1)
								_this.UnpersonnelFun();
							} else {
								_this.$message({
									type: 'warning',
									message: '删除失败!'
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
					// 					$.ajax({
					// 						url: "http://192.168.1.128:8181/baas/PC/project/DeleteJobPeople",
					// 						data: {
					// 							fID: row.fID
					// 						},
					// 						type: "get",
					// 						dataType: "json",
					// 						success: function(res) {
					// 							if (res.success == true) {
					// 								_this.$message({
					// 									type: 'success',
					// 									message: '删除成功!'
					// 								});
					// 								slft.tableData.splice(index, 1)
					// 								_this.UnpersonnelFun();
					// 							} else {
					// 								_this.$message({
					// 									type: 'warning',
					// 									message: '删除失败!'
					// 								});
					// 							}
					// 						}
					// 					});

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
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
			//搜索功能
			seekFU() {

			},
			//获取岗位列表
			quarters(id) {
				var _this = this;
				this.postArry.length = 0;
				this.teamArry.length = 0;
				$.axse("get", "/baas/PC/project/SelectJobList", {
						id: id,
						UserID: this.token.sID,
					},
					function(res) {
						//console.log(res)
						if (res.success == true) {
							_this.source = res.data;
							//console.log("_this.source",_this.source)
							_this.getList()
							for (let i in res.data) {
								if (res.data[i].Class == '岗位') {
									_this.postArry.push(res.data[i])
								} else {
									_this.teamArry.push(res.data[i])
								}
							}
							_this.UnpersonnelFun();
						}else{
							_this.getList()
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
			//获取未分配人员
			UnpersonnelFun() {
				var _this = this;
				$.axse("get", "/baas/PC/project/SelectPerson", {
						sMd5Str: this.token.sMd5Str,
						fProjectID: this.key
					},
					function(res) {
						if (res.success == true) {
							_this.Unpersonnel = res.data
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
			//岗位管理
			getList() {
				var _this = this
				$("#tableone").tabullet({
					data: _this.source,
					action: function(mode, data) {
						if (mode === 'save') {
							console.info("data",data)
							_this.source.push(data);
							if (data.fPostName == "") {
								return _this.$message.error("添加职位不能为空~");
							}
							//console.log(_this.key,_this.radio,data.fPostName)
							$.axse("get", "/baas/PC/project/AddJobList", {
									fID: _this.key,
									Class: _this.radio,
									fPostName: data.fPostName,
								},
								function(res) {
									//console.log("add",res)
									if (res.success == true) {
										_this.quarters(_this.key) //获取岗位列表
										_this.$message({
											message: "创建成功~~",
											type: 'success'
										});
									} else {
										_this.$message.error("创建失败~");
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
						

						}
						if (mode === 'edit') {
							for (var i = 0; i < _this.source.length; i++) {
								if (_this.source[i].fID == data.fID) {
									_this.source[i] = data;
								}
							}
							if (data.fPostName == "") {
								return _this.$message.error("修改职位不能为空~");
							}
							$.axse("get", "/baas/PC/project/UpdateJobList", {
									fID: data.fID,
									fPostName: data.fPostName
								},
								function(res) {
									if (res.success == true) {
										_this.quarters(_this.key) //获取岗位列表
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
							
						}
						if (mode == 'delete') {
							$.axse("get", "/baas/PC/project/DeleteJobList", {
									fID: data
								},
								function(res) {
									if (res.success == true) {
										_this.quarters(_this.key) //获取岗位列表
										_this.$message({
											message: res.message,
											type: 'success'
										});
										for (var i = 0; i < _this.source.length; i++) {
											if (_this.source[i].fID == data) {
												_this.source.splice(i, 1);
												break;
											}
										}
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
							
						}
						_this.getList();
					}
				});
			},

		},
		mounted: function() {
			this.tokenARR();
			this.getMainTable();
			this.quarters();

		},
	})


})
