import { Injectable } from '@angular/core' ;
import {HttpClient} from "@angular/common/http";
import {MsgService} from "..";
import {API} from "../API";
import {GET} from "../../../decorators";
import {Observable} from "rxjs";
import {ENUM, RESPONSE} from "../../models";


@Injectable({providedIn:'root'})
export class RoomListService {
	constructor(
		private readonly http: HttpClient,
		private readonly msg: MsgService
	) {
	}

	@GET(API.room.list + '/all')
	public all( para?: any): any | Observable< RESPONSE > {} ;

	static ENUM_Status: ENUM[] = [
		{ key: '空台' , value: 1} ,
		{ key: '预定' , value: 2} ,
		{ key: '待客' , value: 3} ,
		{ key: '消费' , value: 4} ,
		{ key: '清理' , value: 5} ,
		{ key: '故障' , value: 6} ,
		{ key: '上线' , value: 7} ,
		{ key: '线上' , value: 8} ,
	]
}
