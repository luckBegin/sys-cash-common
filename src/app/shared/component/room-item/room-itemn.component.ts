import {Component, Input} from '@angular/core' ;

@Component({
	selector: 'room-item' ,
	styleUrls: ['./room-item.component.less'],
	templateUrl: './room-item.component.html'
})
export class RoomItemComponent {
	constructor() {} ;
	@Input() data: any ;
}
