
利用react全家桶和webpack完成了一个图片画廊，示例地址https://pzli.github.io/galleryByReact

要完成功能总结：
1、 利用json存储图片信息，利用url-loader获得每个图片的url地址，存在json的每个对象里

2、 将stage分为img-sec和controller-nav两个部分

3、 将img-sec分为上、左、右三个部分，每个部分分布不同个数的图片，每个图片的position设置为absolute，top和left值随机分布，中间部分为选中的那个图片


4、 controller-nav与图片的Index关联起来，也能控制图片的移动渲染

5、 每个图片用figure表示，里面有一个img和一个figcaption（title）

6、 图片可以翻转，翻转过来的文本值是json里面的每个对象的desc值

利用yeoman脚手架搭建

yo react-webpack projectName

v1.0 只是利用ES6、webpack、react完成功能


v2.0 将main.js三个组件分为三个单独的文件，添加redux，将相关事件用redux完成

v3.0 利用immutable中的语法糖和相关的不可更改的特性修改reducer



整个项目中出现的问题：


1、本来认为图片翻转是单个图片自己的任务，所以想把图片翻转这个方法放在imgFigute里，然后父子组件通信，只是给父组件一个flag标记，告诉父组件这个子组件翻转了。

最后没有采用这种方法，第一个原因是还有一个controllerUnit组件，这个组件同样控制着图片的翻转，如果把图片翻转放在imgureFigure组件里，子组件把状态返回父组件，父组件再传给controller组件，有点多此一举，而且controller组件也可以实现图片翻转，所以把这个状态和函数直接存到总组件是合适的，管理着不同序号的图片的状态。

2、第二个问题是项目能正常运行，但总是报一个警告。

	Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `AppComponent`. See https://fb.me/react-warning-keys for more information.
	    in ImgFigure (created by AppComponent)
	    in AppComponent
	   
这个警告指的是，如果每一个子组件是一个数组或迭代器的话，那么必须有一个唯一的key prop。

key是每次用来作Virtual DOM diff的，每一个子组件的序号应当是一个独一为二的值，例如学生序列的学号，而不是一个随机的index（在项目中经常这样做，但这种做法不推荐），因为加入用了一个随机键，那么不论有没有相同的项，都会重新渲染。

