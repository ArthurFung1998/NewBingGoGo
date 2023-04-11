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
		"enuaug",
		"jbf101",
		"nodlcpcwrite",
		"nourldedupe",
		"dl_edge_desc",
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
		"dlwebtrunc",
		"glpromptv6",
		"cachewriteext",
		"e2ecachewrite",
		"enuaug",
		"jbf101",
		"nodlcpcwrite",
		"nourldedupe",
		"dl_edge_desc",
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
		"enuaug",
		"jbf101",
		"nodlcpcwrite",
		"nourldedupe",
		"dl_edge_desc",
		"dv3sugg"
	]
}

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
	"329v6webtrunc",
	"330uaug",
	"403jbf101",
	"404e2ewrt",
	"405suggbs0",
	"408nodedup",
	"audseq",
	"chk1cln",
	"nofbkcf",
	"rmvmorefrq",
	"sydnoinputt",
	"udstrclm8",
	"udstrclm8cmp",
	"scctl"
]



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