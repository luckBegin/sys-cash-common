import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import {API} from '../API';
import {GET, POST, PUT} from '../../../decorators' ;
import {MsgService} from '../msg/msg.service' ;
import {Observable} from 'rxjs';
import {RESPONSE} from '../../models';

@Injectable({
	providedIn: 'root'
})
export class EnumService {
	constructor(
		private http: HttpClient,
		private msg: MsgService
	) {
	}

	@GET(API.enumUrl.typeAndArea)
	typeAndArea(data?: any): Observable< RESPONSE > | any {
	}
}
