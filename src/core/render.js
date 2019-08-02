import {
  debounce,
  getEl,
  callHook,
  editorReplaceSelection
} from './utils';

import {
  navbar,
  side,
  sideMd,
  sideHtml,
  imageDialog
} from './component';

import config from './config';

import {
  Compile
} from './compile';

import hljs from 'highlight.js';

import CodeMirror from 'codemirror';

/**
 * 以防抖的形式监听文本变化，并准备渲染 html
 */
function handleEditor(jm, htmlSide, compile) {
  const editor = jm.editor;
  editor.on('changes', function (instance, changes) {
    // lazyChange()
    debounce(editor, function (res) {
      showHtml(jm, htmlSide, res, compile);
    });
  });
};

/**
 * 将 md 文本编译为 html，并渲染到节点上，展示给用户
 */
function showHtml(jm, htmlSide, ctx, compile) {
  var compileHtml = compile.start(ctx);
  htmlSide.innerHTML = compileHtml;
  document.querySelectorAll(config.choosePreCode).forEach(function (block) {
    hljs.highlightBlock(block);
  });

  callHook(jm, 'watched', {
    ctx: ctx,
    html: compileHtml
  });
};

/**
 * 渲染 jmp 整个节点到浏览器上
 */
function renderHtml(jm, el) {
  var parentNode = el;
  parentNode.setAttribute('class', config.elementClassParent);

  var parentHeight = parentNode.offsetHeight,
    navHeight = parentHeight * 0.08,
    mdContentHeight = parentHeight * 0.92;
  navHeight = 42;
  mdContentHeight = parentHeight - navHeight;
  var navbarNode = navbar({
      height: navHeight
    }),
    sideNode = side({
      height: mdContentHeight
    }),
    sideMdNode = sideMd(),
    sideHtmlNode = sideHtml();
  parentNode.appendChild(navbarNode);
  parentNode.appendChild(sideNode);

  config.navList.forEach(function (item) {
    getEl(item.id) && getEl(item.id).addEventListener('click', function () {
      item.handle(jm);
    }, false);
  });

  return {
    parentNode: parentNode,
    sideMd: sideMdNode,
    sideHtml: sideHtmlNode
  };
};

function uploadImage(jm, res) {
  var file = Array.prototype.slice.call(res, 0);
  callHook(jm, 'uploaded', {
    file: file
  });
};

function editorConfig(textareaNode) {
  return CodeMirror.fromTextArea(textareaNode, {
    // lineNumbers: true,
    mode: 'markdown',
    theme: 'default',
    lineWrapping: true,
    scrollPastEnd: true,
    autofocus: true,
    styleActiveLine: {
      nonEmpty: true
    },
    tabSize: 8,
    indentUnit: 4
  });
};

let mdNode = null,
  htmlNode = null,
  mainFlag = false, // 抵消两个滚动事件之间互相触, 
  preFlag = false; // 如果两个 flag 都为 true，证明是反弹过来的事件引起的

function asyncScroll(type) {
  if (type == 'md') {
    preFlag = true;
    if (mainFlag === true) { // 抵消两个滚动事件之间互相触发
      mainFlag = false;
      preFlag = false;
      return;
    }
    const scrollValHtml = (mdNode.scrollTop + mdNode.clientHeight) * htmlNode.scrollHeight / mdNode.scrollHeight - htmlNode.clientHeight;
    htmlNode.scrollTop = scrollValHtml;
    return;
  }
  if (type == 'html') {
    mainFlag = true;
    if (preFlag === true) { // 抵消两个滚动事件之间互相触发
      mainFlag = false;
      preFlag = false;
      return;
    }
    const scrollValMd = (htmlNode.scrollTop + htmlNode.clientHeight) * mdNode.scrollHeight / htmlNode.scrollHeight - mdNode.clientHeight;
    mdNode.scrollTop = scrollValMd;
    return;
  }
}

function asyncScrollMd() {
  asyncScroll('md');
}

function asyncScrollHtml() {
  asyncScroll('html');
}

function initAsyncScroll(md, html) {
  mdNode = md;
  htmlNode = html;

  md.addEventListener('scroll', asyncScrollMd, false);

  html.addEventListener('scroll', asyncScrollHtml, false);
}

export class Render {

  constructor(jm) {
    this.jm = jm;
    this.options = jm.$options;

    const compile = new Compile(jm);

    const el = jm.el;
    // 渲染组件到 View
    renderHtml(jm, el);

    const htmlSide = this.htmlSide = getEl(config.elementIdHtml);

    const htmlScrollSide = getEl('.' + config.elementClassHtml);

    const textareaSide = getEl(config.elementIdTextarea);
    const editor = this.editor = editorConfig(textareaSide);

    // 将 editor 添加进 jm 实例中
    jm.editor = editor;

    handleEditor(jm, htmlSide, compile);

    const mdScrollNode = editor.getScrollerElement();

    initAsyncScroll(mdScrollNode, htmlScrollSide);

    // 渲染完成 - 通知回调
    callHook(jm, 'mounted');
  }

  reloadRender(el) {
    const parentNode = el;

    let parentHeight = parentNode.offsetHeight,
      navHeight = parentHeight * 0.08,
      mdContentHeight = parentHeight * 0.92,
      navbar = getEl('#' + config.elementIdNav),
      side = getEl('#' + config.elementIdContent);
    navHeight = 42;
    mdContentHeight = parentHeight - navHeight;
    navbar.style.minHeight = navHeight + 'px';
    side.style.minHeight = mdContentHeight + 'px';
  };

  renderReplaceSelection(options) {
    if (options.data === 'image') {
      imageDialog(this.jm, uploadImage);
      return;
    }

    editorReplaceSelection({
      jm: this.jm,
      data: options.data || '',
      isCursor: options.isCursor || false,
      ch: options.ch || 0,
      line: options.line || 0,
      isSelect: options.isSelect || false
    });
  };

  insertImage(title = '图片', url = '') {
    if (!url) {
      console.error('[Jmp]：Network image address is empty');
      return;
    }
    const ctx = `![${title}](${url})`
    this.jm.editor.setValue(ctx);
  }
}