export const ObjectUtils = {
	extend: (target: object, source: object, cover: boolean = false): object => {

		Object.keys(source).forEach(key => {
			if (cover && !target[key]) { target[key] = source[key]; }

			if (!cover) { target[key] = source[key]; }
		});

		return target;
	},
	isEmptyObj( obj ): boolean{
		let emptyMark: boolean = true ;

		for(const keys in obj ) {
			if( obj.hasOwnProperty(keys) ) {
				emptyMark = false ;
				break ;
			}
		}

		return emptyMark ;
	}
};
