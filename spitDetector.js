var allSongs = [];
var currentSong = "재생중인 곡 없음"

var callback = function(){
	
	// Get all messages
    var messages = document.querySelectorAll('[ng-bind-html="convertedLiveMsg"]');
    
    // Get newest message
    var newmessage = messages[messages.length-1].textContent;

	// Find input message
    var empty = document.querySelector(".input-live-chat");
    	
	// Find send button
	var button = document.querySelector('[ng-click="addChat()"]');

    console.log(newmessage);
    
    if (newmessage.startsWith("@신청곡")){
    	inputs = newmessage.split(" ");

    	// 짧은 명령어

    	if(inputs.length == 2){
    		if(inputs[1] == "목록"){
    			for(var i = 0; i < allSongs.length; i++){
    				var j = i+1;
    				empty.value = empty.value + j.toString() + ". " + allSongs[i] + "\n";
    			}
    			if( empty.value == ""){
    				empty.value = "SYSTEM: 현재 신청곡 목록이 비어있습니다.";
    			}
    			button.click();
    		}
    		else if(inputs[1] == "리셋"){
    			allSongs = [];
    			empty.value = "SYSTEM: 신청곡 목록이 리셋되었습니다.";
    			button.click();
    		}
    		else if(inputs[1] == "다음곡"){
    			const[front, ...rest] = allSongs;
    			currentSong = front;
    			allSongs = rest;
    			empty.value = "SYSTEM: 재생중: " + currentSong;
    			button.click();
    		}
    		else if(inputs[1] == "현재곡"){
    			empty.value = "SYSTEM: 재생중: " + currentSong;
    			button.click();
    		}
    		else{
    			empty.value = "SYSTEM: 양식이 올바르지 않습니다. ?신청곡에서 확인해주세요.";
    			button.click();
    		}
    	}
		
    	// 불가능한 패턴
		else if(inputs.length < 3){
    		empty.value = "SYSTEM: 양식이 올바르지 않습니다. ?신청곡에서 확인해주세요.";
    		button.click();
    	}

    	// 실제 신청곡 받는 패턴
    	else{
    		if(allSongs.length == 5){
    			empty.value = "SYSTEM: 현재 신청곡이 가득 차있습니다. 다음에 다시 시도해주시길 바랍니다."
		    	button.click();
    		}
    		else{
    			const [command, artist, ...titles] = inputs;
	    		var title = titles.join(' ');
	    		var index = allSongs.length + 1;
		    	allSongs.push(artist + " - " + title);
		    	empty.value = "SYSTEM: 신청곡을 받았습니다.";
	    		button.click();
	    	}
    	}
    }

    // 설명서
    else if(newmessage == "?신청곡"){
    	empty.value = "SYSTEM: 다음 양식으로 신청해주세요 -> {@신청곡} {아티스트} {제목}"
    	button.click();
    }


  //   if (newmessage.includes("퉷") || newmessage.includes("퉤") || newmessage.includes("톽") || newmessage.includes("퉵")){

  //   	// Fill input with value
  //   	empty.value="청소요정 발동! 침을 뱉지 맙시다! 슥삭슥삭!";
		
  //   	// Initiate send 
		// button.click();
  //   }
  //   else if (newmessage == ("@비제이정보")){

  //   	// Fill input with value
  //   	empty.value="안녕하세요, 25살 미국에 거주하는 휴휴입니다.";

  //   	// Initiate send 
		// button.click();

  //   }
  //   else if (newmessage.startsWith("@")){

  //   	// Fill input with value
  //   	empty.value="죄송합니다, 명령을 알아듣지 못했습니다.";

  //   	// Initiate send 
		// button.click();

  //   }


};

// Setting up initiator 
var observer = new MutationObserver(callback);
var config = {attributes: true, childList: true};

// The message holder to monitor
var targetNode = document.querySelector('[ng-class=\"{\'custom-scroll\':isCustomScroll}\"]');

// Start running the observer
observer.observe(targetNode, config);