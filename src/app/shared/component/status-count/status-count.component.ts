import {Component, Input} from '@angular/core' ;

@Component({
	selector: 'status-count' ,
	templateUrl: './status-count.component.html' ,
	styleUrls: ['./status-count.component.less']
})
export class StatusCountComponent {
	constructor() {}
	@Input() count: any = {} ;
}
