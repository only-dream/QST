$(document).ready(function() {
	var tableObj = new Vue({
		el: "#table",
		data: {
			imgUrl: "",
			nav: [],
			token: [],
			authorArry: [],
			organfindArry: "",
			wjjName: "",
			wjjsID: "",
			imgName: "",
			edit: "编辑", //编辑按钮显示
			editState: false, //是否显示图片编辑
			editWjj: false, //
			ImgDate: "", //上传照片选择时间
			ab: [],
			imgBOX: [],
			orgId: "", //层级列表ID
			imgNameArry: [], // 存放文件夹下图片得名称
			wjjNameArry: [], //存放目录下所有文件得名称
			imgShow: true, //图片提示没有数据图片
			wjjShow: true, //文件夹提示没有数据图片
			wjjcf: "", //判断文件夹名是否重复true 重复 false 没有重复
			wjjImg: [], // 文件夹外面图片数组
			wjjImgNameArry: [],
			fProjectQuanName:"",   //项目全名
			status: "",
			listShow: false,
			navFQ: [{
				label: '管理照片',
				children: [{
					label: '站班管理',
				},{
					label: '质量管理',
				},{
					label: '进度管理',
				},{
					label: '安全管理',
				}]
			}],
			defaultProps: {
				children: 'children',
				label: 'label',
				number: 'number',
			},

			//图片提交表单
			imgZh: "", //桩号
			imgSgbw: "", //施工部位
			imgPsyq: "", //拍摄要求
			imgMmgz: "", //命名规则
			imgMcqj: "", //相片名前缀
			imgXpmc: "", //相片名称
			imgDate: "", //拍摄时间
			imgTypeId: "", //点击文件ID
			projectName: "", //项目名称
			imgBase64: "", //图片base64
			projectId: "", //项目ID 
			ProjectArry: [],
			value: '',
			//拼接路径
			downSrc: "", //点击的子名称
			parentNavName: [], //点击的列表名称
			keyLabel: "", //点击列表名称
			wjjIDStr: "", //文件夹id
			wjjSrc: "", // 文件夹路径
			fPostID: "", //判断是否是默认文件夹
			loading: false,
			rightShow:true,

		},

		methods: {
			//获取左侧列表
			leftNav() {
				var _this = this
				$.axse("get", "/baas/BZB03/PcPhotoManager/getPhotoOrg", {
						projectId: this.projectId,
					},
					function(res) {
						_this.nav = res.list;
						console.log(res)
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
             //左侧列表站班点击事件
			 handleZb(){
				 this.rightShow = false;   //切换到文件夹
			 },
			//左侧列表点击事件
			handleSelectNav(key, keyPath) {
				this.rightShow = true;   //站班切换到
				this.keyLabel = key.label
				this.parentNavName[key.level - 1] = key.label;
				this.parentNavName.splice(key.level, this.parentNavName.length - key.level)
				this.downSrc = this.SyntheticPath() //合成下载图片路径
				this.wjjSrc = this.WjjPath();
				$(".imgBox").hide();
				$(".tableWjj").show()
				var photoName = key.NamingRule;
				this.imgMmgz = photoName;
				this.imgPsyq = key.shootPoint;
				this.imgXpmc = key.photoName;
				var time = this.TimeTwo();
				//拆分图片命名规则
				if (photoName != undefined) {
					var fristName = photoName.split("-")[0];
					this.imgMcqj = fristName + "-" + time + "-001"
				}
				// this.orgId = key.id;
				this.status = key.status;
				if (key.children != undefined) {
					if (key.children.length == 0) {
						this.orgId = key.id;
						this.listShow = true;
						this.Getfolder(this.orgId, this.status, this.projectId)
					} else {
						this.listShow = false;

					}
				} else {
					if (key.level == 4) {
						this.orgId = key.id;
						this.listShow = true;
						this.Getfolder(this.orgId, this.status, this.projectId)
					} else {
						this.listShow = false;

					}
				}

			},
			//合成下载图片路径
			SyntheticPath(imgZh) {
				var downSrc = `/photo/${this.fProjectQuanName}`
				if (this.parentNavName[0] == undefined) {
					if (imgZh == undefined) {
						return downSrc = `/photo/${this.fProjectQuanName}`;
					} else {
						return downSrc = `/photo/${this.fProjectQuanName}/${imgZh}`;
					}

				} else {
					if (this.parentNavName[1] == undefined) {
						if (imgZh == undefined) {
							return downSrc = `/photo/${this.fProjectQuanName}/${this.parentNavName[0]}`
						} else {
							return downSrc = `/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${imgZh}`;
						}

					} else {
						if (this.parentNavName[2] == undefined) {
							if (imgZh == undefined) {
								return downSrc = `/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}`;
							} else {
								return downSrc = `/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${imgZh}`;
							}
						} else {
							if (this.parentNavName[3] == undefined) {
								if (imgZh == undefined) {
									return downSrc =
										`/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${this.parentNavName[2]}`;
								} else {
									return downSrc =
										`/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${this.parentNavName[2]}/${imgZh}`;
								}

							} else {
								if (this.parentNavName[4] == undefined) {
									if (imgZh == undefined) {
										return downSrc =
											`/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${this.parentNavName[2]}/${this.parentNavName[3]}`
									} else {
										return downSrc =
											`/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${this.parentNavName[2]}/${this.parentNavName[3]}/${imgZh}`;
									}
								} else {
									if (imgZh == undefined) {

										return downSrc =
											`/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${this.parentNavName[2]}/${this.parentNavName[3]}/${this.parentNavName[4]}`
									} else {
										return downSrc =
											`/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${this.parentNavName[2]}/${this.parentNavName[3]}/${this.parentNavName[4]}/${imgZh}`

									}

								}
							}
						}
					}
				}
			},
			//删除文件夹合成路径
			WjjPath(imgZh) {
				
				var downSrc = `/photo/${this.fProjectQuanName}`
				if (this.parentNavName[0] == undefined) {
					if (imgZh == undefined) {
						downSrc = `/photo/${this.fProjectQuanName}`;
					} else {
						return downSrc = `/photo/${this.fProjectQuanName}/${imgZh}`;
					}

				} else {
					if (this.parentNavName[1] == undefined) {
						if (imgZh == undefined) {
							downSrc = `/photo/${this.fProjectQuanName}/${this.parentNavName[0]}`
						} else {
							return downSrc = `/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${imgZh}`;
						}

					} else {
						if (this.parentNavName[2] == undefined) {
							if (imgZh == undefined) {
								downSrc = `/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}`;
							} else {
								return downSrc = `/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${imgZh}`;
							}
						} else {
							if (this.parentNavName[3] == undefined) {
								if (imgZh == undefined) {
									downSrc =
										`/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${this.parentNavName[2]}`;
								} else {
									return downSrc =
										`/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${this.parentNavName[2]}/${imgZh}`;
								}

							} else {
								if (this.parentNavName[4] == undefined) {
									if (imgZh == undefined) {
										downSrc =
											`/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${this.parentNavName[2]}/${this.parentNavName[3]}`
									} else {
										return downSrc =
											`/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${this.parentNavName[2]}/${this.parentNavName[3]}/${imgZh}`;
									}
								} else {
									if (imgZh == undefined) {

										downSrc =
											`/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${this.parentNavName[2]}/${this.parentNavName[3]}/${this.parentNavName[4]}`
									} else {
										return downSrc =
											`/photo/${this.fProjectQuanName}/${this.parentNavName[0]}/${this.parentNavName[1]}/${this.parentNavName[2]}/${this.parentNavName[3]}/${this.parentNavName[4]}/${imgZh}`

									}

								}
							}
						}
					}
				}
			},

			//删除文件夹
			delWjj() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				var _this = this;
				if (this.wjjIDStr == "" || undefined) {
					return this.$message({
						type: 'error',
						message: '请选择要删除的文件夹~~'
					});
				}
				if (this.fPostID != "") {
					return this.$message({
						type: 'error',
						message: '默认文件夹不能删除~~'
					});
				}
				this.$confirm('此操作将永久删除该文件夹, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					$.axse("get", "/baas/BZB03/PcPhotoManager/deleteFolder", {
							folderIds: this.wjjIDStr,
							folderUrls: this.wjjSrc,
						},
						function(res) {
							if (res.message == "删除成功") {
								_this.$message({
									type: 'success',
									message: '删除成功~~'
								});
								_this.Getfolder(_this.orgId, _this.status, _this.projectId)
							} else {
								_this.$message({
									type: 'error',
									message: '删除失败~~'
								});
							}


						},
						function(res) {
							if (res) {
								_this.$notify({
									title: '失败',
									message: "获取失败~",
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
			//图片打包下载
			downloadImg() {
				var _this = this;
				if (this.downSrc == "" || undefined) {
					return this.$message({
						type: 'error',
						message: '请点击列表然后下载~~'
					});
				}
				window.open(ip + "/baas/BZB03/PcPhotoManager/downloadFiel?src=" + this.downSrc + "&projectName=" + this.keyLabel);
			},
			//点击左侧列表获取文件夹
			Getfolder(sID, status, projectId) {
				if (status == undefined) {
					status = 0;
				}
				var _this = this;
				$.axse("get", "/baas/BZB03/PcPhotoManager/getPhotoFolderByOrgId", {
						sID: sID,
						status: status,
						// fProjectId: "C80CD137CD0000011FA31FE0B745109C", 
						fProjectId: projectId,
					},
					function(res) {

						_this.ab = ""; // 添加文件夹
						_this.wjjImg = ""; //添加图片
						_this.loading = true;
						_this.wjjShow = false;
						setTimeout(function() {
							_this.ab = res.folder; // 添加文件夹
							_this.wjjImg = res.imgList; //添加图片
							//将文件夹名称存入数组
							for (let i in res.folder) {
								_this.wjjNameArry.push(res.folder[i].fPostName)
							}
							//将图片名称存入数组
							for (let i in _this.wjjImg) {
								_this.wjjImg[i].img_url = encodeURI(encodeURI(_this.imgUrl + _this.wjjImg[i].img_url));
								_this.wjjImgNameArry.push(_this.wjjImg[i].img_name)
							}
							_this.$nextTick(() => {
								var $image = $('#images2');
								$image.viewer('update');
								var viewer = $image.data('viewer');
								$('#images2').viewer({
									title: false
								});
							})
							_this.loading = false;
							if (res.folder.length != 0 || res.imgList.length != 0) {
								_this.wjjShow = false;
							} else {
								_this.wjjShow = true;
							}

						}, 500)





					},
					function(res) {
						if (res) {
							_this.$notify({
								title: '失败',
								message: "获取失败~",
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
			//选中文件夹
			SelectWjj(e, wjjID, wjjName, PostID) {
				$(".wjj").css("background", "#fff");
				$(".wjj").css("color", "#333")
				var el = event.target;
				this.wjjIDStr = wjjID;
				this.wjjSrc = this.WjjPath(wjjName);
				this.fPostID = PostID;
				if (el.tagName == "IMG") {
					el.parentNode.parentNode.style.background = "#b3d2f8";
				} else {
					el.parentNode.style.background = "#b3d2f8";

				}
				el.nextElementSibling.style.display = "none";
				el.nextElementSibling.nextElementSibling.style.display = "block";

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
			//点击文件夹名字取消其他文件得重命名
			wjjnoInput(e) {
				var el = event.target;
				var parjd = el.parentNode;
				var prev = this.siblings(parjd);
				for (let i of prev) {
					i.children[1].style.display = "none";
					i.children[2].style.display = "block";
				}
			},
			//返回按钮
			returnBUtt() {
				$(".imgBox").hide();
				$(".tableWjj").show()
				this.editState = false;
				this.edit = "编辑";
			},
			//点击文件夹查看图片
			wjjClick(event, sID, data) {
				this.wjjsID = sID;
				this.imgZh = data.fPostName;
				this.imgTypeId = data.fID;
				this.keyLabel = data.fPostName;
				var _this = this;
				this.downSrc = this.SyntheticPath(data.fPostName); //刷新下载路径

				$.axse("get", "/baas/BZB03/PcPhotoManager/getImgByClassId", {
						sID: sID,
						orgId: this.orgId,
						fProjectId: this.projectId
					},
					function(res) {
						for (let i in res.list) {
							_this.imgNameArry.push(res.list[i].img_name);
						}
						if (res.list.length != 0) {
							_this.imgShow = false;
						}
						if (res.list.length == 0) {
							_this.imgShow = true;
						}
						_this.imgBOX = res.list;
						for (let i in _this.imgBOX) {
							_this.imgBOX[i].img_url = encodeURI(encodeURI(_this.imgUrl + _this.imgBOX[i].img_url));
						}
						if (res.list.length != 0) {
							_this.$nextTick(() => {
								var $image = $('#images1');
								$image.viewer('update');
								var viewer = $image.data('viewer');
								$('#images1').viewer({
									title: false
								});
							})
						}
						$(".imgBox").show();
						$(".tableWjj").hide();
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
			//删除图片
			delImg(imgID, imgUrl, num) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				var _this = this;
				var imgUrlde = decodeURI(decodeURI(imgUrl)).split("/x5/UI2")[1];
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					$.axse("get", "/baas/BZB03/PcPhotoManager/deleteImage", {
							imageIds: imgID,
							imagUrls: imgUrlde,
						},
						function(res) {
							if (num == 1) {
								$.axse("get", "/baas/BZB03/PcPhotoManager/getImgByClassId", {
										sID: _this.wjjsID,
										orgId: _this.orgId,
										fProjectId: _this.projectId
									},
									function(res) {
										for (let i in res.list) {
											_this.imgNameArry.push(res.list[i].img_name);
										}
										if (res.list.length != 0) {
											_this.imgShow = false;
										}
										if (res.list.length == 0) {
											_this.imgShow = true;
										}
										_this.imgBOX = res.list;
										for (let i in _this.imgBOX) {
											_this.imgBOX[i].img_url = encodeURI(encodeURI(_this.imgUrl + _this.imgBOX[i].img_url));
										}
										if (res.list.length != 0) {
											_this.$nextTick(() => {
												var $image = $('#images1');
												$image.viewer('update');
												var viewer = $image.data('viewer');
												$('#images1').viewer({
													title: false
												});
											})
										}
										_this.$message({
											type: 'success',
											message: '删除成功!'
										});
										$(".imgBox").show();
										$(".tableWjj").hide();
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
								_this.Getfolder(_this.orgId, _this.status, _this.projectId)
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
			//文件夹重命名
			wjjRename(event, rec, fProjectCode, name) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				this.wjjName = name;
				var el = event.target;
				el.style.display = "none";
				el.previousElementSibling.style.display = "block";

			},
			wjjInput(event, fID, oldName, fPostID) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				var el = event.target;
				var _this = this;
				if (this.wjjIDStr == "" || undefined) {
					return this.$message({
						type: 'error',
						message: '请选中文件夹~~'
					});
				}
				if (fPostID != "" || undefined) {
					el.style.display = "none";
					el.nextElementSibling.style.display = "block";
					return this.$message({
						type: 'error',
						message: '系统默认文件夹不能修改哟~~'
					});
				}
				var Src = this.wjjSrc;
				var index = Src.lastIndexOf("\/");
				Src = Src.substring(0, index);
				if (this.wjjName == el.value) {
					el.value = this.wjjName;
					el.style.display = "none";
					el.nextElementSibling.style.display = "block";
					$.axse("get", "/baas/BZB03/PcPhotoManager/renameFolderName", {
							folderId: fID,
							newFolderName: this.wjjName,
							oldFolderName: oldName,
							path: Src
						},
						function(res) {
							_this.Getfolder(_this.orgId, _this.status, _this.projectId)
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
					for (let i in this.wjjNameArry) {
						if (el.value == this.wjjNameArry[i]) {
							this.$message({
								message: '文件夹名称已经存在~',
								type: 'warning'
							});
							el.value = this.wjjName;
							el.style.display = "none";
							el.nextElementSibling.style.display = "block";
							this.wjjcf = true;
						}

					}
				}


				if (this.wjjcf != true) {
					this.wjjName = el.value;
					el.style.display = "none";
					el.nextElementSibling.style.display = "block";
					el.nextElementSibling.innerText = this.wjjName;
					this.wjjcf = false;
				}

			},
			//新建文件夹
			addWjj() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				$(".wjj").css("color", "#333");
				var _this = this;
				var obj = {
					fID: "",
					fPostName: "",
					fProjectCode: ""
				}
				var name = "新建文件夹"; //文件夹名称
				var nameNum = 1; //新建文件夹序号
				var state = false; //判断文件夹是否有重名 如果重名返回 true 否则 false
				name = this.ba(name, nameNum);
				for (let i of this.wjjNameArry) {
					if (i == name) {
						state = true;
					}
				}
				if (state != true) {
					$.axse("get", "/baas/BZB03/PcPhotoManager/createFolder", {
							forderName: name,
							fParntClassId: this.orgId,
							fProjectId: this.projectId,
						},
						function(res) {
							_this.Getfolder(_this.orgId, _this.status, _this.projectId)
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
					this.wjjNameArry.push(name);
					obj.fPostName = name;
					this.ab.push(obj);
				}

				$("#rightMain").scrollTop($("#rightMain").height()); //置底
				if (this.wjjNameArry.length != 0) {
					this.wjjShow = false;
				}
			},
			//新建文件夹递归
			ba(name, nameNum) {
				var state = false;
				for (let i in this.wjjNameArry) {

					if (this.wjjNameArry[i] == name) {
						state = true;
					}
				}
				if (state == true) {
					name = "新建文件夹" + `(${nameNum})`;
					nameNum++;
					name = this.ba(name, nameNum);
				}
				return name;
			},
			addMSG() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				$(".addMSG").show();
			},
			fromOffNew() {
				$(".addMSG").hide();
			},
			addMSGWJJ() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				$(".addMSGWJJ").show();
			},
			fromOffNewWJJ() {
				$(".addMSGWJJ").hide();
			},
			//图片重命名input 失去焦点事件
			imgInput(event, imgID, oldName, imgUrl, num) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				var _this = this;
				var el = event.target;
				var imgUrlde = decodeURI(decodeURI(imgUrl));
				var strOne = imgUrlde.split("UI2")[1];
				var index = strOne.lastIndexOf("\/");
				var path = strOne.substring(index, 0);
				el.style.display = "none";
				el.previousElementSibling.style.display = "block";
				if (num == 1) {
					for (let i in this.imgNameArry) {
						if (this.imgNameArry[i] == this.imgName) {
							return this.$message({
								message: '图片名称已经存在请重新修改~',
								type: 'warning'
							});
						} else {
							$.axse("get", "/baas/BZB03/PcPhotoManager/renameImage", {
									imageId: imgID,
									newImageName: this.imgName,
									oldImageName: oldName,
									path: path,
								},
								function(res) {
									if (res.message == "修改成功") {
										$.axse("get", "/baas/BZB03/PcPhotoManager/getImgByClassId", {
												sID: _this.wjjsID,
												orgId: _this.orgId,
												fProjectId: _this.projectId

											},
											function(res) {
												for (let i in res.list) {
													_this.imgNameArry.push(res.list[i].img_name);
												}
												if (res.list.length != 0) {
													_this.imgShow = false;
												}
												if (res.list.length == 0) {
													_this.imgShow = true;
												}
												_this.imgBOX = res.list;
												for (let i in _this.imgBOX) {
													_this.imgBOX[i].img_url = encodeURI(encodeURI(_this.imgUrl + _this.imgBOX[i].img_url));
												}
												if (res.list.length != 0) {
													_this.$nextTick(() => {
														var $image = $('#images1');
														$image.viewer('update');
														var viewer = $image.data('viewer');
														$('#images1').viewer({
															title: false
														});

													})
												}
												$(".imgBox").show();
												$(".tableWjj").hide();
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

										// el.previousElementSibling.innerText = _this.imgName;
									} else {
										this.$message.error('名称修改失败');
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
				} else {
					for (let i in this.wjjImgNameArry) {
						if (this.wjjImgNameArry[i] == this.imgName) {
							return this.$message({
								message: '图片名称已经存在请重新修改~',
								type: 'warning'
							});
						} else {
							$.axse("get", "/baas/BZB03/PcPhotoManager/renameImage", {
									imageId: imgID,
									newImageName: this.imgName,
									oldImageName: oldName,
									path: path,
								},
								function(res) {
									if (res.message == "修改成功") {

										_this.Getfolder(_this.orgId, _this.status, _this.projectId);
										// el.previousElementSibling.innerText = _this.imgName;
									} else {
										this.$message.error('名称修改失败');
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
				}


			},
			//上传图片
			uploadPhoto(e) {
				console.info("进入");
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				var _this = this;
				// 利用fileReader对象获取file

				var file = e.target.files[0];
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(theFile) {
					var image = new Image();
					image.src = theFile.target.result;
					image.onload = function() {
						// alert("图片的宽度为" + this.width + ",长度为" + this.height);
						if (this.width < 1600 || this.height < 1200) {
							return _this.$message({
								message: '请上传图片尺寸大于或等于1600*1200',
								type: 'warning'
							});
						}

					};
				};
				var filesize = file.size;
				var filename = file.name;
				var imgFormat = filename.split(".")[1]
				// 2,621,440   2M
				if (filesize > 2101440) {
					// 图片大于2MB
					return this.$message({
						message: '上传图片不能大于2MB',
						type: 'warning'
					});

				}
				if (imgFormat != "jpg" && imgFormat != "png" && imgFormat != "jpeg") {
					return this.$message({
						message: '请上传.jpg / .png / .jpeg 格式的图片',
						type: 'warning'
					});
				}
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(e) {

					// 读取到的图片base64 数据编码 将此编码字符串传给后台即可
					var imgcode = e.target.result;
					_this.imgBase64 = imgcode;
				}
			},
			//图片编辑
			editButt() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				var State = this.editState;
				if (State == true) {
					this.edit = "编辑";
					this.editState = false;
				} else {
					this.edit = "取消编辑";
					this.editState = true;
				}
			},
			//图片重命名

			imgRename(event, name) {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				this.imgName = name;
				var el = event.target;
				el.parentNode.parentNode.parentNode.previousElementSibling.style.display = "block";
				el.parentNode.parentNode.parentNode.previousElementSibling.previousElementSibling.style.display = "none";
			},
			//文件夹中提交表单
			upData() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				var _this = this;

				if (this.imgZh == "") {
					return this.$notify({
						title: '失败',
						message: "桩号不能为空~",
						type: 'error'
					});
				}
				if (this.imgSgbw == "") {
					return this.$notify({
						title: '失败',
						message: "施工部位不能为空~",
						type: 'error'
					});
				}
				if (this.imgDate == "") {
					return this.$notify({
						title: '失败',
						message: "时间不能为空~",
						type: 'error'
					});
				}
				if (this.imgBase64 == "") {
					return this.$notify({
						title: '失败',
						message: "请上传图片~",
						type: 'error'
					});
				}
				for (let i in this.imgNameArry) {
					if (this.imgXpmc == this.imgNameArry[i]) {
						return this.$notify({
							title: '失败',
							message: "照片名称已经存在~",
							type: 'error'
						});
					}
				}
				const loading = this.$loading({
					lock: true,
					text: '努力上传中...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				$.axse("post", "/baas/BZB03/PcPhotoManager/createImage", {
						imgTypeId: this.imgTypeId, //图片文件图片文件夹ID  
						stakeCode: this.imgZh, //桩号(没有不传) 
						sCreateTime: this.imgDate, //拍摄时间 
						workSite: this.imgSgbw, //施工部位 
						namePrefix: this.imgMcqj, //名称前缀 
						projectName: this.fProjectQuanName, //项目名称 
						projectId: this.projectId, //项目id 
						k_picurl: this.imgBase64, //base64
						photoName: this.imgXpmc, //自定义部位名称 
						orgId: this.orgId, //层级id  
					},
					function(res) {
						_this.imgBOX = res.list
						$(".imgBox").show();
						$(".tableWjj").hide();
						_this.$message({
							message: '图片添加成功~~',
							type: 'success'
						});
						loading.close();
						$.axse("get", "/baas/BZB03/PcPhotoManager/getImgByClassId", {
								sID: _this.wjjsID,
								orgId: _this.orgId,
								fProjectId: _this.projectId

							},
							function(res) {
								console.log(res.list.length)
								for (let i in res.list) {
									_this.imgNameArry.push(res.list[i].img_name);
								}
								if (res.list.length != 0) {
									_this.imgShow = false;
								}
								if (res.list.length == 0) {
									_this.imgShow = true;
								}
								_this.imgBOX = res.list;
								for (let i in _this.imgBOX) {
									_this.imgBOX[i].img_url = encodeURI(encodeURI(_this.imgUrl + _this.imgBOX[i].img_url));
								}
								if (res.list.length != 0) {
									_this.$nextTick(() => {
										var $image = $('#images1');
										$image.viewer('update');
										var viewer = $image.data('viewer');
										$('#images1').viewer({
											title: false
										});
									})
								}
								// $(".imgBox").show();
								// $(".tableWjj").hide();
								// _this.imgZh = "";
								_this.imgSgbw = "";
								_this.imgDate = "";
								_this.imgBase64 = "";
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
			//文件夹外提交表单
			upDataWJJ() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				var _this = this;
				if (this.imgZh == "") {
					return this.$notify({
						title: '失败',
						message: "桩号不能为空~",
						type: 'error'
					});
				}
				if (this.imgSgbw == "") {
					return this.$notify({
						title: '失败',
						message: "施工部位不能为空~",
						type: 'error'
					});
				}
				if (this.imgDate == "") {
					return this.$notify({
						title: '失败',
						message: "时间不能为空~",
						type: 'error'
					});
				}
				if (this.imgBase64 == "") {
					return this.$notify({
						title: '失败',
						message: "请上传图片~",
						type: 'error'
					});
				}
				for (let i in this.imgNameArry) {
					if (this.imgXpmc == this.imgNameArry[i]) {
						return this.$notify({
							title: '失败',
							message: "照片名称已经存在~",
							type: 'error'
						});
					}
				}
				$.axse("post", "/baas/BZB03/PcPhotoManager/createImage", {
						imgTypeId: this.orgId, //图片文件图片文件夹ID  
						stakeCode: this.imgZh, //桩号(没有不传) 
						sCreateTime: this.imgDate, //拍摄时间 
						workSite: this.imgSgbw, //施工部位 
						namePrefix: this.imgMcqj, //名称前缀 
						projectName: this.fProjectQuanName, //项目名称 
						projectId: this.projectId, //项目id 
						k_picurl: this.imgBase64, //base64
						photoName: this.imgXpmc, //自定义部位名称 
						orgId: this.orgId, //层级id  
					},
					function(res) {
						_this.fromOffNewWJJ();
						_this.Getfolder(_this.orgId, _this.status, _this.projectId);
						_this.imgZh = "";
						_this.imgSgbw = "";
						_this.imgDate = "";
						_this.$message({
							message: '图片添加成功~~',
							type: 'success'
						});
						this.wjjShow = false;
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

			//文件夹外图片编辑
			wjjImgEnter() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				this.editWjj = true;

			},
			wjjImgLeave() {
				var onlyRead = JSON.parse(localStorage.getItem("qstToken")).readonly;
				if(onlyRead=="zd"){
					this.$notify({
						title: '失败',
						message: "该用户无此权限~",
						type: 'error'
					});
					return ;
				}
				this.editWjj = false;
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
			//获取项目
			Project() {
				var _this = this;
				$.axse("get", "/baas/PC/project/SelectProjectList", {
						UserID: this.token.sID
					},
					function(res) {
						var defaultPro = res.list[0].children[0];
						_this.projectName = defaultPro.label;
						_this.projectId = defaultPro.id;
						_this.fProjectQuanName = defaultPro.fProjectQuanName;
						_this.ProjectArry = res.list[0].children;
						_this.leftNav();

					},
					function(res) {
						console.log(res)
						if (res) {
							_this.$notify({
								title: '失败',
								message: "获取项目列表失败~",
								type: 'error'
							});

						}
					});
			},
			//切换项目
			handleCommand(command) {
//				console.log(this.ProjectArry)
				for (let i in this.ProjectArry) {
					if (this.ProjectArry[i].id == command) {
						this.projectName = this.ProjectArry[i].label;
						this.fProjectQuanName = this.ProjectArry[i].fProjectQuanName;
						this.projectId = command;
					}
				}
				this.leftNav();
				this.ab.length = 0;
				this.wjjImg.length = 0;
				this.orgId = "";
				console.log(this.fProjectQuanName)
			}
		},
		mounted: function() {
			this.imgUrl = imgUrl;
			this.GetToken();
			this.Project();
		},
	})


})
