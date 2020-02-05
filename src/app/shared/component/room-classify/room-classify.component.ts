import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoomListService} from '../../../service/room/room-list.service';
import {ENUM, RESPONSE} from '../../../models';
import {AdaptorUtils} from '../../utils';
import {EnumService} from '../../../service/enum/enum.service';

@Component({
	selector: 'common-room-classify',
	styleUrls: ['./room-classify.component.less'] ,
	templateUrl: './room-classify.component.html'
})
export class CommonRoomClassifyComponent implements OnInit {
	constructor(
		private readonly service: RoomListService ,
		private readonly enumSer: EnumService,
	) {
	}

	ngOnInit(): void {
		this.getENUMS() ;
	}

	init(): void {
		this.room = {} ;
		this.getList() ;
	}

	private list_raw: { type: any[], area: any[] } = {type: [], area: []};

	public list: any[] = [];

	private ENUMS: { area: ENUM[], type: ENUM[] } = {area: [], type: []};

	public classifyENUM: ENUM[] = [];

	public activeType: string = '' ;
	@Input() type: string = '' ;

	@Output() select: EventEmitter< any > = new EventEmitter<any>() ;

	public getList(): void {
		this.service.all({ status: 1 })
			.subscribe((res: RESPONSE) => {
				const area = {};
				const type = {};
				const typeMap = AdaptorUtils.enumToMap(this.ENUMS.type);
				const areaMap = AdaptorUtils.enumToMap(this.ENUMS.area);

				res.data.forEach((item: any) => {
					const areaId = item.areaId;
					const typeId = item.typeId;

					if (area[areaId]) {
						area[areaId].data.push(item);
					} else {
						area[areaId] = {
							name: areaMap[areaId],
							data: [item],
							id: areaId,
						};
					}

					if (type[typeId]) {
						type[typeId].data.push(item);
					} else {
						type[typeId] = {
							name: typeMap[typeId],
							data: [item],
							id: typeId
						};
					}
				});
				const areaList = [];
				Object.keys(area).forEach(key => {
					const item = area[key];
					const status = room_status(item.data);
					item.status = status;
					areaList.push(item);
				});

				const typeList = [];
				Object.keys(type).forEach(key => {
					const item = type[key];
					const status = room_status(item.data);
					item.status = status;
					typeList.push(item);
				});

				this.list_raw = {type: typeList, area: areaList};
				let allCount = {};

				typeList.forEach(item => {
					allCount = objMerge(item.status, allCount);
				});

				this.switchType() ;
			});
	}

	private getENUMS(): void {
		if (this.ENUMS.type.length > 0 && this.ENUMS.area.length > 0) {
			this.getList();
		} else {
			this.enumSer.typeAndArea()
				.subscribe((res: RESPONSE) => {
					this.ENUMS.type = AdaptorUtils.reflect(res.data.type, {id: 'value', name: 'key'});
					this.ENUMS.area = AdaptorUtils.reflect(res.data.area, {id: 'value', name: 'key'});
					this.classifyENUM = this.ENUMS[this.type] ? this.ENUMS[this.type] : [] ;
					this.getList() ;
				});
		}
	}

	public classify($event: any): void {
		this.activeType = $event;
		this.switchType() ;
	}

	public switchType(): void {
		const data = this.list_raw[this.type];
		const type = this.activeType ;
		if (type === '') {
			let list: any[] = [] ;
			data.forEach( item => list = list.concat(item.data ) ) ;
			this.list = list ;
		} else {
			const list = data.filter(item => item.id === type);
			this.list = list.map( item => item.data )[0];
		}
	}

	public room: any = {} ;
	public selectRoom( $event: any): void {
		this.room = $event ;
		this.select.next($event) ;
	}
}

const room_status = (list: any[]): any => {
	const status = RoomListService.ENUM_Status;
	const map = {all: 0};
	status.forEach(item => map[item.value as string] = 0);

	list.forEach((item: any) => {
		const itemStatus = item.status;
		if (map.hasOwnProperty(itemStatus)) {
			map[itemStatus] += 1;
		}
		map.all += 1;
	});
	return map;
};

const objMerge = (obj: any, target: any): any => {
	const map = {};
	Object.keys(obj).forEach(key => {
		let val = obj[key];
		if (target.hasOwnProperty(key)) {
			val += target[key];
		}
		map[key] = val;
	});
	return map;
};
