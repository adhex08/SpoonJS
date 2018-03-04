# CustomSocket

Realized that the chat part of the system, and the most of the interactions are done with realtime application socket.

I had to read through a lot of the websocket structure to understand this.

It is done with the Socket-io.js (?) library, so this code requires using the Snippet function of the chrome to actually usually the code.

As with the other parts, it requires using the console to set up.

It is harder to use this one, but with a basic understanding of the websocket, and how the frames can be observed in the network tabs, 
it is much more powerful than just simply dissecting the html codes. 


# RequestSongSpoon
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
  
v 1.5

Currently, the commands are as follows:

ALL USERS
@신청 string // Requests the song by adding the string to the list of songs

ALL USERS
@목록 // Shows all list of songs request

ALL USERS
@현재곡 // Shows what song is playing currently

PRIVILEGED USERS
@다음곡 // Plays the next song in the song list

PRIVILEGED USERS
@리셋 // Resets the entire list 

PRIVILEGED USERS OR SONG REQUESTER (ONLY CAN CANCEL SONGS ONE REQUESTED IF NORMAL USER)
@취소 int // Cancels the nth song in the list given my @목록













v 1.0

Currently, the commands are as follows:

@신청 string // Requests the song by adding the string to the list of songs

@목록 // Shows all list of songs request

@현재곡 // Shows what song is playing currently

@다음곡 // Plays the next song in the song list

@리셋 // Resets the entire list 

There are ways to see who typed what chat in the room, but currently the code lacks the ability to distinguish
normal users from special users with more privileges (manager, broadcaster). This needs to be fixed. 
