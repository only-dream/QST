$(document).ready(function() {

	var setPositionArry = "";
	var AddPositionArry = "";
	var delString = "";
	var zzexcel;
	var tableObj = new Vue({
		el: "#table",
		data: {
			tapNav: [{
					name: "人员管理",
					url: "rosl.html"
				},
				{
					name: "签到管理",
					url: "SignIN.html"
				},
				{
					name: "工程罗盘",
					url: "rosl.html"
				},
			],
			nav: [],
			multipleSelection: [],
			tableData: [],
			ruleForm: { //编辑表单
			},
			addForm2: {},
			organization: "", //组织
			addorganization: "", //新增组织
			positionStr: [], //存放职位
			positionArry: [], //存放职位
			setPositionArry: [], //编辑职位存放得数组,
			setAddPositionArry: [], //新增职位存放得数组,
			tableDataTow: [], // 暂时承接tableData得数据
			fID: "",
			excelStr: "",
			valueOneDate: "",
			valueTowDate: "",
			sMd5Str: "",
			source: [], //存放 角色列表
			organArry: [], //存放组织列表
			organfindArry: [], //存放 顶级组织名称,
			organfindId: [], //存放 顶级组织ID,
			orgNameID: '',
			orgName: '',
			addOrgNameID: "",
			addOrgName: "",
			addPass: "123456", ///新增默认密码,
			key: "", //sid
			keyOne: "", //sid
			seek: "", //搜索input
			findID: "", //公司id



		},
		defaultProps: {
			children: 'children',
			label: 'label'
		},
		methods: {
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

			getToken() {
				var token = localStorage.getItem("qstToken");
				if (token == null) {
					window.location.href = "./login.html"
				} else {
					var bToObj = JSON.parse(token);
					this.sMd5Str = bToObj.sMd5Str;

				}
			},
			handleNodeClick(data) {
				var _this = this;
				console.info(data,this.sMd5Str)
				$.axse("get", "/QST/saOppersonController/SelectOpperson", {
						id: data,
						md5Str: this.sMd5Str
					},
					function(res) {

						_this.tableData = res.Data
						for (let i in _this.tableData) {
							_this.tableData[i].hidePass = "* * * * * *";
						}
						console.log(_this.tableData)
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

							_this.tableData[i].organization = data.label;
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
			Todate(num) {

				var d = new Date(num);
				return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
			},
			//新增表单
			addSubmitForm() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				AddPositionArry = ""

				for (let i of this.setAddPositionArry) {
					AddPositionArry += i + ","
				}

				var valueTime = this.Todate(this.valueTowDate);
				var _this = this
				let sName = this.addForm2.sName
				let sLoginName = this.addForm2.sLoginName
				let sex = this.addForm2.sSex
				let sWorkType = this.addForm2.sWorkType
				let organization = this.addorganization
				let sHealthStatus = this.addForm2.sHealthStatus
				let sExamScore = this.addForm2.sExamScore
				let sPassword = this.addPass
				let sMobilePhone = this.addForm2.sMobilePhone
				let sIDCard = this.addForm2.sIDCard
				//判断姓名
				if (sName == undefined) {
					return this.$message.error('姓名不能为空');
				} else {
					let prs = "[\u4e00-\u9fa5]"
					var r = sName.match(prs);
					if (r == null) {
						return this.$message.error('请输入中文姓名');
					}
				}
				//判断性别
				if (sex == undefined) {
					return this.$message.error('性别不能为空');
				} else {
					// 					if(sex != "男" || sex != "女" ){
					// 						return this.$message.error('请填写正确得性别')
					// 					}
				}
				//判断部门
				if (this.addorganization == undefined || this.addorganization == "") {
					return this.$message.error('请选择部门');
				}
				//判断职位
				if (AddPositionArry == "") {
					return this.$message.error('请选择职位');
				}
				//判断用户名
				if (sLoginName == undefined || sLoginName == "") {
					return this.$message.error('用户名不能为空');
				}
				//判断密码
				if (sPassword == undefined) {
					return this.$message.error('密码不能为空');
				}
				var backr = this.addorganization == this.addOrgName ? this.addOrgNameID : this.addorganization;
				for(let i in this.organArry){
					if(this.organArry[i].label == "系统管理员"){
						var orgId=this.organArry[i].id;
					}
				}
				if(backr == orgId){
					return this.$message.error('不能在系统管理员部门中添加人员~~');
				}
				$.axse("get", "/baas/PC/person/InsertOpperson", {   
						fID: "", //UUID主键
						realName: sName, //填写的姓名
						account: sLoginName, //登录电话号
						sex: this.addForm2.sSex, //性别
						password: this.addPass, //密码
						md5Str: this.sMd5Str, //组织的md5串
						orgId: this.addorganization == this.addOrgName ? this.addOrgNameID : this.addorganization, //组织ID
						idCard: this.addForm2.sIDCard, //身份证号码
						nativePlace: "", //籍贯
						roleIds: AddPositionArry, //角色id串
					},
					function(res) {
						if (res.success == true) {
							_this.fromOffNew()
							_this.handleNodeClick(_this.key)
							_this.$notify({
								title: '成功',
								message: res.message,
								type: 'success'
							});
							_this.addForm2.sName = "";
							_this.addorganization = "";
							_this.setAddPositionArry = [];
							_this.addForm2.sLoginName = "";
						} else {
							_this.$notify.error({
								title: '错误',
								message: res.message
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
			//提交编辑表单
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
				var _this = this;
				var pojstName = "";
				setPositionArry = "";
				var token = localStorage.getItem("qstToken");
				var objID = JSON.parse(token)
				var readonly = objID.readonly;
				for (let i of this.setPositionArry) {
					setPositionArry += i + ","
				}
				if (this.valueOneDate != "") {
					var Stime = this.valueOneDate;
				} else {
					var Stime = this.ruleForm.sTrainDate;
				}
				let sName = this.ruleForm.sName
				let sLoginName = this.ruleForm.sLoginName
				let sex = this.ruleForm.sSex
				let sWorkType = this.ruleForm.sWorkType
				let organization = this.ruleForm.organization
				let sHealthStatus = this.ruleForm.sHealthStatus
				let sExamScore = this.ruleForm.sExamScore
				let sPassword = this.ruleForm.sPassword
				let sMobilePhone = this.ruleForm.sMobilePhone
				let sIDCard = this.ruleForm.sIDCard
				// let setPositionArry = this.setPositionArry
				//判断姓名
				if (sName == undefined) {
					return this.$message.error('姓名不能为空');
				} else {
					let prs = "[\u4e00-\u9fa5]"
					var r = sName.match(prs);
					if (r == null) {
						return this.$message.error('请输入中文姓名');
					}
				}
				//判断性别
				if (sex == undefined) {
					return this.$message.error('性别不能为空');
				} else {
					// 					if(sex != "男" || sex != "女" ){
					// 						return this.$message.error('请填写正确得性别')
					// 					}
				}
				//判断部门
				if (this.organization == undefined || this.organization == "") {

					return this.$message.error('请选择部门');
				}
				//判断职位
				if (setPositionArry == "") {
					return this.$message.error('请选择职位');
				}
				//判断用户名
				if (sLoginName == undefined) {
					return this.$message.error('用户名不能为空');
				}
				//判断密码
				if (sPassword == undefined) {
					return this.$message.error('密码不能为空');
				}
				$.axse("get", "/baas/PC/person/UpdataOpperson", {   
						fID: this.ruleForm.sID, //UUID主键
						realName: this.ruleForm.sName, //填写的姓名
						account: sLoginName, //登录电话号
						sex: this.ruleForm.sSex, //性别
						phone: this.ruleForm.sMobilePhone, //移动电话 
						password: this.ruleForm.sPassword, //密码
						md5Str: this.sMd5Str, //组织的md5串
						orgId: this.organization == this.orgName ? this.orgNameID : this.organization, //this.orgName==null?this.orgNameID:this.orgName, //组织ID
						idCard: this.ruleForm.sIDCard, //身份证号码
						nativePlace: "", //籍贯
						// workType: this.ruleForm.sWorkType, //工种
						// healthStatus: this.ruleForm.sHealthStatus, //体检状态
						// trainTime: Stime, //培训时间
						// examScore: this.ruleForm.sExamScore, //考试成绩	
						roleIds: setPositionArry, //角色id串
						readonly:readonly == undefined ? "" : readonly
					},
					function(res) {
						if (res.success == true) {
							_this.fromOff()
							_this.$notify({
								title: '成功',
								message: res.message,
								type: 'success'
							});
							_this.setPositionArry = [];
							_this.handleNodeClick(_this.key)
						} else {
							_this.$notify.error({
								title: '错误',
								message: res.message
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
			handleEdit(index, row) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				if (row.sLoginName == "admin") {
					return this.$notify({
						title: '失败',
						message: "备用系统管理员不能修改~",
						type: 'error'
					});
				}
				$(".xgMSG").css("display", "block")
				this.ruleForm = row;
				this.ruleForm.Department = this.nav[0].children;
				this.organization = row.sMainOrgName;
				this.orgNameID = row.orgNameID;
				this.orgName = row.sMainOrgName;
			},
			//导出表
			download() {
				var _this = this;
				if (this.fID != "") {
					$.axse("get", "/baas/PC/person/ExportExcel", {
							id: this.fID,
							md5Str: this.sMd5Str
						},
						function(res) {
							let arr = [res.src, res.src1]
							window.location.href = encodeURI(encodeURI(res.src));
							setTimeout(function() {
								window.location.href = encodeURI(encodeURI(res.src1));

							}, 1000)
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
				} else {
					this.$message.error('请选择部门再导出报表');
				}
			},
			//导入表格
			sendfile(obj) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				let _this = this;
				this.file = event.currentTarget.files[0];
				var rABS = false; //是否将文件读取为二进制字符串  
				var f = this.file;
				var reader = new FileReader();
				reader.readAsBinaryString(f);
				reader.onload = function(e) {
					var data = e.target.result;
					zzexcel = XLSX.read(data, {
						type: 'binary'
					});
					for (var i = 0; i < zzexcel.SheetNames.length; i++) {
						_this.excelStr += JSON.stringify(XLSX.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]));
					}
					$.axse("get", "/baas/PC/person/ToLeadExcel", {
							excel: _this.excelStr,
							md5Str: _this.sMd5Str
						},
						function(res) {
							_this.$message({
								type: 'success',
								message: res.message
							});
							window.location.reload();
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
				
				
//				console.log(row)
				if (row.sNodeKind == "orgPer") {
					return this.$notify({
						title: '失败',
						message: "系统管理员不能删除~",
						type: 'error'
					});
				}
				
				var slft = this
				this.$confirm('此操作将删除此条信息 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var _this = this;
					$.axse("get", "/baas/PC/person/deletePerson", {
							fID: row.sID
						},
						function(res) {
							if (res.success == true) {
								_this.$message({
									type: 'success',
									message: '删除成功!'
								});
								slft.tableData.splice(index, 1)
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

			//关闭表单
			fromOff() {
				$(".xgMSG").css("display", "none")
			},
			//关闭新增
			fromOffNew() {
				$(".addMSG").css("display", "none")
			},
			addTable() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				$(".addMSG").css("display", "block")
				this.AddDefault()

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
				$(".roleCode").css("display", "block")
			},
			roleOff() {
				$(".roleCode").css("display", "none")
			},
			organShow() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				$(".organCode").css("display", "block")
			},
			organOff() {
				$(".organCode").css("display", "none")
			},
			// 选中删除过滤数组
			Arryfilter(data, arry) {
				for (let i in data) {

					if (arry.indexOf(data[i].sID) == -1) {
						this.tableDataTow.push(data[i])
					}
				}
			},
			toggleSelection(rows) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return;
				}
				if (rows) {
					if (delString.length != 0) {
						this.$confirm('此操作将删除选中表格信息, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							var _this = this;
							$.axse("get", "/baas/PC/person/deletePerson", {
									fID: delString
								},
								function(res) {
									if (res.success == true) {
										_this.$message({
											type: 'success',
											message: '删除成功!'
										});
									} else {
										_this.$message({
											type: 'info',
											message: '系统错误'
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
							var delArry = delString.split(",");
							var tableData = this.tableData;
							this.Arryfilter(tableData, delArry);
							this.tableData = this.tableDataTow;
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
					} else {
						this.$message({
							type: 'info',
							message: '请选择要删除得数据'
						});
					}
				} else {
					this.$message({
						type: 'info',
						message: '无数据'
					});
				}
			},
			changeFun(val) {
				delString = ""
				for (let i in val) {
					if (i == 0) {
						delString += val[i].sID
					} else {
						delString += "," + val[i].sID
					}

				}
			},
			// 请求左边导航 和表格

			getMainTable: function() {
				var _this = this;
				$.axse("get", "/QST/saOporgController/SelectOporg", {
						sMd5Str: this.sMd5Str
					},
					function(res) {
						_this.nav = res.list;
						_this.findID = res.list[0].id;
						_this.key = res.list[0].children[0].id;
						var fID = res.list[0].children[0].id;
						_this.addForm2.Department = res.list[0].children;
						localStorage.setItem("fName", res.list[0].label);
						console.info(fID,_this.sMd5Str)
						$.axse("get", "/QST/saOppersonController/SelectOpperson", {
								id: fID,
								md5Str: _this.sMd5Str
							},
							function(res) {
								_this.tableData = res.Data
								console.info(res.Data);
								for (let i in _this.tableData) {
									_this.tableData[i].hidePass = "* * * * * *";
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
				$.axse("get", "/QST/saOporgController/SelectOporg", {
						sMd5Str: this.sMd5Str
					},
					function(res) {
						_this.nav = res.list;
						_this.findID = res.list[0].id;
						_this.key = res.list[0].children[0].id;
						var fID = res.list[0].children[0].id;
						_this.addForm2.Department = res.list[0].children;
						localStorage.setItem("fName", res.list[0].label);
						console.info(fID,_this.sMd5Str)
						$.axse("get", "/QST/saOppersonController/SelectOpperson", {
								id: fID,
								md5Str: _this.sMd5Str
							},
							function(res) {
								_this.tableData = res.Data
								for (let i in _this.tableData) {
									_this.tableData[i].hidePass = "* * * * * *";
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
				$.axse("get", "/QST/saOporgController/SelectOporg", {
						sMd5Str: this.sMd5Str
					},
					function(res) {
						_this.nav = res.list;
						_this.findID = res.list[0].id;
						_this.key = res.list[0].children[0].id;
						var fID = res.list[0].children[0].id;
						_this.addForm2.Department = res.list[0].children;
						localStorage.setItem("fName", res.list[0].label);
						$.axse("get", "/QST/saOppersonController/SelectOpperson", {
								id: fID,
								md5Str: _this.sMd5Str
							},
							function(res) {
								_this.tableData = res.Data
								for (let i in _this.tableData) {
									_this.tableData[i].hidePass = "* * * * * *";
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

				$.axse("get", "/QST/saOproleController/SelectOproleName", {
						sMd5Str: this.sMd5Str
					},
					function(res) {
						_this.positionArry = res.select;
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
			getList(companyId) {
				var _this = this
				$("#tableone").tabullet({
					data: _this.source,
					action: function(mode, data) {
						if (mode === 'save') {
							_this.source.push(data);
							if (data.sName == "") {
								return _this.$message.error("添加职位不能为空~");
							}
							$.axse("get", "/baas/PC/structure/CreateRole", {
									fRoleName: data.sName,
									companyId: companyId,
									md5Str: _this.sMd5Str
								},
								function(res) {
									if (res.success == true) {
										$.axse("get", "/QST/saOproleController/SelectOproleName", {
												sMd5Str: _this.sMd5Str
											},
											function(res) {
												if (res.success == true) {
													_this.positionArry = res.select;
													_this.roleTable();
													_this.$message({
														message: "创建角色成功~~",
														type: 'success'
													});
												} else {
													_this.$message.error("创建失败~~");
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
								if (_this.source[i].sID == data.sID) {
									_this.source[i] = data;
								}
							}
							if (data.sName == "") {
								return _this.$message.error("修改职位不能为空~");
							}
							$.axse("get", "/baas/PC/structure/UpdateRole", {
									sID: data.sID,
									sName: data.sName
								},
								function(res) {
									if (res.success == true) {
										$.axse("get", "/QST/saOproleController/SelectOproleName", {
												sMd5Str: _this.sMd5Str
											},
											function(res) {
												if (res.success == true) {
													_this.positionArry = res.select;
													_this.roleTable();
													_this.$message({
														message: "修改角色成功~~",
														type: 'success'
													});
												} else {
													_this.$message.error("修改失败~~");
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
							for (var i = 0; i < _this.source.length; i++) {
								if (_this.source[i].sID == data) {
									_this.source.splice(i, 1);
									break;
								}
							}
							$.axse("get", "/baas/PC/structure/deleteRole", {
									sID: data
								},
								function(res) {
									if (res.success == true) {
										$.axse("get", "/QST/saOproleController/SelectOproleName", {
												sMd5Str: _this.sMd5Str
											},
											function(res) {
												if (res.success == true) {
													_this.positionArry = res.select;
													_this.roleTable();
													_this.$message({
														message: "删除角色成功~~",
														type: 'success'
													});
												} else {
													_this.$message.error("删除失败~~");
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

			//部门列表
			organList() {

				var _this = this;
				var findId = this.organfindId;
				$("#tableorgan").tabullet({
					data: _this.organArry,
					action: function(mode, data) {
						if (mode === 'save') {
							if (data.label == "") {
								return _this.$message.error("添加部门不能为空~");
							}
							if (data.label == "系统管理员") {
								return _this.$message.error("系统管理员不能创建~~")
							}
							_this.organArry.push(data);
							$.axse("get", "/baas/PC/structure/CreateDepartment", {
									sFName: data.label,
									sParentID: findId,
									sMd5Str: _this.sMd5Str
								},
								function(res) {
									if (res.success == true) {
										_this.$message({
											message: res.message,
											type: 'success'
										});
										_this.navAjax(ip + "/QST/saOporgController/SelectOporg", _this.sMd5Str)
										_this.AddDefault()


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
						if (mode === 'edit') {
							var bmID;
							for (var i = 0; i < _this.organArry.length; i++) {
								if (_this.organArry[i].label == "系统管理员") {
									bmID = _this.organArry[i].id;
									break;
								}
							}
							if (bmID == data.id) {
								 _this.$message.error("系统管理员不能编辑~~")
							} else {
								for (var i = 0; i < _this.organArry.length; i++) {
									if (_this.organArry[i].id == data.id) {
										_this.organArry[i] = data;
									}
								}
								if (data.label == "") {
									return _this.$message.error("修改部门不能为空~");
								}
								$.axse("get", "/baas/PC/structure/UpdateDepartment", { 
										sFName: data.label,
										sID: data.id
									},
									function(res) {
										if (res.success == true) {
											_this.navAjax(ip + "/QST/saOporgController/SelectOporg", _this.sMd5Str)
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

						}
						if (mode == 'delete') {

							for (var i = 0; i < _this.organArry.length; i++) {
								if (_this.organArry[i].id == data) {
									if (_this.organArry[i].label == "系统管理员") {
										_this.$message.error("系统管理员不能删除~~")
									} else {
										_this.organArry.splice(i, 1);
										console.log(_this.organArry);
										$.axse("get", "/baas/PC/structure/DeleteDepartment", { //baas/PC/structure/DeleteDepartment
												sID: data
											},
											function(res) {
												if (res.success == true) {
													_this.navAjax(ip + "/QST/saOporgController/SelectOporg", _this.sMd5Str)
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
									break;
								}
							}



						}
						_this.organList();
					}
				});
			},
			//角色表格
			roleTable() {
				var token = localStorage.getItem("qstToken");
				if (token == null) {
					window.location.href = "./login.html"
				}
				var objID = JSON.parse(token)
				var companyId = objID.sMainOrgID;
				var _this = this;
				$.axse("get", "/QST/saOproleController/selectRole", {
						md5Str: this.sMd5Str,
					},
					function(res) {
						_this.source = res.data;
						_this.getList(companyId);
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
			//组织表格
			organTable(obj) {
				var token = localStorage.getItem("qstToken");
				if (token == null) {
					window.location.href = "./login.html"
				}
				var bToObj = JSON.parse(token);
				// var companyId = bToObj.sID;
				var findId = this.organfindId; //获取项目得id
				for (let i in obj) {
					this.organfindArry = obj[i].label;
					this.organArry = obj[i].children;
				}

				this.organList()
			},
			//判断用户是否点击组织
			organORures() {
				if (this.organfindId.length != 0) {
					$(".organ").removeAttr("disabled");
					$(".organ").removeClass("is-disabled");
				}
			},
			//签到跳转
			Sign() {
				window.location.href = "SignIn.html";
			},
			//点击菜单得时候出发该函数
			handleSelectNav(key, keyPath) {
				this.key = key;
				this.keyOne = key;
				this.handleNodeClick(key);
				this.fID = key; //给fid 传部门id
				this.organfindId = keyPath[0];
				this.organORures();
				this.organTable(this.nav)
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

			//给增加表单添加默认
			AddDefault() {
				for (let i in this.addForm2.Department) {
					if (this.fID != "") {
						if (this.fID == this.addForm2.Department[i].id) {
							this.addOrgNameID = this.addForm2.Department[i].id;
							this.addorganization = this.addForm2.Department[i].label;
							this.addOrgName = this.addForm2.Department[i].label;

						}
					}
				}
			},
			//刷新nav的AJAX 
			navAjax(url, data) {
				var _this = this;
				$.ajax({
					url: url,
					data: {
						sMd5Str: data
					},
					type: "get",
					dataType: "json",
					success: function(res) {
						_this.nav = res.list;
						_this.addForm2.Department = res.list[0].children;
						_this.organTable(_this.nav)

					}
				});

			},
			seekFU() {
				var _this = this
				$.axse("get", "/QST/saOppersonController/seekOpperson", {
						id: this.keyOne,
						md5Str: this.sMd5Str,
						Name: this.seek
					},
					function(res) {
						_this.tableData = res.Data;
						for (let i in _this.tableData) {
							_this.tableData[i].hidePass = "* * * * * *";
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

			}

		},
		mounted: function() {
			this.getToken();
			this.getMainTable();
			this.roleTable();
		},
	})


})
