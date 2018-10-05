const toString = Object.prototype.toString;

export function isFunction(obj){
	return toString.call(obj) === '[object Function]'; 	
}

export function isPromiseLike(promise){
	return promise && isFunction(promise.then);		
}