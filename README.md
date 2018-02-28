# SpoonJS
Made to fool around with the chat room in Spooncast.net. 

This uses a javascript from the client side to dissect chats based on certain rules, 
inject a YoutubeAPI and allow people in the chatroom to request and play songs.

To allow this JS to work:

Part 1:
  1. Get Authentication Key for YoutubeData API at Google API.
  (Refer to -> https://developers.google.com/youtube/v3/)
  2. In the Authentication Key variable, paste the authentication key.

Part 2:
  1. Start a livecast with Spoon on some device.
  2. Open up spooncast on a web browser on a computer, and paste the code into the console. 
  
Currently, the commands are as follows:

@신청 string // Requests the song by adding the string to the list of songs
@목록 // Shows all list of songs request 
@현재곡 // Shows what song is playing currently
@다음곡 // Plays the next song in the song list
@리셋 // Resets the entire list 

There are ways to see who typed what chat in the room, but currently the code lacks the ability to distinguish
normal users from special users with more privileges (manager, broadcaster). This needs to be fixed. 
