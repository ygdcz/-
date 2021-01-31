import { App } from './App';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import tools from '../utils/tools';
import { Detail_board } from '../components/detail_board';
import { DetailModel } from '../models/detail';

class Detail extends App {
	constructor($) {
	  super($, {
      swiper: false,
      phone: true,
      field: true
    });
    this.phoneId = tools.getUrlQueryValue('id');
	}

	async render () {
    const data = await this.getPhoneInfo(this.phoneId);
    new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init();
    new Detail_board(this.$app, data).init();
    new Footer(this.$app).init();
    $('body').prepend(this.$app);
    
  }

  getPhoneInfo(id) {
    const phoneInfo = new DetailModel();
    return phoneInfo.getPhoneId(id);
  }

} 

new Detail(jQuery);