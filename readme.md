# 提交 npm 包

- 首先去 [npm官网](https://www.npmjs.com)注册账号

full name (真实姓名)：这个看你自己

email (邮箱)：填一个常用的

username：随便

password：随便

- 发布项目

```
npm adduser

npm login

npm publish
```

再提交时有可能出现如下错误，该错误信息提示为：您的邮箱需要进行验证，方可提交成功。

```
npm ERR! code E403
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/js-markdown-plus - you must verify your email before publishing a new package: https://www.npmjs.com/email-edit
```

# 项目中的插件

## 主要插件

- rollup：最适合用于打包类库的工具

- rollup-plugin-buble：将es6以及最新ECMA规范语法编译为ES5标准语法

- rollup-plugin-commonjs：将 commonjs 规范的插件转换为 ES6规范的插件语法，以供 rollup 识别

- rollup-plugin-node-resolve：告诉 Rollup 如何查找外部模块

- rollup-plugin-alias：提供modules名称的 alias 和reslove 功能

- rollup-plugin-replace：类比 Webpack 的 DefinePlugin , 可在源码中通过 process.env.NODE_ENV 用于构建区分 Development 与 Production 环境.

- rollup-plugin-copy：文件拷贝

- babel-plugin-external-helpers | babel-preset-latest：ES6 语法编译

- zlib：代码压缩工具
- terser：代码压缩工具


## 解析 css/scss/less 文件到类库中

- rollup-plugin-postcss：解析css、less和scss文件

- postcss-simple-vars—— 这个插件允许你试用 Sass式的变量，比如说：可以声明$myColor:#fff，并在代码中像color:$myColor这样使用，而在常规的写法中，需要写成root { --myColor:#fff;}才能在代码中color:var(--myColor);来使用它。当然这个是个人喜好问题，只是我比较喜欢更为简洁的语法。

- postcss-nested——这个插件允许你使用嵌套的语法。但是我一般不使用嵌套规则，我只是用嵌套语法来更加简便地创建一个BEM友好的选择器，将块、元素、修饰器能够写进一个CSS语法块中。

- postcss-cssnext—— 这个插件可以让你使用更为现代甚至是面向未来的CSS语法（规则参考latest CSS specs）并将代码转换为可以在不支持这些语法的旧浏览器上使用。

- cssnano——这个插件可以将输出的CSS压缩和简化。你可以将这个类比为JavaScript的UglifyJS。

## 组件风格

- 经过对比测试：innerHTML 内存消耗 && 渲染性能 优于 createElement + appendChild。

```javascript
var test1 = document.getElementById('jmp-md');
console.time();

for (let i = 0; i <210000; i++) {
  var createEl = document.createElement('div');
  createEl.setAttribute('style', 'color: red; font-size: 18px;');
  createEl.innerText = '测试测试 createElement';
  test1.appendChild(createEl);
}

console.timeEnd();

console.log('-'.repeat('20'));

var test2 = document.getElementById('jmp-md2');
console.time();

for (let i = 0; i < 20000; i++) {
  var createEl2 = `<div style="color: red; font-size: 18px;"></div>`;
  test2.innerHTML = createEl2;
}

console.timeEnd();
```