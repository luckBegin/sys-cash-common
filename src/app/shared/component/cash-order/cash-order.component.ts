import {Component, OnInit} from '@angular/core' ;
import {MsgService, RoomService} from '../../../service';
import {ENUM, RESPONSE} from '../../../models';
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
		private readonly service: RoomService
	) {}

	ngOnInit(): void {
		this.statusENUM = RoomService.ENUM_Status ;
	}

	statusENUM: ENUM[] = [] ;
	queryModel: QueryModel = new QueryModel() ;
	list: any[] = [] ;
	getList() {
		this.service.getList(this.queryModel)
			.pipe(
				filter( (res: RESPONSE) => res.success),
				map( (res: RESPONSE) => res.data )
			)
			.subscribe( (res: any[]) => {
				this.list = res ;
			});
	}
}
