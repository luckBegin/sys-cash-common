import { NgModule } from '@angular/core' ;
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule, Router, Routes } from '@angular/router' ;
import {SharedModule} from '../../shared/shared.module' ;
import {SysZkComponent} from "./zk/zk.component";
const routes: Routes = [
	{ path: 'zk', component: SysZkComponent, data: { title: '咨客系统', titleI18n: '咨客系统' } },
];

const component = [
	SysZkComponent
];

@NgModule({
	declarations: [
		...component,
	],
	imports: [
		NgZorroAntdModule,
		RouterModule.forChild(routes),
		SharedModule,
	],
	providers: [],
	bootstrap: [],
})
export class ZkModule {
}
