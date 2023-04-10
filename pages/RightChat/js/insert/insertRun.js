console.log("成功插入！");
insert();

function insert(){
    let inTo = document.getElementById("newBingGoGoRightChat");
    if(inTo){
        return;
    }
    inTo = document.createElement("div");
    inTo.id = "newBingGoGoRightChat";
    inTo.innerHTML = `
    <link rel="stylesheet" href="${chrome.runtime.getURL('/pages/RightChat/js/insert/insert.css')}">
    <div class="top"></div>
    <iframe src="${chrome.runtime.getURL('/pages/RightChat/RightChat.html')}"></iframe>
    `;
    document.body.appendChild(inTo);
}




let oDivTop = document.querySelector('#newBingGoGoRightChat>.top');
let oDiv = document.querySelector('#newBingGoGoRightChat');
//触屏拖动元素实现
oDivTop.addEventListener('touchstart', function (ev) {
    let touch = ev.targetTouches[0];
    let disX = touch.clientX - oDiv.offsetLeft;
    let disY = touch.clientY - oDiv.offsetTop;
    let fun =function (ev) {
        let touch = ev.targetTouches[0];
        let l = touch.clientX - disX;
        let t = touch.clientY - disY;
        oDiv.style.left = l + 'px';
        oDiv.style.top = t + 'px';
        return false;
    };
    document.addEventListener('touchmove',fun);
    let fun1 = function () {
        document.removeEventListener('touchmove', fun);
        document.removeEventListener('touchend', fun1);
        return false;
    };
    document.addEventListener('touchend', fun1);
    return false;
});
//鼠标拖动元素实现
oDivTop.addEventListener('mousedown',function (ev) {
    let disX = ev.clientX - oDiv.offsetLeft;
    let disY = ev.clientY - oDiv.offsetTop;
    let fun = function (ev) {
        let l = ev.clientX - disX;
        let t = ev.clientY - disY;
        oDiv.style.left = l + 'px';
        oDiv.style.top = t + 'px';
        return false;
    };
    document.addEventListener('mousemove',fun);
    let fun1 = function () {
        document.removeEventListener('mousemove', fun);
        document.removeEventListener('mouseup', fun1);
        return false;
    }
    document.addEventListener('mouseup', fun1);
    return false;
});