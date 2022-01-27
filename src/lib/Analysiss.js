const timo = (a) => { 
    const b = new Date(a);
    return  b.getHours() + ":" + b.getMinutes();
  };

const Analysiss = (arr, cent) => {
    let result = [];
    let longCount = [];
    let shortCount = [];
    for (let i = 0; i < arr.length - 4; i++) {
      let i0 = arr[i];
      let i1 = arr[i + 1];
      let i2 = arr[i + 2];
      let i3 = arr[i + 3];
      let i4 = arr[i + 4];
      let i0j1 = i0[1];
      let i0j2 = i0[2];
      let i0j4 = i0[4];
      let i0j5 = i0[5];
      let i0j9 = i0[9];
      let i1j0 = i1[0];
      let i1j2 = i1[2];
      let i2j2 = i2[2];
      let i3j2 = i3[2];
      let i4j2 = i4[2];
      if ((parseFloat(i0j1) > parseFloat(i0j4)) && (parseFloat(i1j2) >= parseFloat(i0j2)) && ((parseFloat(i1j2) / parseFloat(i0j2) >= cent) || (parseFloat(i2j2) / parseFloat(i0j2) >= cent) || (parseFloat(i3j2) / parseFloat(i0j2) >= cent) || (parseFloat(i4j2) / parseFloat(i0j2) >= cent))) {
        let info = {};
        info['time'] = timo(i1j0);
        info['type'] = 'GL';
        info['vol'] = i0j5;
        info['takerBP'] = parseFloat(i0j9);
        result.push(info);
        }
    }
    for (let i = 0; i < arr.length - 4; i++) {
      let i0 = arr[i];
      let i1 = arr[i + 1];
      let i2 = arr[i + 2];
      let i3 = arr[i + 3];
      let i4 = arr[i + 4];
      let i0j1 = i0[1];
      let i0j2 = i0[2];
      let i0j4 = i0[4];
      let i0j5 = i0[5];
      let i0j9 = i0[9];
      let i1j0 = i1[0];
      let i1j2 = i1[2];
      let i2j2 = i2[2];
      let i3j2 = i3[2];
      let i4j2 = i4[2];
      if ((parseFloat(i0j1) > parseFloat(i0j4)) && (parseFloat(i1j2) >= parseFloat(i0j2)) && ((parseFloat(i1j2) / parseFloat(i0j2) <= cent) || (parseFloat(i2j2) / parseFloat(i0j2) <= cent) || (parseFloat(i3j2) / parseFloat(i0j2) <= cent) || (parseFloat(i4j2) / parseFloat(i0j2) <= cent))) {
        let info = {};
        info['time'] = timo(i1j0);
        info['type'] = 'BL';
        info['vol'] = i0j5;
        info['takerBP'] = parseFloat(i0j9);
        result.push(info);
        }
    }
    for (let i = 0; i < arr.length - 4; i++) {
        let i0 = arr[i];
        let i1 = arr[i + 1];
        let i2 = arr[i + 2];
        let i3 = arr[i + 3];
        let i4 = arr[i + 4];
        let i0j1 = i0[1];
        let i0j3 = i0[3];
        let i0j4 = i0[4];
        let i0j5 = i0[5];
        let i0j9 = i0[9];
        let i1j0 = i1[0];
        let i1j3 = i1[3];
        let i2j3 = i2[3];
        let i3j3 = i3[3];
        let i4j3 = i4[3];
      if ((parseFloat(i0j1) < parseFloat(i0j4)) && (parseFloat(i1j3) <= parseFloat(i0j3)) && ((parseFloat(i0j3) / parseFloat(i1j3) >= cent) || (parseFloat(i0j3) / parseFloat(i2j3) >= cent) || (parseFloat(i0j3) / parseFloat(i3j3) >= cent) || (parseFloat(i0j3) / parseFloat(i4j3) >= cent))) {
        let info = {};
        info['time'] = timo(i1j0);
        info['type'] = 'GS';
        info['vol'] = i0j5;
        info['takerBP'] = parseFloat(i0j9);
        result.push(info);
        }
    }
    for (let i = 0; i < arr.length - 4; i++) {
      let i0 = arr[i];
      let i1 = arr[i + 1];
      let i2 = arr[i + 2];
      let i3 = arr[i + 3];
      let i4 = arr[i + 4];
      let i0j1 = i0[1];
      let i0j3 = i0[3];
      let i0j4 = i0[4];
      let i0j5 = i0[5];
      let i0j9 = i0[9];
      let i1j0 = i1[0];
      let i1j3 = i1[3];
      let i2j3 = i2[3];
      let i3j3 = i3[3];
      let i4j3 = i4[3];
    if ((parseFloat(i0j1) < parseFloat(i0j4)) && (parseFloat(i1j3) <= parseFloat(i0j3)) && ((parseFloat(i0j3) / parseFloat(i1j3) <= cent) || (parseFloat(i0j3) / parseFloat(i2j3) <= cent) || (parseFloat(i0j3) / parseFloat(i3j3) <= cent) || (parseFloat(i0j3) / parseFloat(i4j3) <= cent))) {
      let info = {};
      info['time'] = timo(i1j0);
      info['type'] = 'BS';
      info['vol'] = i0j5;
      info['takerBP'] = parseFloat(i0j9);
      result.push(info);
      }
  }
    for (let i = 0; i < arr.length - 4; i++) {
      let i0 = arr[i];
      let i1 = arr[i + 1];
      let i0j1 = i0[1];
      let i0j2 = i0[2];
      let i0j4 = i0[4];
      let i1j2 = i1[2];
      let i1j0 = i1[0];
      if ((parseFloat(i0j1) > parseFloat(i0j4)) && (parseFloat(i1j2) >= parseFloat(i0j2))) {
        longCount.push(timo(i1j0));
        }
      }
    for (let i = 0; i < arr.length - 4; i++) {
      let i0 = arr[i];
      let i1 = arr[i + 1];
      let i0j1 = i0[1];
      let i0j3 = i0[3];
      let i0j4 = i0[4];
      let i1j3 = i1[3];
      let i1j0 = i1[0];
      if ((parseFloat(i0j1) < parseFloat(i0j4)) && (parseFloat(i0j3) >= parseFloat(i1j3))) {
        shortCount.push(timo(i1j0));
        }
    }
    const long = result.reduce((acc, cur) => cur.type == "GL" ? ++acc : acc, 0);
    const short =  result.reduce((acc, cur) => cur.type == "GS" ? ++acc : acc, 0);
    const Blong = result.reduce((acc, cur) => cur.type == "BL" ? ++acc : acc, 0);
    const Bshort =  result.reduce((acc, cur) => cur.type == "BS" ? ++acc : acc, 0);
    return { result, long, short, longCount, shortCount, Blong, Bshort };
  }
   export default Analysiss;