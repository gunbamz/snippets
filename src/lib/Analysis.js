const Analysis = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length -2; i++) {
    let i0 = arr[i];
    let i1 = arr[i + 1];
    let i2 = arr[i + 2];
    let i0j1 = i0[1];
    let i0j2 = i0[2];
    let i0j3 = i0[3];
    let i0j4 = i0[4];
    let i0j9 = i0[9];
    let i1j0 = i1[0];
    let i1j1 = i1[1];
    let i1j2 = i1[2];
    let i1j3 = i1[3];
    let i1j4 = i1[4];
    let i1j5 = i1[5];
    let i1j9 = i1[9];
    let i2j1 = i2[1];
    let i2j3 = i2[3];
    let i2j4 = i2[4];
    let i2j9 = i2[9];
    if ((parseFloat(i0j1) < parseFloat(i0j4)) && (parseFloat(i1j2) > parseFloat(i0j2)) && (parseFloat(i1j3) < parseFloat(i0j3))) {
      let info = {};
      info['time'] = i1j0;
      info['type'] = 'badBear';
      info['vol'] = i1j5;
      info['marginTop'] = parseFloat(i1j2) / parseFloat(i0j2);
      info['margin'] = parseFloat(i0j3) - parseFloat(i1j3);
      info['candle'] = parseFloat(i1j1) > parseFloat(i1j4);
      info['takerBP'] = parseFloat(i0j9);
      info['takerBV'] = parseFloat(i1j9);
      info['takerBVn'] = parseFloat(i2j9);
      info['next'] = parseFloat(i2j1) > parseFloat(i2j4);
      info['nxMargin'] = parseFloat(i0j3) - parseFloat(i2j3);
      result.push(info);
      }
  }
  for (let i = 0; i < arr.length -2; i++) {
    let i0 = arr[i];
    let i1 = arr[i + 1];
    let i2 = arr[i + 2];
    let i0j0 = i0[0];
    let i0j1 = i0[1];
    let i0j2 = i0[2];
    let i0j3 = i0[3];
    let i0j4 = i0[4];
    let i0j9 = i0[9];
    let i1j1 = i1[1];
    let i1j2 = i1[2];
    let i1j3 = i1[3];
    let i1j4 = i1[4];
    let i1j5 = i1[5];
    let i1j9 = i1[9];
    let i2j1 = i2[1];
    let i2j2 = i2[2];
    let i2j4 = i2[4];
    let i2j9 = i2[9];
    if ((parseFloat(i0j1) > parseFloat(i0j4)) && (parseFloat(i1j2) > parseFloat(i0j2)) && (parseFloat(i1j3) < parseFloat(i0j3))) {
      let info = {};
      info['time'] = i0j0;
      info['type'] = 'badBull';
      info['vol'] = i1j5;
      info['margin'] = parseFloat(i1j2) - parseFloat(i0j2);
      info['marginDown'] = parseFloat(i0j3) / parseFloat(i1j3);
      info['candle'] = parseFloat(i1j1) > parseFloat(i1j4);
      info['next'] = parseFloat(i2j1) > parseFloat(i2j4);
      info['takerBP'] = parseFloat(i0j9);
      info['takerBV'] = parseFloat(i1j9);
      info['takerBVn'] = parseFloat(i2j9);
      info['nxMargin'] = parseFloat(i2j2) - parseFloat(i0j2);
      result.push(info);
      } 
    }
  for (let i = 0; i < arr.length -2; i++) {
    let i0 = arr[i];
    let i1 = arr[i + 1];
    let i2 = arr[i + 2];
    let i0j0 = i0[0];
    let i0j1 = i0[1];
    let i0j2 = i0[2];
    let i0j4 = i0[4];
    let i0j9 = i0[9];
    let i1j1 = i1[1];
    let i1j2 = i1[2];
    let i1j4 = i1[4];
    let i1j5 = i1[5];
    let i1j9 = i1[9];
    let i2j1 = i2[1];
    let i2j2 = i2[2];
    let i2j4 = i2[4];
    let i2j9 = i2[9];
    if((parseFloat(i0j1) > parseFloat(i0j4)) && (parseFloat(i1j2) > parseFloat(i0j2))) {
      let info = {};
      info['time'] = i0j0;
      info['type'] = 'bull';
      info['vol'] = i1j5;
      info['margin'] = parseFloat(i1j2) - parseFloat(i0j2);
      info['candle'] = parseFloat(i1j4) > parseFloat(i1j1);
      info['next'] = parseFloat(i2j4) > parseFloat(i2j1);
      info['takerBP'] = parseFloat(i0j9);
      info['takerBV'] = parseFloat(i1j9);
      info['takerBVn'] = parseFloat(i2j9);
      info['nxMargin'] = parseFloat(i2j2) - parseFloat(i0j2);
      result.push(info);
      }
    }
  for (let i = 0; i < arr.length -2; i++) {
    let i0 = arr[i];
    let i1 = arr[i + 1];
    let i2 = arr[i + 2];
    let i0j0 = i0[0];
    let i0j1 = i0[1];
    let i0j2 = i0[2];
    let i0j3 = i0[3];
    let i0j4 = i0[4];
    let i0j9 = i0[9];
    let i1j1 = i1[1];
    let i1j2 = i1[2];
    let i1j3 = i1[3];
    let i1j4 = i1[4];
    let i1j5 = i1[5];
    let i1j9 = i1[9];
    let i2j1 = i2[1];
    let i2j3 = i2[3];
    let i2j4 = i2[4];
    let i2j9 = i2[9];
    if ((parseFloat(i0j1) < parseFloat(i0j4)) && (parseFloat(i1j3) < parseFloat(i0j3 ))) {
      let info = {};
      info['time'] = i0j0;
      info['type'] = 'bear';
      info['vol'] = i1j5;
      //info['margin'] = parseFloat(i0j3) / parseFloat(i1j3); ratio
      info['margin'] = parseFloat(i1j3) - parseFloat(i0j3);
      info['candle'] = parseFloat(i1j4) < parseFloat(i1j1);
      info['next'] = parseFloat(i2j4) < parseFloat(i2j1);
      info['takerBP'] = parseFloat(i0j9);
      info['takerBV'] = parseFloat(i1j9);
      info['takerBVn'] = parseFloat(i2j9);
      //info['nxMargin'] = parseFloat(i0j3) / parseFloat(i2j3); ratio
      info['nxMargin'] = parseFloat(i2j3) - parseFloat(i0j3);
      result.push(info);
    }
  }
  return result;
}
export default Analysis;