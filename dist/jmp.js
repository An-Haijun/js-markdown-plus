/*!
 * Jmp.js v0.1.0
 * (c) 2019-2019 Navy An
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash'), require('marked'), require('highlight.js'), require('codemirror')) :
  typeof define === 'function' && define.amd ? define(['lodash', 'marked', 'highlight.js', 'codemirror'], factory) :
  (global = global || self, global.Jmp = factory(global._, global.marked, global.hljs, global.CodeMirror));
}(this, function (_, marked, hljs, CodeMirror) { 'use strict';

  _ = _ && _.hasOwnProperty('default') ? _['default'] : _;
  marked = marked && marked.hasOwnProperty('default') ? marked['default'] : marked;
  hljs = hljs && hljs.hasOwnProperty('default') ? hljs['default'] : hljs;
  CodeMirror = CodeMirror && CodeMirror.hasOwnProperty('default') ? CodeMirror['default'] : CodeMirror;

  function styleInject(css, ref) {
    if ( ref === void 0 ) { ref = {}; }
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".CodeMirror{font-family:monospace;height:300px;color:#000;direction:ltr}.CodeMirror-lines{padding:4px 0}.CodeMirror pre{padding:0 4px}.CodeMirror-gutter-filler,.CodeMirror-scrollbar-filler{background-color:#fff}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:#000}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid #000;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0!important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-fat-cursor-mark{background-color:rgba(20,255,20,.5)}.cm-animate-fat-cursor,.cm-fat-cursor-mark{-webkit-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite}.cm-animate-fat-cursor{width:auto;border:0;background-color:#7e7}@-webkit-keyframes blink{50%{background-color:transparent}}@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-rulers{position:absolute;left:0;right:0;top:-50px;bottom:-20px;overflow:hidden}.CodeMirror-ruler{border-left:1px solid #ccc;top:0;bottom:0;position:absolute}.cm-s-default .cm-header{color:#00f}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:700}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-type,.cm-s-default .cm-variable-3{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta,.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-invalidchar,.cm-s-default .cm-error{color:red}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0b0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#a22}.CodeMirror-matchingtag{background:rgba(255,150,0,.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:#fff}.CodeMirror-scroll{overflow:scroll!important;margin-bottom:-30px;margin-right:-30px;padding-bottom:30px;height:100%;outline:none;position:relative}.CodeMirror-sizer{position:relative;border-right:30px solid transparent}.CodeMirror-gutter-filler,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-vscrollbar{position:absolute;z-index:6;display:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-30px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:none!important;border:none!important}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-gutter-wrapper ::selection{background-color:transparent}.CodeMirror-gutter-wrapper ::-moz-selection{background-color:transparent}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre{border-radius:0;border-width:0;background:transparent;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:contextual;-webkit-font-feature-settings:\"calt\";font-feature-settings:\"calt\";font-variant-ligatures:contextual}.CodeMirror-wrap pre{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;padding:.1px}.CodeMirror-rtl pre{direction:rtl}.CodeMirror-code{outline:none}.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber,.CodeMirror-scroll,.CodeMirror-sizer{-webkit-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute;pointer-events:none}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}.CodeMirror-focused div.CodeMirror-cursors,div.CodeMirror-dragcursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background-color:#ffa;background-color:rgba(255,255,0,.4)}.cm-force-border{padding-right:.1px}@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:\"\"}span.CodeMirror-selectedtext{background:none}";
  styleInject(css);

  var css$1 = "/*!\n * Agate by Taufik Nurrohman <https://github.com/tovic>\n * ----------------------------------------------------\n *\n * #ade5fc\n * #a2fca2\n * #c6b4f0\n * #d36363\n * #fcc28c\n * #fc9b9b\n * #ffa\n * #fff\n * #333\n * #62c8f3\n * #888\n *\n */.hljs{display:block;overflow-x:auto;padding:.5em;background:#333;color:#fff;-webkit-text-size-adjust:none}.asciidoc .hljs-title,.hljs-label,.hljs-prompt,.hljs-tag .hljs-title,.http .hljs-request{font-weight:700}.hljs-change,.hljs-code{font-style:italic}.hljs-tag,.ini .hljs-title{color:#62c8f3}.hljs-cbracket,.hljs-id,.hljs-tag .hljs-value{color:#ade5fc}.hljs-bullet,.hljs-string{color:#a2fca2}.actionscript .hljs-title,.aspectj .hljs-annotation,.aspectj .hljs-title,.hljs-attribute,.hljs-blockquote,.hljs-built_in,.hljs-change,.hljs-name,.hljs-type,.hljs-variable{color:#ffa}.hljs-hexcolor,.hljs-link_label,.hljs-link_reference,.hljs-number{color:#d36363}.css .hljs-tag,.hljs-constant,.hljs-keyword,.hljs-literal,.hljs-typename,.hljs-winutils{color:#fcc28c}.apache .hljs-sqbracket,.hljs-annotation,.hljs-cdata,.hljs-code,.hljs-comment,.hljs-decorator,.hljs-deletion,.hljs-doctype,.hljs-header,.hljs-horizontal_rule,.hljs-preprocessor,.hljs-shebang,.tex .hljs-formula{color:#888}.hljs-attr_selector,.hljs-regexp{color:#c6b4f0}.actionscript .hljs-type,.hljs-chunk,.hljs-doctype,.hljs-important,.hljs-pi,.hljs-pragma,.hljs-shebang,.http .hljs-attribute{color:#fc9b9b}.hljs-deletion{background-color:#fc9b9b;color:#333}.hljs-addition{background-color:#a2fca2;color:#333}.hljs-tag .hljs-attribute,.hljs a{color:inherit}.hljs a:focus,.hljs a:hover{color:inherit;text-decoration:underline}";
  styleInject(css$1);

  var css$2 = "@font-face{font-family:iconfont;src:url(../font/iconfont.eot?t=1564023409269);src:url(../font/iconfont.eot?t=1564023409269#iefix) format(\"embedded-opentype\"),url(\"data:application/x-font-woff2;charset=utf-8;base64,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\") format(\"woff2\"),url(../font/iconfont.woff?t=1564023409269) format(\"woff\"),url(../font/iconfont.ttf?t=1564023409269) format(\"truetype\"),url(../font/iconfont.svg?t=1564023409269#iconfont) format(\"svg\")}[class*=jmp-icon-]{font-family:iconfont!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.jmp-icon-764bianjiqi_charubiaoge:before{content:\"\\e654\"}.jmp-icon-772bianjiqi_tubiao:before{content:\"\\e656\"}.jmp-icon-702bianjiqi_zhongzuo:before{content:\"\\e659\"}.jmp-icon-777bianjiqi_bangzhu:before{content:\"\\e65a\"}.jmp-icon-708bianjiqi_shangbiao:before{content:\"\\e65b\"}.jmp-icon-709bianjiqi_xiabiao:before{content:\"\\e65d\"}.jmp-icon-724bianjiqi_hangjianju:before{content:\"\\e65f\"}.jmp-icon-725bianjiqi_biaoti:before{content:\"\\e660\"}.jmp-icon-728bianjiqi_zitidaxiao:before{content:\"\\e661\"}.jmp-icon-732bianjiqi_zuoduiqi:before{content:\"\\e662\"}.jmp-icon-734bianjiqi_youduiqi:before{content:\"\\e663\"}.jmp-icon-736bianjiqi_daxie:before{content:\"\\e664\"}.jmp-icon-748bianjiqi_shipin:before{content:\"\\e668\"}.jmp-icon-bold:before{content:\"\\e6d9\"}.jmp-icon-expand:before{content:\"\\e6ed\"}.jmp-icon-image:before{content:\"\\e6f5\"}.jmp-icon-insert_tag_field:before{content:\"\\e6f7\"}.jmp-icon-italic:before{content:\"\\e6f8\"}.jmp-icon-link:before{content:\"\\e701\"}.jmp-icon-quotation_marks:before{content:\"\\e715\"}.jmp-icon-richtextbulletedlist:before{content:\"\\e71a\"}.jmp-icon-richtextnumberedlist:before{content:\"\\e71b\"}.jmp-icon-strikethrough:before{content:\"\\e729\"}.jmp-icon-underline:before{content:\"\\e72b\"}.CodeMirror{height:100%}.CodeMirror-scroll{overflow:auto!important;margin-bottom:0;margin-right:0}.CodeMirror-sizer{padding-top:16px;padding-bottom:16px}";
  styleInject(css$2);

  var css$3 = ".jm-input .jm-input-content{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:99.66%;height:32px;border:1px solid #bbb}.jm-input .jm-input-content,.jm-input .jm-input-content .jm-input-label-left{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.jm-input .jm-input-content .jm-input-label-left{width:20%;height:100%;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;background-color:#eee;border-right:1px solid #bbb}.jm-input .jm-input-content input{width:80%;height:100%;outline:none;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 8px;font-size:14px;border-width:0;background-color:transparent}.jm-input .jm-input-content .mini{width:120px;height:24px}.jmp-dialog-wrapper{width:100%;height:100%;position:fixed;top:0;left:0;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:999}.jmp-dialog-wrapper .jmp-dialog-content{width:100%;height:100%;background-color:rgba(0,0,0,.5);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image{width:412px;background-color:#fafafa;border-radius:6px;padding:32px 16px;font-size:12px;line-height:1.5;color:#595959}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-title{font-size:22px;letter-spacing:1px;font-weight:600;text-align:center;color:#333;margin-bottom:32px}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-content{font-size:16px;padding:16px}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-content .btn-upload{position:relative;text-align:center;height:42px;background-color:#565656;border:1px solid #565656;line-height:42px;margin-bottom:16px}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-content .btn-upload span{color:#fafafa}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-content .btn-upload .upload-file{position:absolute;height:100%;width:100%;left:0;opacity:0;cursor:pointer}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-content .add-link{position:relative;text-align:center;height:42px;display:none;line-height:42px;margin-bottom:16px}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-content .btn-link,.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-content .btn-upload-image{position:relative;text-align:center;height:42px;line-height:42px;margin-bottom:16px;cursor:pointer}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-content .btn-upload-image{display:none}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-content .btn-link span{color:#565656}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-footer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 16px}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-footer .btn-cancel{font-size:14px;letter-spacing:1px;padding:2px 8px;cursor:pointer}.jmp-dialog-wrapper .jmp-dialog-content .jmp-dialog-image .dialog-footer .btn-sure{font-size:14px;letter-spacing:1px;border:1px solid #565656;border-radius:8px;padding:2px 8px;cursor:pointer;margin-left:16px}";
  styleInject(css$3);

  var css$4 = "code[class*=language-],pre[class*=language-]{color:#ccc;background:none;font-family:Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#2d2d2d}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}.theme-default-content code{color:#476582;padding:.25rem .5rem;margin:0;font-size:.85em;background-color:rgba(27,31,35,.05);border-radius:3px}.theme-default-content code .token.deleted{color:#ec5975}.theme-default-content code .token.inserted{color:#3eaf7c}.theme-default-content pre,.theme-default-content pre[class*=language-]{line-height:1.4;padding:1.25rem 1.5rem;margin:.85rem 0;background-color:#282c34;border-radius:6px;overflow:auto}.theme-default-content pre[class*=language-] code,.theme-default-content pre code{color:#fff;padding:0;background-color:transparent;border-radius:0}div[class*=language-]{position:relative;background-color:#282c34;border-radius:6px}div[class*=language-] .highlight-lines{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding-top:1.3rem;position:absolute;top:0;left:0;width:100%;line-height:1.4}div[class*=language-] .highlight-lines .highlighted{background-color:rgba(0,0,0,.66)}div[class*=language-] pre,div[class*=language-] pre[class*=language-]{background:transparent;position:relative;z-index:1}div[class*=language-]:before{position:absolute;z-index:3;top:.8em;right:1em;font-size:12px;font-size:.75rem;color:hsla(0,0%,100%,.4)}div[class*=language-]:not(.line-numbers-mode) .line-numbers-wrapper{display:none}div[class*=language-].line-numbers-mode .highlight-lines .highlighted{position:relative}div[class*=language-].line-numbers-mode .highlight-lines .highlighted:before{content:\" \";position:absolute;z-index:3;left:0;top:0;display:block;width:56px;width:3.5rem;height:100%;background-color:rgba(0,0,0,.66)}div[class*=language-].line-numbers-mode pre{padding-left:4.5rem;vertical-align:middle}div[class*=language-].line-numbers-mode .line-numbers-wrapper{position:absolute;top:0;width:56px;width:3.5rem;text-align:center;color:hsla(0,0%,100%,.3);padding:1.25rem 0;line-height:1.4}div[class*=language-].line-numbers-mode .line-numbers-wrapper .line-number,div[class*=language-].line-numbers-mode .line-numbers-wrapper br{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}div[class*=language-].line-numbers-mode .line-numbers-wrapper .line-number{position:relative;z-index:4;font-size:.85em}div[class*=language-].line-numbers-mode:after{content:\"\";position:absolute;z-index:2;top:0;left:0;width:56px;width:3.5rem;height:100%;border-radius:6px 0 0 6px;border-right:1px solid rgba(0,0,0,.66);background-color:#282c34}div[class~=language-js]:before{content:\"js\"}div[class~=language-ts]:before{content:\"ts\"}div[class~=language-html]:before{content:\"html\"}div[class~=language-md]:before{content:\"md\"}div[class~=language-vue]:before{content:\"vue\"}div[class~=language-css]:before{content:\"css\"}div[class~=language-sass]:before{content:\"sass\"}div[class~=language-scss]:before{content:\"scss\"}div[class~=language-less]:before{content:\"less\"}div[class~=language-stylus]:before{content:\"stylus\"}div[class~=language-go]:before{content:\"go\"}div[class~=language-java]:before{content:\"java\"}div[class~=language-c]:before{content:\"c\"}div[class~=language-sh]:before{content:\"sh\"}div[class~=language-yaml]:before{content:\"yaml\"}div[class~=language-py]:before{content:\"py\"}div[class~=language-docker]:before{content:\"docker\"}div[class~=language-dockerfile]:before{content:\"dockerfile\"}div[class~=language-makefile]:before{content:\"makefile\"}div[class~=language-javascript]:before{content:\"js\"}div[class~=language-typescript]:before{content:\"ts\"}div[class~=language-markup]:before{content:\"html\"}div[class~=language-markdown]:before{content:\"md\"}div[class~=language-json]:before{content:\"json\"}div[class~=language-ruby]:before{content:\"rb\"}div[class~=language-python]:before{content:\"py\"}div[class~=language-bash]:before{content:\"sh\"}div[class~=language-php]:before{content:\"php\"}.custom-block .custom-block-title{font-weight:600;margin-bottom:-.4rem}.custom-block.danger,.custom-block.tip,.custom-block.warning{padding:.1rem 1.5rem;border-left-width:.5rem;border-left-style:solid;margin:1rem 0}.custom-block.tip{background-color:#f3f5f7;border-color:#42b983}.custom-block.warning{background-color:rgba(255,229,100,.3);border-color:#e7c000;color:#6b5900}.custom-block.warning .custom-block-title{color:#b29400}.custom-block.warning a{color:#2c3e50}.custom-block.danger{background-color:#ffe6e6;border-color:#c00;color:#4d0000}.custom-block.danger .custom-block-title{color:#900}.custom-block.danger a{color:#2c3e50}.arrow{display:inline-block;width:0;height:0}.arrow.up{border-bottom:6px solid #ccc}.arrow.down,.arrow.up{border-left:4px solid transparent;border-right:4px solid transparent}.arrow.down{border-top:6px solid #ccc}.arrow.right{border-left:6px solid #ccc}.arrow.left,.arrow.right{border-top:4px solid transparent;border-bottom:4px solid transparent}.arrow.left{border-right:6px solid #ccc}@media (max-width:959px){.theme-default-content:not(.custom){padding:2rem}}@media (max-width:419px){.theme-default-content:not(.custom){padding:1.5rem}}.table-of-contents .badge{vertical-align:middle}body,html{padding:0;margin:0;background-color:#fff}body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:16px;color:#2c3e50}em{font-style:italic}.page{padding-left:20rem}.navbar{z-index:20;right:0;height:57.6px;height:3.6rem;background-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;border-bottom:1px solid #eaecef}.navbar,.sidebar-mask{position:fixed;top:0;left:0}.sidebar-mask{z-index:9;width:100vw;height:100vh;display:none}.sidebar{font-size:16px;background-color:#fff;width:320px;width:20rem;position:fixed;z-index:10;margin:0;top:57.6px;top:3.6rem;left:0;bottom:0;-webkit-box-sizing:border-box;box-sizing:border-box;border-right:1px solid #eaecef;overflow-y:auto}.theme-default-content:not(.custom)>:first-child{margin-top:1.6rem}.theme-default-content:not(.custom) a:hover{text-decoration:underline}.theme-default-content:not(.custom) p.demo{padding:1rem 1.5rem;border:1px solid #ddd;border-radius:4px}.theme-default-content:not(.custom) img{max-width:100%}.theme-default-content.custom{padding:0;margin:0}.theme-default-content.custom img{max-width:100%}a{font-weight:500;text-decoration:none}a,p a code{color:#3eaf7c}p a code{font-weight:400}kbd{background:#eee;border:.15rem solid #ddd;border-bottom:.25rem solid #ddd;border-radius:.15rem;padding:0 .15em}blockquote{font-size:16px;font-size:1rem;color:#999;border-left:.2rem solid #dfe2e5;margin:1rem 0;padding:.25rem 0 .25rem 1rem}blockquote>p{margin:0}ol,ul{padding-left:1.2em}strong{font-weight:600}h1,h2,h3,h4,h5,h6{font-weight:600;line-height:1.25}.theme-default-content:not(.custom)>h1,.theme-default-content:not(.custom)>h2,.theme-default-content:not(.custom)>h3,.theme-default-content:not(.custom)>h4,.theme-default-content:not(.custom)>h5,.theme-default-content:not(.custom)>h6{margin-top:-3.1rem;padding-top:4.6rem;margin-bottom:0}.theme-default-content:not(.custom)>h1:first-child,.theme-default-content:not(.custom)>h2:first-child,.theme-default-content:not(.custom)>h3:first-child,.theme-default-content:not(.custom)>h4:first-child,.theme-default-content:not(.custom)>h5:first-child,.theme-default-content:not(.custom)>h6:first-child{margin-top:-1.5rem;margin-bottom:1rem}.theme-default-content:not(.custom)>h1:first-child+.custom-block,.theme-default-content:not(.custom)>h1:first-child+p,.theme-default-content:not(.custom)>h1:first-child+pre,.theme-default-content:not(.custom)>h2:first-child+.custom-block,.theme-default-content:not(.custom)>h2:first-child+p,.theme-default-content:not(.custom)>h2:first-child+pre,.theme-default-content:not(.custom)>h3:first-child+.custom-block,.theme-default-content:not(.custom)>h3:first-child+p,.theme-default-content:not(.custom)>h3:first-child+pre,.theme-default-content:not(.custom)>h4:first-child+.custom-block,.theme-default-content:not(.custom)>h4:first-child+p,.theme-default-content:not(.custom)>h4:first-child+pre,.theme-default-content:not(.custom)>h5:first-child+.custom-block,.theme-default-content:not(.custom)>h5:first-child+p,.theme-default-content:not(.custom)>h5:first-child+pre,.theme-default-content:not(.custom)>h6:first-child+.custom-block,.theme-default-content:not(.custom)>h6:first-child+p,.theme-default-content:not(.custom)>h6:first-child+pre{margin-top:2rem}h1:hover .header-anchor,h2:hover .header-anchor,h3:hover .header-anchor,h4:hover .header-anchor,h5:hover .header-anchor,h6:hover .header-anchor{opacity:1}h1{font-size:35.2px;font-size:2.2rem}h2{font-size:26.4px;font-size:1.65rem;padding-bottom:.3rem;border-bottom:1px solid #eaecef}h3{font-size:21.6px;font-size:1.35rem}a.header-anchor{font-size:.85em;float:left;margin-left:-.87em;padding-right:.23em;margin-top:.125em;opacity:0}a.header-anchor:hover{text-decoration:none}.line-number,code,kbd{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}ol,p,ul{line-height:1.7}hr{border:0;border-top:1px solid #eaecef}table{border-collapse:collapse;margin:1rem 0;display:block;overflow-x:auto}tr{border-top:1px solid #dfe2e5}tr:nth-child(2n){background-color:#f6f8fa}td,th{border:1px solid #dfe2e5;padding:.6em 1em}.theme-container.sidebar-open .sidebar-mask{display:block}.theme-container.no-navbar .theme-default-content:not(.custom)>h1,.theme-container.no-navbar h2,.theme-container.no-navbar h3,.theme-container.no-navbar h4,.theme-container.no-navbar h5,.theme-container.no-navbar h6{margin-top:1.5rem;padding-top:0}.theme-container.no-navbar .sidebar{top:0}@media (min-width:720px){.theme-container.no-sidebar .sidebar{display:none}.theme-container.no-sidebar .page{padding-left:0}}@media (max-width:959px){.sidebar{font-size:15px;width:16.4rem}.page{padding-left:16.4rem}}@media (max-width:719px){.sidebar{top:0;padding-top:3.6rem;-webkit-transform:translateX(-100%);transform:translateX(-100%);-webkit-transition:-webkit-transform .2s ease;transition:-webkit-transform .2s ease;transition:transform .2s ease;transition:transform .2s ease,-webkit-transform .2s ease}.page{padding-left:0}.theme-container.sidebar-open .sidebar{-webkit-transform:translateX(0);transform:translateX(0)}.theme-container.no-navbar .sidebar{padding-top:0}}@media (max-width:419px){h1{font-size:1.9rem}.theme-default-content div[class*=language-]{margin:.85rem -1.5rem;border-radius:0}}.badge[data-v-c13ee5b0]{display:inline-block;font-size:14px;height:18px;line-height:18px;border-radius:3px;padding:0 6px;color:#fff}.badge.green[data-v-c13ee5b0],.badge.tip[data-v-c13ee5b0],.badge[data-v-c13ee5b0]{background-color:#42b983}.badge.error[data-v-c13ee5b0]{background-color:#da5961}.badge.warn[data-v-c13ee5b0],.badge.warning[data-v-c13ee5b0],.badge.yellow[data-v-c13ee5b0]{background-color:#e7c000}.badge+.badge[data-v-c13ee5b0]{margin-left:5px}";
  styleInject(css$4);

  var css$5 = ".jmp-wrapper{width:100%}.jmp-wrapper #jmp-nav{width:100%;min-height:42px;color:#666;background-color:#eee}.jmp-wrapper #jmp-nav ul{width:100%;min-height:inherit;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 29px;margin:0;line-height:inherit}.jmp-wrapper #jmp-nav ul,.jmp-wrapper #jmp-nav ul .jmp-nav-item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.jmp-wrapper #jmp-nav ul .jmp-nav-item{height:100%;padding:6px 8px;cursor:pointer;border-radius:6px;margin:0 8px}.jmp-wrapper #jmp-nav ul .jmp-nav-item:hover{background-color:rgba(0,0,0,.5);color:#fff}.jmp-wrapper #jmp-nav ul .jmp-nav-item .item-icon{font-size:18px}.jmp-wrapper #jmp-content{width:100%;height:450px;display:-webkit-box;display:-ms-flexbox;display:flex;border-bottom:1px solid #eee}.jmp-wrapper #jmp-content .jmp-md{width:50%}.jmp-wrapper #jmp-content .jmp-html{width:50%;border-left:1px solid #eee;border-right:1px solid #eee;-webkit-box-sizing:border-box;box-sizing:border-box;padding:16px;overflow-y:auto;overflow-x:hidden;word-wrap:break-word;color:inherit;margin:0}.jmp-wrapper #jmp-content .jmp-html ul{list-style-image:none;list-style-position:inside;list-style-type:inherit}.jmp-wrapper #jmp-content .jmp-html ol{list-style-image:none;list-style-position:inside;list-style-type:decimal}.jmp-full-screen{position:fixed!important;width:100%!important;height:100%!important}";
  styleInject(css$5);

  var debounce = _.debounce(function (editor, callback) {
    var res = editor.getValue();
    callback(res);
  }, 500);

  function createEl(options) {
    if (typeof options === 'string') {
      return document.createElement(options);
    }
    var _el = document.createElement(options.name);
    for (var key in options.attr) {
      var val = options.attr[key];
      _el.setAttribute(key, val);
    }
    return _el;
  }

  function getEl(el) {
    if (el.indexOf('#') > -1 || el.indexOf('.') > -1) {
      var res = document.querySelectorAll(el);
      return res.length > 1 ? res : res[0];
    }
    return document.getElementById(el);
  }

  function callHook(jm, type, res) {
    if (!jm || !type) {
      console.error('[jmt]：callHook params (jm || type) value is empty');
      return false;
    }

    if(typeof jm[type] !== 'function') {
      return;
    }

    res ? jm[type](res) : jm[type]();
  }

  function showDialog(wrapper, callback) {
    document.body.appendChild(wrapper);
    callback && callback();
  }

  function hideDialog(wrapper, callback) {
    document.body.removeChild(wrapper);
    callback && callback();
  }

  function setCursor(jm, line, ch, autoFocus) {
    jm.editor.setCursor(line, ch);
    if (autoFocus) {
      jm.editor.focus();
    }
  }

  // jm, data, isCursor, ch, line, isSelect
  function editorReplaceSelection(options) {
    var jm = options.jm;

    var data = options.data || '',
      isCursor = options.isCursor || false,
      ch = options.ch || 0,
      line = options.line || 0,
      isSelect = options.isSelect || false;
    var cursorPosition = jm.editor.getCursor();
    if (isSelect) {
      var hasSelectContent = jm.editor.getSelection();
      data = data.replace(/\#data\#/g, hasSelectContent || '');
    }
    jm.editor.replaceSelection(data);
    if (isCursor) {
      var $line = line || 0;
      setCursor(jm, Number(cursorPosition.line) + Number($line), Number(cursorPosition.ch) + Number(ch), true);
    }
  }

  function fullScreen(jm, status) {
    var el = jm.el;

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

  var config = {
    elementClassParent: 'jmp-wrapper',
    elementIdNav: 'jmp-nav',
    elementIdContent: 'jmp-content',
    elementClassMd: 'jmp-md',
    elementIdTextarea: 'render-md',
    elementIdHtml: 'render-html',
    elementClassHtml: 'jmp-html theme-default-content',
    choosePreCode: '#render-html pre code',
    menus: ['bold', 'italic', 'underline', 'del', 'disorder', 'order', 'code', 'image', 'link', 'table', 'reset', 'full'],
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

  function navbar(options) {
    var jmpNavNode = createEl({
      name: 'div',
      attr: {
        id: config.elementIdNav
      }
    });

    jmpNavNode.style.minHeight = options.height + 'px';
    var navList = config.navList,
      menus = config.menus;
    try {
      var html = "" +
        "<ul>" +
        (function () {
          var navElItems = '';
          var navItems = menus.map(function (item) {
            var childLists = navList.filter(function (child) {
              return item === child.index;
            });

            item = childLists && childLists.length > 0? childLists[0] : '';

            return item;
          });
          navItems.forEach(function (item) {
            if(item) {
              navElItems = navElItems + '<li id="' + item.id + '" class="' + item['class'] + '"><i class="item-icon ' + item.icon + '"></i></li>';
            }
          });;
          return navElItems;
        }()) +
        "</ul>";
      jmpNavNode.innerHTML = html;
      return jmpNavNode;
    } catch (e) {
      console.error(e);
    }

  }

  function side(options) {
    var jmpNavNode = createEl({
      name: 'div',
      attr: {
        id: config.elementIdContent
      }
    });

    jmpNavNode.style.minHeight = options.height + 'px';

    var md = sideMd(),
      html = sideHtml();
    jmpNavNode.appendChild(md.content);
    jmpNavNode.appendChild(html);

    return jmpNavNode;
  }

  function sideMd(jm) {
    var contentNode = createEl({
      name: 'div',
      attr: {
        'class': config.elementClassMd
      }
    });

    var textareaNode = createEl({
      name: 'textarea',
      attr: {
        id: config.elementIdTextarea
      }
    });

    contentNode.appendChild(textareaNode);

    return {
      content: contentNode,
      textarea: textareaNode
    };
  }

  function sideHtml(jm) {
    var jmpHtmlNode = createEl({
      name: 'div',
      attr: {
        id: config.elementIdHtml,
        'class': config.elementClassHtml
      }
    });

    return jmpHtmlNode;
  }

  function dialogWrapper(jm) {
    var dialogWrapperNode = createEl({
      name: 'div',
      attr: {
        id: 'jmp-dialog-wrapper',
        'class': 'jmp-dialog-wrapper'
      }
    });

    return dialogWrapperNode;
  }

  function imageDialog(jm, uploadImage) {
    var imageWrapper = dialogWrapper();

    var html = "    <div class=\"jmp-dialog-content\" id=\"jmp-dialog-content\">      <div class=\"jmp-dialog-image\">      <p class=\"dialog-title\">插入图片</p>      <div class=\"dialog-content\">        <div id=\"btn-upload\" class=\"btn-upload\">          <span>上传图片</span>          <input id=\"btn-upload-file\" class=\"upload-file\" type=\"file\">        </div>        <div id=\"add-link\" class=\"add-link\">          <jm-input type=\"text\" j-model=\"imageUrl\" height=\"auto\" label=\"link\" placeholder=\"请输入网络图片地址\"></jm-input>        </div>        <div id=\"btn-upload-image\" class=\"btn-upload-image\">          上传本地图片        </div>        <div id=\"btn-link\" class=\"btn-link\">          添加图片链接        </div>      </div>      <div class=\"dialog-footer\">        <div id=\"btn-cancel\" class=\"btn-cancel\">取消</div>        <div id=\"btn-sure\" class=\"btn-sure\">确认</div>        </div>      </div>    </div>";
    imageWrapper.innerHTML = html;
    showDialog(imageWrapper, setInput);

    function setInput() {
      var jmInputs = Input();
      if (jmInputs) {
        var elInputNodes = jmInputs;
        var btnUploadNode = getEl('btn-upload'),
          addLinkNode = getEl('add-link'),
          btnUploadImage = getEl('#btn-upload-image'),
          btnLink = getEl('btn-link'),
          btnSure = getEl('btn-sure'),
          btnUploadFile = getEl('#btn-upload-file'),
          btnCancel = getEl('btn-cancel');
        btnSure.style.display = 'none';

        btnLink.addEventListener('click', function () {
          btnUploadNode.style.display = 'none';
          btnUploadImage.style.display = 'block';
          btnLink.style.display = 'none';
          addLinkNode.style.display = 'block';
          btnSure.style.display = 'block';
        }, false);

        btnUploadImage.addEventListener('click', function () {
          btnUploadNode.style.display = 'block';
          btnUploadImage.style.display = 'none';
          btnLink.style.display = 'block';
          addLinkNode.style.display = 'none';
          btnSure.style.display = 'none';
        }, false);

        btnSure.addEventListener('click', function () {
          hideDialog(imageWrapper);
          editorReplaceSelection({
            jm: jm,
            data: setSyntaxFormat(elInputNodes['imageUrl'].value),
            isCursor: true,
            ch: 9
          });
        }, false);

        btnUploadFile.addEventListener('change', function (e) {
          var event = e || window.event,
            file = event.target.files;
          hideDialog(imageWrapper);
          uploadImage(jm, file);
        });

        btnCancel.addEventListener('click', function () {
          hideDialog(imageWrapper);
        }, false);
      }
    }

    function setSyntaxFormat(url) {
      setSyntaxFormat = null;
      return '![image](' + url + ')';
    }
  }

  /**
   * 
   * @param {*} options 
   */
  function Input() {
    var inputNodes = Object.create(null);
    var jmInputs = document.getElementsByTagName('jm-input');
    Array.prototype.slice.call(jmInputs, 0).forEach(function (item) {
      var jmModel = item.getAttribute('j-model'),
        type = item.getAttribute('type'),
        height = item.getAttribute('height'),
        label = item.getAttribute('label'),
        placeholder = item.getAttribute('placeholder');
      var parentNodeStyle = '';
      parentNodeStyle += height && height === 'auto' ? "style=\"height: auto\"" : '';
      var html = "<div class=\"jm-input-content\" " + parentNodeStyle + ">                    <label class=\"jm-input-label-left\">" + label + "</label>                    <input type=\"" + type + "\" class=\"jm-input\" j-model=\"" + jmModel + "\" placeholder=\"" + placeholder + "\" >\n                  </div>";
      var template = document.createElement('div');
      template.setAttribute('class', 'jm-input');
      template.innerHTML = html;
      jmInputs[0].parentNode.insertBefore(template, jmInputs[0]);
      jmInputs[0].parentNode.removeChild(jmInputs[0]);
      inputNodes[jmModel] = template.querySelector(("input[j-model=" + jmModel + "]"));
    });

    return inputNodes;
  }

  var Compile = function Compile(jm) {
  };

  Compile.prototype.start = function start (ctx) {
    var handle = marked;
    var html = handle(ctx);
      
    return html;
  };

  /**
   * 以防抖的形式监听文本变化，并准备渲染 html
   */
  function handleEditor(jm, htmlSide, compile) {
    var editor = jm.editor;
    editor.on('changes', function (instance, changes) {
      // lazyChange()
      debounce(editor, function (res) {
        showHtml(jm, htmlSide, res, compile);
      });
    });
  }
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
  }
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
  }
  function uploadImage(jm, res) {
    var file = Array.prototype.slice.call(res, 0);
    callHook(jm, 'uploaded', {
      file: file
    });
  }
  function editorConfig(textareaNode) {
    return CodeMirror.fromTextArea(textareaNode, {
      lineNumbers: true,
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
  }
  var Render = function Render(jm) {
    this.jm = jm;
    this.options = jm.$options;

    var compile = new Compile(jm);

    var el = jm.el;
    // 渲染组件到 View
    renderHtml(jm, el);

    var htmlSide = this.htmlSide = getEl(config.elementIdHtml);

    var textareaSide = getEl(config.elementIdTextarea);
    var editor = this.editor = editorConfig(textareaSide);

    // 将 editor 添加进 jm 实例中
    jm.editor = editor;

    handleEditor(jm, htmlSide, compile);

    // 渲染完成 - 通知回调
    callHook(jm, 'mounted');
  };

  Render.prototype.reloadRender = function reloadRender (el) {
    var parentNode = el;

    var parentHeight = parentNode.offsetHeight,
      navHeight = parentHeight * 0.08,
      mdContentHeight = parentHeight * 0.92,
      navbar = getEl('#' + config.elementIdNav),
      side = getEl('#' + config.elementIdContent);
    navHeight = 42;
    mdContentHeight = parentHeight - navHeight;
    navbar.style.minHeight = navHeight + 'px';
    side.style.minHeight = mdContentHeight + 'px';
  };
  Render.prototype.renderReplaceSelection = function renderReplaceSelection (options) {
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
  Render.prototype.insertImage = function insertImage (title, url) {
      if ( title === void 0 ) title = '图片';
      if ( url === void 0 ) url = '';

    if(!url) {
      console.error('[Jmp]：Network image address is empty');
      return;
    }
    var ctx = "![" + title + "](" + url + ")";
    this.jm.editor.setValue(ctx);
  };

  /**
   * 以 Jmp = jm 为核心，贯穿整个程序上下文，主进程都在 jm 中集合；
   * @param {options} 初始化参数，动态配置参数
   * @param {editor} codeMirror 实例对象
   */


  function Jmp(options) {
      this.$options = options;
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
      }
      if (this.$options.menus && this.$options.menus.length > 0 && this.$options.menus instanceof Array) {
          config.menus = this.$options.menus;
      }    this.render = new Render(this);
  };

  return Jmp;

}));
