console.log("成功插入！");
function getUuid() {
    return URL.createObjectURL(new Blob()).split('/')[3];
}
let myUUID = getUuid();

//监听消息
window.addEventListener('message', (event) => {
    let message = event.data;
    if (message.type == 'getBodyText') {
        event.source.postMessage({
            type: 'reBodyText',
            description: document.body.innerText,
            sourceName: document.title,
            sourceUrl: document.URL
        }, '*');
    }
});



//添加聊天窗口
add();
function add() {
    function insert() {
        let div = document.createElement('div');
        let shadow = div.attachShadow({ mode: 'open' });
        inTo = document.createElement("div");
        inTo.id = "newBingGoGoRightChat";
        inTo.innerHTML = `
        <link rel="stylesheet" href="${chrome.runtime.getURL('/pages/RightChat/js/insert/insert.css')}">
        <div id="top">
            <div class="letf"">NewBingGoGo</div>
            <div id="toMin" class="topRight">—</div>
            <div id="reLoad" class="topRight">↺</div>
        </div>
        <iframe id="iframe" src="${chrome.runtime.getURL('/pages/RightChat/RightChat.html?uuid=' + myUUID)}"></iframe>
        `;
        shadow.appendChild(inTo);
        document.body.append(div);
        return shadow;
    }
    let shadow = insert();
    let newBingGoGoiframe = shadow.querySelector('#iframe');
    let oDivTop = shadow.querySelector('#top');
    let toMin = shadow.querySelector('#toMin');
    let oDiv = shadow.querySelector('#newBingGoGoRightChat');
    let reLoad = shadow.querySelector('#reLoad');
    //触屏拖动元素实现
    oDivTop.addEventListener('touchstart', function (ev) {
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
}

