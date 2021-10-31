      	$(".btn-auto-time").click(function(){
      		var queryInfo = {
                                active: true,
                                currentWindow: true
                            };
            var auto_time = {
                                love: "love"
            }
      	 chrome.tabs.query(queryInfo, function(tabs) {
                                chrome.tabs.sendMessage(tabs[0].id, ['auto_time', 'auto_time']);
                   });
      	})
