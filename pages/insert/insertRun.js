console.log("欢迎使用NewBingGoGo");

let topZIndex = 919999999;
let shadowNameMap = new Map();


function getUuid() {
    return URL.createObjectURL(new Blob()).split('/')[3];
}

//监听来自popup页面的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.type=='openWindow'){
        console.log("打开新的小窗。");
        add(message.pagePath,message.name);
    }
})

//监听消息
window.addEventListener('message', (event) => {
    let message = event.data;
    if (message.type == 'getBodyText') {//监听获取当前页面内容消息。
        event.source.postMessage({
            type: 'reBodyText',
            description: document.body.innerText,
            sourceName: document.title,
            sourceUrl: document.URL
        }, '*');
    }
    if(message.type == 'onclick'){//当子窗口被点击提升窗口高度
        let shadow = shadowNameMap.get(message.name);
        let oDiv;
        if(shadow){
            oDiv = shadow.querySelector('#newBingGoGoRightChat');
        }
        if(oDiv){
            oDiv.style.zIndex = topZIndex++;
        }
    }
});



//添加聊天窗口
function add(pagePath,name) {
    function insert(rootDiv,iframeName) {
        let shadow = rootDiv.attachShadow({ mode: 'open' });
        inTo = document.createElement("div");
        inTo.id = "newBingGoGoRightChat";
        inTo.style.zIndex = topZIndex++;
        inTo.innerHTML = `
        <link rel="stylesheet" href="${chrome.runtime.getURL('/pages/insert/insert.css')}">
        <div id="top">
            <div class="letf"">${name}</div>
            <div id="toMin" class="topRight">—</div>
            <div id="reLoad" class="topRight">↺</div>
            <div id="toClose" class="topRight">×</div>
        </div>
        <iframe id="iframe" src="${chrome.runtime.getURL(pagePath+'?name='+iframeName)}"></iframe>
        `;
        shadow.appendChild(inTo);
        document.body.append(rootDiv);
        shadowNameMap.set(iframeName,shadow);
        return shadow;
    }
    let iframeName = getUuid();
    let rootDiv = document.createElement('div');
    let shadow = insert(rootDiv,iframeName);
    let newBingGoGoiframe = shadow.querySelector('#iframe');
    let oDivTop = shadow.querySelector('#top');
    let toMin = shadow.querySelector('#toMin');
    let oDiv = shadow.querySelector('#newBingGoGoRightChat');
    let reLoad = shadow.querySelector('#reLoad');
    let toClose = shadow.querySelector('#toClose');
    //触屏拖动元素实现
    oDivTop.addEventListener('touchstart', function (ev) {
        oDiv.style.zIndex = topZIndex++;
        let touch = ev.targetTouches[0];
        let disX = touch.clientX - oDiv.offsetLeft;
        let disY = touch.clientY - oDiv.offsetTop;
        let fun = function (ev) {
            let touch = ev.targetTouches[0];
            let l = touch.clientX - disX;
            let t = touch.clientY - disY;
            oDiv.style.left = l + 'px';
            oDiv.style.top = t + 'px';
            return false;
        };
        shadow.addEventListener('touchmove', fun);
        let fun1 = function () {
            shadow.removeEventListener('touchmove', fun);
            shadow.removeEventListener('touchend', fun1);
            return false;
        };
        shadow.addEventListener('touchend', fun1);
        return false;
    });
    //鼠标拖动元素实现
    oDivTop.addEventListener('mousedown', function (ev) {
        oDiv.style.zIndex = topZIndex++;
        let disX = ev.clientX - oDiv.offsetLeft;
        let disY = ev.clientY - oDiv.offsetTop;
        let fun = function (ev) {
            let l = ev.clientX - disX;
            let t = ev.clientY - disY;
            oDiv.style.left = l + 'px';
            oDiv.style.top = t + 'px';
            return false;
        };
        shadow.addEventListener('mousemove', fun);
        let fun1 = function () {
            shadow.removeEventListener('mousemove', fun);
            shadow.removeEventListener('mouseup', fun1);
            return false;
        }
        shadow.addEventListener('mouseup', fun1);
        return false;
    });

    //最小化按钮实现
    toMin.onclick = () => {
        if (oDiv.classList.contains('min')) {
            oDiv.classList.remove('min');
        } else {
            oDiv.classList.add('min');
        }

    }
    //重新加载实现
    reLoad.onclick = () => {
        newBingGoGoiframe.src = newBingGoGoiframe.src;
    }
    //关闭实现
    toClose.onclick=()=>{
        rootDiv.remove();
        shadowNameMap.delete(iframeName);
    }
}

