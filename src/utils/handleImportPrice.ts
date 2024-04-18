import { CreateWaterPriceDto } from "src/water-price/dto/create-water-price.dto";

function handleImportPrice(data) {
  let idIndex, typeIndex, basicPriceIndex, resourceCostIndex, pollutionCostIndex, realPriceIndex;
  // 获取每列的index
  data[0].forEach((head, index) => {
    if (head === 'ID') {
      idIndex = index;
    } else if (head === '类型') {
      typeIndex = index;
    } else if (head === '基本水价') {
      basicPriceIndex = index;
    } else if (head === '水资源费') {
      resourceCostIndex = index;
    } else if (head === '污水处理费') {
      pollutionCostIndex = index;
    } else if (head === '用户最终负担价格') {
      realPriceIndex = index;
    }
  })

  // 判断是不是每一列都有
  if (!typeIndex || !basicPriceIndex || !resourceCostIndex || !pollutionCostIndex || !realPriceIndex) {
    return { resPriceArr: null, info: '数据信息不全' };
  }
  let resPriceArr: { [key: string]: CreateWaterPriceDto } = {
    '生活用水': undefined,
    '工业企业用水': undefined,
    '行政事业用水': undefined,
    '经营服务用水': undefined,
    '特种行业用水': undefined
  }
  // 处理数据
  let resInfo = ''
  data.forEach((row, index) => {
    if (index !== 0) {
      const { res, info } = isTrue(row[typeIndex], row[basicPriceIndex], row[resourceCostIndex], row[pollutionCostIndex], row[realPriceIndex])
      resInfo += info;
      if (res) {
        const price = new CreateWaterPriceDto(row[typeIndex], row[basicPriceIndex], row[resourceCostIndex], row[pollutionCostIndex], row[realPriceIndex]);
        resPriceArr[row[typeIndex] as string] = price;
      }
    }
  })

  return { resPriceArr, info: resInfo };
}

// 判断数据是否合理
function isTrue(type, basicPrice, resourceCost, pollutionCost, realPrice) {
  let isType = false;
  if (!['生活用水', '工业企业用水', '行政事业用水', '经营服务用水', '特种行业用水'].includes(type)) {
    return { res: false, info: `${type}是不合理的用水类型 | ` };
  } else {
    isType = true;
  }
  if (isNaN(parseInt(basicPrice))) {
    return { res: false, info: `${type}的基本水价数据非数字类型 | ` };
  } else if (isNaN(parseInt(resourceCost))) {
    return { res: false, info: `${type}的水资源费数据非数字类型 | ` };
  } else if (isNaN(parseInt(pollutionCost))) {
    return { res: false, info: `${type}的污水处理费数据非数字类型 | ` };
  } else if (isNaN(parseInt(realPrice))) {
    return { res: false, info: `${type}的用户最终负担价格数据非数字类型 | ` };
  }
  return { res: true, info: '' };
}

export default handleImportPrice;
