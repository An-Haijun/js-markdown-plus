import config from './config';
import {
  createEl,
  showDialog,
  getElVal,
  getEl,
  hideDialog,
  editorReplaceSelection
} from './utils';

export function navbar(options) {
  const jmpNavNode = createEl({
    name: 'div',
    attr: {
      id: config.elementIdNav
    }
  });

  jmpNavNode.style.minHeight = options.height + 'px';
  const navList = config.navList,
    menus = config.menus;
  try {
    const html = "" +
      "<ul>" +
      (function () {
        let navElItems = '';
        const navItems = menus.map(function (item) {
          const childLists = navList.filter(function (child) {
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

export function side(options) {
  const jmpNavNode = createEl({
    name: 'div',
    attr: {
      id: config.elementIdContent
    }
  });

  jmpNavNode.style.minHeight = options.height + 'px';

  const md = sideMd(),
    html = sideHtml();
  jmpNavNode.appendChild(md.content);
  jmpNavNode.appendChild(html);

  return jmpNavNode;
}

export function sideMd(jm) {
  const contentNode = createEl({
    name: 'div',
    attr: {
      'class': config.elementClassMd
    }
  });

  const textareaNode = createEl({
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

export function sideHtml(jm) {
  const jmpHtmlNode = createEl({
    name: 'div',
    attr: {
      id: config.elementIdHtml,
      'class': config.elementClassHtml
    }
  });

  return jmpHtmlNode;
}

export function dialogWrapper(jm) {
  const dialogWrapperNode = createEl({
    name: 'div',
    attr: {
      id: 'jmp-dialog-wrapper',
      'class': 'jmp-dialog-wrapper'
    }
  });

  return dialogWrapperNode;
}

export function imageDialog(jm, uploadImage) {
  const imageWrapper = dialogWrapper();

  const html = `\
    <div class="jmp-dialog-content" id="jmp-dialog-content">\
      <div class="jmp-dialog-image">\
      <p class="dialog-title">插入图片</p>\
      <div class="dialog-content">\
        <div id="btn-upload" class="btn-upload">\
          <span>上传图片</span>\
          <input id="btn-upload-file" class="upload-file" type="file">\
        </div>\
        <div id="add-link" class="add-link">\
          <jm-input type="text" j-model="imageUrl" height="auto" label="link" placeholder="请输入网络图片地址"></jm-input>\
        </div>\
        <div id="btn-upload-image" class="btn-upload-image">\
          上传本地图片\
        </div>\
        <div id="btn-link" class="btn-link">\
          添加图片链接\
        </div>\
      </div>\
      <div class="dialog-footer">\
        <div id="btn-cancel" class="btn-cancel">取消</div>\
        <div id="btn-sure" class="btn-sure">确认</div>\
        </div>\
      </div>\
    </div>`;
  imageWrapper.innerHTML = html;
  showDialog(imageWrapper, setInput);

  function setInput() {
    const jmInputs = Input();
    if (jmInputs) {
      const elInputNodes = jmInputs;
      let btnUploadNode = getEl('btn-upload'),
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
        btnSure.style.display = 'block'
      }, false);

      btnUploadImage.addEventListener('click', function () {
        btnUploadNode.style.display = 'block';
        btnUploadImage.style.display = 'none';
        btnLink.style.display = 'block';
        addLinkNode.style.display = 'none';
        btnSure.style.display = 'none'
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
        let event = e || window.event,
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
export function Input() {
  const inputNodes = Object.create(null);
  const jmInputs = document.getElementsByTagName('jm-input');
  Array.prototype.slice.call(jmInputs, 0).forEach(function (item) {
    const jmModel = item.getAttribute('j-model'),
      type = item.getAttribute('type'),
      height = item.getAttribute('height'),
      label = item.getAttribute('label'),
      placeholder = item.getAttribute('placeholder');
    let parentNodeStyle = '';
    parentNodeStyle += height && height === 'auto' ? `style="height: auto"` : '';
    const html = `<div class="jm-input-content" ${parentNodeStyle}>\
                    <label class="jm-input-label-left">${label}</label>\
                    <input type="${type}" class="jm-input" j-model="${jmModel}" placeholder="${placeholder}" >
                  </div>`
    const template = document.createElement('div');
    template.setAttribute('class', 'jm-input');
    template.innerHTML = html;
    jmInputs[0].parentNode.insertBefore(template, jmInputs[0]);
    jmInputs[0].parentNode.removeChild(jmInputs[0]);
    inputNodes[jmModel] = template.querySelector(`input[j-model=${jmModel}]`);
  });

  return inputNodes;
}