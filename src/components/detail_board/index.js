import tpl from './index.tpl';
import './index.scss';
import tools from '../../utils/tools';
import { DetailTitle } from "./detail_title/index";
import { ContentItem } from "./content_item/index";
import { BtnGroup } from "./btn_group/index";
import { DetailModel} from '../../models/detail';

class Detail_board {
  constructor(el, phoneInfo) {
    this.name = 'detail_board';
    this.$el = el;
    this.phoneInfo = phoneInfo;
    this.detailModel = new DetailModel();
  }
  
  init() {
    this.initPhoneInfo();
    this.render();
    this.bindEvent();
    this.initUserPhoneInfo();
  }

  
  initPhoneInfo() {
    const phoneInfo = this.phoneInfo;

    this.phoneInfo.color = $.parseJSON(phoneInfo.color);
    this.phoneInfo.version_info = $.parseJSON(phoneInfo.version_info);
    this.phoneInfo.pics = $.parseJSON(phoneInfo.pics);
  }

  initUserPhoneInfo() {
    const phoneInfo = this.phoneInfo,
      versions = phoneInfo.version_info;
    this.userPhoneInfo = {
      id: phoneInfo.id,
      link: window.location.href,
      name: phoneInfo.phone_name,
      price: versions[0].price,
      version: versions[0].version,
      color: phoneInfo.color[0],
      img: phoneInfo.pics[0][0][0]
    };
  }

  render() {
    const detailTitle = new DetailTitle(),
      contentItem = new ContentItem(),
      btnGroup = new BtnGroup(),

      phoneInfo = this.phoneInfo,
      colors = phoneInfo.color,
      versions = phoneInfo.version_info,
      pics = phoneInfo.pics;
    
    let versionList = '',
      colorList = '';
    
    colors.forEach((color, idx) => {
      colorList += contentItem.tpl(color, null, pics[idx][idx][0], phoneInfo.phone_name, idx);
    });

    versions.forEach((version, idx) => {
      versionList += contentItem.tpl(version.version, version.price, null, phoneInfo.phone_name, idx);
    })

    
    this.$el.append(tools.tplReplace(tpl(), {
      pic_url: this.phoneInfo.pics[0][0][0],
      phone_name: phoneInfo.phone_name,
      slogan: phoneInfo.slogan,
      default_price: phoneInfo.default_price,
      title_1: detailTitle.tpl('手机版本'),
      versions: versionList,
      title_2: detailTitle.tpl('手机颜色'),
      colors: colorList,
      btnGroup: btnGroup.tpl()
    }))
  }

  bindEvent() {
    const $el = this.$el,
      $versions = $el.find('.J_versions'),
      $colors = $el.find('.J_colors'),
      $btnGroup = $el.find('.J_btnGroup');
    this.versionItems = $versions.children('.content-item');
    this.colorItems = $colors.children('.content-item');
    this.detailPic = $el.find('.J_detailPic');

    $versions.on('click', '.content-item', {_this: this}, this.onVersionClick);
    $colors.on('click', '.content-item', {_this: this}, this.onColorClick);
    $btnGroup.on('click', '.detail-btn', {_this: this}, this.onBtnGroupClick);
  }

  onVersionClick(e) {
    const _this = e.data._this;
    _this.versionChange(this);
  }

  onColorClick(e) {
    const _this = e.data._this;
    _this.colorChange(this);
  }

  onBtnGroupClick(e) {
    const _this = e.data._this,
      $tar = $(e.target),
      dataField = $tar.attr('data-field');
    switch(dataField) {
      case 'purchase': {}
        _this.purchase();
        break;
      case 'addToCart':
        _this.addToCart();
        break;
    }
  }

  versionChange(target) {
    const tar = target,
      $tar = $(tar),
      curIdx = $tar.index();
    
    this.userPhoneInfo.price = $tar.attr('data-price');
    this.userPhoneInfo.version = $tar.attr('data-content');

    this.versionItems.eq(curIdx).addClass('current')
      .siblings().removeClass('current');
  }

  colorChange(target) {
    const tar = target,
    $tar = $(tar),
    curIdx = $tar.index();

    this.userPhoneInfo.color = $tar.attr('data-content');
    this.userPhoneInfo.img = $tar.attr('data-pic');
    
    this.detailPic.attr('src', this.userPhoneInfo.img);
    this.colorItems.eq(curIdx).addClass('current')
      .siblings().removeClass('current');
  }

  purchase() {
    this.detailModel.purchase(this.userPhoneInfo, true, () => {
      window.location.href = 'order.html';
    });
  }

  addToCart() {
    this.detailModel.addToCart(this.userPhoneInfo, () => {
      window.location.href = 'cart.html';
    });
  }
}




export {
  Detail_board
}