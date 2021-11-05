
var domain = 'tintuc22h.com';
var domain_no_scoll = [
	'www.google.com',
	'google.com',
	'www.facebook.com',
	'facebook.com',
	'console.cloud.google.com',
	'bitlylink.fun',
	'stackoverflow.com',
	'github.com',
	'www.w3schools.com',
	// 'news22h.com'
	// 'tintuc22h.com'
];

chrome.runtime.onMessage.addListener(Reactions);
	function Reactions(message,sender,sendResponse){
}
autoLoadpage();

//5 phút chạy 1 lần
function autoLoadpage(){
	setInterval(function(){
		deleteCookies();
		location.reload();
	},300000);
}

//random int
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//kiểm tra site đã load đủ giữ liệu ra hay chưa
if (document.readyState == "complete") {
      	pageScroll();
}else{
	// chưa load xong check tiếp khi load xong thì thôi
	window.addEventListener("load", function() {
              	pageScroll();

    }, false);
}
//kiểm tra có phải domain host không
function checkdomain(){
		if(String(window.location.hostname) == domain){
			
			let list_item = document.getElementsByClassName("read-title");
			
			// lấy ngẫu nhiêm url trong dom
			let url_random = list_item[getRandomInt(list_item.length)].querySelectorAll("a")[0].href;
			window.location.href = url_random;
			return;
		}
		 
		let http_domain = "http://"+window.location.hostname+"/";
		let https_domain = "https://"+window.location.hostname+"/";
		// nếu không phải trang chủ của site thì về trang chủ trước
		if(window.location.href == http_domain || window.location.href == https_domain){
			window.location.href = "http://"+domain;

		}else{
			window.location.href = "http://"+window.location.hostname;
		}
		//chuyển hướng về site của mình
}

//fillter
function filterItems(query) {
  return domain_no_scoll.filter(function(el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  })
}
//empty value
function emptyValue(value){
	return 
	value.length === 0 ||
	value === undefined || 
	value === null || 
	value === NaN || 
	(typeof value === 'object' && Object.keys(value).length === 0 || 
	(typeof value === 'string' && value.trim().length === 0));
}

//tự động kéo tin như đang đọc tin
function pageScroll() {

	//nếu thuộc domain block không phải chạy tự động kéo trang chuột nữa
    if(filterItems(String(window.location.hostname)).length == 0){
		window.scrollBy(0,getRandomInt(8)+1);
    	scrolldelay = setTimeout(pageScroll,300);
	}
}

// //sự kiện kiểm tra đã xuống cuối cùng của trang hay chưa 
window.onscroll = function(ev) {
	 // @var int totalPageHeight
    var totalPageHeight = document.body.scrollHeight; 

    // @var int scrollPoint
    var scrollPoint = window.scrollY + window.innerHeight;

    // check if we hit the bottom of the page
    if(scrollPoint >= totalPageHeight && filterItems(String(window.location.hostname)).length == 0)
    {
				//xóa cookies
				deleteCookies(); 				
				// kiểm tra domain
				setTimeout(()=>{
					checkdomain();
				},getRandomInt(15)*2000);
    }
};
// xóa tất cả cookies
function deleteCookies() {
    var allCookies = document.cookie.split(';');
    for (var i = 0; i < allCookies.length; i++){
    	document.cookie = allCookies[i] + "=;expires="
                    + new Date(0).toUTCString();
    }
  }
