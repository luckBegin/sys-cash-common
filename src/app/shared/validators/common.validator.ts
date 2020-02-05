import { FormControl } from '@angular/forms';
import { RegUtils } from '../utils';

export class CommonValidator {
	static isNumber(length?: number ): any {
		return (control: FormControl): any => {
			const val = control.value;
			const valid = RegUtils.isNumber(val, length);
			return valid ? null : {invalid: true};
		};
	}

	static isTel( control: FormControl ): any {
		const val = control.value ;
		const valid = RegUtils.isPhone( val ) ;
		return valid ? null : {invalid: true};
	}
}
