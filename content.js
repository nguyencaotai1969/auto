///event click dome reaction facebook
chrome.runtime.onMessage.addListener(Reactions);
	function Reactions(message,sender,sendResponse){
		autoLoadpage();
}
autoLoadpage();
function autoLoadpage(){
	//15 phút chạy 1 lần
	setInterval(function(){
		location.reload();
	},900000);
}


function pageScroll() {
    window.scrollBy(0,1);
    scrolldelay = setTimeout(pageScroll,10);
}