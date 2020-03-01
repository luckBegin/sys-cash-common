import {Injectable} from '@angular/core';
import {MsgService} from '..';
import {HttpClient} from '@angular/common/http';
import {POST} from '../../../decorators';
import {API} from '../API';
import {Observable} from 'rxjs';
import {RESPONSE} from '../../models';

@Injectable({providedIn: 'root'})
export class RoomOperateService {
	constructor(
		private readonly msg: MsgService ,
		private readonly http: HttpClient
	) {}

	@POST(API.room.operate + '/open')
	open( data?: any): any | Observable< RESPONSE > {}

	@POST(API.room.operate + '/clean')
	clean( data?: any): any | Observable< RESPONSE > {}
}
