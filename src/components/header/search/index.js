import tpl from './index.tpl';
import './index.scss';

import tools from '../../../utils/tools';

class Search {
	constructor () {
		this.name = 'search';
		this.tpl = tpl;
	}

  searchPhone (e) {
    const data = e.data,
          $searchForm = $('#J_searchForm'),
          $searchInput = $('#J_keyword');
    const keyword = tools.trimSpace($searchInput.val()),
          action = $searchForm.prop('action'),
          keywordLen = keyword.length;
    console.log(action);
    if (keywordLen > 0) {
    	  window.open(action + '?keyword=' + keyword);
    }
  }
}

export { Search };