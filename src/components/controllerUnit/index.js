
import React, { PropTypes } from 'react';

require('./styles.scss');

// 控制组件
export class ControllerUnit extends React.Component {

  static PropTypes = {
    imgsArrangeArr: PropTypes.array
  }
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
  render (){
    let ControllerUnitClassName = 'controller-unit';
    if(this.props.arrange.isCenter){
      ControllerUnitClassName += ' is-center';
      if(this.props.arrange.isInverse) {
        ControllerUnitClassName += ' is-inverse';
      }
    }
    return (
      <span className={ControllerUnitClassName} onClick={this.handleClick}></span>
      )
  }
}

