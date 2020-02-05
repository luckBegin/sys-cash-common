import {Component, OnInit, ViewChild} from '@angular/core' ;
import {ZkPlacementComponent} from "../../../shared/component/zk/placement/placement.component";

@Component({
	selector: 'sys-zk',
	templateUrl: './zk.component.html',
	styleUrls: ['./zk.component.less']
})
export class SysZkComponent implements OnInit{
	constructor(){}

	ngOnInit(): void {
		this.tabChange(0);
	}

	@ViewChild('zkPlacementComponent') zkPlacementComponent: ZkPlacementComponent
	public tabChange($event): void {
		this.zkPlacementComponent.init($event);
	}
}
