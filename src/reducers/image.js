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
	switch(action.type) {
		case REARRANGE:
			return {
				...state,
				imgsArrangeArr: [...action.imgsArrangeArr]
			};

		case INVERSE:
			let index = action.index;
			let arrange = state.imgsArrangeArr[index];
			let before = state.imgsArrangeArr.slice(0, index);
			let after = state.imgsArrangeArr.slice(index + 1);
			return {
				...state,
				imgsArrangeArr: [
					...before,
					{
						...arrange,
						isInverse: !arrange.isInverse
					},
					...after
				]
			};

		default:
			return state;

	}
}