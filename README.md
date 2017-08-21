### 可定制的弹出框组件
慕课网教程之一, 使用原生JS, 以面向对象的方式编写的一个弹出框组件, 可以定制各式各样不同的弹出框. 弹出框内容暂时定为header(显示对应的图标, 有成功ok、警告warning以及等待loading等)、content(弹出框中需要显示什么信息)以及footer(可以在里面存放按钮组)

**使用方法:**
#### 步骤1
在HTML页面中引入 zepto, 因为该组件的内容是依赖于zepto运行的

```html
<script src="js/zepto.js"></script>
```

#### 步骤2
引入该组件dialog.js

```html
<script src="js/zepto.js"></script>
```

#### 步骤3
在HTML中添加一段script脚本, 或者在HTML引用的JS文件中添加如下内容:
```js
var d = $.dialog({
  width: 100,	      // 如果想要限定弹出框的宽度和高度的话, 通过width和height来指定
  height: 50,
  type: 'warning',	  // 暂时只有ok(成功), warning(警告)和loading(加载中), 分别表示显示不同类型的弹                       // 出框,区别在于弹出框顶部的图标不同
  buttons: [],	      // 想要在对话框的底下面添加
  delay: 5000,	      // 弹出框多久之后自动关闭, 如果不想要自动关闭, 则不需要传递该参数
  delayCallback: function(){...},	// 自动关闭后的回调函数(在里面执行后续的操作)
  maskOpacity: 0.5,	  // 指定弹出框背后遮罩层的透明度
  effect: true,	      // 是否启用动画效果, 也就是弹出框出来的过程是直接出来的还是有一个动画效果,true为                       // 开启动画效果,false为关闭
  closeByClickMask	  // 指定是否开启点击遮罩层达到关闭弹出框效果的功能,true表示开启, false表示关闭
})
```

#### 步骤4
如果针对弹出框里面的各个按钮要指定点击事件的处理函数的话, 针对上面部分的buttons属性进行扩展
```js
buttons: [
  {
    type: 'red',            // 指定按钮的颜色,目前只有red和green,区别仅在于背景色不同
    text: 'xxx',            // 按钮上面显示的文字
    callback: function() {	// 按钮的回调函数,点击按钮执行的操作
      alert(1);
      return true;	        // 执行完所有操作后是否关闭弹出框,return true则关闭弹出框, return false                             // 则不关闭
    }
  }
]
```
