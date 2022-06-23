var nametext = [
	'game','game hay','tin m?i','new','new fun','facebook','ads',
	'toi la ai','map dau','where are you','Get','Cookie','ATPSoftware',
	'NBC News',' Breaking News', 'Top Stories','Latest World','US',
	'4 hours ago','Go', 'to','for','breaking news', 'videos', 
	'and the latest',' top', 'stories' ,'in world news',
 	'business', 'politics', 'health', 'and','pop','culture','uS News world','Nightly','news', 'about','nBC','news','digital'

];

//domain site g?c
var domain = {

	// auto chuy?n trang
	host1:'tintuc22h.com',

	// auto kéo view
	host2:'onlinetq.blogspot.com',
	host3:'hvtrituehay.blogspot.com'
};

//tr?ng thái c?a trang status_page
//---true : kéo view cho trang
//---false : ki?m ti?n click qu?ng cáo cho trang

var status_page = true;

var elemenTag = {
	a:'a',
	li:'li'
}
var list_domain_views = [
	// 'hotnews24h.xyz',
	// 'newshot24h.top',
	// 'newsfun24h.xyz',
	// 'howtocheats.com?h='+nametext[getRandomInt(nametext.length)]+'&fbclid='+makeid(61),
	'www.google.com/search?q='+nametext[getRandomInt(nametext.length)]+'&fbclid='+makeid(61),
	'www.facebook.com?name='+nametext[getRandomInt(nametext.length)]+'&fbclid='+makeid(61),
	'banmaynuocnong.com?fbclid='+makeid(61),
	'kelashackers.com?fbclid='+makeid(61),
	// 'news.remaps.vn',
	// 'agriviet.com'
];

//các domain không c?n t? d?ng kéo
var domain_no_scoll = [
	
	'console.cloud.google.com',
	'bitlylink.fun',
	'stackoverflow.com',
	'github.com',
	'www.w3schools.com',
	'developer.mozilla.org',
	'accounts.google.com',
	'gist.github.com',
	'toidicode.com',
	'www.geeksforgeeks.org',
	// 'news22h.com',
	// 'tintuc22h.com',
	'order.surfshark.com',
	'surfshark.com',
	'temp-mail.org',
	'whatismyipaddress.com',
];

//các dom class
var domClass = {
	class1:'a',
	class2:'wp-block-latest-posts__featured-image',
	class3:'posts'
};


//t?ng s? l?n xu?ng cu?i trang
let count_Pagebottom = 0;

//t?ng s? l?n request site ngoài 
let count_siteOut = 0;

//th?i gian load l?i trang;
var timeReload = 500000000;

// s? ki?n l?ng nghe click load page theo giây
//chrome.runtime.onMessage.addListener(Reactions);
	//function Reactions(message,sender,sendResponse){
	//	timeReload = parseInt(message.timeloadpage);
	//	if(timeReload != null){
	//		sessionStorage.setItem("timeReload", timeReload);
	//		console.log('th?i gian load page'+sessionStorage.getItem("timeReload"));	
	//	}
	//}

if(sessionStorage.getItem("timeReload") != null){

	autoLoadpage(sessionStorage.getItem("timeReload"));
	//load l?i page
	function autoLoadpage(timeint){
		setInterval(function(){
			document.location.reload();
		},timeint);
	}
}

//random text
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

//random int
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//ki?m tra site dã load d? gi? li?u ra hay chua
if (document.readyState == "complete") {
      	pageScroll();
}else{
	// chua load xong check ti?p khi load xong thì thôi
	window.addEventListener("load", function() {
         pageScroll();
    }, false);
}

//ki?m tra có ph?i domain host không
function checkdomain(){
		
		let url_random = "";
		let hostname_domain = String(window.location.hostname);
		// clearInterval(scrolldelay);

		//n?u là tang view cho page thì vào dây
		if(status_page){

			getViewPage();
		}else{
			//click  qu?ng cáo
			autoclickAds();
		}


		// if(hostname_domain == domain.host1){

		// 	// l?y ng?u nhiêm url trong dom
		// 	if(getRandomInt(2) === 1){
		// 		let list_item = document.getElementsByClassName(domClass.class1);
		// 		url_random = list_item[getRandomInt(list_item.length)].querySelectorAll("a")[0].href;

		// 	}else{
		// 		let list_item2 = document.getElementsByClassName(domClass.class2);
		// 		url_random = list_item2[getRandomInt(list_item2.length)].querySelectorAll("a")[0].href;

		// 	}

		// 	//luu vào b? nh?
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

		// 	//ki?m tra dom
		// 	list_domain_item2 = list_domain_item2 ? list_domain_item2 : "https://"+domain.host2;

		// 	//l?y 1 url ng?u nhiên trong dom
		// 	let url_random2 = list_domain_item2[getRandomInt(list_domain_item2.length)].querySelectorAll("a");
			
		// 	//click url ng?u nhiên l?y dc con khong thi chuyen huong ve trang chu
		// 	url_random2.length > 0 ? url_random2[0].click() : window.location.href = "https://"+domain.host2;
		// }
		
		// // n?u khong ph?i domain chính c?a site chuy?n hu?ng v? site c?a mình theo url dã luu trong storage
		// if(domain.host1 !== hostname_domain && domain.host2 !== hostname_domain){
			
		// 	//n?u là url click qu?ng cáo thì v? trang ch? c?a url dó tru?c
		// 	//r?i m?i chuy?n v? trang c?a mình

		// 	if(document.location.href != document.location.origin+"/"){

		// 		//s? set s? l?n loadpage
		// 		if(sessionStorage.getItem("count_loadPage") == null){
		// 			sessionStorage.setItem("count_loadPage",count_siteOut+1);
		// 		}

		// 		let coutPage = parseInt(sessionStorage.getItem("count_loadPage"));
		// 		coutPage++;
		// 		sessionStorage.setItem("count_loadPage",coutPage);

		// 		//n?u s? l?n load page l?n h?n 15 thì thì chuy?n v? site chính 
		// 		//còn k chuy?n v? host c?a site hi?n t?i
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
function autoclickAds(){

	// var iframeAds = top.document.getElementsByTagName('iframe');
	// 	window.location.href =  iframeAds[0].contentWindow.document.getElementsByTagName('a')[0].href;
	// 	console.log(iframeAds[0].contentDocument);
	// console.log(filterItemss('google_ads_iframe_'));
}
//tang view
function getViewPage(){
	let domain_random = list_domain_views[getRandomInt(list_domain_views.length)];

	let hostname_domain = String(window.location.hostname);

	//n?u domain random mà b?ng v?i domain chính thì random url ti?p theo
	//còn không thì sang domain m?i
	if(domain_random == hostname_domain){

		let url_page_info =	document.getElementsByTagName(domClass.class1);
		let arr_url_to_page = [];
		for (var i = 0; i < url_page_info.length; i++) {
			arr_url_to_page.push(url_page_info[i].href);
		
		}

		//fillter Items in arrays
		function filterItems(str_filter,array_data) {
		  return array_data.filter(function(el) {
		      return el.toLowerCase().indexOf(str_filter.toLowerCase()) > -1;
		  })
		}

		//removeDuplicates
		function removeDuplicates(arr) {
		        return arr.filter((item, 
		            index) => arr.indexOf(item) === index);
		}
		
		//url page 
		let url_page = removeDuplicates(filterItems(domain_random,arr_url_to_page));
		window.location.href = url_page[getRandomInt(url_page.length)]; 

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

//t? d?ng kéo tin nhu dang d?c tin
function pageScroll() {
	//n?u thu?c domain block không ph?i ch?y t? d?ng kéo trang chu?t n?a
    if(filterItems(String(window.location.hostname)).length == 0){
		window.scrollBy(0,getRandomInt(8)+10);
    	scrolldelay = setTimeout(pageScroll,10+getRandomInt(1000));
	}
}

//v? d?u trang
function smoothscroll(){
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(smoothscroll);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};

//s? ki?n ki?m tra dã xu?ng cu?i cùng c?a trang hay chua 
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

				// ki?m tra domain
				// setTimeout(()=>{
				// 	checkdomain();
				// },getRandomInt(15)*2000);

				setTimeout(()=>{
					checkdomain();
				},1000);
    }
};

// xóa t?t c? cookies
function deleteCookies() {
    var allCookies = document.cookie.split(';');
    for (var i = 0; i < allCookies.length; i++){
    	document.cookie = allCookies[i] + "=;expires="
                    + new Date(0).toUTCString();
    }
  }