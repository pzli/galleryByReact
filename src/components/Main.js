require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

// 利用json-loader加载json文件
let imageData = require('json!../data/imagesData.json');

// 获取json文件里面每个图片的URL地址
imageData =  ((imageDataArr) => {
	for(let i = 0,j = imageDataArr.length; i < j; i++){
		let image = imageDataArr[i];
		image.imageURL = require("../images/" + image.fileName);
		imageDataArr[i] = image;
	}
	return imageDataArr;
})(imageData);



class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
      	<section className="img-sec">
      	</section>
      	<nav className="controller-nav">
      	</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
