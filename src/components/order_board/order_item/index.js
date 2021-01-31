import tpl from './index.tpl';
import './index.scss';
import tools from '../../../utils/tools';

class OrderItem {
  constructor() {
    this.name = 'orderItem';
  }

  tpl(data) {
    return tools.tplReplace(tpl(), {
      orderId: data.orderId,
      img: data.img,
      name: data.name,
      link: data.link,
      price: data.price,
      version: data.version,
      color: data.color
    });
  }
}

export {
  OrderItem
};