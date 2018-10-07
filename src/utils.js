const toString = Object.prototype.toString;

export function isFunction(obj){
	return toString.call(obj) === '[object Function]'; 	
}

export function isPromiseLike(promise){
	return promise && isFunction(promise.then);		
}

export function arrayFill( array, value ){
	const length = array == null ? 0 : array.length;
	for( let i = 0; i<length; i++ ) {
		array[i] = value;	
	}	
	
	return array;
}