
/**
 * 字符串转为ArrayBuffer
 * @param str 
 */
export function str2hex(str:string):ArrayBuffer;
/**
 * 字符串转为Unit8Array
 * @param str 
 */
export function str2bytes(str:string):Uint8Array;
/**
 * 将数字转为这个数字对应的二进制字符串
 */
export function toDigist(num:number):string;

/**
 * 内存值转为string
 * @param value 
 */
export function hex2str(value:ArrayBuffer|Uint8Array|Array<number>):string;

/**
 * 比较两个数组内的值是否一致
 */
export function arrayEquals(arr1:Array<any>,arr2:Array<any>);

/**
 * 拷贝内存数据
 * @param src 
 */
export function copyOf(src:ArrayBuffer|Uint8Array|Array<number>):ArrayBuffer|Uint8Array|Array<number>;

/**
 * src 从 start开始的两个字节转成一个short
 * @param src 
 * @param start 
 */
export function toShort(src:Array<number>|Uint8Array,start:number):number;
/**
 * src 从 start开始的4个字节转成一个int
 * @param src 
 * @param start 
 */
export function toInt(src:Array<number>|Uint8Array,start:number):number;

/**
 * 左边补充0到len长度
 */
export function padLeftZero(src:string,len:number):string;

