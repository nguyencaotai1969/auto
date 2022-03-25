/*
https://chrome.google.com/webstore/detail/free-vpn/njpmifchgidinihmijhcfpbdmglecdlb
https://chrome.google.com/webstore/detail/vpn-professional-free-unl/foiopecknacmiihiocgdjgbjokkpkohc?hl=vi
*/


//domain site gốc
var domain = {
	// auto chuyển trang
	host1:'tintuc22h.com',

	// auto kéo view
	host2:'onlinetq.blogspot.com',
	host3:'hvtrituehay.blogspot.com'
};

//trạng thái của trang status_page
//---1 : kéo view cho trang
//---2 : kéo quảng cáo cho trang
var status_page = true;

var elemenTag = {
	a:'a',
	li:'li'
}
var list_domain_views = [
	'onlinetq.blogspot.com',
	'hvtrituehay.blogspot.com'
]
//các domain không cần tự động kéo
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
	'developer.mozilla.org',
	'accounts.google.com',
	'gist.github.com',
	'toidicode.com',
	// 'news22h.com',
	// 'tintuc22h.com',
	'order.surfshark.com',
	'surfshark.com',
	'temp-mail.org',
	'whatismyipaddress.com',
];

//các dom class
var domClass = {
	class1:'read-title',
	class2:'wp-block-latest-posts__featured-image',
	class3:'posts'
};


//tổng số lần xuống cuối trang
let count_Pagebottom = 0;

//tổng số lần request site ngoài 
let count_siteOut = 0;

//thời gian load lại trang;
var timeReload = 500000000;

// sự kiện lắng nghe click load page theo giây
chrome.runtime.onMessage.addListener(Reactions);
	function Reactions(message,sender,sendResponse){
		timeReload = parseInt(message.timeloadpage);
		if(timeReload != null){
			sessionStorage.setItem("timeReload", timeReload);
			console.log('thời gian load page'+sessionStorage.getItem("timeReload"));	
		}
	}

if(sessionStorage.getItem("timeReload") != null){

	autoLoadpage(sessionStorage.getItem("timeReload"));
	//load lại page
	function autoLoadpage(timeint){
		setInterval(function(){
			document.location.reload();
		},timeint);
	}
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
		
		let url_random = "";
		let hostname_domain = String(window.location.hostname);
		// clearInterval(scrolldelay);

		//nếu là tăng view cho page thì vào đây
		if(status_page){
			getViewPage();
		}else{
			console.log(2);
		}


		// if(hostname_domain == domain.host1){

		// 	// lấy ngẫu nhiêm url trong dom
		// 	if(getRandomInt(2) === 1){
		// 		let list_item = document.getElementsByClassName(domClass.class1);
		// 		url_random = list_item[getRandomInt(list_item.length)].querySelectorAll("a")[0].href;

		// 	}else{
		// 		let list_item2 = document.getElementsByClassName(domClass.class2);
		// 		url_random = list_item2[getRandomInt(list_item2.length)].querySelectorAll("a")[0].href;

		// 	}

		// 	//lưu vào bộ nhớ
		// 	chrome.storage.local.set({url_random: url_random}, function() {
	 //          console.log('Value storage is set to url_random');
	 //        });
			
		// 	window.location.href = url_random;
		// 	smoothscroll();
		// 	return;
		// }

		// if(hostname_domain == domain.host2 || hostname_domain == domain.host3){


		// 	//tìm dom url
		// 	let list_domain_item2 = document.getElementsByClassName(domClass.class3);

		// 	//kiểm tra dom
		// 	list_domain_item2 = list_domain_item2 ? list_domain_item2 : "https://"+domain.host2;

		// 	//lấy 1 url ngẫu nhiên trong dom
		// 	let url_random2 = list_domain_item2[getRandomInt(list_domain_item2.length)].querySelectorAll("a");
			
		// 	//click url ngẫu nhiên lấy đc con khong thi chuyen huong ve trang chu
		// 	url_random2.length > 0 ? url_random2[0].click() : window.location.href = "https://"+domain.host2;
		// }
		
		// // nếu khong phải domain chính của site chuyển hướng về site của mình theo url đã lưu trong storage
		// if(domain.host1 !== hostname_domain && domain.host2 !== hostname_domain){
			
		// 	//nếu là url click quảng cáo thì về trang chủ của url đó trước
		// 	//rồi mới chuyển về trang của mình

		// 	if(document.location.href != document.location.origin+"/"){

		// 		//số set số lần loadpage
		// 		if(sessionStorage.getItem("count_loadPage") == null){
		// 			sessionStorage.setItem("count_loadPage",count_siteOut+1);
		// 		}

		// 		let coutPage = parseInt(sessionStorage.getItem("count_loadPage"));
		// 		coutPage++;
		// 		sessionStorage.setItem("count_loadPage",coutPage);

		// 		//nếu số lần load page lớn hớn 15 thì thì chuyển về site chính 
		// 		//còn k chuyển về host của site hiện tại
		// 		if(parseInt(sessionStorage.getItem("count_loadPage")) > 15){
		// 			chrome.storage.local.get(['url_random'], function(result) {
		// 	        	let locationDomain = result.url_random.length !== undefined ? result.url_random : "https://"+domain.host1;
		// 	          	window.location.href = locationDomain;
		// 	        });
		// 		}else{
		// 				window.location.href = document.location.origin;
		// 		}
		// 		return;
		// 	}

	 //        chrome.storage.local.get(['url_random'], function(result) {
	 //        	sessionStorage.setItem("count_loadPage",0);
	 //        	let locationDomain = result.url_random.length !== undefined ? result.url_random : "https://"+domain.host1;
	 //          	window.location.href = locationDomain;
	 //          	return;
	 //        });
		// }
}

//tăng view
function getViewPage(){

	let domain_random = list_domain_views[getRandomInt(list_domain_views.length)];

	let hostname_domain = String(window.location.hostname);

	//nếu domain random mà bằng với domain chính thì random url tiếp theo
	//còn không thì sang domain mới
	if(domain_random == hostname_domain){

		// //tìm dom url
		let list_domain_item2 = document.getElementsByClassName(domClass.class3)[0].getElementsByTagName(elemenTag.li);
		
		//lấy 1 url ngẫu nhiên trong dom
		let urlPage = list_domain_item2[getRandomInt(list_domain_item2.length)].getElementsByTagName(elemenTag.a);
		
		//click url ngẫu nhiên lấy đc con khong thi chuyen huong ve trang chu
		urlPage.length > 0 || urlPage !== undefined ? urlPage[0].click() : "https://"+domain_random;

	}else{

		window.location.href =  "https://"+domain_random;

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
		window.scrollBy(0,getRandomInt(8)+10);
    	scrolldelay = setTimeout(pageScroll,10+getRandomInt(1000));
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

				// kiểm tra domain
				// setTimeout(()=>{
				// 	checkdomain();
				// },getRandomInt(15)*2000);
				
				setTimeout(()=>{
					checkdomain();
				},1000);
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
