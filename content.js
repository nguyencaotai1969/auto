//url api
var api = {
    getUrlListDomainHeader: "https://adsense.game22h.com/?domain-header",
    getUrlDomainAdsens:"https://adsense.game22h.com/?domain-adsense",
    getConfigDome:"https://adsense.game22h.com/?config-dom"    
}

var configMain = {
    countViewM : 10
}

//kiểmm tra site dã load xong hay chưa
if (document.readyState == "complete") {

    browser.storage.local.get("bannerAdsense").then((result)=>{

        if(window.location.href == result.bannerAdsense){
          getURlAdsen();

        }else{
          pageScroll();
        }
    });

} else {
  // chua load xong check ti?p khi load xong thì thôi
  window.addEventListener("load", function() {
      browser.storage.local.get("bannerAdsense").then((result)=>{

        if(window.location.href == result.bannerAdsense){
          getURlAdsen();

        }else{
          pageScroll();
        }
    });
  }, false);
}


//random int
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//create element script
function addScript(src) {
  let script = document.createElement('script');
  script.setAttribute('src', src);
  script.type = 'text/javascript';
  script.async = true;
  $("body").append(script);
}

//random text
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

//random int
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//goi api domain chuyển hướng
const getDataDomain = async () => {

  const res = await fetch(api.getUrlListDomainHeader);
  if (!res.ok) {
    throw new Error(`${res.status}: ${await res.text()}`);
  }
  return res.json();
};

const dataPromise = getDataDomain();

//goi api domain adsense
const getDataAdsense = async () => {
  const res = await fetch(api.getUrlDomainAdsens);
  if (!res.ok) {
    throw new Error(`${res.status}: ${await res.text()}`);
  }
  return res.json();
};
const dataPromiseAdsense = getDataAdsense();

//goi api config-dom
const getDomAdsense = async () => {
  const res = await fetch(api.getConfigDome);
  if (!res.ok) {
    throw new Error(`${res.status}: ${await res.text()}`);
  }
  return res.json();
};
const dataPromiseDome = getDomAdsense();

//tự động kéo xuống
function pageScroll() {

  window.scrollBy(0, getRandomInt(8) + 10);
  scrolldelay = setTimeout(pageScroll, 10 + getRandomInt(1000));

  var scrollPoint = window.scrollY + window.innerHeight;
  var totalPageHeight = document.body.scrollHeight;

  console.log(scrollPoint,totalPageHeight);
  ///đã kéo xuống cuối cùng của page
  if ( parseInt(scrollPoint) === parseInt(totalPageHeight) || parseInt(scrollPoint) > parseInt(totalPageHeight)) {
      console.log('dừng scoll');
      clearTimeout(scrolldelay);
      checkdomain();
      deleteCookies();
  }
}

//kiểm tra sự kiện 
function checkdomain() {

  //api domain chuyển hướng khi kéo view 
  // chưa làm kéo view
  dataPromise.then((result) => {

    if (result) {
      result.forEach(e => {
        String(window.location.hostname);
        e.domain_name = e.domain_name + '?fbclid=' + makeid(61);
        // console.log(e);
      });
    }
  });

  //api domain adsense 
  dataPromiseAdsense.then((result)=>{

    if(result){

      // lọc result trả về xem có domain trùng với domain đang chạy hay không
      let resultFiltter =  result.filter(res=>{

        return res.domain_name == String(window.location.hostname);
      });
      
      //nếu là page facebook thì chuyển về page adsense để kéo tiếp lấy theo page random
      if(document.location.hostname == 'www.facebook.com'){
        console.log('facebook page');
        window.location.href = "https://"+result[getRandomInt(result.length)].domain_name+ '?fbclid=' + makeid(61);
        return;
      }

      //trùng domain đang chạy
      if(resultFiltter.length > 0){

          let countView = localStorage.getItem("countView");

          //không có countView set nó
          if(countView == "" || countView == null){
                localStorage.setItem('countView', 1);
                randomURl(getRandomInt(3));
                return;
          }

          // đã có countView
          if(countView){
                 
                localStorage.setItem('countView', parseInt(countView)+1);

                 //chưa đủ số lượng view của page thì tăng tiếp
                 if(parseInt(countView) <= configMain.countViewM){

                    randomURl(getRandomInt(3));
                 }
                 //đã đủ số lượng view của page thì click adsense
                 else{
                  dataPromiseDome.then(res=>{
                      if(res){
                        let joinDom = res.join();
                        let dataDomAdsense = document.querySelectorAll(joinDom);
                        if(dataDomAdsense){

                          let iframeWindow = dataDomAdsense[getRandomInt(dataDomAdsense.length)];

                          if(iframeWindow !== undefined){
                              // lưu vào storage
                           localStorage.setItem('countView', 1);
                            browser.storage.local.set({bannerAdsense: iframeWindow.src});
                            window.location.href = iframeWindow.src;
                          }else{
                              randomURl(1);
                          }
                        }
                      }
                  });
                 }
              }
      }

      //không trùng domain adsense đang chạy
      if(resultFiltter.length <= 0){

          browser.storage.local.get("viewPage").then((result)=>{

            if(result.viewPage == undefined || result.viewPage == "" || result == undefined || result == ""){

              // lưu vào storage view
              browser.storage.local.set({viewPage:1});
              window.location.href = window.location.hostname;
              return;
            }

            //nếu view page lớn hơn 3 thì set lại và chuyển page
            if(parseInt(result.viewPage) >= 3){

              // lưu vào storage view
              browser.storage.local.set({viewPage:1});

              // chuyển về trang facebook hoặc google
              randomURl(2);

              return;
            }

            //nếu nhỏ hơn 3 thì đọc để kéo view tiếp
            else{

              // lưu vào storage view
              browser.storage.local.set({viewPage:parseInt(result.viewPage)+1});

              randomURl(1);
            }
          });

      }

     
    }
  });

}

//kéo view cho page hiện tại hoặc page khác
function randomURl(randomURlint){

  // tìm kiếm trên google
  if(randomURlint == 0){
    let title = document.getElementsByTagName('title') ? document.getElementsByTagName('title')[0].innerText : window.location.hostname;
    window.location.href = 'https://www.google.com/search?q='+title+'&fbclid='+makeid(61);
  }

  //nếu là 1 thì random page hiện tại
  if(randomURlint == 1){

      let list_item = document.getElementsByTagName('a');
      
      list_item = list_item.length > 0 ? list_item :[{href:'https://'+window.location.hostname+'?fbclid='+makeid(61)}];


      let oneItem = list_item[getRandomInt(list_item.length)].href;

      let dataArrListitem = [];
      
      for (var i = 0; i < list_item.length; i++) {

        if(list_item[i].href && list_item[i].href.match(String(window.location.hostname))){
              dataArrListitem.push(list_item[i].href);
          }
           
      }
      if(dataArrListitem){

          window.location.href = dataArrListitem[getRandomInt(dataArrListitem.length)]+'&fbclid='+makeid(61);
      }else{
        window.location.href = window.location.hostname+'?fbclid='+makeid(61);
      }
  }

  //chuyển sang facebook
  if(randomURlint == 2){
    window.location.href = 'https://www.facebook.com/?fbclid='+makeid(61);
  }


}


// xóa cookies
function deleteCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

//check url adsense
function getURlAdsen(){

 setTimeout(()=>{
   browser.storage.local.get("bannerAdsense").then((result)=>{

    if(window.location.href == result.bannerAdsense){
      let hrefBanner = document.getElementsByTagName('a');

    let linkbannerAds;
    for (var i = 0; i < hrefBanner.length; i++) {
      if(hrefBanner[i].href.match('googleadservices.com')){
         linkbannerAds = hrefBanner[i].href;
      }
    }
    console.log('link banner adsense',linkbannerAds);
    window.location.href = linkbannerAds;
  }
  });
 },5000);
}



