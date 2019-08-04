import chai from 'chai';

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
    chai.assert.isTrue(a instanceof ArrayBuffer);
  });
  it('hex string to ArrayBuffer throws error', () => {
    chai.expect(() => {
      a = str2hex('a');
    }).throw(Error);
  });

  it('hex string to Uint8Array', () => {
    var a = str2bytes('aabbccddeeff112233445566778899');
    chai.assert.isTrue(a instanceof Uint8Array);
  });

  it('number to hex string', () => {
    chai.assert.equal('01', toDigist(1));
    chai.assert.equal('0a', toDigist(10));
    chai.assert.equal('0f', toDigist(15));
  });

  it('ArrayBuffer to hex string', () => {
    var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0xa];

    chai.assert.equal("0102030405060708090a", hex2str(a));

    chai.assert.equal("0102030405060708090a", hex2str(new Uint8Array(a)));
    chai.assert.equal("0102030405060708090a", hex2str(new Uint8Array(a).buffer));

    chai.assert.equal("03040506", hex2str(a, 2, 4));
    chai.assert.equal("03040506", hex2str(new Uint8Array(a), 2, 4));
    chai.assert.equal("03040506", hex2str(new Uint8Array(a).buffer, 2, 4));

    chai.expect(() => {
      hex2str('a');
    }).throw(Error);
  });



  it('Array equals', () => {
    chai.assert.isTrue(arrayEquals([1, 2], [1, 2]));

    chai.assert.isTrue(arrayEquals(new Uint8Array([1, 2]), new Uint8Array([1, 2])));

    chai.expect(() => {
      chai.assert.isFalse(arrayEquals(1, 2));
    }).throw(Error);



    chai.assert.isFalse(arrayEquals([1, 2], [3, 4]));

    chai.assert.isTrue(arrayEquals(new Uint8Array([1, 2]), [1, 2]));
  });

  it('copyOf', () => {

    var a = [1, 2, 3, 4, 5];
    var b = copyOf(a, 2);
    chai.assert.isTrue(arrayEquals(b, [1, 2]));


    var c = new Uint8Array(a);
    var d = copyOf(c, 3);
    chai.assert.isTrue(arrayEquals(d, [1, 2, 3]));


  });


  it('toShort', () => {
    chai.assert.equal(0x0009, toShort([0x9,0x0],0));
    chai.assert.equal(0x1009, toShort([0x9,0x10],0));
    chai.expect(() => {
      toShort([],0);
    }).throw(Error);

    chai.expect(() => {
      toShort([1,2],1);
    }).throw(Error);

  });

  it('toInt', () => {
    chai.assert.equal(0x0a030201, toInt([0x1,0x2,0x3,0x0a],0));
    chai.expect(() => {
      toInt([],0);
    }).throw(Error);

    chai.expect(() => {
      toInt([1,2],0);
    }).throw(Error);

    chai.expect(() => {
      toInt([1,2,3],0);
    }).throw(Error);


    chai.expect(() => {
      toInt([1,2,3,4],1);
    }).throw(Error);
  });


  it('padLeftZero', () => {
    chai.assert.equal('03', padLeftZero('3',2));
    chai.assert.equal('000a', padLeftZero('a',4));
    
  });
});
