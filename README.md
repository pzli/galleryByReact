
利用react全家桶和webpack完成了一个图片画廊，示例地址https://pzli.github.io/galleryByReact

要完成功能总结：
1、 利用json存储图片信息，利用url-loader获得每个图片的url地址，存在json的每个对象里

2、 将stage分为img-sec和controller-nav两个部分

3、 将img-sec分为上、左、右三个部分，每个部分分布不同个数的图片，每个图片的position设置为absolute，top和left值随机分布，中间部分为选中的那个图片


4、 controller-nav与图片的Index关联起来，也能控制图片的移动渲染

5、 每个图片用figure表示，里面有一个img和一个figcaption（title）

6、 图片可以翻转，翻转过来的文本值是json里面的每个对象的desc值



v1.0 只是利用ES6、webpack、react完成功能


v2.0 将main.js三个组件分为三个单独的文件，添加redux，将相关事件用redux完成

