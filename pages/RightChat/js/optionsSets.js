//聊天选项
let chatTypes = {
	//更有创造力选项
	create: [
		"nlu_direct_response_filter",
		"deepleo",
		"disable_emoji_spoken_text",
		"responsible_ai_policy_235",
		"enablemm",
		"h3imaginative",
		"cachewriteext",
		"e2ecachewrite",
		"nodlcpcwrite",
		"responseos",
		"travelansgnd",
		"dl_edge_prompt",
		"glprompt",
		"dv3sugg",
		"gencontentv3"
	],
	//balance 平衡模式选项
	balance: [
		"nlu_direct_response_filter",
		"deepleo",
		"disable_emoji_spoken_text",
		"responsible_ai_policy_235",
		"enablemm",
		"galileo",
		"cachewriteext",
		"e2ecachewrite",
		"nodlcpcwrite",
		"responseos",
		"travelansgnd",
		"dl_edge_prompt",
		"glprompt",
		"dv3sugg"
	],
	//精准选项
	accurate: [
		"nlu_direct_response_filter",
		"deepleo",
		"disable_emoji_spoken_text",
		"responsible_ai_policy_235",
		"enablemm",
		"h3precise",
		"cachewriteext",
		"e2ecachewrite",
		"nodlcpcwrite",
		"responseos",
		"travelansgnd",
		"dl_edge_prompt",
		"glprompt",
		"dv3sugg"
	]
}

//消息来源
let source = "cib";

//接收消息类型
let allowedMessageTypes = [
	"Chat",
	"InternalSearchQuery",
	"InternalSearchResult",
	"Disengaged",
	"InternalLoaderMessage",
	"RenderCardRequest",
	"AdsQuery",
	"SemanticSerp",
	"GenerateContentQuery",
	"SearchQuery"
]

//切片id，也不知道是啥意思，反正官网的更新了
let sliceIds = [
	"0404sydicnbs0",
	"185cf",
	"330uaugs0",
	"403tvlansgnd",
	"404e2ewrt",
	"405suggbs0",
	"408nodedups0",
	"afftoalton",
	"chk1cf",
	"nopreloadsscf",
	"perfimpcomb",
	"sugdivdis",
	"sydnoinputt",
	"udscahrfon",
	"udstrblm5",
	"wpcssopt",
	"0329resp",
	"scctl"
]



//生成消息对象
async function generateMessages(sendMessageManager/*消息管理器*/,chatMessageText/*要发送的消息文本*/){
	function timeString() {
		var d = new Date();
		var year = d.getFullYear();
		var month = (d.getMonth() + 1).toString().padStart(2, "0");
		var date = d.getDate().toString().padStart(2, "0");
		var hour = d.getHours().toString().padStart(2, "0");
		var minute = d.getMinutes().toString().padStart(2, "0");
		var second = d.getSeconds().toString().padStart(2, "0");
		var offset = "+08:00"; // 你可以根据需要修改这个值
		var s = year + "-" + month + "-" + date + "T" + hour + ":" + minute + ":" + second + offset;
		return s;
	}

	if(!sendMessageManager.startTime){
		sendMessageManager.startTime = timeString();
	}
	return {
		"locale": "zh-CN",
		"market": "zh-CN",
		"region": "US",
		"location": "lat:47.639557;long:-122.128159;re=1000m;",
		"locationHints": [
			{
				"country": "United States",
				"state": "Texas",
				"city": "Dallas",
				"zipcode": "75207",
				"timezoneoffset": -6,
				"dma": 623,
				"countryConfidence": 8,
				"cityConfidence": 5,
				"Center": {
					"Latitude": 32.7928,
					"Longitude": -96.8274
				},
				"RegionType": 2,
				"SourceType": 1
			}
		],
		"timestamp": sendMessageManager.startTime,
		"author": "user",
		"inputMethod": "Keyboard",
		"text": chatMessageText,
		"messageType": "Chat"
	}
	
}



async function getPreviousMessages(){
	return [
		{
			"author": "user",
			"description": pageText.description,
			"contextType": "WebPage",
			"messageType": "Context",
			"messageId": "discover-web--page-ping-mriduna-----",
			"sourceName": pageText.sourceName,
			"sourceUrl": pageText.sourceUrl
		}
	];
}