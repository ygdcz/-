import tpl from './tpl/wrapper.tpl';
import itemTpl from './tpl/item.tpl';
import './index.scss';

import { ShowBoard } from '../../components/show_board';
import {NoDataTip} from '../../components/no_data_tip';

import tools from '../../utils/tools';

class Tab {
  constructor (el, phoneDatas, fieldDatas) {
  	this.name = 'tab';
    this.$el = el;
    this.fieldDatas = fieldDatas;
    this.phoneDatas = phoneDatas;
    this.NoDataTip = new NoDataTip();
    this.cache = {};
  }

  async init () {
    await this.render();
    this.bindEvent();
  }

  async render () {
    let list = '';

    this.fieldDatas.forEach((item, idx) => {
      list += tools.tplReplace(itemTpl(), {
        field: item.field,
        series_name: item.series_name
      });
    });

    await this.$el.append(tools.tplReplace(tpl(), { list }));
  }

  bindEvent () {
    const $tab = $('.J_tab'),
          $board = $('.J_board'),
          $searchInput = $('#J_search'),
          oShowBoard = new ShowBoard();

    $tab.on('click', '.tab-item', {
      $board, oShowBoard
    }, $.proxy(this.tabClick, this));

    $searchInput.on('input', {
      $board, oShowBoard, $tab
    },  tools.throttle($.proxy(this.inputSearch, this), 1000));

  }

  tabClick (e) {
    const data = e.data,
          $board = data.$board,
          oShowBoard = data.oShowBoard,
          tar = e.target,
          $tar = $(tar),
          tagName = tar.tagName.toLowerCase();

    if (tagName === 'a') {
      const field = $tar.attr('data-field');

      this.tabChange($tar);
      this.appendList(field, $board, oShowBoard);
    }
  }

  inputSearch(e) {
    const data = e.data,
      $board = data.$board,
      oShowBoard = data.oShowBoard,
      $tab = data.$tab,
      $tar = $(e.target),
      value = tools.trimSpace($tar.val()),
      valLen = value.length;
    this.tabChange($tab.find('.all'));
    if(valLen < 0) {
      this.appendList('all', $board, oShowBoard);
    }
    else {
      this.appendList('all', $board, oShowBoard, value);
    }
  }

  tabChange ($target) {
    $target.parent().addClass('current')
           .siblings().removeClass('current');
  }

  appendList (field, $board, oShowBoard, keyword) {
    if (keyword) {
      let data = this.filterDatas(this.phoneDatas, field, keyword),
          dataLen = data.length;
      
        if (dataLen > 0) {
          $board.html(oShowBoard.makeList(data));
        }else {
          $board.html(this.NoDataTip.tpl('未搜索到相关数据'));
        }
    } else {
      if (!this.cache[field]) {
        this.cache[field] = oShowBoard.makeList(this.filterDatas(this.phoneDatas, field));
      } 

      $board.html(this.cache[field]);
    }
  }


  filterDatas (datas, field, keyword) {
    return datas.filter((item, idx) => {
      if (keyword) {
         const phone_name = item.phone_name.toLowerCase(),
               slogan = item.slogan.toLowerCase();
         keyword = keyword.toLowerCase();

         return phone_name.includes(keyword) || slogan.includes(keyword);
      } else {
        switch (field) {
          case 'all':
            return true;
          default:
            return item.field === field;
        }
      }
    });
  }
}

export { Tab };