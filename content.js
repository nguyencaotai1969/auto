
var domain = 'tintuc22h.com';
var domain_no_scoll = [
	'www.google.com',
	'google.com',
	'www.facebook.com',
	'facebook.com',
	'console.cloud.google.com',
	'bitlylink.fun'
];

chrome.runtime.onMessage.addListener(Reactions);
	function Reactions(message,sender,sendResponse){

}
autoLoadpage();

//10 phút chạy 1 lần
function autoLoadpage(){
	setInterval(function(){
		deleteCookies();
		location.reload();
	},600000);
}

//random int
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//kiểm tra site đã load đủ giữ liệu ra hay chưa
window.addEventListener('load', (event) => {
   pageScroll();
});

//kiểm tra có phải domain host không
function checkdomain(){
		if(String(window.location.hostname) == domain){
			let list_item = document.getElementsByClassName("read-title");

			// lấy ngẫu nhiêm url trong dom
			let url_random = list_item[getRandomInt(list_item.length)].querySelectorAll("a")[0].href;
			window.location.href = url_random;
		}else{
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
	return value === undefined || value === null || value === NaN || (typeof value === 'object' && Object.keys(value).length === 0 || (typeof value === 'string' && value.trim().length === 0));
}

//tự động kéo tin như đang đọc tin
function pageScroll() {

	//sự kiện kiểm tra đã xuống cuối cùng của trang hay chưa 
	window.onscroll = function(ev) {

			//kiểm tra nếu đây là kéo xuống cuối trang thì clear timeout
		    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
					
				
			   	//nếu thuộc domain block không phải chạy tự động kéo trang chuột nữa
				if(emptyValue(filterItems(String(window.location.hostname)))){
						// kiểm tra domain
						checkdomain();
						
						//xóa cookies
						deleteCookies(); 

					   	clearTimeout(scrolldelay);
				}
		    }
	};

	//nếu thuộc domain block không phải chạy tự động kéo trang chuột nữa
    if(emptyValue(filterItems(String(window.location.hostname)))){
		window.scrollBy(0,10);
    	scrolldelay = setTimeout(pageScroll,300);
	}
}

// xóa tất cả cookies
function deleteCookies() {
    var allCookies = document.cookie.split(';');
    for (var i = 0; i < allCookies.length; i++){
    	document.cookie = allCookies[i] + "=;expires="
                    + new Date(0).toUTCString();
    }
  }
