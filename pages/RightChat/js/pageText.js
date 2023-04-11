let pageText = {
    description:'',
    sourceUrl:'',
    sourceName:''
};

//监听消息
window.addEventListener('message',(event)=>{
    let message = event.data;
    if(message.type == 'reBodyText'){
        pageText.description = message.description;
        pageText.sourceUrl = message.sourceUrl;
        pageText.sourceName = message.sourceName;
        console.log(pageText);
    }
});

parent.window.postMessage({
    type:'getBodyText'
},'*');

