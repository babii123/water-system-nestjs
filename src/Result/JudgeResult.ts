import { Code } from './Code';
import { Message } from './Message';

export function updateResult(res) {
  if (res.affected === 1) {
    return {
      code: Code.UPDATE_OK,
      msg: Message.Change_Success,
    };
  } else if (res.affected === 0) {
    return {
      code: Code.UPDATE_OK,
      msg: Message.Not_Exist,
    };
  }
  return {
    code: Code.UPDATE_ERR,
    msg: Message.Change_Fail,
  };
}

export function createResult() {}

export function deleteResult(res) {
  if (res.affected === 1) {
    return {
      code: Code.DELETE_OK,
      msg: Message.Del_Success,
    };
  } else if (res.affected === 0) {
    return {
      code: Code.DELETE_ERR,
      msg: Message.Not_Exist,
    };
  }
  return {
    code: Code.DELETE_ERR,
    msg: Message.Del_Fail,
  };
}

export function findResult() {}
