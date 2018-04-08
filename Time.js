// State observer 
var callback = function(){

 // Test
    var all = document.querySelectorAll('[ng-repeat=\"listItem in chatLists"]');
    var last = all[all.length - 1]
    var profile = last.querySelector('.thumbnail-wrap a');
    var user = profile.title;
    var msg = last.querySelector('[ng-bind-html="convertedLiveMsg"]').textContent;
    var privileges = last.querySelector('div.text-name.text-box').querySelectorAll('.ng-binding');
    var privilege = "USER";
    for(var i = 0; i < 2; i++){
      if(getComputedStyle(privileges[i]).getPropertyValue("display") == "inline-block"){
        if(i==0){
          privilege = "BJ";
        }
        else{
          privilege = "MANAGER";
        }
      }
    }

  // Find input message
    var empty = document.querySelector(".input-live-chat");
	// Find send button
  	var button = document.querySelector('[ng-click="addChat()"]');


    var time = 0;
    if(user != "아이엠휴"){
      empty.value = user + "님, 현재 공부시간 입니다. 채팅은 " + time + "분 후에 재개됩니다."
      button.click();
    }

};

// Setting up initiator 
var observer = new MutationObserver(callback);
var config = {attributes: true, childList: true};

// The message holder to monitor
var targetNode = document.querySelector('[ng-class=\"{\'custom-scroll\':isCustomScroll}\"]');

// Start running the observer
observer.observe(targetNode, config);