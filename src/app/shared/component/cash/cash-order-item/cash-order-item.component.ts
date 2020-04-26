import {Component, Input, OnInit} from "@angular/core";
import {ngIfAnimation} from "../../../../router/router-animation";
import {Form, FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
	selector: 'cashOrderItem',
	templateUrl: './cash-order-item.component.html' ,
	styleUrls: ['./cash-order-item.component.less'] ,
	animations: [ngIfAnimation]
})
export class CashOrderItemComponent implements OnInit{
	constructor(
		private readonly fb: FormBuilder
	) {};

	ngOnInit(): void {
	}

	@Input() data: any[] = [];

	private addFormListMap: { [key:string]: number } = {} ;

	public addToBack(data:any): void {
		if( this.addFormListMap.hasOwnProperty(data.id)) {
			this.removeForm( data ) ;
		} else {
			this.addForm( data )
		}
	}

	public backCancel(): void{
		this.form.reset() ;
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
			max: [ item.count ]
		}));
	}

	private removeForm(item): void {
		const idx = this.addFormListMap[item.id];
		this.list.removeAt( idx ) ;
		delete this.addFormListMap[item.id] ;
	}
}
