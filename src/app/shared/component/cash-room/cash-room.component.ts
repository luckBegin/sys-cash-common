import {Component, OnInit} from '@angular/core';
import {MsgService} from '../../../service';
import {ENUM, RESPONSE} from '../../../models';
import {EnumService} from '../../../service/enum/enum.service';
import {interval, Subscription} from "rxjs";
import {CONFIG} from "../../../CONFIG";
import {AdaptorUtils} from "../../utils";
import {RoomListService} from "../../../service/room/room-list.service";
import {NzTabChangeEvent} from "ng-zorro-antd";

@Component({
	selector: 'cash-room' ,
	templateUrl: './cash-room.component.html',
	styleUrls: ['./cash-room.component.less']
})
export class CashRoomComponent implements OnInit {
	constructor(
		private readonly msg: MsgService ,
		private readonly enumSer: EnumService ,
		private readonly listSer: RoomListService,
	) {}

	ngOnInit(): void {

	}

	public type_ENUM: ENUM[] = [] ;
	public area_ENUM: ENUM[] = [] ;
	private list_raw: { type: any[] , area:any[] } = { type: [], area: [] };
	private ajaxTimer$: Subscription ;

	private getList(): void {
		this.listSer.all()
			.subscribe( (res: RESPONSE) => {
				const area = {} ;
				const type = {} ;

				const typeMap = {} ;
				const areaMap = {} ;

				this.area_ENUM.forEach( (item: ENUM) => areaMap[<string>item.value] = item.key ) ;
				this.type_ENUM.forEach( (item: ENUM) => typeMap[<string>item.value] = item.key ) ;

				res.data.forEach( ( item: any ) => {
					const areaId = item.areaId ;
					const typeId = item.typeId ;

					if(area[areaId]) {
						area[areaId].data.push(item);
					} else {
						area[areaId] = {
							name: areaMap[areaId] ,
							data: [item]
						}
					}

					if(type[typeId]) {
						type[typeId].data.push(item);
					} else {
						type[typeId] = {
							name: typeMap[typeId],
							data: [item]
						}
					}
				});

				const areaList = [] ;
				Object.keys(area).forEach(key => areaList.push( area[key]) );

				const typeList = [] ;
				Object.keys(type).forEach(key => typeList.push( type[key] )) ;

				this.list_raw = { type: typeList , area: areaList };
			})
	}

	private getENUMS(): void {
		if( this.type_ENUM.length > 0 && this.area_ENUM.length > 0 ) {
			this.getList() ;
		} else {
			this.enumSer.typeAndArea()
				.subscribe((res: RESPONSE) => {
					this.type_ENUM = AdaptorUtils.reflect(res.data.type , { id: 'value' , name: 'key'}) ;
					this.area_ENUM = AdaptorUtils.reflect(res.data.area , { id: 'value' , name: 'key'}) ;
					this.getList();
				});
		}
	}

	public init(type: number ): void {
		if( type === 1 ) {
			this.getENUMS() ;
			this.ajaxTimer$ = interval(CONFIG.timer)
				.subscribe( () => {
					this.getList()
				})
		} else {
			if( this.ajaxTimer$ )
				this.ajaxTimer$.unsubscribe() ;
		}
	}

	public tabChange($event:NzTabChangeEvent): void {
		const idx = $event.index ;
	}
}
