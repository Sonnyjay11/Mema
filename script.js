/* =====================================================
   VERSION 7.2
   AESTHETIC EDITION
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const loadingScreen =
  document.getElementById("loadingScreen");

const song =
  document.getElementById("song");

const musicButton =
  document.getElementById("musicButton");

const pageOne =
  document.getElementById("pageOne");

const pageTwo =
  document.getElementById("pageTwo");

const envelope =
  document.getElementById("envelope");

const letterBtn =
  document.getElementById("letterBtn");

const letterBtnText =
  document.getElementById("letterBtnText");

const letterBtnIcon =
  document.getElementById("letterBtnIcon");

const paperLetter =
  document.getElementById("paperLetter");

const hintText =
  document.getElementById("hintText");

const transitionScreen =
  document.getElementById("transitionScreen");

const dateInput =
  document.getElementById("dateInput");

const timeInput =
  document.getElementById("timeInput");

const dateHint =
  document.getElementById("dateHint");

const timeHint =
  document.getElementById("timeHint");

const yesButton =
  document.getElementById("yesButton");

const maybeButton =
  document.getElementById("maybeButton");

const successOverlay =
  document.getElementById("successOverlay");

const selectedDateDisplay =
  document.getElementById(
    "selectedDateDisplay"
  );

const selectedTimeDisplay =
  document.getElementById(
    "selectedTimeDisplay"
  );

const calendarButton =
  document.getElementById(
    "calendarButton"
  );

const secretHeart =
  document.getElementById(
    "secretHeart"
  );

const secretOverlay =
  document.getElementById(
    "secretOverlay"
  );

const closeSecret =
  document.getElementById(
    "closeSecret"
  );

const photo =
  document.getElementById("photo");


/* =====================================================
   VARIABLES
===================================================== */

let letterOpened = false;

let musicStarted = false;

let maybeCount = 0;

let secretClicks = 0;


/* =====================================================
   LOADING SCREEN
===================================================== */

window.addEventListener(
  "load",
  () => {

    /*
      Small loading screen only.

      IMPORTANT:
      This does NOT start the music.
    */

    setTimeout(
      () => {

        loadingScreen.classList.add(
          "hide"
        );

      },
      650
    );

  }
);


/* =====================================================
   MUSIC
===================================================== */

/*
  The song intentionally does NOT autoplay.

  It starts when "Buksan mo" is clicked.
*/

async function startMusic() {

  try {

    song.volume = 0.45;

    await song.play();

    musicStarted = true;

    musicButton.classList.add(
      "playing"
    );

  } catch (error) {

    musicStarted = false;

    console.log(
      "Music playback was blocked.",
      error
    );

  }

}


/*
  Music toggle.
*/

musicButton.addEventListener(
  "click",
  async () => {

    if (song.paused) {

      try {

        song.volume = 0.45;

        await song.play();

        musicStarted = true;

        musicButton.classList.add(
          "playing"
        );

      } catch (error) {

        console.log(
          "Unable to play music.",
          error
        );

      }

    } else {

      song.pause();

      musicButton.classList.remove(
        "playing"
      );

    }

  }
);


/* =====================================================
   PAGE 1
===================================================== */

letterBtn.addEventListener(
  "click",
  async () => {


    /* =================================
       FIRST CLICK
    ================================= */

    if (!letterOpened) {

      letterOpened = true;


      /*
        Start music immediately because
        this click is a direct user action.
      */

      await startMusic();


      /*
        Envelope animation
      */

      envelope.classList.add(
        "open"
      );


      /*
        Small delay before showing
        the actual letter.
      */

      setTimeout(
        () => {

          paperLetter.classList.add(
            "open"
          );

        },
        500
      );


      /*
        Change button.
      */

      letterBtn.classList.add(
        "opened"
      );

      letterBtnText.textContent =
        "Okay, next...";

      letterBtnIcon.textContent =
        "☕";


      /*
        No reading timer.

        She controls when to continue.
      */

      hintText.textContent =
        "Basahin mo muna. ♡";


      /*
        Hearts
      */

      const rect =
        letterBtn.getBoundingClientRect();


      for (
        let i = 0;
        i < 7;
        i++
      ) {

        setTimeout(
          () => {

            createHeart(
              rect.left +
              rect.width / 2,

              rect.top +
              rect.height / 2
            );

          },
          i * 120
        );

      }


      /*
        Sparkles around envelope.
      */

      const envelopeRect =
        envelope.getBoundingClientRect();


      createSparkles(
        envelopeRect.left +
        envelopeRect.width / 2,

        envelopeRect.top +
        envelopeRect.height / 2,

        9
      );


      return;

    }


    /* =================================
       SECOND CLICK
    ================================= */

    showTransition();

  }
);


/* =====================================================
   PAGE TRANSITION
===================================================== */

function showTransition() {

  transitionScreen.classList.add(
    "show"
  );


  /*
    Give the transition enough time
    to feel intentional, but this is
    NOT a reading timer.
  */

  setTimeout(
    () => {

      pageOne.classList.remove(
        "active"
      );

      pageTwo.classList.add(
        "active"
      );

      window.scrollTo(
        {
          top: 0,
          behavior: "smooth"
        }
      );

    },
    900
  );


  setTimeout(
    () => {

      transitionScreen.classList.remove(
        "show"
      );

    },
    1550
  );

}


/* =====================================================
   DATE MINIMUM
===================================================== */

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
   DATE INPUT
===================================================== */

dateInput.addEventListener(
  "change",
  () => {

    if (!dateInput.value) {

      dateHint.classList.remove(
        "show"
      );

      return;

    }


    const selectedDate =
      new Date(
        `${dateInput.value}T00:00:00`
      );


    const formatted =
      selectedDate.toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          month: "long",
          day: "numeric"
        }
      );


    dateHint.textContent =
      `Noted. 👀 ${formatted sounds good...`;


    /*
      Fix the template string separately
      so the display remains valid.
    */

    dateHint.textContent =
      `Noted. 👀 ${formatted} sounds good...`;


    dateHint.classList.add(
      "show"
    );


    localStorage.setItem(
      "coffeeDate",
      dateInput.value
    );

  }
);


/* =====================================================
   TIME INPUT
===================================================== */

timeInput.addEventListener(
  "change",
  () => {

    if (!timeInput.value) {

      timeHint.classList.remove(
        "show"
      );

      return;

    }


    const [
      hours,
      minutes
    ] =
      timeInput.value
        .split(":")
        .map(Number);


    const tempDate =
      new Date();

    tempDate.setHours(
      hours,
      minutes,
      0,
      0
    );


    const formatted =
      tempDate.toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit"
        }
      );


    timeHint.textContent =
      `Okay, noted na talaga. ☕ ${formatted}. Jay has been informed. HAHAHA.`;


    timeHint.classList.add(
      "show"
    );


    localStorage.setItem(
      "coffeeTime",
      timeInput.value
    );

  }
);


/* =====================================================
   MAYBE BUTTON
===================================================== */

const maybeMessages = [

  "Sure ka ba? 👀",

  "Coffee lang naman oh ☕",

  "Libre ko na HAHAHA",

  "Hindi kita pine-pressure 😭",

  "...pero sana yes. ♡"

];


maybeButton.addEventListener(
  "click",
  () => {

    maybeButton.textContent =
      maybeMessages[
        maybeCount
      ];


    maybeCount++;


    if (
      maybeCount >=
      maybeMessages.length
    ) {

      maybeCount = 0;

    }


    /*
      Playful little shake.
    */

    maybeButton.animate(
      [
        {
          transform:
            "translateX(0)"
        },

        {
          transform:
            "translateX(-5px)"
        },

        {
          transform:
            "translateX(5px)"
        },

        {
          transform:
            "translateX(-3px)"
        },

        {
          transform:
            "translateX(0)"
        }

      ],
      {
        duration: 330
      }
    );

  }
);


/* =====================================================
   YES BUTTON
===================================================== */

yesButton.addEventListener(
  "click",
  () => {

    const selectedDate =
      dateInput.value;

    const selectedTime =
      timeInput.value;


    /*
      Require date.
    */

    if (!selectedDate) {

      dateHint.textContent =
        "Pili ka muna ng date. 👀";

      dateHint.classList.add(
        "show"
      );

      dateInput.focus();

      shakeElement(
        dateInput
      );

      return;

    }


    /*
      Require time.
    */

    if (!selectedTime) {

      timeHint.textContent =
        "Pili ka rin ng time. ☕";

      timeHint.classList.add(
        "show"
      );

      timeInput.focus();

      shakeElement(
        timeInput
      );

      return;

    }


    /*
      Save booking.
    */

    localStorage.setItem(
      "coffeeDate",
      selectedDate
    );

    localStorage.setItem(
      "coffeeTime",
      selectedTime
    );


    /*
      Display booking.
    */

    selectedDateDisplay.textContent =
      formatDate(
        selectedDate
      );

    selectedTimeDisplay.textContent =
      formatTime(
        selectedTime
      );


    /*
      Show confirmation.
    */

    successOverlay.classList.add(
      "show"
    );


    /*
      Celebration hearts.
    */

    for (
      let i = 0;
      i < 12;
      i++
    ) {

      setTimeout(
        () => {

          createHeart(
            window.innerWidth / 2,
            window.innerHeight / 2
          );

        },
        i * 100
      );

    }


    /*
      Celebration sparkles.
    */

    createSparkles(
      window.innerWidth / 2,
      window.innerHeight / 2,
      14
    );

  }
);


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(
  value
) {

  const date =
    new Date(
      `${value}T00:00:00`
    );


  return date.toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  );

}


/* =====================================================
   TIME FORMAT
===================================================== */

function formatTime(
  value
) {

  const [
    hours,
    minutes
  ] =
    value
      .split(":")
      .map(Number);


  const date =
    new Date();


  date.setHours(
    hours,
    minutes,
    0,
    0
  );


  return date.toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit"
    }
  );

}


/* =====================================================
   GOOGLE CALENDAR
===================================================== */

function formatGoogleDate(
  date
) {

  return date
    .toISOString()
    .replace(
      /[-:]/g,
      ""
    )
    .replace(
      /\.\d{3}/,
      ""
    );

}


calendarButton.addEventListener(
  "click",
  () => {

    const selectedDate =
      dateInput.value;

    const selectedTime =
      timeInput.value;


    if (
      !selectedDate ||
      !selectedTime
    ) {

      return;

    }


    const start =
      new Date(
        `${selectedDate}T${selectedTime}:00`
      );


    const end =
      new Date(
        start.getTime() +
        90 * 60 * 1000
      );


    const startString =
      formatGoogleDate(
        start
      );

    const endString =
      formatGoogleDate(
        end
      );


    const title =
      encodeURIComponent(
        "Coffee with Carmina ☕♡"
      );


    const details =
      encodeURIComponent(
        "Coffee with Jay ♡\n\nDon't be late HAHAHA."
      );


    const location =
      encodeURIComponent(
        "Coffee date ☕"
      );


    const calendarURL =
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startString}/${endString}&details=${details}&location=${location}`;


    /*
      Opens Google Calendar in a NEW TAB.

      GitHub Pages stays open.
    */

    window.open(
      calendarURL,
      "_blank",
      "noopener,noreferrer"
    );

  }
);


/* =====================================================
   SECRET EASTER EGG
===================================================== */

secretHeart.addEventListener(
  "click",
  () => {

    secretClicks++;


    /*
      Three clicks.
    */

    if (
      secretClicks >= 3
    ) {

      secretOverlay.classList.add(
        "show"
      );


      createSparkles(
        window.innerWidth / 2,
        window.innerHeight / 2,
        10
      );


      secretClicks = 0;

    }

  }
);


/* =====================================================
   CLOSE SECRET
===================================================== */

closeSecret.addEventListener(
  "click",
  () => {

    secretOverlay.classList.remove(
      "show"
    );

  }
);


/*
  Close by clicking outside.
*/

secretOverlay.addEventListener(
  "click",
  (event) => {

    if (
      event.target ===
      secretOverlay
    ) {

      secretOverlay.classList.remove(
        "show"
      );

    }

  }
);


/* =====================================================
   PHOTO FALLBACK
===================================================== */

photo.addEventListener(
  "error",
  () => {

    photo.style.display =
      "none";


    const frame =
      photo.parentElement;


    frame.style.minHeight =
      "220px";


    frame.style.display =
      "flex";

    frame.style.alignItems =
      "center";

    frame.style.justifyContent =
      "center";


    frame.insertAdjacentHTML(
      "beforeend",

      `
        <div
          style="
            font-family: Caveat, cursive;
            font-size: 26px;
            color: #648393;
          "
        >
          our little memory ♡
        </div>
      `

    );

  }
);


/* =====================================================
   CREATE HEART
===================================================== */

function createHeart(
  x,
  y
) {

  const heart =
    document.createElement(
      "div"
    );


  heart.className =
    "created-heart";


  heart.textContent =
    Math.random() > 0.3
      ? "♡"
      : "♥";


  heart.style.left =
    `${x}px`;

  heart.style.top =
    `${y}px`;


  const randomX =
    `${(Math.random() - 0.5) * 130}px`;

  const randomY =
    `${-60 - Math.random() * 100}px`;


  heart.style.setProperty(
    "--x",
    randomX
  );

  heart.style.setProperty(
    "--y",
    randomY
  );


  document.body.appendChild(
    heart
  );


  setTimeout(
    () => {

      heart.remove();

    },
    1400
  );

}


/* =====================================================
   CREATE SPARKLES
===================================================== */

function createSparkles(
  x,
  y,
  amount = 8
) {

  const symbols = [
    "✦",
    "✧",
    "·",
    "✦"
  ];


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const sparkle =
      document.createElement(
        "div"
      );


    sparkle.className =
      "sparkle";


    sparkle.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    sparkle.style.left =
      `${x}px`;

    sparkle.style.top =
      `${y}px`;


    const randomX =
      `${(Math.random() - 0.5) * 180}px`;

    const randomY =
      `${(Math.random() - 0.5) * 150}px`;


    sparkle.style.setProperty(
      "--x",
      randomX
    );

    sparkle.style.setProperty(
      "--y",
      randomY
    );


    document.body.appendChild(
      sparkle
    );


    setTimeout(
      () => {

        sparkle.remove();

      },
      1100
    );

  }

}


/* =====================================================
   SHAKE ELEMENT
===================================================== */

function shakeElement(
  element
) {

  element.animate(
    [
      {
        transform:
          "translateX(0)"
      },

      {
        transform:
          "translateX(-5px)"
      },

      {
        transform:
          "translateX(5px)"
      },

      {
        transform:
          "translateX(-3px)"
      },

      {
        transform:
          "translateX(0)"
      }
    ],
    {
      duration: 300
    }
  );

}


/* =====================================================
   RESTORE SAVED DATA
===================================================== */

window.addEventListener(
  "load",
  () => {

    const savedDate =
      localStorage.getItem(
        "coffeeDate"
      );

    const savedTime =
      localStorage.getItem(
        "coffeeTime"
      );


    if (savedDate) {

      dateInput.value =
        savedDate;

    }


    if (savedTime) {

      timeInput.value =
        savedTime;

    }

  }
);


/* =====================================================
   EXTRA TOUCH:
   ESCAPE KEY FOR SECRET
===================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      secretOverlay.classList.remove(
        "show"
      );

      successOverlay.classList.remove(
        "show"
      );

    }

  }
);
