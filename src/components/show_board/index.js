import tpl from './tpl/board.tpl';
import itemTpl from './tpl/item.tpl';
import './index.scss';
import tools from '../../utils/tools';

class ShowBoard {
  constructor(el, data) {
    this.name = 'showBoard';
    this.$el = el;
    this.phoneDatas = data;
  }
  
  init() {
    this.render();
  }

  render() {
    this.$el.append(tools.tplReplace(tpl(), {
      list: this.makeList(this.phoneDatas)
    }));
  }

  makeList(datas) {
    let list = '';

    datas.forEach((item, idx) => {
      list += tools.tplReplace(itemTpl(), {
        id: item.id,
        isFirst: idx % 5 === 0 ? 'first' : '',
        phone_name: item.phone_name,
        pic: $.parseJSON(item.pics)[0][0][0],
        slogan: item.slogan.substr(0, 10),
        default_price: item.default_price
      });
    });

    return list;
  }
}

export {
  ShowBoard
}