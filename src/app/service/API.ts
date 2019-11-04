export const HOST: string = 'http://api.jpgqs.cn';
const system = {
	staff: HOST + '/system/staff',
	changePass: HOST + '/system/staff/changePass',
};

const room = {
	order: HOST + '/room/order' ,
	list: HOST + '/room/list'
};

const calc = {
	timePrice: HOST + '/calc/timePrice',
	outrightPrice: HOST + '/calc/outrightPrice'
};
const utils = {
	currentDate: HOST + '/utils/date'
};
const basic = {
	payment: HOST + '/basic/payment/byConditions'
};

const weChat = {
	qrCode: HOST + '/wechat/qrCode'
};

const vip = {
	info: HOST + '/vip/user' ,
	type: HOST + '/vip/type/all' ,
	bindCard: HOST + '/vip/user/bindCard' ,
	integral: HOST + '/vip/user/integral'
};
const enumUrl = {
	typeAndArea: HOST + '/enum/typeAndArea'
}
const WSUrl: string = 'ws://localhost:3333' ;
export const API = {system, room, calc, utils, basic, weChat , vip  , WSUrl, enumUrl };
