import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {ngIfAnimation} from "../../../../router/router-animation";
import {Form, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MsgService, RoomOrderService} from "../../../../service";
import {RESPONSE} from "../../../../models";

@Component({
	selector: 'cashOrderItem',
	templateUrl: './cash-order-item.component.html' ,
	styleUrls: ['./cash-order-item.component.less'] ,
	animations: [ngIfAnimation]
})
export class CashOrderItemComponent implements OnInit , OnChanges{
	constructor(
		private readonly fb: FormBuilder ,
		private readonly orderSer: RoomOrderService ,
		private readonly msg: MsgService
	) {};

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if( changes.data && changes.data.currentValue ) {
			if( this.checkList ) {
				const checkNo = this.checkList.checkNo ;
				this.checkList = changes.data.currentValue.find( item => item.checkNo = checkNo ) ;
			}
		}
	}

	@Input() data: any[] = [];

	private addFormListMap: { [key:string]: number } = {} ;

	public addToBack(data:any): void {
		if( this.addFormListMap.hasOwnProperty(data.id)) {
			this.removeForm( data.id ) ;
		} else {
			this.addForm( data )
		}
	}

	public backCancel(): void{
		while (this.list.length !== 0) {
			this.list.removeAt(0) ;
		}
		this.addFormListMap = {} ;
	}

	public form: FormGroup = this.fb.group({
		list: this.fb.array([])
	})

	get list() : FormArray {
		return this.form.get('list') as FormArray ;
	}

	private addForm( item ): void {
		this.addFormListMap[item.id] = this.list.controls.length ;
		this.list.push(this.fb.group({
			count: [ item.count] ,
			id: [ item.id ] ,
			name: [item.name] ,
			shouldMoney: [item.shouldMoney] ,
			max: [ item.count ] ,
			orderId: [item.orderId] ,
			shopId: [ item.shopId ]
		}));
	}

	private removeForm(id): void {
		const idx = this.addFormListMap[id];
		this.list.removeAt( idx ) ;
		delete this.addFormListMap[id] ;
	}

	public backOrder(): void {
		const val = this.list.value ;
		this.orderSer.backOrder( val )
			.subscribe( (res: RESPONSE) => {
				this.msg.success('退单成功') ;
				this.operate.emit('fresh') ;
				this.backCancel() ;
			})
	}

	public checkList: any = null ;

	public checkIndex: number = null ;

	public checkSelect(item:any , idx: number): void {
		this.checkIndex = idx ;
		this.checkList = item ;
	}

	@Output() operate: EventEmitter< any > = new EventEmitter() ;
}
