import {Injectable} from '@angular/core' ;
import {HttpClient} from '@angular/common/http' ;
import {MsgService} from '../msg/msg.service' ;
import {GET, POST} from '../../../decorators' ;
import {API} from '../API' ;
import {ENUM, RESPONSE} from '../../models';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoomService {
	constructor(
		private readonly http: HttpClient,
		private readonly msg: MsgService
	) {
	}

	static ENUM_Status: ENUM[] = [
		{ key: '未结算', value: 0 } ,
		{ key: '已结算', value: 1 } ,
		{ key: '已签送', value: 2 } ,
		{ key: '待退签送', value: 3 } ,
		{ key: '已兑积分', value: 4 } ,
		{ key: '待退积分', value: 5 } ,
		{ key: '线上点单', value: 6 } ,
		{ key: '已退线上', value: 7 } ,
	];

	@GET(API.room.order)
	public getList( para ?: any ): any | Observable< RESPONSE > {}
}
