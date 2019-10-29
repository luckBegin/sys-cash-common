import { Pipe , PipeTransform } from '@angular/core';
import {RoomOrderService} from '../../service' ;

@Pipe({
	name: 'statusPipe' ,
	pure: true
})
export class StatusPipe implements PipeTransform {
	transform( value: number | string ): any {
		const status = RoomOrderService.ENUM_Status.find(item => item.value === value ) ;
		return status.key ;
	}
}
