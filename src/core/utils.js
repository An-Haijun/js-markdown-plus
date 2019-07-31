import _ from 'lodash';

export const debounce = _.debounce(function (editor, callback) {
  const res = editor.getValue();
  callback(res);
}, 500);

export function createEl(options) {
  if (typeof options === 'string') {
    return document.createElement(options);
  }
  const _el = document.createElement(options.name);
  for (let key in options.attr) {
    const val = options.attr[key];
    _el.setAttribute(key, val);
  }
  return _el;
}

export function pushLink(href) {
  const head = document.getElementsByTagName('head')[0],
    cssURL = href,
    linkTag = document.createElement('link');

  linkTag.id = 'dynamic-style';
  linkTag.href = cssURL;
  linkTag.setAttribute('rel', 'stylesheet');
  linkTag.setAttribute('media', 'all');
  linkTag.setAttribute('type', 'text/css');

  head.appendChild(linkTag);
}

export function getEl(el) {
  if (el.indexOf('#') > -1 || el.indexOf('.') > -1) {
    const res = document.querySelectorAll(el);
    return res.length > 1 ? res : res[0];
  }
  return document.getElementById(el);
}

export function callHook(jm, type, res) {
  if (!jm || !type) {
    console.error('[jmt]：callHook params (jm || type) value is empty');
    return false;
  }


  res ? jm[type](res) : jm[type]();
}

/**
 * @parma {El: Element} options
 */
export function getElVal(options) {
  const elLists = options.el,
    elType = options.type,
    elAttrName = options.attr,
    res = {};

  elLists.forEach(function (item) {
    const value = item.getAttribute(elAttrName);
    const child = item.querySelector(elType + '[' + elAttrName + '=' + value + ']');
    res[value] = child;
  });
  return res;
}

export function showDialog(wrapper, callback) {
  document.body.appendChild(wrapper);
  callback && callback();
}

export function hideDialog(wrapper, callback) {
  document.body.removeChild(wrapper);
  callback && callback();
}

export function setCursor(jm, line, ch, autoFocus) {
  jm.editor.setCursor(line, ch);
  if (autoFocus) {
    jm.editor.focus();
  }
}

// jm, data, isCursor, ch, line, isSelect
export function editorReplaceSelection(options) {
  const jm = options.jm;

  let data = options.data || '',
    isCursor = options.isCursor || false,
    ch = options.ch || 0,
    line = options.line || 0,
    isSelect = options.isSelect || false;
  const cursorPosition = jm.editor.getCursor();
  if (isSelect) {
    const hasSelectContent = jm.editor.getSelection();
    data = data.replace(/\#data\#/g, hasSelectContent || '');
  }
  jm.editor.replaceSelection(data);
  if (isCursor) {
    const $line = line || 0;
    setCursor(jm, Number(cursorPosition.line) + Number($line), Number(cursorPosition.ch) + Number(ch), true);
  }
}

export function fullScreen(jm, status) {
  const el = jm.el;

  if (status == 'full') {
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.position = 'fixed';
    el.style.top = 0;
    el.style.left = 0;

    jm.render.reloadRender(el);
  } else {
    el.style = '';
    jm.render.reloadRender(el);
  }

  jm.fullScreenStatus = status;
}