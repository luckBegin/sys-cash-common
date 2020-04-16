import {NgModule} from '@angular/core' ;
import {CommonModule} from '@angular/common' ;
import {
	TimePipe,
	StatusPipe,
	CusCurrencyPipe,
	DatePipe,
	FilterSymbolPipe,
	DiscountPipe,
	OrderStatusPipe
} from './pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpIntercept} from './interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {NullPipe} from './pipe/null.pipe';
import {CashOrderComponent} from './component/cash/cash-order/cash-order.component';
import {CashRoomComponent} from './component/cash/cash-room/cash-room.component';
import {StatusCountComponent} from './component/status-count/status-count.component';
import {RoomItemComponent} from './component/room-item/room-item.component';
import {ZkPlacementComponent} from './component/zk/placement/placement.component';
import {CommonRoomClassifyComponent} from './component/room-classify/room-classify.component';
import { CommonRoomInfoComponent } from './component/room-info/room-info.component';

const modules = [CommonModule, FormsModule, NgZorroAntdModule];

const components = [
	CashOrderComponent,
	CashRoomComponent,
	StatusCountComponent,
	RoomItemComponent,
	ZkPlacementComponent,
	CommonRoomClassifyComponent ,
	CommonRoomInfoComponent
];
const pipes = [
	StatusPipe,
	TimePipe,
	CusCurrencyPipe,
	DatePipe,
	FilterSymbolPipe,
	DiscountPipe ,
	NullPipe,
	OrderStatusPipe
];

@NgModule({
	declarations: [
		...components,
		...pipes
	],
	imports: [
		...modules,
		ReactiveFormsModule,
	],
	exports: [...modules, ...components, ...pipes],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true}
	],
	bootstrap: [],
})
export class SharedModule {
}
