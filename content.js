
//domain site gốc
var domain = 'tintuc22h.com';

//các domain không cần tự động kéo
var domain_no_scoll = [
	'www.google.com',
	'google.com',
	'www.facebook.com',
	'facebook.com',
	'console.cloud.google.com',
	'bitlylink.fun',
	// 'stackoverflow.com',
	'github.com',
	'www.w3schools.com',
	'developer.mozilla.org'
	// 'news22h.com'
	// 'tintuc22h.com'
];

//tổng số lần xuống cuối trang
let count_Pagebottom = 0;

//tổng số lần request site ngoài 
let count_siteOut = 0;

chrome.runtime.onMessage.addListener(Reactions);
	function Reactions(message,sender,sendResponse){
}
autoLoadpage();

//5 phút chạy 1 lần
function autoLoadpage(){
	setInterval(function(){
		deleteCookies();
		document.location.reload(true);
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

			count_Pagebottom ++;
			//nếu số lần kéo xuống cuối trang đủ 5 lần thì chuyển sang 1 trang khác
			if(count_Pagebottom >= 5){
				let list_item = document.getElementsByClassName("read-title");
				// lấy ngẫu nhiêm url trong dom
				let url_random = list_item[getRandomInt(list_item.length)].querySelectorAll("a")[0].href;
				window.location.href = url_random;
			}
			smoothscroll();
			return;
		}
		 
		let http_domain = "http://"+window.location.hostname+"/";
		let https_domain = "https://"+window.location.hostname+"/";
		// nếu phải trang chủ của site chuyển hướng về site của mình
		if(domain != http_domain || domain != https_domain){
			window.location.href = "http://"+domain;
		}
		
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

//về đầu trang
function smoothscroll(){
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(smoothscroll);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};

//sự kiện kiểm tra đã xuống cuối cùng của trang hay chưa 
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

				// // kiểm tra domain
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
