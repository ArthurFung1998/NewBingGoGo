//----------------------------------------
var url_input = document.querySelector('input#url-input');
var savecookiesButtun = document.querySelector('input#savecookies');
var loadcookiesButtun = document.querySelector('input#loadcookies');
var speak = document.querySelector('p#speak');
var tallSelect = document.querySelector('select#tallSelect');
var thisVersion = document.getElementById('thisVersion');
var lastVersion = document.getElementById('lastVersion');
var getPublicUrl = document.getElementById('getPublicUrl');
var selectPublicUrl = document.getElementById('selectPublicUrl');
var thisOpenBingGoGo = document.getElementById('this-open-bing-go-go');

var expUrl = new RegExp('^(https?://)([-a-zA-z0-9]+\\.)+([-a-zA-z0-9]+)+\\S*$');
var magicUrl;

function speakString() {
	if (!magicUrl) {
		speak.innerHTML = '我没有角角,需要魔法链接才能帮你哦。';
		return;
	}
	if (!expUrl.test(magicUrl)) {
		speak.innerHTML = '魔法链接似乎不太对。';
		return;
	}
	speak.innerHTML = '魔法启动！';
}

getMagicUrl().then((v) => {
	url_input.value = v ? v : '';
	magicUrl = v;
	speakString(v);
	loaded();
});

getChatHubWithMagic().then((chatWithMagic) => {
	if (chatWithMagic == true) {
		tallSelect.selectedIndex = 1;
	} else {
		tallSelect.selectedIndex = 0;
	}
	tallSelect.onchange = () => {
		switch (tallSelect.selectedIndex) {
			case 0:
				setChatHubWithMagic(false);
				break;
			case 1:
				setChatHubWithMagic(true);
				break;
		}
	}
});


function loaded() {
	//魔法链接输入框更新事件
	url_input.onchange = function (even) {
		let url = url_input.value;
		magicUrl = url;
		setMagicUrl(url);
		speakString();
	}

	//插入窗口到当前浏览器标签
	thisOpenBingGoGo.onclick = () => {
		insertRightChatToThisTab();
	}

	//获取公共魔法链接
	getPublicUrl.onclick = async () => {
		if(confirm("使用公开的魔法链接可能会导致Cookie泄漏!\n他人获取到你的Cookie可以不用密码验证码直接登录你的微软账号。\n这是非常危险的！\n是否继续？")){
			try {
				getPublicUrl.innerText = '正在获取..'
				let res = await fetch('https://gitee.com/jja8/NewBingGoGo/raw/master/publicUrl.json');
				let json = await res.json();
				selectPublicUrl.innerHTML = `<option value="${magicUrl}">(使用私有魔法链接)</option>`;
				for (let the in json) {
					let op = document.createElement('option');
					op.innerText = json[the].name;
					op.value = json[the].url;
					selectPublicUrl.appendChild(op);
				}
				getPublicUrl.style.display = 'none';
				selectPublicUrl.style.display = 'block';
			} catch (e) {
				console.warn(e);
				getPublicUrl.innerText = '获取失败';
			}
		}
	}

	//选择公共魔法链接
	selectPublicUrl.onchange = () => {
		if (selectPublicUrl.value) {
			url_input.value = selectPublicUrl.value;
		} else {
			url_input.value = magicUrl;
		}
		url_input.onchange();
	}


	async function versionload() {
		//获取最新版本号和当前版本号
		try {
			let res = await fetch(chrome.runtime.getURL('manifest.json'));
			let json = await res.json();
			thisVersion.innerText = json.version;
		} catch (e) {
			console.warn(e);
			thisVersion.innerText = '获取失败';
		}

		try {
			let res = await fetch('https://gitee.com/jja8/NewBingGoGo/raw/master/manifest.json');
			let json = await res.json();
			lastVersion.innerText = json.version;
		} catch (e) {
			console.warn(e);
			lastVersion.innerText = '获取失败';
		}
	}
	versionload();
}










