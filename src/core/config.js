import { fullScreen } from './utils';

export default {
  elementClassParent: 'jmp-wrapper',
  elementIdNav: 'jmp-nav',
  elementIdContent: 'jmp-content',
  elementClassMd: 'jmp-md',
  elementIdTextarea: 'render-md',
  elementIdHtml: 'render-html',
  elementClassHtml: 'jmp-html',
  elementClassHtmlScroll: 'theme-default-content',
  choosePreCode: '#render-html pre code',
  menus: ['bold', 'italic', 'underline', 'del', 'sup', 'sub', 'disorder', 'order', 'code', 'image', 'link', 'table', 'reset', 'step', 'next', 'full'],
  navList: [{
    name: '加粗',
    index: 'bold',
    icon: 'jmp-icon-bold',
    id: 'jmp-icon-bold',
    'class': 'jmp-nav-item',
    handle: function (jm) {
      jm.render.renderReplaceSelection({
        data: '**#data#**',
        isCursor: true,
        ch: 2,
        isSelect: true
      });
    }
  }, {
    name: '斜体',
    index: 'italic',
    icon: 'jmp-icon-italic',
    id: 'jmp-icon-italic',
    'class': 'jmp-nav-item',
    handle: function (jm) {
      jm.render.renderReplaceSelection({
        data: '*#data#*',
        isCursor: true,
        ch: 1,
        isSelect: true
      });
    }
  }, {
    name: '下划线',
    index: 'underline',
    icon: 'jmp-icon-underline',
    id: 'jmp-icon-underline',
    'class': 'jmp-nav-item',
    handle: function (jm) {
      jm.render.renderReplaceSelection({
        data: '<u>#data#</u>',
        isCursor: true,
        ch: 3,
        isSelect: true
      });
    }
  }, {
    name: '删除线',
    index: 'del',
    icon: 'jmp-icon-strikethrough',
    id: 'jmp-icon-del',
    'class': 'jmp-nav-item',
    handle: function (jm) {
      jm.render.renderReplaceSelection({
        data: '<del>#data#</del>',
        isCursor: true,
        ch: 5,
        isSelect: true
      });
    }
  }, {
    name: '上标',
    index: 'sup',
    icon: 'jmp-icon-708bianjiqi_shangbiao',
    id: 'jmp-icon-sup',
    class: 'jmp-nav-item',
    handle: function (jm) {
      jm.render.renderReplaceSelection({
        data: '<sup>#data#</sup>',
        isCursor: true,
        ch: 5,
        isSelect: true
      });
    }
  }, {
    name: '下标',
    index: 'sub',
    icon: 'jmp-icon-709bianjiqi_xiabiao',
    id: 'jmp-icon-sub',
    class: 'jmp-nav-item',
    handle: function (jm) {
      jm.render.renderReplaceSelection({
        data: '<sub>#data#</sub>',
        isCursor: true,
        ch: 5,
        isSelect: true
      });
    }
  }, {
    name: '无序列表',
    index: 'disorder',
    icon: 'jmp-icon-richtextbulletedlist',
    id: 'jmp-icon-disorder',
    'class': 'jmp-nav-item',
    handle: function (jm) {
      jm.render.renderReplaceSelection({
        data: '- #data#',
        isCursor: true,
        ch: 2,
        isSelect: true
      });
    }
  }, {
    name: '有序列表',
    index: 'order',
    icon: 'jmp-icon-richtextnumberedlist',
    id: 'jmp-icon-order',
    'class': 'jmp-nav-item',
    handle: function (jm) {
      jm.render.renderReplaceSelection({
        data: '1. #data#',
        isCursor: true,
        ch: 3,
        isSelect: true
      });
    }
  }, {
    name: '插入代码段',
    index: 'code',
    icon: 'jmp-icon-insert_tag_field',
    id: 'jmp-icon-code',
    'class': 'jmp-nav-item',
    handle: function (jm) {
      jm.render.renderReplaceSelection({
        data: '```\n#data#\n```',
        isCursor: true,
        ch: 3,
        line: 1,
        isSelect: true
      });
    }
  }, {
    name: '插入图片',
    index: 'image',
    icon: 'jmp-icon-image',
    id: 'jmp-add-image',
    'class': 'jmp-nav-item',
    handle: function (jm) {
      jm.render.renderReplaceSelection({
        data: 'image'
      });
    }
  }, {
    name: '插入链接',
    index: 'link',
    icon: 'jmp-icon-link',
    id: 'jmp-add-link',
    'class': 'jmp-nav-item',
    handle: function (jm) {
      jm.render.renderReplaceSelection({
        data: '[link](#data#)',
        isCursor: true,
        ch: 7,
        line: 0,
        isSelect: true
      });
    }
  }, {
    name: '插入表格',
    index: 'table',
    icon: 'jmp-icon-764bianjiqi_charubiaoge',
    id: 'jmp-add-table',
    'class': 'jmp-nav-item',
    handle: function (jm) {
      jm.render.renderReplaceSelection({
        data: '||||\n|-|-|-|\n||||',
        isCursor: true,
        ch: 1,
        line: 0,
        isSelect: false
      });
    }
  }, {
    name: '上一步',
    index: 'step',
    icon: 'jmp-icon-shangyibu',
    id: 'jmp-icon-undo',
    class: 'jmp-nav-item',
    handle: function (jm) {
      jm.editor.undo();
    }
  }, {
    name: '下一步',
    index: 'next',
    icon: 'jmp-icon-xiayibu',
    id: 'jmp-icon-reset',
    class: 'jmp-nav-item',
    handle: function (jm) {
      jm.editor.redo();
    }
  }, {
    name: '全屏模式',
    index: 'full',
    icon: 'jmp-icon-expand',
    id: 'jmp-add-full',
    'class': 'jmp-nav-item',
    handle: function (jm) {
      var status = 'full';
      if (jm.fullScreenStatus && jm.fullScreenStatus === 'full') {
        status = 'cancel';
      } else {
        status = 'full';
      }
      fullScreen(jm, status);
    }
  }]
};