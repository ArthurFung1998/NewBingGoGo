let bingProposes = [
];

let bingmMessages = [
    '欢迎回来! 你想要讨论什么?'
]

let StartMessage = bingmMessages[0];
let Proposes = [];
/**
获取建议消息
*/
async function nextStartProposes(){
    return Proposes; 
}
/*
获取bing的第一条消息
*/
function nextStartMessage(){
    return StartMessage = bingmMessages[Math.floor(Math.random() * bingmMessages.length)]; 
}

function getStartMessage(){
    return StartMessage;
}

function getStartProposes(){
    return Proposes;
}