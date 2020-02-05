import {Injectable} from '@angular/core' ;
import {HttpClient} from '@angular/common/http' ;
import {MsgService} from '../msg/msg.service' ;
import {DELETE, GET, POST, PUT} from '../../../decorators' ;
import {API} from '../API' ;
import {ENUM, RESPONSE} from '../../models';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoomBookService {
	constructor(
		private readonly http: HttpClient,
		private readonly msg: MsgService
	) {
	}

	@GET(API.room.book + '/list')
	public list( para?: any): any | Observable< RESPONSE > {} 

	@POST(API.room.book + '/book')
	public book( para?: any): any | Observable< RESPONSE > {}

	@POST(API.room.book + '/direct')
	public direct( para?: any): any | Observable< RESPONSE > {}

	@PUT(API.room.book )
	public put( para?: any): any | Observable< RESPONSE > {}

	@DELETE(API.room.book)
	delete(data: any ): Observable< RESPONSE >| any {}
}
