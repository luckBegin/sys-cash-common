import {NgModule} from '@angular/core' ;
import {CommonModule} from '@angular/common' ;
import {TimePipe, StatusPipe, CusCurrencyPipe, DatePipe, FilterSymbolPipe, DiscountPipe} from './pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpIntercept} from './interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {NullPipe} from './pipe/null.pipe';
import {CashOrderComponent} from './component/cash-order/cash-order.component';
import {CashRoomComponent} from './component/cash-room/cash-room.component';
import {StatusCountComponent} from "./component/status-count/status-count.component";

const modules = [CommonModule, FormsModule, NgZorroAntdModule];

const components = [
	CashOrderComponent,
	CashRoomComponent,
	StatusCountComponent
];
const pipes = [StatusPipe, TimePipe, CusCurrencyPipe, DatePipe, FilterSymbolPipe, DiscountPipe , NullPipe ];

@NgModule({
	declarations: [
		...components,
		...pipes
	],
	imports: [
		...modules,
		ReactiveFormsModule
	],
	exports: [...modules, ...components, ...pipes],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true}
	],
	bootstrap: [],
})
export class SharedModule {
}
