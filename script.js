/* =====================================================
   ELEMENTS
===================================================== */

const entryScreen =
  document.getElementById("entryScreen");

const enterButton =
  document.getElementById("enterButton");


const page1 =
  document.getElementById("page1");

const page2 =
  document.getElementById("page2");


const letterBtn =
  document.getElementById("letterBtn");

const paperLetter =
  document.getElementById("paperLetter");

const hintText =
  document.getElementById("hintText");


const musicButton =
  document.getElementById("musicButton");

const musicIcon =
  document.getElementById("musicIcon");

const musicText =
  document.getElementById("musicText");

const song =
  document.getElementById("song");


const dateInput =
  document.getElementById("date");

const timeInput =
  document.getElementById("time");

const dateHint =
  document.getElementById("dateHint");


const yesBtn =
  document.getElementById("yesBtn");

const maybeBtn =
  document.getElementById("maybeBtn");


const successOverlay =
  document.getElementById("successOverlay");

const chosenDate =
  document.getElementById("chosenDate");



/* =====================================================
   STATE
===================================================== */

let letterOpened = false;

let musicPlaying = false;

let maybeIndex = 0;



/* =====================================================
   ENTRY SCREEN
===================================================== */

enterButton.addEventListener(
  "click",
  function () {

    /*
      Important:

      Browsers normally block autoplay.

      Because this function runs after
      the user's tap, we can safely attempt
      to start the music here.
    */

    startMusic();


    /*
      Hide entry screen
    */

    entryScreen.classList.add("hide");


    /*
      Prevent the page underneath
      from scrolling during transition
    */

    document.body.style.overflow = "hidden";


    setTimeout(function () {

      document.body.style.overflow = "";

    }, 900);

  }
);



/* =====================================================
   LETTER
===================================================== */

letterBtn.addEventListener(
  "click",
  function () {


    /* First click */

    if (!letterOpened) {

      letterOpened = true;

      paperLetter.classList.add("open");


      letterBtn.textContent =
        "May itatanong ako sa'yo →";


      hintText.textContent =
        "Basahin mo muna... promise, hindi mahaba ♡";


      return;

    }


    /* Second click */

    goToPageTwo();

  }
);



/* =====================================================
   PAGE 2
===================================================== */

function goToPageTwo() {


  page1.classList.remove("active");


  /*
    Small delay makes the transition
    feel smoother.
  */

  setTimeout(function () {

    page2.classList.add("active");

  }, 100);


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });


  /*
    In case the first music attempt
    was blocked or failed.
  */

  if (!musicPlaying) {

    startMusic();

  }

}



/* =====================================================
   MUSIC
===================================================== */

function startMusic() {

  song.volume = 0.45;


  const playPromise =
    song.play();


  if (playPromise !== undefined) {

    playPromise

      .then(function () {

        musicPlaying = true;

        updateMusicButton();

      })

      .catch(function () {

        /*
          Browser blocked playback.

          The music button will still
          allow manual playback.
        */

        musicPlaying = false;

        updateMusicButton();

      });

  }

}



function pauseMusic() {

  song.pause();

  musicPlaying = false;

  updateMusicButton();

}



function updateMusicButton() {

  if (musicPlaying) {

    musicIcon.textContent = "♫";

    musicText.textContent =
      "Love Is playing...";

    musicButton.classList.add("playing");

  } else {

    musicIcon.textContent = "♫";

    musicText.textContent =
      "Love Is";

    musicButton.classList.remove("playing");

  }

}



musicButton.addEventListener(
  "click",
  function () {


    if (musicPlaying) {

      pauseMusic();

      return;

    }


    startMusic();

  }
);



/* =====================================================
   DATE
===================================================== */

function setMinimumDate() {

  const today =
    new Date();


  const year =
    today.getFullYear();


  const month =
    String(
      today.getMonth() + 1
    ).padStart(2, "0");


  const day =
    String(
      today.getDate()
    ).padStart(2, "0");


  dateInput.min =
    `${year}-${month}-${day}`;

}


setMinimumDate();



/* =====================================================
   DATE CHANGE
===================================================== */

dateInput.addEventListener(
  "change",
  function () {

    if (!dateInput.value) {

      dateHint.textContent =
        "Ikaw ang bahala kung kailan. :)";

      return;

    }


    dateHint.textContent =
      "Okay, may napili ka na. 👀";


    dateHint.style.color =
      "#568fa8";

  }
);



/* =====================================================
   TIME CHANGE
===================================================== */

timeInput.addEventListener(
  "change",
  function () {

    if (!timeInput.value) {

      return;

    }


    dateHint.textContent =
      "Noted... mukhang seryoso na 'to HAHAHA.";


    dateHint.style.color =
      "#568fa8";

  }
);



/* =====================================================
   YES BUTTON
===================================================== */

yesBtn.addEventListener(
  "click",
  function () {


    const date =
      dateInput.value;


    const time =
      timeInput.value;


    /*
      Require both date and time
    */

    if (!date || !time) {

      dateHint.textContent =
        "Pili ka muna ng date at time please ♡";


      dateHint.style.color =
        "#568fa8";


      /*
        Small shake effect
      */

      yesBtn.animate(

        [
          {
            transform: "translateX(0)"
          },

          {
            transform: "translateX(-5px)"
          },

          {
            transform: "translateX(5px)"
          },

          {
            transform: "translateX(0)"
          }

        ],

        {
          duration: 280
        }

      );


      return;

    }


    /*
      Make sure selected date
      is not in the past.
    */

    const selectedDate =
      new Date(`${date}T${time}`);


    const now =
      new Date();


    if (selectedDate < now) {

      dateHint.textContent =
        "Uy, past date na 'yan HAHAHA. Pumili tayo ng future date. ♡";


      dateHint.style.color =
        "#568fa8";


      return;

    }



    /* =================================================
       FORMAT DATE
    ================================================= */

    const formattedDate =
      selectedDate.toLocaleDateString(
        "en-PH",
        {

          weekday: "long",

          month: "long",

          day: "numeric",

          year: "numeric"

        }
      );


    const formattedTime =
      selectedDate.toLocaleTimeString(
        "en-PH",
        {

          hour: "numeric",

          minute: "2-digit"

        }
      );



    /* =================================================
       SUCCESS MESSAGE
    ================================================= */

    chosenDate.innerHTML =
      `${formattedDate}<br>at ${formattedTime}`;


    successOverlay.classList.add("show");


    createHearts();

  }
);



/* =====================================================
   MAYBE BUTTON
===================================================== */

const maybeMessages = [

  "Sure ka ba? 👀",

  "Pag-isipan mo muna HAHAHA",

  "May free coffee dito oh ☕",

  "Hindi kita pine-pressure... 👀",

  "One coffee lang naman... ♡"

];


maybeBtn.addEventListener(
  "click",
  function () {


    maybeBtn.textContent =
      maybeMessages[maybeIndex];


    maybeIndex++;


    if (
      maybeIndex >=
      maybeMessages.length
    ) {

      maybeIndex = 0;

    }


  }
);



/* =====================================================
   HEART / FLOWER ANIMATION
===================================================== */

function createHearts() {


  const symbols = [

    "♡",
    "♥",
    "✿",
    "♡",
    "✿",
    "♥",
    "♡",
    "✿"

  ];


  symbols.forEach(
    function (symbol, index) {


      const heart =
        document.createElement("div");


      heart.textContent =
        symbol;


      heart.style.position =
        "fixed";


      heart.style.left =
        Math.random() * 100 + "%";


      heart.style.bottom =
        "-30px";


      heart.style.fontSize =
        (18 + Math.random() * 18) + "px";


      heart.style.color =
        "#72b5cc";


      heart.style.zIndex =
        "200";


      heart.style.pointerEvents =
        "none";


      heart.style.opacity =
        "1";


      heart.style.transition =
        "transform 3s ease, opacity 3s ease";


      document.body.appendChild(
        heart
      );


      setTimeout(
        function () {


          heart.style.transform =
            `translateY(-${
              300 + Math.random() * 300
            }px)
             rotate(${
              Math.random() * 80 - 40
            }deg)`;


          heart.style.opacity =
            "0";


        },
        index * 120
      );


      setTimeout(
        function () {

          heart.remove();

        },
        3500
      );

    }
  );

}



/* =====================================================
   KEYBOARD ACCESSIBILITY
===================================================== */

document.addEventListener(
  "keydown",
  function (event) {


    /*
      Escape closes the success popup.
    */

    if (
      event.key === "Escape" &&
      successOverlay.classList.contains("show")
    ) {

      successOverlay.classList.remove("show");

    }

  }
);
