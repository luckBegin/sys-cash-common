import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core' ;
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonValidator} from '../../validators/common.validator';
import {ENUM, RESPONSE} from '../../../models';
import {AdaptorUtils} from '../../utils';
import {StaffService} from '../../../service/system';

@Component({
	selector: 'common-room-info',
	templateUrl: './room-info.component.html' ,
	styleUrls: ['./room-info.component.less']
})
export class CommonRoomInfoComponent implements OnInit, OnChanges{
	constructor(
		private readonly fb: FormBuilder ,
		private readonly staffService: StaffService
	) {}
	ngOnInit(): void {
		this.getManagerList() ;
	}

	@Input() roomInfo: any ;
	@Input() allowEdit: boolean = true;

	ngOnChanges(changes: SimpleChanges): void {
		if ( changes.roomInfo ) {
			this.formTactics() ;
		}
	}

	public form: FormGroup = this.fb.group({
		id: [null] ,
		name: [ null , [ Validators.required ]] ,
		num: [ null ],
		tel: [null, [ CommonValidator.isTel ] ],
		reserveDate: [ null , [ Validators.required ]],
		createTime: [ null ],
		createUser: [ null , ],
		remark: [ null ]
	});

	public ENUM_Manager: ENUM[] = [];

	private getManagerList(): void {
		this.staffService.managerAllList()
			.subscribe((res: RESPONSE) => {
				this.ENUM_Manager = AdaptorUtils.reflect( res.data , {
					name: 'key' ,
					staffId: 'value'
				});
			});
	}

	public getForm(): FormGroup {
		return this.form ;
	}

	public formTactics(): void {
		if ( this.roomInfo ) {
			if (this.roomInfo.bookInfo) {
				this.form.patchValue(this.roomInfo.bookInfo);
			} else {
				this.form.reset() ;
			}

			if (
				( this.roomInfo.status === 2 || this.roomInfo.status === 1)
				&& this.allowEdit === true
			) {
				this.form.enable() ;
			} else {
				this.form.disable() ;
			}
		}
	}
}
