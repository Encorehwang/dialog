### 可定制的弹出框组件
慕课网教程之一, 使用原生JS, 以面向对象的方式编写的一个弹出框组件, 可以定制各式各样不同的弹出框. 弹出框内容暂时定为header(显示对应的图标, 有成功ok、警告warning以及等待loading等)、content(弹出框中需要显示什么信息)以及footer(可以在里面存放按钮组)

**使用方法:**
##### 步骤1
引入 zepto, 因为该组件的内容是依赖于zepto运行的

##### 步骤2
引入该组件dialog.js

##### 步骤3
在HTML中添加一段script脚本, 或者在HTML引用的JS文件中添加如下内容:
```js
var d = $.dialog({
  type: 'red'	//
})
```