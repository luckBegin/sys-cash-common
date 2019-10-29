import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core' ;
import {MsgService, RoomOrderService} from '../../../service' ;
import {ngIfAnimation} from '../../../router/router-animation' ;
import {CashRoomComponent} from '../../../shared/component/cash-room/cash-room.component';
import {CashOrderComponent} from '../../../shared/component/cash-order/cash-order.component';
import {NzTabChangeEvent} from "ng-zorro-antd";

@Component({
	selector: 'cash',
	templateUrl: './cash.component.html',
	styleUrls: ['./cash.component.less'],
	animations: [ngIfAnimation]
})
export class CashComponent implements OnInit{
	constructor(
		private readonly service: RoomOrderService,
		private readonly msg: MsgService,
	) {
	}

	@ViewChild('cashRoomComponent')
	private cashRoomComponent: CashRoomComponent ;

	@ViewChild('cashOrderComponent')
	private cashOrderComponent: CashOrderComponent ;

	ngOnInit(): void {
		this.init(0)
	}

	private init(type: number) {
		this.cashRoomComponent.init( type ) ;
	}

	public tabChange($event:NzTabChangeEvent): void{
		this.init($event.index);
	}
}
