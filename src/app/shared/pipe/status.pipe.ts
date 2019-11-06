import { Pipe , PipeTransform } from '@angular/core';
import {RoomListService} from "../../service/room/room-list.service";

@Pipe({
	name: 'statusPipe' ,
	pure: true
})
export class StatusPipe implements PipeTransform {
	transform( value: number | string ): any {
		const status = RoomListService.ENUM_Status.find(item => item.value === value ) ;
		return status.key ;
	}
}
