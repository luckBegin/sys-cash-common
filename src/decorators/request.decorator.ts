import {ObjToQuery} from '../app/service/ObjToQuery';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {RESPONSE} from '../app/models';
import {HttpHeaders} from '@angular/common/http';

class DTO {
	static create( data: any) {
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
export function GET(url: string, msg: string = '获取数据失败,原因 : '): MethodDecorator {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const raw = descriptor.value;
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
		const raw = descriptor.value;
		descriptor.value = function(...arg) {
			const data = DTO.create(arg[0]);
			console.log( data ) ;
			const headers = new HttpHeaders();
			if ( json ) {
				headers.append('Content-type', 'application/json');
			}
			return new Observable(obsr => {
				this.http.post(url, data, { headers } )
					.pipe(
						filter((res: RESPONSE) => {
							if ( res.success === false ) {
								this.msg.error(msg + res.message);
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
		descriptor.value = function(...arg) {
			return new Observable(obsr => {
				this.http.delete(url + '/' + arg[0].id)
					.pipe(
						filter((res: RESPONSE) => {
							if ( res.success === false ) {
								this.msg.error(msg + res.message);
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
