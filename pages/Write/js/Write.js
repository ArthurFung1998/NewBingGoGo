let toneSelectbuttns = document.querySelectorAll("#toneSelect>div");
let formatSelecctbuttns = document.querySelectorAll("#formatSelecct>div");
let lengthSelectbuttns = document.querySelectorAll("#lengthSelect>div");


/*控制按钮组选择，当选中新的按钮时回调函数*/
function selectButtonFunRetrun(buttonGroup, returnFun) {
    for (let i = 0; i < buttonGroup.length; i++) {
        let the = buttonGroup[i];
        the.onclick = () => {
            for (let j = 0; j < buttonGroup.length; j++) {
                buttonGroup[j].classList.remove("selected");
            }
            the.classList.add("selected");
            returnFun(the);
        };
    }
}


/**重写重置聊天到初始状态函数 */
function reSetStartChatMessage(type) {
    chat.innerHTML = ``;
    searchSuggestions.innerHTML = '';
    nextStartProposes().then((prs) => {
        prs.forEach((s) => {
            let a = document.createElement('a');
            a.innerHTML = s;
            a.onclick = (even) => {
                if (searchSuggestions.style.opacity >= 1) {
                    send(even.target.innerHTML);
                }
            }
            searchSuggestions.appendChild(a);
        });
    });
    goGoSubtitle.innerText = '想创作什么文章呢？我来帮你！';
}

/**重写函数 */
function isSpeakingStart(chatWithMagic, sendText) {
	isSpeaking = true;
	if (chatWithMagic == undefined) {
		goGoSubtitle.innerText = '准备开始创作.';
	} else if (chatWithMagic) {
		goGoSubtitle.innerText = '正在魔法创作.';
	} else {
		goGoSubtitle.innerText = 'bing正在创作.';
	}
	if (sendText) {
		docTitle.innerText = sendText;
	}
	send_button.value = '响应中.';
	searchSuggestions.innerHTML = '';
}
//重写
function isSpeakingFinish() {
	send_button.value = '生成草稿';
	goGoSubtitle.innerText = '正在保存聊天记录';
	//回复结束,调用自动保存聊天记录
	autoSaveChatRecords().then(() => {
		goGoSubtitle.innerText = '可以啦！来发送下一条消息吧！';
		isSpeaking = false;
		reloadChatRecordsList();
	});
}


//重写send函数
oldSend = send;
send = (text) => {
    reSetStartChatMessage();
    talk = undefined;
    oldSend(text);
}

//重写porserTextBlock函数
/*
解析TextBlock body.type==TextBlock
*/
function porserTextBlock(body, father) {
    if (!body.size) {
        let div = getByClass('textBlock', 'div', father, 'markdown-body');
        div.innerHTML = marked.marked(completeCodeBlock(body.text));
        renderMathInElement(div,renderMathInElementOptions);
        let aaas = div.getElementsByTagName('a');
        //将超链接在新页面打开
        for(let i=0;i<aaas.length;i++){
            aaas[i].target = '_blank';
        }
        //如果是注释则加上上标样式
        for(let i=0;i<aaas.length;i++){
            let reg = new RegExp('^\\^(\\d+)\\^$');
            if(reg.test(aaas[i].innerHTML)){
                aaas[i].innerHTML = aaas[i].innerHTML.replace(reg,'$1');
                aaas[i].classList.add('superscript');
            }
        }
    } else if (body.size == 'small') {
        //原本bing官网的small并没有输出
    }
}

//重写send按钮点击事件
send_button.onclick = () => {
	if (isSpeaking) {
		return;
	}
	let text = input_text.value;
	if (!text) {
		alert('什么都没有输入呀！');
		return;
	}
	send(text);
};



window.addEventListener('load', () => {
    // 将按钮组添加
    tone = toneSelectbuttns[0].dataset.value;
    toneSelectbuttns[0].classList.add('selected');
    selectButtonFunRetrun(toneSelectbuttns, (re) => {
        tone = re.dataset.value;
    });
    format = formatSelecctbuttns[0].dataset.value;
    formatSelecctbuttns[0].classList.add('selected');
    selectButtonFunRetrun(formatSelecctbuttns, (re) => {
        format = re.dataset.value;
    });
    length = lengthSelectbuttns[0].dataset.value;
    lengthSelectbuttns[0].classList.add('selected');
    selectButtonFunRetrun(lengthSelectbuttns, (re) => {
        length = re.dataset.value;
    });
});