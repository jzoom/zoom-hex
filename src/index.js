/**
 * 将一个大于len字节的大包分成小包
 */
export function split(pack, len = 20) {
  if (!pack) {
    return new ArrayBuffer(0);
  }

  /**
   * 先考虑字符串
   */
  if (typeof pack == 'string') {
    var realLen = len * 2;
    if (pack.length > realLen) {
      var arr = [];
      for (var i = 0, c = pack.length; i < c; i += realLen) {
        arr.push(pack.substr(i, realLen));
      }
      return arr;
    } else {
      return pack;
    }
  } else if (typeof pack == 'array') {
    //数组分割
    var a = new Uint8Array(pack);
    return _splitArray(a.buffer, len);
  } else if (pack instanceof ArrayBuffer) {
    ///ArrayBuffer?
    return _splitArray(pack);
  } else {
    throw new Error('非法数据类型', pack);
  }
}

function _splitArray(a, len) {
  //对数组分割
  if (a.byteLength > len) {
    var arr = [];
    for (var i = 0, c = a.byteLength; i < c; i += len) {
      var subarray = a.slice(i, i + len);
      arr.push(subarray);
    }
    return arr;
  } else {
    return a;
  }
}

/**
 * 将字符串转为Uint8Array
 */
export function str2bytes(str) {
  if (!str) {
    return new Uint8Array(0);
  }
  if (str.length % 2 != 0) {
    throw new Error('字符串长度不是偶数');
  }
  //两个两个字节转化，
  var c = str.length / 2;
  var a = new ArrayBuffer(c);
  var v = new Uint8Array(a);

  for (var i = 0; i < c; ++i) {
    v[i] = parseInt(str.substr(i * 2, 2), 16);
  }

  return v;
}

/**
 * 返回一个拷贝的内存区
 * a可以是Array Uint8Array ArrayBuffer
 */
export function copyOf(a, len) {
  if (!a) {
    return new Uint8Array(0);
  }

  if (a instanceof Uint8Array) {
    return new Uint8Array(a.buffer.slice(0, len));
  }

  if (a instanceof ArrayBuffer) {
    return a.slice(0, len);
  }

  if (a instanceof Array) {
    return a.slice(0, len);
  }

  throw new Error('错误的数据类型', a);
}

/**
 * 将字符串转成二进制ArrayBuffer
 */
export function str2hex(str) {
  return str2bytes(str).buffer;
}

/**
 * 将数字转为这个数字对应的二进制字符串
 * @param {*} num
 */
export function toDigist(num) {
  var s = num.toString(16);
  if (s.length < 2) {
    return '0' + s;
  } else {
    return s;
  }
}

/**
 * 二进制转为字符串
 * @param {ArrayBuffer/Array/Uint8Array} a
 * @param {*} s
 * @param {*} l
 */
export function hex2str(a, s = null, l = null) {
  if (!a) {
    return '';
  }
  var bf;
  if (a instanceof Uint8Array) {
    bf = a;
  } else if (a instanceof ArrayBuffer) {
    bf = new Uint8Array(a);
  } else if (Array.isArray(a)) {
    bf = a;
  } else {
    throw new Error('非法输入' + a);
  }
  var str = '';
  var start = s
    ? s
    : 0;
  var end = l
    ? (s + l)
    : bf.length;
  for (var i = start, c = end; i < c; ++i) {
    str += toDigist(bf[i]);
  }

  return str;
}

/**
 * 比较两个数组
 */
export function arrayEquals(a1, a2) {
  if (a1 === a2) 
    return true;
  if (!a1 || !a2) 
    return false;
  
  if (a1.length !== a2.length) 
    return false;
  
  //不是数组
  if (!a1.length) {
    throw new Error('参数不是数组');
  }

  for (var i = 0, c = a1.length; i < c; ++i) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }

  return true;
}



export function toShort(data, start = 0) {
  if(data.length < start + 2){
    throw new Error('数据错误，长度太小');
  }
  return ((data[start + 1] << 8) & 0xff00) | (data[start] & 0xff);
}

export function toInt(data, start = 0) {
  if(data.length < start + 4){
    throw new Error('数据错误，长度太小');
  }
  return (((data[start + 3] << 24) & 0xff000000) | ((data[start + 2] << 16) & 0xff0000) | ((data[start + 1] << 8) & 0xff00) | (data[start] & 0xff));
}

export function padLeftZero(str, len) {
  while (str.length < len) {
    str = '0' + str;
  }
  return str;
}