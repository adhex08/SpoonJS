var allSongs = [];
var currentSong = "재생중인 곡 없음"
var player;

// Search the song through Youtube API 
function searchSong(){

  // Extract song name from current list
  var qList = currentSong.split("*");
  var q = qList[0].trim();

  // Prepare various parameters for Youtube API
  var key = 'AIzaSyBqEZyAFTL1eEqPSTKVSWEcb1X5LXXmn_A';
  var requestlink = 'https://content.googleapis.com/youtube/v3/search?';
  var maxResults = "maxResults=3";
  var part = "&part=snippet";
  var qval = "&q=" + q;
  var keyval = "&key=" + key;

  // Search the song on Youtube
  var httpRequest = new XMLHttpRequest;
  httpRequest.open("GET", requestlink+maxResults+part+qval+keyval, false);
  httpRequest.send(null);
  var response = httpRequest.responseText;
  var jsonResponse = JSON.parse(response);
  var results = jsonResponse.items;
  console.log(results);

  // Start the first video on Youtube search
  startVideo(results[0].id.videoId);

}

// Start the video
function startVideo(videoid){
  player.cueVideoById(videoid);
  player.playVideo();
}

// Load the video player
function loadPlayer() { 
  if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
    var tar = document.createElement("div");
    tar.id = "player";
    document.body.appendChild(tar);

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    window.onYouTubePlayerAPIReady = function() {
      onYouTubePlayer();
    };
  } else {
    onYouTubePlayer();
  }
}

// The actual Youtube Player iframe;
function onYouTubePlayer() {
  player = new YT.Player('player', {
  height: '0',
  width: '0',
  videoId: '',
  playerVars: { controls:1, showinfo: 0, rel: 0, showsearch: 0, iv_load_policy: 3 },
  events: {
    'onStateChange': onPlayerStateChange,
    'onReady': onPlayerReady
    }
  });
}

// When the state of the Video player changes, for now when it ends
function onPlayerStateChange(event) {
  if (event.data === 0){
      // Find input message
      var empty = document.querySelector(".input-live-chat");
      // Find send button
      var button = document.querySelector('[ng-click="addChat()"]');
      if (allSongs.length == 0){
            empty.value = "SYSTEM: 신청곡 목록이 비어있습니다.\n듣고 싶은 곡을 신청해주세요."
            button.click();
      }
      else{
        const[front, ...rest] = allSongs;
        currentSong = front;
        allSongs = rest;
        empty.value = "SYSTEM: 재생중: " + currentSong;
        button.click();
        searchSong();
      }
  }
}

// Placeholder; not sure if necessary
function onPlayerReady(){

}

// State observer 
var callback = function(){
	
	// Get all messages
    var messages = document.querySelectorAll('[ng-bind-html="convertedLiveMsg"]');
  // Get newest message
    var newmessage = messages[messages.length-1].textContent;
  // Get all userids
    var users = document.querySelectorAll('[ng-click=\"userProfileHandler(listItem.author.id)\"]');
  // Get all userids
    var curruser = users[users.length-1].textContent.trim();

  // Get all privileges
    var allPerson = document.querySelectorAll("div.text-name.text-box");
    var lastPerson = allPerson[allPerson.length - 1];
    var privileges = lastPerson.querySelectorAll(".ng-binding");
    var privilege = "USER";
    for (var i = 0; i < 2; i++){
      if(getComputedStyle(privileges[i]).getPropertyValue("display") == "inline-block"){
        if(i==0){
          privilege = "BJ";
        }
        else{
          privilege = "MANAGER";
        }
      }
    }

  console.log(curruser + " " + privilege);

  // Find input message
    var empty = document.querySelector(".input-live-chat");
	// Find send button
  	var button = document.querySelector('[ng-click="addChat()"]');
  // Split the inputs
    var inputs = newmessage.split(" ");

    // Checks that the chat is special
    if (newmessage.startsWith("@")){

    	if(inputs.length == 1){

        command = newmessage.substr(1,newmessage.length-1).trim();

        // 목록    		
        if(command === "목록"){
    			for(var i = 0; i < allSongs.length; i++){
    				var j = i+1;
            if (i == 0){
              empty.value = empty.value + j.toString() + ". " + allSongs[i];  
            }
            else{
    				  empty.value =  empty.value + "\n" + j.toString() + ". " + allSongs[i];
            }
    			}
    			// 목록이 비어있는 경우
          if( empty.value == ""){
    				empty.value = "SYSTEM: 신청곡 목록이 비어있습니다.";
    			}
    			button.click();
    		}

        // Disabled for now 
        // 리셋
    		else if(command === "리셋" && (privilege === "BJ" || privilege === "MANAGER")){
    			allSongs = [];
    			empty.value = "SYSTEM: 신청곡 목록이 리셋되었습니다.";
    			button.click();
    		}

        // 다음곡
    		else if(command === "다음곡" && (privilege === "BJ" || privilege === "MANAGER")){
          if (allSongs.length == 0){
            empty.value = "SYSTEM: 신청곡 목록이 비어있습니다.";
            button.click();
          }
          else{
      			const[front, ...rest] = allSongs;
      			currentSong = front;
      			allSongs = rest;
      			empty.value = "SYSTEM: 재생중: " + currentSong;
      			button.click();
            searchSong();
          }
    		}

        // 현재곡
    		else if(command === "현재곡"){
    			empty.value = "SYSTEM: 재생중: " + currentSong;
    			button.click();
    		}

        // 에러
    		// else{
    		// 	empty.value = "SYSTEM: 양식이 올바르지 않습니다.";
    		// 	button.click();
    		// }
    	}
		
      // 실제 신청곡 받는 패턴
      else if (inputs[0] === "@신청" && inputs.length > 1){
        
        // 신청곡 가득 참
        if(allSongs.length == 5){
          empty.value = "SYSTEM: 신청곡이 가득 차있습니다.";
          button.click();
        }

        // 신청곡 성공
        else{
          const [command, ...info] = inputs;
          var artistTitle = info.join(' ').trim();
          allSongs.push(artistTitle + ' *  ' + curruser);
          empty.value = "SYSTEM: 신청곡을 받았습니다.";
          button.click();
        }
      }

      // 곡 취소
      else if (inputs[0] === "@취소" && inputs.length == 2){
        console.log("HI");
        var index = parseInt(inputs[1]);

        if(typeof(index) == intallSongs.length > index && index >= 0){
          var cancel = allSongs[index - 1];
          var name = cancel.split("*")[1].trim();
          if (name == curruser || privilege == "MANAGER" || privilege == "BJ"){
            allSongs.splice(index - 1, 1);
          }
        }
      }

    	// 불가능한 패턴
		  else {
    		empty.value = "SYSTEM: 양식 -> @신청 \"아티스트 및 제목\"";
    		button.click();
    	}
    }

    // // 설명서
    // else if(newmessage == "?신청곡"){
    // 	empty.value = "SYSTEM: 다음 양식으로 신청해주세요 (\"\" 없이):\n@신청 \"아티스트 및 제목\""
    // 	button.click();
    // }

};

// Inject Youtube Player API
loadPlayer();

// Setting up initiator 
var observer = new MutationObserver(callback);
var config = {attributes: true, childList: true};

// The message holder to monitor
var targetNode = document.querySelector('[ng-class=\"{\'custom-scroll\':isCustomScroll}\"]');

// Start running the observer
observer.observe(targetNode, config);


// OLD CODE

// // Append frame with youtube video
// function prepareFrame() {
//         var ifrm = document.createElement("iframe");
//         ifrm.setAttribute("src", "https://www.youtube.com/embed/7a-vs1pmNRs?autoplay=1");
//         ifrm.style.width = "640px";
//         ifrm.style.height = "480px";
//         ifrm.id = "currSong";
//         document.body.appendChild(ifrm);
//     }

// // Remove frame with youtube video
// function removeFrame() {
//   var elem = document.getElementById("currSong");
//   elem.parentElement.removeChild(elem);
// }

// // Find input message
// var empty = document.querySelector(".input-live-chat");
    
// // Find send button
// var button = document.querySelector('[ng-click="addChat()"]');

// results.forEach(function(thing){
//   empty.value = empty.value + thing.snippet.title + "\n";
//   // console.log(thing.id.videoId);
// })

// button.click();

// The number can change according to which youtube video is what you want

// if(curruser != "휴휴봇4"){
//   empty.value = curruser + "님이 말씀하셨습니다.";
//   button.click();
// }

  //   if (newmessage.includes("퉷") || newmessage.includes("퉤") || newmessage.includes("톽") || newmessage.includes("퉵")){
//    // Fill input with value
//    empty.value="청소요정 발동! 침을 뱉지 맙시다! 슥삭슥삭!";    
//    // Initiate send 
  // button.click();
//   }
//   else if (newmessage == ("@비제이정보")){
//    // Fill input with value
//    empty.value="안녕하세요, 25살 미국에 거주하는 휴휴입니다.";
//    // Initiate send 
  // button.click();
//   }
//   else if (newmessage.startsWith("@")){
//    // Fill input with value
//    empty.value="죄송합니다, 명령을 알아듣지 못했습니다.";
//    // Initiate send 
  // button.click();
//   }