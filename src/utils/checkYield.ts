/**
 * 
 * @param storage {}
 * @returns String
 */
function checkYield(storage) {
  let info = '';
  let result = false;
  if (storage.supply > storage.storage * 0.8) {
    info = `* 水量数据不安全，供水量为：${storage.supply}L，库存量为：${storage.storage}\n`;
  } else {
    info = `* 水量数据安全，供水量为：${storage.supply}L，库存量为：${storage.storage}\n`;
    result = true;
  }
  return { info, result };
}

export function countInRange(array, start, end) {
  const filteredArray = array.filter(item => item >= start && item < end);
  return filteredArray.length;
}

export default checkYield;