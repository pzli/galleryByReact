const REARRANGE = 'REARRANGE';
const INVERSE = 'INVERSE';

// 获得一个范围随机值
const getRangeRandom = (low, high) => {
	return Math.floor(Math.random() * (high - low) + low);
}

// 获得一个正负30之间的随机值
const get30DegRandom = () => {
	return ((Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30));
}

//重新排布图片的位置
export function rearrange (centerIndex, imgsArrangeArr, stage) {
	let centerPos = stage.centerPos,
		hPosRange = stage.hPosRange,
		vPosRange = stage.vPosRange,
		hPosRangeLeftSecX = hPosRange.leftSecX,
		hPosRangeRightSecX = hPosRange.rightSecX,
		hPosRangeY = hPosRange.y,
		vPosRangeX = vPosRange.x,
		vPosRangeTopY = vPosRange.topY;


	let topImgNum = Math.floor(Math.random() * 2); // 取0个或者1个分布在上侧
	let imgsArrangeTopArr = [];

	// 取居中的图片,设置状态信息
	let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

	imgsArrangeCenterArr[0] = {
		pos: centerPos,
		rotate: 0,
		isCenter: true,
		isInverse: false
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
			isCenter: false,
			isInverse: false
		}
	});

	// 去左右两侧的图片，设置状态信息
	for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
		let hPosRangeLorRSecX = null;

		//由于k是j的一半，前半部为左，后半部分为右
		if (i < k) {
			hPosRangeLorRSecX = hPosRangeLeftSecX;
		} else {
			hPosRangeLorRSecX = hPosRangeRightSecX;
		}

		imgsArrangeArr[i] = {
			pos: {
				top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
				left: getRangeRandom(hPosRangeLorRSecX[0], hPosRangeLorRSecX[1])
			},
			rotate: get30DegRandom(),
			isCenter: false,
			isInverse: false
		}
	}

	// 将splice取出来的元素再添加进原数组，这两句不能颠倒顺序，要不就会出bug，导致点击的不能变到中间

	if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
		imgsArrangeArr.splice(topImgIndex, 0, imgsArrangeTopArr[0]);
	}
	imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

	return {
		type: REARRANGE,
		imgsArrangeArr
	}
}


// 翻转函数，利用闭包，沟通函数外部和函数内部
export function inverse (index){
	return {
		type: INVERSE,
		index
	}
}