function tplReplace (tpl, replaceObject) {
	return tpl.replace(/{{(.*?)}}/g, (node, key) => {
		return replaceObject[key];
	})
}

function trimSpace (str) {
  return str.replace(/\s+/g, '');
}

function getUrlQueryValue (key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'),
        res = window.location.search.substr(1).match(reg);

  return res != null ? decodeURIComponent(res[2]) : null;
}

function throttle(fn, delay){
  var t = null,
      begin = new Date().getTime();

  return function(){
    var _self = this,
        args = arguments,
        cur = new Date().getTime();

    clearTimeout(t);

    if(cur - begin >= delay){
      fn.apply(_self, args);
      begin = cur;
    }else{
      t = setTimeout(function(){
        fn.apply(_self, args);
      }, delay);
    }
  }
}

function getDateTime() {
  const date = new Date();

  let year = date.getFullYear(),
    month = addZero(date.getMonth() + 1),
    day = addZero(date.getDate()),
    hours = addZero(date.getHours()),
    minutes = addZero(date.getMinutes()),
    seconds = addZero(date.getSeconds());

  function addZero(value) {
    return value < 10 ? '0' + value : value;
  }

  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}

function setRandomNo(num) {
  var no = '';
  for (var i = 0; i < num; i++) {
    no += Math.floor(Math.random() * 10);
  }
  return new Date().getTime() + no;
}

module.exports = {
  tplReplace,
  trimSpace,
  getUrlQueryValue,
  throttle,
  getDateTime,
  setRandomNo
}