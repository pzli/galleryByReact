require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
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


// 获得一个范围随机值
const getRangeRandom = (low,high) => {
  return Math.floor(Math.random() * (high - low) + low);
}

// 获得一个正负30之间的随机值
const get30DegRandom = () => {
  return ((Math.random() > 0.5 ? "" : "-") + Math.floor(Math.random() * 30));
}

// 单个图片组件
class ImgFigure extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if(this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  }


  // 渲染函数
  render(){

    let styleObj = {};
    // 如果传进来的props里有pos属性，则使用position属性
    if(this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    // 如果传进来的props里有rotate属性，则添加这个属性，要注意浏览器厂商前缀
    if(this.props.arrange.rotate) {
      ["Moz" ,"Ms" ,"Webkit", ""].forEach((value) => {
       styleObj[value + "Transform"] = "rotate(" + this.props.arrange.rotate + "deg)";
      });
    }
    // 使中心图片不被遮挡
    if(this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    let ImgFigureClassName = "img-figure";
    ImgFigureClassName += this.props.arrange.isInverse ? " is-inverse " : "";

    return (
        <figure className={ImgFigureClassName} style={styleObj} onClick={this.handleClick}>
          <img src={this.props.data.imageURL} alt={this.props.data.title}/>
          <figcaption>
            <h2 className="img-title">{this.props.data.title}</h2>
            <div className="img-back" onClick={this.handleClick}>
              <p>
                {this.props.data.desc}
              </p>
            </div>
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
    this.state = {
      imgsArrangeArr: [
        /*{
          pos: {
            left: "0",
            top: "0"
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }*/
      ]
    }
  }

  //重新排布图片的位置
  rearrange(centerIndex){
    let imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeX = vPosRange.x,
        vPosRangeTopY = vPosRange.topY;


    let topImgNum = Math.floor(Math.random() * 2); // 取0个或者1个分布在上侧
    let imgsArrangeTopArr = [];

    // 取居中的图片,设置状态信息
    let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    }

    // 取上侧的图片,设置状态信息
    let topImgIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgIndex, topImgNum);

    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index] = {
        pos: {
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }  
    });

    // 去左右两侧的图片，设置状态信息
    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLorRSecX = null;

      //由于k是j的一半，前半部为左，后半部分为右
      if(i < k) {
        hPosRangeLorRSecX = hPosRangeLeftSecX;
      }else {
        hPosRangeLorRSecX = hPosRangeRightSecX;
      }

      imgsArrangeArr[i]= {
        pos: {
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLorRSecX[0], hPosRangeLorRSecX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    }

    // 将splice取出来的元素再添加进原数组，这两句不能颠倒顺序，要不就会出bug，导致点击的不能变到中间

    if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgIndex,0,imgsArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);


    // setState，让component重新渲染
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    })

  }

  // 翻转函数，利用闭包，沟通函数外部和函数内部
  Inverse(index){
    return () => {
      let imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      })
    }
  }

  // 中心函数
  Center(index){
    return () => {
      this.rearrange(index);
    }
  }
  // 组件渲染完毕调用的hook函数
  componentDidMount(){
    // 获取stage的宽和高
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.floor(stageW/2),
        halfStageH = Math.floor(stageH/2);
    // 获得单独一个ImgFigure的宽和高
    let imgFigDOM = ReactDOM.findDOMNode(this.refs.ImgFigure0),
        imgW = imgFigDOM.scrollWidth,
        imgH = imgFigDOM.scrollHeight,
        halfImgW = Math.floor(imgH/2),
        halfImgH = Math.floor(imgH/2);
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
    let centerNum = Math.floor(Math.random() * this.state.imgsArrangeArr.length);
    this.rearrange(centerNum);
  }

  // 渲染函数
  render() {

    let ImageArr = [],
        ControllerArr = [];

    imageData.forEach((value,index) => {
      if(!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isCenter: false,
          isInverse: false
        }
      }
      ImageArr.push(<ImgFigure data={value} ref={"ImgFigure"+index} arrange={this.state.imgsArrangeArr[index]}
                       inverse={this.Inverse(index)} center={this.Center(index)}/>)

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