(() => {
  "use strict";

  const screens = [...document.querySelectorAll(".screen")];
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const pageNav = document.getElementById("pageNav");
  const menuButton = document.getElementById("menuButton");

  function goToScreen(id) {
    const target = document.getElementById(id);
    if (!target) return;
    screens.forEach(screen => {
      const active = screen.id === id;
      screen.classList.toggle("active", active);
      screen.setAttribute("aria-hidden", String(!active));
    });
    navLinks.forEach(link => link.classList.toggle("active", link.dataset.go === id));
    pageNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      goToScreen(button.dataset.go);
    });
  });

  menuButton.addEventListener("click", () => {
    const open = pageNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  // Real audio player. Add licensed audio files under assets/music and list them here.
  const musicPlayer = document.getElementById("musicPlayer");
  const audio = document.getElementById("audioPlayer");
  const musicHint = document.getElementById("musicHint");
  const trackTitle = document.getElementById("trackTitle");
  const trackArtist = document.getElementById("trackArtist");
  const trackArt = document.getElementById("trackArt");
  const trackSelect = document.getElementById("trackSelect");
  const playPause = document.getElementById("playPause");
  const prevTrack = document.getElementById("prevTrack");
  const nextTrack = document.getElementById("nextTrack");
  const muteButton = document.getElementById("muteButton");
  const volumeBar = document.getElementById("volumeBar");
  const seekBar = document.getElementById("seekBar");
  const currentTimeLabel = document.getElementById("currentTime");
  const durationLabel = document.getElementById("duration");


const playlist = [
    // 1. ATEEZ
    { title: "12 Midnight", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - 12 Midnight.mp3", cover: "" },
    { title: "Adrenaline", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - Adrenaline.mp3", cover: "" },
    { title: "Answer", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - Answer.mp3", cover: "" },
    { title: "ARRIBA", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - ARRIBA.mp3", cover: "" },
    { title: "Ash", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - Ash.mp3", cover: "" },
    { title: "BAD", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - BAD.mp3", cover: "" },
    { title: "BOUNCY", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - BOUNCY.mp3", cover: "" },
    { title: "Deja Vu", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - Deja Vu.mp3", cover: "" },
    { title: "Fallin'", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - Fallin'.mp3", cover: "" },
    { title: "HALAZIA", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - HALAZIA.mp3", cover: "" },
    { title: "Ice On My Teeth", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - Ice On My Teeth.mp3", cover: "" },
    { title: "In Your Fantasy", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - In Your Fantasy.mp3", cover: "" },
    { title: "Lemon Drop", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - Lemon Drop.mp3", cover: "" },
    { title: "Wonderland", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - Wonderland.mp3", cover: "" },
    { title: "WORK", artist: "ATEEZ", src: "assets/music/Ateez/Ateez - WORK.mp3", cover: "" },

    // 2. Tomorrow X Together
    { title: "9 And Three Quarters", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - 9 And Three Quarters.mp3", cover: "" },
    { title: "Angel Or Devil", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - Angel Or Devil.mp3", cover: "" },
    { title: "Anti-Romantic", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - Anti-Romantic.mp3", cover: "" },
    { title: "Back for More", artist: "Tomorrow X Together ft. Anitta", src: "assets/music/TXT/Tomorrow X Together - Back for More.mp3", cover: "" },
    { title: "Beautiful Strangers", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - Beautiful Strangers.mp3", cover: "" },
    { title: "Bed of Thorns", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - Bed of Thorns.mp3", cover: "" },
    { title: "Bird of Night", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - Bird of Night.mp3", cover: "" },
    { title: "Blue Hour", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - Blue Hour.mp3", cover: "" },
    { title: "CROWN", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - CROWN.mp3", cover: "" },
    { title: "Dream of Mine", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - Dream of Mine.mp3", cover: "" },
    { title: "LO$ER=LO♡ER", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - LO$ER=LO♡ER.mp3", cover: "" },
    { title: "Nice to Meet Ya", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - Nice to Meet Ya.mp3", cover: "" },
    { title: "Silence", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - Silence.mp3", cover: "" },
    { title: "So What", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - So What.mp3", cover: "" },
    { title: "Sugar Rush Ride", artist: "Tomorrow X Together", src: "assets/music/TXT/Tomorrow X Together - Sugar Rush Ride.mp3", cover: "" },

    // 3. ENHYPEN
    { title: "Always", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - Always.mp3", cover: "" },
    { title: "Bite Me", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - Bite Me.mp3", cover: "" },
    { title: "Blessed-Cursed", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - Blessed-Cursed.mp3", cover: "" },
    { title: "Brought The Heat Back", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - Brought The Heat Back.mp3", cover: "" },
    { title: "Chaconne", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - Chaconne.mp3", cover: "" },
    { title: "Drunk-Dazed", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - Drunk-Dazed.mp3", cover: "" },
    { title: "FEVER", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - FEVER.mp3", cover: "" },
    { title: "Moonstruck", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - Moonstruck.mp3", cover: "" },
    { title: "Polaroid Love", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - Polaroid Love.mp3", cover: "" },
    { title: "Sacrifice (Eat Me Up)", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - Sacrifice (Eat Me Up).mp3", cover: "" },
    { title: "SHOUT OUT", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - SHOUT OUT.mp3", cover: "" },
    { title: "Sweet Venom", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - Sweet Venom.mp3", cover: "" },
    { title: "Tamed-Dashed", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - Tamed-Dashed.mp3", cover: "" },
    { title: "Teeth", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - Teeth.mp3", cover: "" },
    { title: "XO (Only If You Say Yes)", artist: "ENHYPEN", src: "assets/music/Enhypen/ENHYPEN - XO (Only If You Say Yes).mp3", cover: "" },

    // 4. BOYNEXTDOOR
    { title: "123-78", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - 123-78.mp3", cover: "" },
    { title: "ABCDLOVE", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - ABCDLOVE.mp3", cover: "" },
    { title: "Amnesia", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - Amnesia.mp3", cover: "" },
    { title: "But I Like You", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - But I Like You.mp3", cover: "" },
    { title: "But Sometimes", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - But Sometimes.mp3", cover: "" },
    { title: "Crying", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - Crying.mp3", cover: "" },
    { title: "Dangerous", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - Dangerous.mp3", cover: "" },
    { title: "Earth, Wind & Fire", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - Earth, Wind & Fire.mp3", cover: "" },
    { title: "Hollywood Action", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - Hollywood Action.mp3", cover: "" },
    { title: "IF I SAY, I LOVE YOU", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - IF I SAY, I LOVE YOU.mp3", cover: "" },
    { title: "Nice Guy", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - Nice Guy.mp3", cover: "" },
    { title: "One and Only", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - One and Only.mp3", cover: "" },
    { title: "OUR", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - OUR.mp3", cover: "" },
    { title: "Serenade", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - Serenade.mp3", cover: "" },
    { title: "So let's go see the stars", artist: "BOYNEXTDOOR", src: "assets/music/BOYNEXTDOOR/BOYNEXTDOOR - So let's go see the stars.mp3", cover: "" },

    // 5. Other
    { title: "WYN?", artist: "Haechan", src: "assets/music/Other/Haechan - WYN.mp3", cover: "" },
    { title: "SPAGHETTI", artist: "LE SSERAFIM, j-hope", src: "assets/music/Other/LE SSERAFIM, j-hope - SPAGHETTI.mp3", cover: "" }
];

  let currentTrack = -1;
  let audioContext = null;
  let analyser = null;
  let sourceNode = null;
  let animationFrame = 0;
  let lastLightUpdate = 0;
  let frequencyData = null;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function populatePlaylist() {
    trackSelect.replaceChildren();
    playlist.forEach((track, index) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = `${track.title} — ${track.artist}`;
      trackSelect.append(option);
    });
  }

  function loadTrack(index, autoplay = false) {
    if (!playlist.length) return;
    currentTrack = (index + playlist.length) % playlist.length;
    const track = playlist[currentTrack];
    audio.pause();
    audio.src = track.src;
    audio.load();
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    trackSelect.value = String(currentTrack);
    trackArt.style.backgroundImage = track.cover ? `linear-gradient(135deg, rgba(24,18,42,.18), rgba(24,18,42,.55)), url("${track.cover}")` : "";
    trackArt.classList.toggle("has-cover", Boolean(track.cover));
    currentTimeLabel.textContent = "0:00";
    durationLabel.textContent = "0:00";
    seekBar.value = "0";
    playPause.textContent = "▶";
    playPause.setAttribute("aria-label", "Воспроизвести");
    stopLightAnimation();
    musicHint.textContent = "Трек выбран. Нажми воспроизведение, чтобы начать концерт.";
    if (autoplay) playCurrentTrack();
  }

  async function prepareAudioAnalysis() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioContext) {
      audioContext = new AudioCtx();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.38;
      frequencyData = new Uint8Array(analyser.frequencyBinCount);
      sourceNode = audioContext.createMediaElementSource(audio);
      sourceNode.connect(analyser);
      analyser.connect(audioContext.destination);
    }
    if (audioContext.state === "suspended") await audioContext.resume();
  }

  function animateLights(now) {
    if (!audio.paused && analyser) {
      // Update at ~15 fps on touch devices and ~25 fps on desktop.
      const updateInterval = window.matchMedia("(pointer: coarse)").matches ? 45 : 32;
      if (now - lastLightUpdate > updateInterval) {
        if (!frequencyData || frequencyData.length !== analyser.frequencyBinCount) frequencyData = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(frequencyData);
        let bassSum = 0, midSum = 0, bassPeak = 0;
        const bassEnd = Math.max(1, Math.floor(frequencyData.length * 0.28));
        const midEnd = Math.max(bassEnd + 1, Math.floor(frequencyData.length * 0.72));
        for (let i = 0; i < bassEnd; i++) { const v = frequencyData[i] / 255; bassSum += v; if (v > bassPeak) bassPeak = v; }
        for (let i = bassEnd; i < midEnd; i++) midSum += frequencyData[i] / 255;
        const bassAverage = bassSum / bassEnd;
        const midAverage = midSum / Math.max(1, midEnd - bassEnd);
        // Human ears perceive quiet energy strongly; nonlinear lift keeps the circle visibly reactive.
        const bass = Math.min(1, Math.pow(Math.min(1, bassAverage * 4.2 + bassPeak * 0.78), 0.58));
        const treble = Math.min(1, Math.pow(Math.min(1, midAverage * 4.6), 0.62));
        // Stronger dynamic range: quiet passages still glow, transients create visible pulses.
        const energy = Math.min(1, Math.pow(Math.min(1, bass * 0.86 + treble * 0.58), 0.62));
        const stageSection = document.getElementById("stage");
        stageSection.style.setProperty("--music-energy", String(energy.toFixed(3)));
        stageSection.style.setProperty("--bass-energy", String(bass.toFixed(3)));
        stageSection.style.setProperty("--treble-energy", String(treble.toFixed(3)));
        lastLightUpdate = now;
      }
      animationFrame = requestAnimationFrame(animateLights);
    } else {
      stopLightAnimation();
    }
  }

  function stopLightAnimation() {
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    musicPlayer.classList.remove("music-playing");
    musicPlayer.style.setProperty("--music-energy", "0");
    musicPlayer.style.setProperty("--bass-energy", "0");
    musicPlayer.style.setProperty("--treble-energy", "0");
    const stageSection = document.getElementById("stage");
    stageSection.classList.remove("music-playing");
    stageSection.style.setProperty("--music-energy", "0");
    stageSection.style.setProperty("--bass-energy", "0");
    stageSection.style.setProperty("--treble-energy", "0");
  }

  async function playCurrentTrack() {
    if (currentTrack < 0) loadTrack(0, false);
    try {
      // Start playback first. If Web Audio analysis is unavailable or fails,
      // it should not prevent the actual song from playing.
      await audio.play();
      playPause.textContent = "Ⅱ";
      playPause.setAttribute("aria-label", "Пауза");
      musicPlayer.classList.add("music-playing");
      document.getElementById("stage").classList.add("music-playing");
      musicHint.textContent = "Музыка играет.";

      try {
        await prepareAudioAnalysis();
        musicHint.textContent = analyser
          ? "Музыка играет — подсветка реагирует на звук."
          : "Музыка играет. Подсветка может не реагировать на звук в этом браузере.";
      } catch (analysisError) {
        console.warn("Audio analysis is unavailable; playback will continue:", analysisError);
        musicHint.textContent = "Музыка играет. Световые эффекты могут не реагировать на звук в этом браузере.";
      }

      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(animateLights);
    } catch (error) {
      console.error("Audio playback failed:", error, "Audio URL:", audio.currentSrc || audio.src);
      playPause.textContent = "▶";
      playPause.setAttribute("aria-label", "Воспроизвести");
      stopLightAnimation();
      const code = audio.error ? audio.error.code : 0;
      if (code === 4) {
        musicHint.textContent = "Браузер не смог прочитать файл. Проверь путь, имя и формат аудио.";
      } else if (code === 2) {
        musicHint.textContent = "Не удалось загрузить файл. Проверь путь и попробуй открыть сайт через локальный сервер.";
      } else {
        musicHint.textContent = "Не удалось запустить песню. Проверь путь к файлу и попробуй открыть сайт через локальный сервер.";
      }
    }
  }

  function pauseTrack() {
    audio.pause();
    playPause.textContent = "▶";
    playPause.setAttribute("aria-label", "Воспроизвести");
    stopLightAnimation();
    musicHint.textContent = "Музыка на паузе. Можно продолжить в любой момент.";
  }

  populatePlaylist();
  loadTrack(0, false);
  audio.volume = Number(volumeBar.value);
  playPause.addEventListener("click", () => audio.paused ? playCurrentTrack() : pauseTrack());
  prevTrack.addEventListener("click", () => loadTrack(currentTrack - 1, true));
  nextTrack.addEventListener("click", () => loadTrack(currentTrack + 1, true));
  trackSelect.addEventListener("change", () => loadTrack(Number(trackSelect.value), false));
  volumeBar.addEventListener("input", () => { audio.volume = Number(volumeBar.value); audio.muted = audio.volume === 0; muteButton.textContent = audio.muted ? "×♫" : "♫"; });
  muteButton.addEventListener("click", () => { audio.muted = !audio.muted; muteButton.textContent = audio.muted ? "×♫" : "♫"; muteButton.setAttribute("aria-label", audio.muted ? "Включить звук" : "Отключить звук"); });
  seekBar.addEventListener("input", () => { if (Number.isFinite(audio.duration) && audio.duration > 0) audio.currentTime = Number(seekBar.value) / 1000 * audio.duration; });
  audio.addEventListener("timeupdate", () => {
    currentTimeLabel.textContent = formatTime(audio.currentTime);
    if (Number.isFinite(audio.duration) && audio.duration > 0 && document.activeElement !== seekBar) seekBar.value = String(Math.round(audio.currentTime / audio.duration * 1000));
  });
  audio.addEventListener("loadedmetadata", () => { durationLabel.textContent = formatTime(audio.duration); });
  audio.addEventListener("ended", () => {
    stopLightAnimation();
    playPause.textContent = "▶";
    playPause.setAttribute("aria-label", "Воспроизвести");
    musicHint.textContent = "Песня закончилась. Выбери следующий трек, когда захочешь.";
  });
  audio.addEventListener("error", () => { if (currentTrack >= 0) musicHint.textContent = "Файл не найден. Добавь аудио в assets/music и проверь имя файла в script.js."; });

  // Mood companion: messages are composed from interchangeable sentence parts.
  // This creates a large number of combinations instead of selecting a fixed message.
  const moodParts = {
    sad: {
      openings: ["Сегодня можно", "Если на душе тяжело, попробуй", "Не нужно заставлять себя улыбаться — можно", "Пусть сейчас получится"],
      actions: ["дать себе немного тишины", "укутаться во что-нибудь мягкое", "включить знакомую песню", "побыть рядом с тем, с кем спокойно", "сделать для себя что-нибудь маленькое и доброе"],
      endings: ["без необходимости немедленно исправлять настроение.", "потому что даже трудный день не рассказывает всю историю.", "и помнить: тебе не нужно быть весёлой каждую минуту.", "— иногда этого уже достаточно на данный момент."]
    },
    tired: {
      openings: ["Сегодня тебе можно", "Если сил почти не осталось, попробуй", "Не обязательно всё успеть: можно", "Пусть хотя бы сейчас получится"],
      actions: ["поставить дела на небольшую паузу", "выбрать только один самый важный шаг", "отдохнуть без чувства вины", "послушать пару любимых песен", "дать себе время восстановиться"],
      endings: ["— отдых тоже часть пути.", "и вернуться к остальному позже, если получится.", "ведь ты не обязана быть продуктивной постоянно.", "без требования немедленно стать энергичнее."]
    },
    anxious: {
      openings: ["Когда всё кажется слишком сложным, попробуй", "Необязательно решать всё сразу — можно", "Если мысли бегут наперегонки, попробуй", "Прямо сейчас можно"],
      actions: ["медленно выдохнуть и почувствовать опору под ногами", "назвать три вещи, которые видишь вокруг", "разделить большую задачу на один маленький шаг", "попросить поддержки у человека, которому доверяешь", "сосредоточиться только на ближайших нескольких минутах"],
      endings: ["— остальное можно решать постепенно.", "и не требовать от себя ответов на всё сразу.", "ведь тебе не нужно проживать всё будущее за один вечер.", "давая себе право двигаться в собственном темпе."]
    },
    happy: {
      openings: ["Если сегодня тебе хорошо, попробуй", "Пусть этот момент станет поводом", "Иногда полезно просто", "Сегодня можно"],
      actions: ["заметить одну маленькую вещь, которая радует", "сохранить в памяти эту минуту", "включить песню, под которую хочется улыбаться", "поделиться радостью с близким человеком", "насладиться моментом без спешки"],
      endings: ["— хорошие мгновения заслуживают внимания.", "и не торопиться переходить к следующему делу.", "ведь радоваться без особой причины тоже можно.", "чтобы потом было приятно вспоминать этот день."]
    },
    unsure: {
      openings: ["Если трудно понять своё настроение, можно", "Необязательно сразу находить правильные слова — попробуй", "Иногда достаточно просто", "Если пока непонятно, чего хочется, можно"],
      actions: ["выбрать между тишиной и любимой музыкой", "немного подвигаться или, наоборот, прилечь", "выпить воды и ненадолго отвлечься", "дать себе время без необходимости что-то объяснять", "прислушаться к тому, чего хочется именно сейчас"],
      endings: ["— ответ может появиться не сразу.", "и помнить, что своё решение можно поменять.", "без необходимости немедленно во всём разобраться.", "ведь не каждое чувство обязано иметь название."]
    }
  };
  const moodTitles = {
    sad: ["Немного бережности к себе", "Тихая минутка для тебя", "Сегодня можно помедленнее", "Пусть станет чуточку легче"],
    tired: ["Разрешение на паузу", "Время выдохнуть", "Не всё нужно успеть", "Отдых тоже важен"],
    anxious: ["Шаг за шагом", "Вернись в настоящий момент", "Не нужно решать всё сразу", "Дыши в своём темпе"],
    happy: ["Сохрани эту искру", "Маленькая радость — тоже радость", "Пусть момент длится", "Сегодня есть чему улыбнуться"],
    unsure: ["Можно пока не знать", "Не нужно искать название", "Прислушайся к себе", "Всё может проясниться позже"]
  };

  const moodButtons = [...document.querySelectorAll(".mood-option")];
  const messageButton = document.getElementById("messageButton");
  const anotherMessage = document.getElementById("anotherMessage");
  const messageResult = document.getElementById("messageResult");
  const messageTitle = document.getElementById("messageTitle");
  const messageText = document.getElementById("messageText");
  const generationStatus = document.getElementById("generationStatus");
  let selectedMood = "sad";
  let previousGenerated = "";
  function pickDifferent(items, previous) {
    if (items.length < 2) return items[0];
    let choice;
    do { choice = items[Math.floor(Math.random() * items.length)]; } while (choice === previous);
    return choice;
  }
  let generationBusy = false;
  const moodPrompts = {
    sad: "грустно, поддержи мягко и без давления",
    tired: "устала, напомни о праве на отдых",
    anxious: "тревожно, помоги спокойно сосредоточиться на настоящем",
    happy: "хорошее настроение, помоги насладиться моментом",
    unsure: "непонятное настроение, поддержи без требования разобраться"
  };

  function makeLocalFallback() {
    const parts = moodParts[selectedMood];
    let sentence = "";
    for (let attempt = 0; attempt < 30; attempt++) {
      sentence = `${pickDifferent(parts.openings, "")} ${pickDifferent(parts.actions, "")} ${pickDifferent(parts.endings, "")}`;
      if (sentence !== previousGenerated) break;
    }
    return sentence;
  }

  function setGenerationStatus(kind, text) {
    if (!generationStatus) return;
    generationStatus.className = `generation-status ${kind}`;
    generationStatus.textContent = text;
    generationStatus.hidden = false;
  }

  async function chooseMessage() {
    if (generationBusy) return;
    generationBusy = true;
    messageButton.disabled = true;
    anotherMessage.disabled = true;
    messageButton.textContent = "СВЯЗЫВАЮСЬ С НЕЙРОСЕТЬЮ…";
    messageResult.classList.add("visible");
    messageTitle.textContent = "Пробую придумать что-то новое…";
    messageText.textContent = "Отправляю запрос внешнему сервису. Обычно это занимает несколько секунд.";
    setGenerationStatus("loading", "◌  Запрос отправлен — жду ответ нейросети…");

    let sentence = "";
    let serviceState = "fallback";
    let failureReason = "Сервис не ответил вовремя или вернул ошибку.";
    const prompt = `Напиши одно оригинальное короткое послание на русском языке для 14-летней девушки по имени Камилла. Настроение: ${moodPrompts[selectedMood]}. Напиши 2–4 естественных предложения, как внимательный друг, который умеет подбирать точные слова. Избегай клише, общих лозунгов и повторяющихся зачинов; используй одну конкретную, ненавязчивую образную деталь, если она уместна. Не выдумывай факты о её жизни, не поучай и не обесценивай чувства. Без романтического подтекста, пафоса, заголовка, кавычек и эмодзи. Не начинай с «Пусть», «Помни», «Ты сильная» или «Всё будет хорошо». Только текст послания.`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18000);
    try {
      const seed = Math.floor(Math.random() * 2147483647);
      const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai&seed=${seed}`;
      setGenerationStatus("loading", "◌  Нейросеть обрабатывает запрос…");
      const response = await fetch(url, { signal: controller.signal, headers: { "Accept": "text/plain" }, cache: "no-store" });
      if (!response.ok) {
        failureReason = `Сервис вернул ошибку HTTP ${response.status}.`;
      } else {
        const raw = await response.text();
        sentence = raw.trim().replace(/^['"“”]+|['"“”]+$/g, "").replace(/^(пожелание|послание):\s*/i, "").trim();
        if (sentence.length >= 35 && sentence.length <= 650 && !/не могу|как языковая модель|я не знаю/i.test(sentence)) {
          serviceState = "success";
        } else {
          sentence = "";
          failureReason = "Ответ пришёл, но его качество не прошло проверку — использую запасной вариант.";
        }
      }
    } catch (error) {
      failureReason = error && error.name === "AbortError"
        ? "Нейросеть не ответила за 18 секунд — использую запасной вариант."
        : "Не удалось связаться с сервисом. Возможно, он временно недоступен или запрос заблокирован.";
      console.warn("Wish generation service failed:", error);
    } finally {
      clearTimeout(timeout);
    }

    if (serviceState === "success" && sentence === previousGenerated) {
      failureReason = "Сервис повторил предыдущее сообщение — выбираю другой вариант.";
      sentence = "";
      serviceState = "fallback";
    }
    if (!sentence) sentence = makeLocalFallback();
    previousGenerated = sentence;
    messageTitle.textContent = pickDifferent(moodTitles[selectedMood], messageTitle.textContent);
    messageText.textContent = sentence;
    if (serviceState === "success") {
      setGenerationStatus("success", "✦  Ответ получен от нейросети");
    } else {
      setGenerationStatus("fallback", `◇  Показано запасное пожелание. ${failureReason}`);
    }
    messageButton.disabled = false;
    anotherMessage.disabled = false;
    messageButton.innerHTML = 'ПОДОБРАТЬ ПОСЛАНИЕ <span>↗</span>';
    generationBusy = false;
    anotherMessage.hidden = false;
  }
  moodButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectedMood = button.dataset.mood;
      moodButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      messageResult.classList.remove("visible");
    });
  });
  messageButton.addEventListener("click", chooseMessage);
  anotherMessage.addEventListener("click", chooseMessage);

  // Final hidden message, opened by the star or the button.
  const finalStar = document.getElementById("finalStar");
  const finalButton = document.getElementById("finalButton");
  const finalNote = document.getElementById("finalNote");
  function openFinalNote() {
    finalNote.hidden = false;
    finalStar.classList.add("opened");
    finalButton.textContent = "ПОЖЕЛАНИЕ ОТКРЫТО ♡";
  }
  finalStar.addEventListener("click", openFinalNote);
  finalStar.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFinalNote();
    }
  });
  finalButton.addEventListener("click", openFinalNote);

  // Keep the first screen accessible on initial load.
  screens.forEach((screen, index) => screen.setAttribute("aria-hidden", String(index !== 0)));
  moodButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.mood === selectedMood)));
})();
