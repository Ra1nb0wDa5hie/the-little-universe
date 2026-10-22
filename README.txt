THE LITTLE UNIVERSE — CHAPTER 14 (VERSION 4)

FILES
- index.html — page structure
- styles.css — appearance and responsive layout
- script.js — navigation, custom audio player, concert lights, mood messages
- assets/music/ — create this folder and put audio files you are allowed to use there

CUSTOM MUSIC PLAYER
The player now uses real audio files, with play/pause, previous/next, seeking, volume, mute, track selection and current time/duration.

1. Create a folder named assets/music inside the_little_universe.
2. Put your audio files in it, for example:
   assets/music/track-01.mp3
   assets/music/track-02.mp3
   assets/music/track-03.mp3
3. Open script.js and find the array named playlist near the top of the audio-player section.
4. Edit title, artist and src for each track. Optional cover example: cover: "assets/covers/track-01.jpg".
5. If you add or remove tracks, edit the array entries accordingly.
6. Only use audio files you have the right to use. Do not assume commercial songs can be redistributed just because you can listen to them in a music app.

The concert lights analyze the playing audio in the browser and react to its frequency energy. Audio analysis works best when the file is hosted from the same website origin. If a remote audio source blocks cross-origin access, playback may work but the visual beat response can be limited.

AI-STYLE WISHES
The mood page tries to request a newly generated Russian message from an online text-generation endpoint. This needs an internet connection and may take several seconds. The endpoint is a third-party service; the selected mood is sent in the request. If the service is blocked, unavailable, or returns unsuitable text, the site falls back to a local combinational message generator. Therefore the site cannot guarantee every message is unique or that the online service will always be available. This is a prototype endpoint and should be tested before publishing.

TESTING
Open index.html in a browser to inspect the design. For reliable audio playback and fetch requests, test via a local web server or after publishing to GitHub Pages rather than opening as file://. Confirm the chosen audio files load and test on a phone before sharing.
