export default class Result {
  //描述统一格式中的数据
  private data: any;
  //描述统一格式中的编码，用于区分操作，可以简化配置0或1表示成功失败
  private code: number;
  //描述统一格式中的消息，可选属性
  private msg: string;

  constructor(code: number, msg: string, data: any) {
    this.data = data;
    this.code = code;
    this.msg = msg;
  }
}
