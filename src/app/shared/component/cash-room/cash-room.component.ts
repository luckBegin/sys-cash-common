import {Component, OnInit} from '@angular/core';
import {MsgService} from '../../../service';
import {ENUM, RESPONSE} from '../../../models';
import {EnumService} from '../../../service/enum/enum.service';
import {interval, Subscribable, Subscription} from "rxjs";
import {CONFIG} from "../../../CONFIG";
import {AdaptorUtils} from "../../utils";

@Component({
	selector: 'cash-room' ,
	templateUrl: './cash-room.component.html',
	styleUrls: ['./cash-room.component.less']
})
export class CashRoomComponent implements OnInit {
	constructor(
		private readonly msg: MsgService ,
		private enumSer: EnumService
	) {}

	ngOnInit(): void {

	}

	type_ENUM: ENUM[] = [] ;
	area_ENUM: ENUM[] = [] ;

	ajaxTimer$: Subscription ;

	getList(): void {

	}

	getENUMS(): void {
		this.enumSer.typeAndArea()
			.subscribe((res: RESPONSE) => {
				this.type_ENUM = AdaptorUtils.reflect(res.data.type , { id: 'value' , name: 'key'}) ;
				this.area_ENUM = AdaptorUtils.reflect(res.data.area , { id: 'value' , name: 'key'}) ;
			});
	}

	init(type: number ): void {
		if( type === 1 ) {
			this.getENUMS() ;
			this.getList() ;

			this.ajaxTimer$ = interval(CONFIG.timer)
				.subscribe( () => {
					this.getList()
				})
		} else {
			if( this.ajaxTimer$ )
				this.ajaxTimer$.unsubscribe() ;
		}
	}
}
