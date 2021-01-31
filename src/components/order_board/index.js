import tpl from './index.tpl';
import './index.scss';
import tools from '../../utils/tools';
import { NoDataTip } from '../no_data_tip/index';
import { OrderModel} from '../../models/order';
import { OrderItem } from './order_item';

class OrderBoard {
  constructor(el) {
    this.name = 'orderBoard';
    this.$el = el;
    this.orderModel = new OrderModel();
    this.purchaseDatas = this.orderModel.getPurchaseDatas();
  }

  init() {
    this.render();
  }

  render() {
    let html = '';
    let orderList = '';
    if(this.purchaseDatas && this.purchaseDatas.length > 0) {
      this.purchaseDatas.forEach(purchaseData => {
        orderList += new OrderItem().tpl(purchaseData);
      });
      html = tools.tplReplace(tpl(), {
        orderList
      });
    } else {
      html = new NoDataTip().tpl('订单空空如也.');
    }
    this.$el.append(html);
  }
}

export {
  OrderBoard
};