import {Injectable} from '@angular/core' ;
import {HttpClient} from '@angular/common/http' ;
import {MsgService} from '../msg/msg.service' ;
import {GET, Ignore, POST} from '../../../decorators' ;
import {API} from '../API' ;
import {ENUM, RESPONSE} from '../../models';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoomOrderService {
	constructor(
		private readonly http: HttpClient,
		private readonly msg: MsgService
	) {
	}

	static ENUM_Status: ENUM[] = [
		{ key: '未结算', value: 1 } ,
		{ key: '已结算', value: 2 } ,
		{ key: '已签送', value: 3 } ,
		{ key: '待退签送', value: 4 } ,
		{ key: '已兑积分', value: 5 } ,
		{ key: '待退积分', value: 6 } ,
		{ key: '线上点单', value: 7 } ,
		{ key: '已退线上', value: 8 } ,
	];

	@GET(API.room.order)
	public getList( para ?: any ): any | Observable< RESPONSE > {}

	@GET(API.room.orderItem + '/check')
	public getChecks( para ?: any ): any | Observable< RESPONSE > {}

	@GET( API.room.orderItem )
	public getItemList( para ?: any ): any | Observable< RESPONSE > {}

	@Ignore()
	@POST(API.room.orderItem + '/back')
	public backOrder( para ?: any ): any | Observable< RESPONSE > {}
}
