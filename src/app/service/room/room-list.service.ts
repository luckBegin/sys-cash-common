import { Injectable } from '@angular/core' ;
import {HttpClient} from "@angular/common/http";
import {MsgService} from "..";
import {API} from "../API";
import {GET} from "../../../decorators";
import {Observable} from "rxjs";
import {RESPONSE} from "../../models";


@Injectable({providedIn:'root'})
export class RoomListService {
	constructor(
		private readonly http: HttpClient,
		private readonly msg: MsgService
	) {
	}

	@GET(API.room.list + '/all')
	all( para?: any): any | Observable< RESPONSE > {} ;
}
