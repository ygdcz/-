import { App } from './App';

import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { OrderBoard } from '../components/order_board';


class Order extends App {
  constructor($) {
    super($, {
      swiper: false,
      phone: true,
      field: true
    })
  }

  render() {
    new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init();
    new OrderBoard(this.$app).init();
    new Footer(this.$app).init();
    $('body').prepend(this.$app);
  }
}

new Order(jQuery)