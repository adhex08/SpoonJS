var periodical = function(){
	// Find input message
    var empty = document.querySelector(".input-live-chat");

    if(empty.value == ""){
	    empty.value = "ㅋㅋㅋㅋㅋㅋ";

	    // Find input button
	    var button = document.querySelector('[ng-click="addChat()"]');

	    button.click();
    }

}

window.setInterval(periodical, 60000);