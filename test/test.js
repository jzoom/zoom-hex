

import {
  str2hex,
  str2bytes,
  toDigist,
  hex2str,
  arrayEquals,
  copyOf,
  toShort,
  toInt,
  padLeftZero
} from '../src/index';


describe('hex operation', () => {


  it('hex string to ArrayBuffer', () => {
    var a = str2hex('aabbccddeeff112233445566778899');
    expect(a instanceof ArrayBuffer).toBeTruthy();
  });
  it('hex string to ArrayBuffer throws error', () => {
    expect(() => {
      a = str2hex('a');
    }).toThrow(Error);
  });

  it('hex string to Uint8Array', () => {
    var a = str2bytes('aabbccddeeff112233445566778899');
    expect(a instanceof Uint8Array).toBeTruthy();
  });

  it('number to hex string', () => {
    expect('01').toEqual( toDigist(1));
    expect('0a').toEqual( toDigist(10));
    expect('0f').toEqual( toDigist(15));
  });

  it('ArrayBuffer to hex string', () => {
    var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0xa];

    expect("0102030405060708090a").toEqual( hex2str(a));

    expect("0102030405060708090a").toEqual( hex2str(new Uint8Array(a)));
    expect("0102030405060708090a").toEqual( hex2str(new Uint8Array(a).buffer));

    expect("03040506").toEqual( hex2str(a, 2, 4));
    expect("03040506").toEqual( hex2str(new Uint8Array(a), 2, 4));
    expect("03040506").toEqual( hex2str(new Uint8Array(a).buffer, 2, 4));

    expect(() => {
      hex2str('a');
    }).toThrow(Error);
  });



  it('Array equals', () => {
    expect(arrayEquals([1, 2], [1, 2])).toBeTruthy();

    expect(arrayEquals(new Uint8Array([1, 2]), new Uint8Array([1, 2]))).toBeTruthy();

    expect(() => {
      expect(arrayEquals(1, 2)).toBeTruthy();
    }).toThrow(Error);



    expect(arrayEquals([1, 2], [3, 4])).toBeFalsy();

    expect(arrayEquals(new Uint8Array([1, 2]), [1, 2])).toBeTruthy();
  });

  it('copyOf', () => {

    var a = [1, 2, 3, 4, 5];
    var b = copyOf(a, 2);
    expect(arrayEquals(b, [1, 2])).toBeTruthy();


    var c = new Uint8Array(a);
    var d = copyOf(c, 3);
    expect(arrayEquals(d, [1, 2, 3])).toBeTruthy();


  });


  it('toShort', () => {
    expect(0x0009).toEqual( toShort([0x9,0x0],0));
    expect(0x1009).toEqual( toShort([0x9,0x10],0));
    expect(() => {
      toShort([],0);
    }).toThrow(Error);

    expect(() => {
      toShort([1,2],1);
    }).toThrow(Error);

  });

  it('toInt', () => {
    expect(0x0a030201).toEqual( toInt([0x1,0x2,0x3,0x0a],0));
    expect(() => {
      toInt([],0);
    }).toThrow(Error);

    expect(() => {
      toInt([1,2],0);
    }).toThrow(Error);

    expect(() => {
      toInt([1,2,3],0);
    }).toThrow(Error);


    expect(() => {
      toInt([1,2,3,4],1);
    }).toThrow(Error);
  });


  it('padLeftZero', () => {
    expect('03').toEqual( padLeftZero('3',2));
    expect('000a').toEqual( padLeftZero('a',4));
    
  });
});
