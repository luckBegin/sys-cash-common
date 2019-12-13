import {Observable} from 'rxjs';
import {RESPONSE} from '../app/models';
import {filter} from 'rxjs/operators';

export function Service(serviceName: string, prevent: boolean, data: () => any) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		if ( !/\w+.\w+/g.test(serviceName) ) {
			throw new Error('Invalid Service call ');
		}
		const raw = descriptor.value;
		descriptor.value = function (...args) {
			const $event = args[0] as Event;
			const el = $event.target as HTMLButtonElement;

			const service = serviceName.split('.');

			const _data = data.call(this) ;

			el.disabled = true;
			(<Observable<RESPONSE>>this[service[0]][service[1]](_data))
				.pipe(filter((res: RESPONSE) => {
					args.push(res);

					if ( prevent === false && res.success === false ) {
						raw.apply(this, args);
					}
					el.disabled = false;
					return res.success === true;
				}))
				.subscribe((data: any) => {
					raw.apply(this, args);
				}, err => {
					el.disabled = false;
				});
		};
	};
}
