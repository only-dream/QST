$(document).ready(function() {
	var tableObj = new Vue({
		el: "#table",
		data: {
			activeName2: 'first',
			monthDate: '',
			tableData: [],
			DayValue: "", //考勤日报
			AllValue: "", //班组考勤
			fName: "",

		},
		methods: {
			handleClick(tab) {
				if (tab.name == "first") {
					this.getday();
				} else if (tab.name == "second") {
					this.getMonth();
				} else if (tab.name == "third") {
					this.TeamAttendance()
				}

			},
			//导出月份报表
			exportMonth() {
				var monthDate = this.monthDate;
				var userId = JSON.parse(localStorage.getItem("qstToken")).sID; //获取缓存中得sID
				var dateTime = this.TimeMonth()
				var d1 = new Date(monthDate.replace(/\-/g, "\/"));
				var d2 = new Date(dateTime.replace(/\-/g, "\/"));
				var _this = this;
				if (monthDate != "" && dateTime != "" && d1 > d2) {
					this.$message({
						message: '选择时间不能大于当前时间~~',
						type: 'warning'
					});
					return false;
				}
				if (monthDate.length == 0) {
					this.$message.error('请选择导出日期');
				} else {
					$.axse("get", "/baas/pc_xiaowei/pc/exportExcel", {
							id: monthDate,
							userId: userId
						},
						function(res) {
							window.location.href = encodeURI(encodeURI(res.src));
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
			//获取月份列表
			getMonth() {
				var _this = this
				var monthDate = this.monthDate;
				if (monthDate.length == 0) {
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
					var currentdate = year + seperator1 + month;
					monthDate = currentdate;
				}
				var dateTime = this.TimeMonth()
				var d1 = new Date(monthDate.replace(/\-/g, "\/"));
				var d2 = new Date(dateTime.replace(/\-/g, "\/"));
				if (monthDate != "" && dateTime != "" && d1 > d2) {
					this.$message({
						message: '选择时间不能大于当前时间~~',
						type: 'warning'
					});
					return false;
				}
				var userId = JSON.parse(localStorage.getItem("qstToken")).sID; //获取缓存中得sID
				$.axse("get", "/baas/pc_xiaowei/pc/getSignInfoGroupByfStaffID", {
						id: monthDate,
						userId: userId
					},
					function(res) {
						_this.tableData = res.rows
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
			//日报报表
			getday() {
				var _this = this;
				var currentdate = this.Time()
				var _this = this
				var userId = JSON.parse(localStorage.getItem("qstToken")).sID; //获取缓存中得sID
				$.axse("get", "/baas/pc_xiaowei/pc/getPersonSignInfo", {
						fBeginDate: currentdate,
						fEndDate: currentdate,
						userId: userId,
						fProjectName: this.fName
					},
					function(res) {
						_this.tableData = res.list
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

			//导出日报
			getDayForm() {
				var _this = this;
				var dayDate = this.DayValue;
				var dateTime = this.TimeTwo()
				var d1 = new Date(dayDate[1].replace(/\-/g, "\/"));
				var d2 = new Date(dateTime.replace(/\-/g, "\/"));
				if (dayDate[1] != "" && dateTime != "" && d1 > d2) {
					this.$message({
						message: '选择时间不能大于当前时间~~',
						type: 'warning'
					});
					return false;
				}
				if (dayDate.length == 0) {
					dayDate = this.Time()
				}
				var userId = JSON.parse(localStorage.getItem("qstToken")).sID; //获取缓存中得sID
				$.axse("get", "/baas/pc_xiaowei/pc/exportExcelByDayReport", {
						fBeginDate: dayDate,
						fEndDate: dayDate,
						userId: userId,
					},
					function(res) {
						window.location.href = encodeURI(encodeURI(res.src));
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
			//班组考勤
			TeamAttendance() {
				var _this = this
				var userId = JSON.parse(localStorage.getItem("qstToken")).sID; //获取缓存中得sID
				var currentdate = this.Time()
				$.axse("get", "/baas/pc_xiaowei/pc/getSignInfoGroupByTeam", {
						fBeginDate: currentdate,
						fEndDate: currentdate,
						userId: userId,
						fProjectName: this.fName
					},
					function(res) {
						_this.tableData = res.rows
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
			//考勤查询
			QueryAllForm() {
				var _this = this
				var userId = JSON.parse(localStorage.getItem("qstToken")).sID; //获取缓存中得sID
				var date = this.AllValue
				var dateTime = this.TimeTwo()
				var d1 = new Date(date[1].replace(/\-/g, "\/"));
				var d2 = new Date(dateTime.replace(/\-/g, "\/"));
				if (date[1] != "" && dateTime != "" && d1 > d2) {
					this.$message({
						message: '选择时间不能大于当前时间~~',
						type: 'warning'
					});
					return false;
				}
				if (date != "") {
					$.axse("get", "/baas/pc_xiaowei/pc/getSignInfoGroupByTeam", {
							fBeginDate: date[0],
							fEndDate: date[1],
							userId: userId,
							fProjectName: this.fName
						},
						function(res) {
							_this.tableData = res.rows
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
					this.$message({
						message: '请选择时间',
						type: 'warning'
					});
				}
			},
			//考勤日报查询
			QueryDayForm() {
				var _this = this
				var userId = JSON.parse(localStorage.getItem("qstToken")).sID; //获取缓存中得sID
				var date = this.DayValue;
				var dateTime = this.TimeTwo()
				var d1 = new Date(date[1].replace(/\-/g, "\/"));
				var d2 = new Date(dateTime.replace(/\-/g, "\/"));
				if (date[1] != "" && dateTime != "" && d1 > d2) {
					this.$message({
						message: '选择时间不能大于当前时间~~',
						type: 'warning'
					});
					return false;
				}
				if (date != "") {
					$.axse("get", "/baas/pc_xiaowei/pc/getPersonSignInfo", {
							fBeginDate: date[0],
							fEndDate: date[1],
							userId: userId,
							fProjectName: this.fName
						},
						function(res) {
							_this.tableData = res.list;
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
					this.$message({
						message: '请选择时间',
						type: 'warning'
					});
				}
			},
			//导出班组表
			getTeamForm() {
				var _this = this;
				var dayDate = this.AllValue;
				if (dayDate.length == 0) {
					dayDate = this.Time()
				}
				var dateTime = this.TimeTwo()
				var d1 = new Date(dayDate[1].replace(/\-/g, "\/"));
				var d2 = new Date(dateTime.replace(/\-/g, "\/"));
				if (dayDate[1] != "" && dateTime != "" && d1 > d2) {
					this.$message({
						message: '选择时间不能大于当前时间~~',
						type: 'warning'
					});
					return false;
				}
				var userId = JSON.parse(localStorage.getItem("qstToken")).sID; //获取缓存中得sID
				$.axse("get", "/baas/pc_xiaowei/pc/exportExcelGroupByTeam", {
						fBeginDate: dayDate[0],
						fEndDate: dayDate[1],
						userId: userId,
					},
					function(res) {
						window.location.href = encodeURI(encodeURI(res.src));
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

			fhpor() {
				window.location.href = "index.html";
			},
			Time() {
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate() - 1;
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				return year + seperator1 + month + seperator1 + strDate; //获取当前时间
			},
			TimeTwo() {
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
				return year + seperator1 + month + seperator1 + strDate; //获取当前时间
			},
			TimeMonth() {
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
				return year + seperator1 + month; //获取当前时间
			},
		},
		mounted: function() {
			this.fName = localStorage.getItem("fName");
			this.getday();
			var timeArry = [this.Time(), this.Time()];
			this.DayValue = timeArry; //考勤日报
			this.AllValue = timeArry; //班组考勤
			this.monthDate = this.TimeMonth()
		},
	})


})
