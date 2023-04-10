//将聊天窗口插入到当前页面
async function insertRightChatToThisTab(){
    let tab = await chrome.tabs.query({
        active:true,
        currentWindow:true
    });
    if(!tab[0]){
        return;
    }
    tab = tab[0];
    chrome.scripting.executeScript({
        target:{
            tabId:tab.id
        },
        files:['/pages/RightChat/js/insert/insertRun.js']
    });
}