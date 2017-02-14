import Immutable from 'immutable';

const REARRANGE = 'REARRANGE';
const INVERSE = 'INVERSE';

let imgsArrangeArr = [];
// 利用json-loader加载json文件
let imageData = require('json!../data/imagesData.json');
// 获取json文件里面每个图片的URL地址,并且初始化每个图片的Arrange信息
imageData =  ((imageDataArr) => {
	for(let i = 0,j = imageDataArr.length; i < j; i++){
		let image = imageDataArr[i];
		image.imageURL = require('../images/' + image.fileName);
		imageDataArr[i] = image;
		imgsArrangeArr.push({
			pos: {
		      left: 0,
		      top: 0
		    },
		    rotate: 0,
		    isInverse: false,
		    isCenter: false
		})
	}
	return imageDataArr;
})(imageData);

const initialState = {
	imgsArrangeArr,
	imageData
}

export default function image(state = initialState, action = {}){
	const newState = Immutable.fromJS(state);
	switch(action.type) {
		case REARRANGE:
			return newState.set('imgsArrangeArr', action.imgsArrangeArr).toJS();
		case INVERSE:
			return newState.updateIn(['imgsArrangeArr', action.index, 'isInverse'], value => !value).toJS();
		default:
			return state;
	}
}