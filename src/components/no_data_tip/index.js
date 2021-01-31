import './index.scss';
import tpl from './index.tpl';
import tools from '../../utils/tools';

class NoDataTip {
  constructor() {
    this.name = 'noDataTip';
  }

  tpl(text) {
    return tools.tplReplace(tpl(), {
      text
    });
  }
}

export {
  NoDataTip
}