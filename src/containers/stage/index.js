
import React,{ PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { inverse, rearrange } from 'actions/image';
import { ImgFigure } from 'components/imgFigure';
import { ControllerUnit } from 'components/controllerUnit';

require('normalize.css/normalize.css');
require('./styles.scss');

export class Stage extends React.Component {
    // PropTypes的作用是用来验证组件实例的属性是否符合要求
  static PropTypes = {
      imgsArrangeArr: PropTypes.array,
      imageData: PropTypes.array,
      stage: PropTypes.object
  }
  constructor(props){
    super(props);
    this.state = {
      stage: {}
    }
  }
  init(size){
    const {stageW, stageH, imgW, imgH} = size;
    const stage = {
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
          x: [0,0],
          topY: [0,0]
        }
    };

    const halfStageW = Math.floor(stageW/2),
          halfStageH = Math.floor(stageH/2),
          halfImgW = Math.floor(imgH/2),
          halfImgH = Math.floor(imgH/2);
    // 中心区域的Range
    stage.centerPos.left = halfStageW - halfImgW;
    stage.centerPos.top = halfStageH - halfImgH;
    // 左侧、右侧两个区域的Range
    stage.hPosRange.leftSecX[0] = -halfImgW;
    stage.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    stage.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    stage.hPosRange.rightSecX[1] = stageW - halfImgW;
    stage.hPosRange.y[0] = -halfImgH;
    stage.hPosRange.y[1] = stageH - halfImgH;
    // 上侧区域的Range
    stage.vPosRange.x[0] = halfStageW - imgW;
    stage.vPosRange.x[1] = halfStageW;
    stage.vPosRange.topY[0] = -halfImgH;
    stage.vPosRange.topY[1] = halfStageH - imgH;

    return stage;

  }

  // 组件渲染完毕调用的hook函数
  componentDidMount(){
    // 获取stage的宽和高
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight;
    // 获得单独一个ImgFigure的宽和高
    let imgFigDOM = ReactDOM.findDOMNode(this.refs.ImgFigure0),
        imgW = imgFigDOM.scrollWidth,
        imgH = imgFigDOM.scrollHeight;
    const stage = this.init({
      stageW,
      stageH,
      imgW,
      imgH
    });

    this.setState({
      stage
    });


    // 将第0个居中显示
    let centerNum = Math.floor(Math.random() * this.props.imgsArrangeArr.length);
    this.props.rearrange(centerNum, this.props.imgsArrangeArr, stage);
  }

  Inverse(index){
    return () => {
      this.props.inverse(index);
    }
  }

  // 中心函数
  Center(index){
    return () => {
      this.props.rearrange(index, this.props.imgsArrangeArr, this.state.stage);
    }
  }
  // 渲染函数
  render() {

    let ImageArr = [],
        ControllerArr = [];

    this.props.imageData.forEach((value,index) => {
      ImageArr.push(<ImgFigure data={value} ref={'ImgFigure'+index} arrange={this.props.imgsArrangeArr[index]}
                       inverse={this.Inverse(index)} center={this.Center(index)}/>);

      ControllerArr.push(<ControllerUnit arrange={this.props.imgsArrangeArr[index]}
                       inverse={this.Inverse(index)} center={this.Center(index)}/>);

    })

    return (
      <section className="stage" ref="stage">
      	<section className="img-sec">
          {ImageArr}
      	</section>
      	<nav className="controller-nav">
          {ControllerArr}
      	</nav>
      </section>
    );
  }
}


export default connect((state) =>{
  return {
    imgsArrangeArr: state.image.imgsArrangeArr,
    imageData: state.image.imageData
  }
},{inverse, rearrange})(Stage);
