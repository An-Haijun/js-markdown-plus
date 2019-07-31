/* 引入 jmp-component */
var jm = new Jmp({
  el: '#jmp-md',
  theme: '',
  menus: ['bold', 'italic', 'underline', 'del', 'sup', 'sub', 'disorder', 'order', 'code', 'image', 'link', 'table', 'undo', 'redo', 'full'],
  navMenus: [{
    name: '撤销',
    index: 'undo',
    icon: 'jmp-icon-702bianjiqi_zhongzuo',
    id: 'jmp-icon-undo',
    class: 'jmp-nav-item',
    handle: function (jm) {
      jm.editor.undo();
    }
  }, {
    name: '回退',
    index: 'redo',
    icon: 'jmp-icon-702bianjiqi_zhongzuo',
    id: 'jmp-icon-reset',
    class: 'jmp-nav-item',
    handle: function (jm) {
      jm.editor.redo();
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
  }],
  mounted: function () {
    console.log(this);
  },
  watched: function (res) {
    console.log('[watched]：', res);
  },
  uploaded: function (res) {
    console.log('[uploaded]：', res);
  }
});