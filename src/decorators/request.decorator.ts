import {ObjToQuery} from '../app/service/ObjToQuery';
import {observable, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {RESPONSE} from '../app/models';
import {HttpHeaders} from '@angular/common/http';
import {IgnoreList} from "../app/shared/interceptor.service";
class DTO {
	static create( data: any) {
		if( data instanceof  Array ) {
			return data
		} else {
			const _obj = {} ;
			Object.keys(data).forEach( key => {
				const val = data[key] ;
				if (val !== '' && val !== null && val !== 'null' && val !== 'undefined' && val !== undefined ) {
					_obj[key] = val ;
				}
			});
			return _obj ;
		}
	}
}

export function Ignore(): MethodDecorator {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const config = target[propertyKey].config ;
		IgnoreList.add(config.url , config.type) ;
		const raw = descriptor.value ;
		descriptor.value = function(...arg) {
			return raw.apply( this , arg ) ;
		}
	}
}

export function GET(url: string, msg: string = '获取数据失败,原因 : '): MethodDecorator {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const raw = descriptor.value;
		target[propertyKey].config = {type: 'GET' , url}
		descriptor.value = function(...arg) {
			return new Observable(obsr => {
				const queryPara = ObjToQuery(arg[0]);
				this.http.get(url, {
					params: queryPara,
				})
					.pipe(
						filter((res: RESPONSE) => {
							if ( res.success === false ) {
								this.msg.error(msg + res.message);
								obsr.error( res.message ) ;
							}
							return res.success === true;
						}),
					)
					.subscribe(res => {
						obsr.next(res);
					}, err => {
						obsr.error({data: err});
					});
			});
		};
	};
}

export function POST(url: string, json: boolean = true, msg: string = '提交失败,原因 : '): MethodDecorator {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		target[propertyKey].config = {type: 'POST' , url}
		const raw = descriptor.value;
		descriptor.value = function(...arg) {
			const data = DTO.create(arg[0]);
			const headers = new HttpHeaders();
			if ( json ) {
				headers.append('Content-type', 'application/json');
			}
			return new Observable(obsr => {
				this.http.post(url, data, { headers } )
					.pipe(
						filter((res: RESPONSE) => {
							if ( res.success === false ) {
								this.msg.error(msg + res.message) ;
								obsr.error( res.message ) ;
							}
							return res.success === true;
						}),
					)
					.subscribe(res => {
						obsr.next(res);
					}, err => {
						obsr.error({data: err});
					});
			});
		};
	};
}

export function PUT(url: string, withId: boolean = false, msg: string = '保存失败,原因 : ', json: boolean = true): MethodDecorator {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const raw = descriptor.value;
		target[propertyKey].config = {type: 'PUT' , url}
		descriptor.value = function(...arg) {
			const headers = new HttpHeaders();
			if ( json ) {
				headers.append('Content-type', 'application/json');
			}

			return new Observable(obsr => {
				const _url = withId ? url + arg[0]['id'] : url;
				this.http.put(_url, DTO.create(arg[0]), { headers })
					.pipe(
						filter((res: RESPONSE) => {

							if ( res.success === false ) {
								this.msg.error(msg + res.message);
								obsr.error( res.message ) ;
							}
							return res.success === true;
						}),
					)
					.subscribe(res => {
						obsr.next(res);
					}, err => {
						obsr.error({data: err});
					});
			});
		};
	};
}

export function DELETE(url: string, msg: string = '删除失败,原因 : '): MethodDecorator {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const raw = descriptor.value;
		target[propertyKey].config = {type: 'DELETE' , url}
		descriptor.value = function(...arg) {
			return new Observable(obsr => {
				this.http.delete(url + '/' + arg[0].id)
					.pipe(
						filter((res: RESPONSE) => {
							if ( res.success === false ) {
								this.msg.error(msg + res.message);
								obsr.error( res.message ) ;
							}
							return res.success === true;
						}),
					)
					.subscribe(res => {
						obsr.next(res);
					}, err => {
						obsr.error({data: err});
					});
			});
		};
	};
}
