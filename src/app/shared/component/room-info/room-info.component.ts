import {Component, Input, OnInit} from '@angular/core' ;

@Component({
	selector: 'common-room-info',
	templateUrl: './room-info.component.html' ,
	styleUrls: ['./room-info.component.less']
})
export class CommonRoomInfoComponent implements OnInit{
	constructor() {
	}
	ngOnInit(): void {
		console.log( this.roomInfo )
	}
	@Input() roomInfo: any ;
}
