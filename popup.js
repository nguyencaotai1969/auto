try{
	$(".btn-save-time").click(function(){
      		let timeloadpage =	$(".reloadpage").val();
      		var queryInfo = {
                                active: true,
                                currentWindow: true
                            };
            var auto_time = {
                                timeloadpage: timeloadpage
            }
      	 	chrome.tabs.query(queryInfo, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, auto_time);
                });
      	})

}catch(e){
	console.log(e);
}
