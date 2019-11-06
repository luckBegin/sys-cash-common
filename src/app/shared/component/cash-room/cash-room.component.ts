import {Component, OnInit} from '@angular/core';
import {MsgService} from '../../../service';
import {ENUM, RESPONSE} from '../../../models';
import {EnumService} from '../../../service/enum/enum.service';
import {interval, Subscription} from 'rxjs';
import {CONFIG} from '../../../CONFIG';
import {AdaptorUtils} from '../../utils';
import {RoomListService} from '../../../service/room/room-list.service';

@Component({
	selector: 'cash-room',
	templateUrl: './cash-room.component.html',
	styleUrls: ['./cash-room.component.less']
})
export class CashRoomComponent implements OnInit {
	constructor(
		private readonly msg: MsgService,
		private readonly enumSer: EnumService,
		private readonly listSer: RoomListService,
	) {
	}

	ngOnInit(): void {
	}

	private ajaxTimer$: Subscription;

	private ENUMS: { area: ENUM[], type: ENUM[] } = {area: [], type: []};
	public classifyENUM: ENUM[] = [];

	public active_type: string = 'area';
	public classify_active: string = '';

	private list_raw: { type: any[], area: any[] } = {type: [], area: []};
	public list: any[] = [];

	public count_total: any;
	public selectRoomItem: any = {};
	public roomOperateModal: boolean = false;

	private getList(): void {
		this.listSer.all()
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
				this.count_total = allCount;
				this.switchClassifyType(this.classify_active);
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
					this.classifyENUM = this.ENUMS[this.active_type];
					this.getList();
				});
		}
	}

	public init(type: number): void {
		if (type === 1) {
			this.getENUMS();
			this.ajaxTimer$ = interval(CONFIG.timer)
				.subscribe(() => {
					// this.getList()
				});
		} else {
			if (this.ajaxTimer$) {
				this.ajaxTimer$.unsubscribe();
			}
		}
	}

	public switchType(type: string): void {
		if (this.active_type === type) { return; }
		this.active_type = type;
		this.classifyENUM = this.ENUMS[type];
		if (this.list_raw.area.length > 0 && this.list_raw.area.length > 0) {
			this.classify_active = '' ;
			this.switchClassifyType('');
		}
	}
	
	public switchClassifyType(type: string): void {
		const data = this.list_raw[this.active_type];
		this.classify_active = type;
		if (type === '') {
			this.list = data;
		} else {
			this.list = data.filter(item => item.id === type);
		}
	}

	public selectRoom(item: any): void {
		if (this.selectRoomItem.id === item.id) {
			this.roomOperateModal = true;
		} else {
			this.selectRoomItem = item;
		}
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
