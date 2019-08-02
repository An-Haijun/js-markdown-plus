/* 引入 jmp-component */
var jm = new Jmp({
  el: '#jmp-md',
  theme: '',
  menus: [],
  navMenus: [],
  mounted: function () {
    // console.log(this);
  },
  watched: function (res) {
    // console.log('[watched]：', res);
  },
  uploaded: function (res) {
    // console.log('[uploaded]：', res);
    // this.render.insertImage('我是一张图片：笑脸', '');
  }
});