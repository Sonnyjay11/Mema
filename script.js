/* =====================================================
   VERSION 5.0
   Minimal Filipino Manliligaw Dating Website

   Files required:

   index.html
   style.css
   script.js
   Love Is.mp3
   photo.jpg
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

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

const musicText =
  document.getElementById("musicText");

const musicDot =
  document.getElementById("musicDot");

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


/* =====================================================
   LETTER
===================================================== */

letterBtn.addEventListener(
  "click",
  function () {

    /*
      First click:
      Open letter.
    */

    if (!letterOpened) {

      letterOpened = true;

      paperLetter.classList.add("open");

      letterBtn.textContent =
        "May itatanong ako sa'yo →";

      hintText.textContent =
        "Basahin mo muna... malapit ka na sa plot twist HAHAHA.";

      /*
        User interaction also gives the browser
        permission to play audio in many cases.
      */

      startMusic();

      return;
    }


    /*
      Second click:
      Go to invitation.
    */

    goToPageTwo();

  }
);


/* =====================================================
   PAGE TRANSITION
===================================================== */

function goToPageTwo() {

  page1.classList.remove("active");

  /*
    Small delay makes the transition
    feel less abrupt.
  */

  setTimeout(
    function () {

      page2.classList.add("active");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    },
    80
  );


  startMusic();

}


/* =====================================================
   MUSIC
===================================================== */

/*
  Attempt autoplay after loading.

  Modern browsers may block autoplay with sound.

  If blocked, the visible music button allows
  the visitor to start the song manually.
*/

window.addEventListener(
  "load",
  function () {

    setTimeout(
      function () {

        startMusic();

      },
      400
    );

  }
);


/*
  Start music.
*/

function startMusic() {

  if (musicPlaying) {
    return;
  }

  song.volume = 0.75;

  const playPromise =
    song.play();


  if (playPromise !== undefined) {

    playPromise

      .then(
        function () {

          musicPlaying = true;

          updateMusicButton();

        }
      )

      .catch(
        function () {

          /*
            Autoplay blocked.

            This is normal browser behavior.
          */

          musicPlaying = false;

          updateMusicButton();

        }
      );

  }

}


/*
  Update music button.
*/

function updateMusicButton() {

  if (musicPlaying) {

    musicButton.classList.add(
      "playing"
    );

    musicText.textContent =
      "Love Is • Playing";

  } else {

    musicButton.classList.remove(
      "playing"
    );

    musicText.textContent =
      "Play Love Is";

  }

}


/*
  Music button.
*/

musicButton.addEventListener(
  "click",
  function () {

    if (musicPlaying) {

      song.pause();

      musicPlaying = false;

      updateMusicButton();

      return;
    }


    song.volume = 0.75;


    song.play()

      .then(
        function () {

          musicPlaying = true;

          updateMusicButton();

        }
      )

      .catch(
        function () {

          musicPlaying = false;

          updateMusicButton();

          alert(
            "Tap the music button again to play Love Is ♡"
          );

        }
      );

  }
);


/*
  Keep UI synchronized with audio.
*/

song.addEventListener(
  "play",
  function () {

    musicPlaying = true;

    updateMusicButton();

  }
);


song.addEventListener(
  "pause",
  function () {

    musicPlaying = false;

    updateMusicButton();

  }
);


/* =====================================================
   DATE
===================================================== */


/*
  Prevent choosing dates in the past.
*/

function setMinimumDate() {

  const today =
    new Date();

  const year =
    today.getFullYear();

  const month =
    String(
      today.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const day =
    String(
      today.getDate()
    ).padStart(
      2,
      "0"
    );


  dateInput.min =
    `${year}-${month}-${day}`;

}

setMinimumDate();


/* =====================================================
   SAVE DATE / TIME
===================================================== */


/*
  Restore previously selected date.
*/

const savedDate =
  localStorage.getItem(
    "carminaDate"
  );

const savedTime =
  localStorage.getItem(
    "carminaTime"
  );


if (savedDate) {

  dateInput.value =
    savedDate;

}

if (savedTime) {

  timeInput.value =
    savedTime;

}


/*
  Save date.
*/

dateInput.addEventListener(
  "change",
  function () {

    if (!dateInput.value) {
      return;
    }


    localStorage.setItem(
      "carminaDate",
      dateInput.value
    );


    dateHint.textContent =
      "Ay may napili na... 👀";

  }
);


/*
  Save time.
*/

timeInput.addEventListener(
  "change",
  function () {

    if (!timeInput.value) {
      return;
    }


    localStorage.setItem(
      "carminaTime",
      timeInput.value
    );


    dateHint.textContent =
      "Noted... mukhang may pag-asa ako HAHAHA.";

  }
);


/* =====================================================
   DATE VALIDATION
===================================================== */

function validateDateTime() {

  const date =
    dateInput.value;

  const time =
    timeInput.value;


  if (!date) {

    dateHint.textContent =
      "Pili ka muna ng araw, binibini ♡";

    return false;

  }


  if (!time) {

    dateHint.textContent =
      "Okay lang kahit oras naman muna... 👀";

    return false;

  }


  return true;

}


/* =====================================================
   YES BUTTON
===================================================== */

yesBtn.addEventListener(
  "click",
  function () {

    /*
      Make sure date and time exist.
    */

    if (!validateDateTime()) {
      return;
    }


    const date =
      dateInput.value;

    const time =
      timeInput.value;


    /*
      Create JavaScript date.
    */

    const dateObject =
      new Date(
        `${date}T${time}`
      );


    /*
      Format date.
    */

    const formattedDate =
      dateObject.toLocaleDateString(
        "en-PH",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      );


    /*
      Format time.
    */

    const formattedTime =
      dateObject.toLocaleTimeString(
        "en-PH",
        {
          hour: "numeric",
          minute: "2-digit"
        }
      );


    /*
      Display chosen date.
    */

    chosenDate.innerHTML =
      `
        ${formattedDate}
        <br>
        at ${formattedTime}
      `;


    /*
      Show success overlay.
    */

    successOverlay.classList.add(
      "show"
    );

    successOverlay.setAttribute(
      "aria-hidden",
      "false"
    );


    /*
      Celebrate.
    */

    createHearts();

  }
);


/* =====================================================
   MAYBE BUTTON
===================================================== */

const maybeMessages = [

  "Sure ka ba? 👀",

  "Pwede mo pag-isipan... hindi naman ako aalis HAHAHA",

  "Coffee lang naman oh ☕",

  "Hindi kita pine-pressure... konti lang 👀",

  "Libre ko na coffee mo oh",

  "Sige lang... hintayin kita HAHAHA",

  "Last na talaga... coffee tayo? ♡"

];


let maybeIndex = 0;


maybeBtn.addEventListener(
  "click",
  function () {

    maybeBtn.textContent =
      maybeMessages[
        maybeIndex
      ];


    maybeIndex++;


    if (
      maybeIndex >=
      maybeMessages.length
    ) {

      maybeIndex = 0;

    }


    /*
      Also change the hint.
    */

    dateHint.textContent =
      "No pressure... pero sana yes. ♡";

  }
);


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createHearts() {

  const symbols = [

    "♡",
    "♥",
    "♡",
    "✿",
    "♡",
    "♥",
    "♡",
    "✿",
    "♡"

  ];


  symbols.forEach(
    function (
      symbol,
      index
    ) {

      const heart =
        document.createElement(
          "div"
        );


      heart.textContent =
        symbol;


      heart.style.position =
        "fixed";


      heart.style.left =
        Math.random() *
          100 +
        "%";


      heart.style.bottom =
        "-30px";


      heart.style.fontSize =
        (
          18 +
          Math.random() *
          18
        ) +
        "px";


      heart.style.color =
        "#72b5cc";


      heart.style.zIndex =
        "200";


      heart.style.pointerEvents =
        "none";


      heart.style.transition =
        "transform 3s ease, opacity 3s ease";


      document.body.appendChild(
        heart
      );


      setTimeout(
        function () {

          heart.style.transform =
            `
              translateY(
                -${
                  300 +
                  Math.random() * 300
                }px
              )

              rotate(
                ${
                  Math.random() * 80 - 40
                }deg
              )
            `;


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
   KEYBOARD SUPPORT
===================================================== */

document.addEventListener(
  "keydown",
  function (event) {

    /*
      Escape closes success overlay
      if needed.
    */

    if (
      event.key === "Escape" &&
      successOverlay.classList.contains("show")
    ) {

      successOverlay.classList.remove(
        "show"
      );

      successOverlay.setAttribute(
        "aria-hidden",
        "true"
      );

    }

  }
);
