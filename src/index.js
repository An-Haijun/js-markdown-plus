
import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/agate.css';
import './css/basic.scss';
import './css/component.scss';
import './css/md-html.scss';
import './css/render.scss';


import config from './core/config';
import { Render } from './core/render';


/**
 * 以 Jmp = jm 为核心，贯穿整个程序上下文，主进程都在 jm 中集合；
 * @param {options} 初始化参数，动态配置参数
 * @param {editor} codeMirror 实例对象
 */


function Jmp(options) {
    this.$options = options;
    var optionsO = {};
    if (!options.hasOwnProperty('el')) {
        console.error('"el" parameter is empty');
        return;
    }

    this.el = typeof options.el === 'string' ? document.querySelector(options.el) : el;
    this.mounted = options.mounted || null;
    this.watched = options.watched || null;
    this.uploaded = options.uploaded || null;

    this.init();
}

Jmp.prototype.init = function () {
    // this = jm
    if (this.$options.navMenus && this.$options.navMenus.length > 0 && this.$options.navMenus instanceof Array) {
        config.navList = config.navList.concat(this.$options.navMenus);
    };

    if (this.$options.menus && this.$options.menus.length > 0 && this.$options.menus instanceof Array) {
        config.menus = this.$options.menus;
    };
    this.render = new Render(this);
}

export default Jmp; 