;(function($){
	var Dialog = function(config) {
		var _this = this;

		// 默认参数配置
		this.config = {
			// 对话框的宽高
			width: "auto",
			height: "auto",
			// 对话框的提示信息
			message: null,
			// 弹出框的类型
			type: 'loading',
			// 按钮配置
			buttons: null,
			// 弹出框延迟多久关闭
			delay: null,
			// 对话框遮罩层透明度
			maskOpacity: null,
			// 是否启用动画
			effect: null
		};

		// 扩展默认参数
		if (config && $.isPlainObject(config)) {
			// 如果HTML文件传递了配置信息的情况下
			// 将第二个参数(前端传递过来)的内容扩展第一个参数的内容
			$.extend(this.config, config);
		} else {
			// 如果没有传递配置对象, 则弹出默认的loading弹出框
			this.hasDeliverConfig = false;
		}

		// 创建弹出框基本的DOM
		this.body = $('body');
		// 创建遮罩层
		this.mask = $('<div class="g-dialog-container"></div>');
		// 创建弹出框
		this.win = $('<div class="dialog-window"></div>');
		// 创建弹出框头部
		this.winHeader = $('<div class="dialog-header"></div>');
		// 创建弹出框提示信息
		this.winContent = $('<div class="dialog-content"></div>');
		// 创建弹出框底部内容 
		this.winFooter = $('<div class="dialog-footer"></div>');
		
		// 渲染DOM
		this.createDialog();
	}
	// 记录弹框的层级
	Dialog.zIndex = 10000;
	Dialog.prototype = {
		// 动画函数
		animate: function() {
			var _this_ = this;
			this.win.css('-webkit-transform', 'scale(0,0)');
			setTimeout(function() {
				_this_.win.css('-webkit-transform', 'scale(1,1)');
			}, 100);
		},
		// 创建弹出框
		createDialog: function() {
			var _this_ = this,
				config = this.config,
				mask = this.mask,
				win = this.win,
				header = this.winHeader,
				content = this.winContent,
				footer = this.winFooter,
				body = this.body;

			// 增加弹框的层级
			Dialog.zIndex++;
			this.mask.css('zIndex', Dialog.zIndex);
			// 如果前面html页面没有传递config参数的话, 弹出loading弹出框
			if (this.hasDeliverConfig === false) {
				win.append(header.addClass('loading'));

				if (config.effect === true) {
					this.animate();
				}

				mask.append(win);
				body.append(mask);
			} else {
				// 根据配置参数显示相应的弹框
				win.append(header.addClass(config.type));
				// 如果传递了信息文本
				if(config.message) {
					win.append(content.html(config.message));
				}
				// 按钮组
				if (config.buttons) {
					this.createButtons(footer, config.buttons);
					win.append(footer);
				}
				// 设置弹出框的宽和高
				if (config.width !== 'auto') {
					win.width(config.width);
				}
				if(config.height !== 'auto') {
					win.height(config.height);
				}
				// 设置弹出框的透明度
				if (config.maskOpacity) {
					mask.css('background-color', 'rgba(0, 0, 0,' + config.maskOpacity + ')');
				}
				mask.append(win);
				body.append(mask);
				// 设置弹出框弹出多久后多久关闭
				if (config.delay && config.delay !== 0) {
					setTimeout(function() {
						_this_.close();
					}, config.delay);
				}

				if (config.effect === true) {
					this.animate();
				}
			}
		},
		close: function() {
			this.mask.remove();
		},
		// 根据配置参数的buttons创建按钮列表
		createButtons: function(footer, buttons) {
			var _this_ = this;
			$(buttons).each(function(index, val) {
				// 获取按钮的样式和回调文本
				var type = val.type ? val.type : "",
					btnText = val.text ? val.text : "按钮" + (index + 1),
					callback = val.callback ? val.callback : null;
				var button = $('<button class="' + type + '">' + btnText + '</button>');

				if (callback) {
					button.tap(function() {
						var wantToClose = callback();
						if (wantToClose === true) {
							_this_.close();
						}
					});
				} else {
					button.tap(function() {
						_this_.close();
					});
				}
				footer.append(button);
			});
		}
	}

	window.Dialog = Dialog;

	$.dialog = function(config){
		return new Dialog(config);
	}
})(Zepto);