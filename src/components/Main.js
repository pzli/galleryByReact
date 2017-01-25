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


class ImgFigure extends React.Component {
  render(){

    return (
        <figure className="img-figure">
          <img src={this.props.data.imageURL} alt={this.props.data.title}/>
          <figcaption>
            <h2 className="img-title">{this.props.data.title}</h2>
          </figcaption>
        </figure>
      );
  }

}


class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.Constant = {
      centerPos: { /*中心区域*/
        left:0,
        top: 0
      },
      hPosRange: {
        leftSecX: [0,0],
        rightSecX: [0,0],
        y: [0,0]
      },
      vPosRange: {
        x: [0,0,],
        topY: [0,0]
      }
    };
    this.stage = {
      imgsArrangeArr : [
        /*{
          pos: {
            left: "0",
            top: "0"
          }
        }*/
      ]
    }
  }

  //重新排布图片的位置
  rearrange(centerIndex){

  }

  componentDidMount(){
    // 获取stage的宽和高
    let stageDOM = React.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW/2),
        halfStageH = Math.ceil(stageH/2);
    // 获得单独一个ImgFigure的宽和高
    let imgFigDOM = React.findDOMNode(this.refs.ImgFigure0),
        imgW = imgFigDOM.scrollWidth,
        imgH = imgFigDOM.scrollHeight,
        halfImgW = Math.ceil(imgH/2),
        halfImgH = Math.ceil(imgH/2);
    // 中心区域的Range
    this.Constant.centerPos.left = halfStageW - halfImgW;
    this.Constant.centerPos.top = halfStageH - halfImgH;
    // 左侧、右侧两个区域的Range
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    // 上侧区域的Range
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - imgH;

    // 将第0个居中显示
    this.rearrange(0);
  }

  render() {

    let ImageArr = [],
        ControllerArr = [];

    imageData.forEach((value,index) => {
      if(!this.stage.imgsArrangeArr[index]) {
        this.stage.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          }
        }
      }
      ImageArr.push(<ImgFigure data={value} ref={"ImgFigure"+index}/>)

    })

    return (
      <section className="stage" ref="stage">
      	<section className="img-sec">
          {ImageArr}
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


// 利用json存储图片信息，利用url-loader获得每个图片的url地址，存在json的每个对象里

// 将stage分为img-sec和controller-nav两个部分

// 将img-sec分为上、左、右三个部分，每个部分 分布不同个数的图片，每个图片的position设置为absolute，top和left值随机分布
// 中间部分为选中的那个图片


// controller-nav与图片的Index关联起来，也能控制图片的移动渲染

// 每个图片用figure表示，里面有一个img和一个figcaption（title）

//  图片可以翻转，翻转过来的文本值是json里面的每个对象的desc值