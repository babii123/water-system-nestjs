export function checkPH(ph) {
  let info = '';
  let result = false;
  if (ph < 6.5) {
    info = `* PH：PH含量为 ${ph} , 低于生活用水的国家标准(6.5<=PH<=8.5)；\n`;
  } else if (ph > 8.5) {
    info = `* PH：PH含量为 ${ph} , 高于生活用水的国家标准(6.5<=PH<=8.5)；\n`;
  } else {
    info = `* PH：PH含量为 ${ph} , 符合生活用水的国家标准(6.5<=PH<=8.5)；\n`;
    result = true;
  }
  return { info, result };
}

export function checkTurbidity(turbidity) {
  let info = '';
  let result = false;
  if (turbidity > 1) {
    info = `* 浑浊度：浑浊度为 ${turbidity} NTU, 低于生活用水的国家标准(<=1NTU)；\n`;
  } else {
    info = `* 浑浊度：浑浊度为 ${turbidity} NTU, 符合生活用水的国家标准(<=1NTU)；\n`;
    result = true;
  }
  return { info, result };
}

export function checkFluoride(fluoride) {
  let info = '';
  let result = false;
  if (fluoride > 1) {
    info = `* 含氟量：含氟量为 ${fluoride} mg/L, 低于生活用水的国家标准(<=1mg/L)；\n`;
  } else {
    info = `* 含氟量：含氟量为 ${fluoride} mg/L, 符合生活用水的国家标准(<=1mg/L)；\n`;
    result = true;
  }
  return { info, result };
}

export function checkCyanin(cyanin) {
  let info = '';
  let result = false;
  if (cyanin > 1) {
    info = `* 含氰量：含氰量为 ${cyanin} mg/L, 低于生活用水的国家标准(<=1mg/L)；\n`;
  } else {
    info = `* 含氰量：含氰量为 ${cyanin} mg/L, 符合生活用水的国家标准(<=1mg/L)；\n`;
    result = true;
  }
  return { info, result };
}

/**
 * 
 * @param quality:{ ph, turbidity, fluoride, cyanin }
 */
function checkQuality(quality) {
  let info = ''
  let result = true;
  let res = { info: '', result: true };
  for (const key of Object.keys(quality)) {
    switch (key) {
      case 'ph':
        res = checkPH(quality[key]);
        break;
      case 'turbidity':
        res = checkTurbidity(quality[key]);
        break;
      case 'fluoride':
        res = checkFluoride(quality[key]);
        break;
      case 'cyanin':
        res = checkCyanin(quality[key]);
        break;
      default:
        break;
    }
    // 如果有一处报警
    if (!res.result) result = false;
    info += res.info;
  }
  return { info, result };
}

export default checkQuality;