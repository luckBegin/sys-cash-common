import {Component, OnInit} from '@angular/core' ;
import {MsgService, RoomOrderService} from '../../../../service';
import {ENUM, RESPONSE} from '../../../../models';
import {QueryModel} from './query.model';
import {filter, map} from 'rxjs/operators';

@Component({
	selector: 'cash-order',
	templateUrl: './cash-order.component.html',
	styleUrls: ['./cash-order.component.less']
})
export class CashOrderComponent implements OnInit {
	constructor(
		private readonly msg: MsgService,
		private readonly service: RoomOrderService
	) {}

	ngOnInit(): void {
		this.statusENUM = RoomOrderService.ENUM_Status ;
		this.getList() ;
	}

	public statusENUM: ENUM[] = [] ;

	private queryModel: QueryModel = new QueryModel() ;

	public list: any[] = [] ;

	private getList() {
		this.service.getList(this.queryModel)
			.pipe(
				filter( (res: RESPONSE) => res.success),
				map( (res: RESPONSE) => res.data )
			)
			.subscribe( (res: any[]) => {
				this.list = res ;
			});
	}

	public changeStatus( status: number | string ): void {
		this.queryModel.status = status ;
		this.getList() ;
	}

	public orderItemList: any[] = [] ;
	public orderItemSelect: any = {} ;
	public orderSelect( item ) {
		this.orderItemList = item ;
		this.service.getItemList({ orderId: item.id })
			.pipe(
				filter( (res: RESPONSE) => res.success),
				map( (res: RESPONSE) => res.data )
			)
			.subscribe( (res: any[]) => {
				this.orderItemList = res ;
			});
	}
}
