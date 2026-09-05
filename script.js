/* =====================================================
   VERSION 6.0
   Para Kay Carmina ♡
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


/* MUSIC */

const musicButton =
  document.getElementById("musicButton");

const musicText =
  document.getElementById("musicText");

const song =
  document.getElementById("song");


/* DATE */

const dateInput =
  document.getElementById("date");

const timeInput =
  document.getElementById("time");

const dateHint =
  document.getElementById("dateHint");


/* BUTTONS */

const yesBtn =
  document.getElementById("yesBtn");

const maybeBtn =
  document.getElementById("maybeBtn");


/* SUCCESS */

const successOverlay =
  document.getElementById("successOverlay");

const chosenDate =
  document.getElementById("chosenDate");

const calendarBtn =
  document.getElementById("calendarBtn");

const closeSuccess =
  document.getElementById("closeSuccess");


/* SECRET */

const secretMessage =
  document.getElementById("secretMessage");


/* =====================================================
   VARIABLES
===================================================== */

let letterOpened = false;

let musicPlaying = false;

let maybeIndex = 0;

let selectedDateTime = null;


/* =====================================================
   LETTER
===================================================== */

letterBtn.addEventListener(
  "click",
  function () {

    if (!letterOpened) {

      letterOpened = true;

      paperLetter.classList.add("open");

      letterBtn.textContent =
        "Okay... may tanong ako →";

      hintText.textContent =
        "Basahin mo muna... bawal mag-skip HAHAHA.";

      startMusic();

      setTimeout(
        function () {

          paperLetter.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        },
        250
      );

      return;
    }


    goToPageTwo();

  }
);


/* =====================================================
   PAGE TRANSITION
===================================================== */

function goToPageTwo() {

  page1.classList.remove("active");

  setTimeout(
    function () {

      page2.classList.add("active");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    },
    120
  );

  startMusic();

}


/* =====================================================
   MUSIC
===================================================== */

/*
  Browsers may block autoplay.

  We try to play automatically,
  but the music button remains available
  as the fallback.
*/

window.addEventListener(
  "load",
  function () {

    setTimeout(
      function () {

        startMusic();

      },
      500
    );

  }
);


function startMusic() {

  if (musicPlaying) {
    return;
  }

  song.volume = 0.72;

  const playPromise =
    song.play();

  if (
    playPromise !== undefined
  ) {

    playPromise
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

        }
      );

  }

}


function updateMusicButton() {

  if (musicPlaying) {

    musicButton.classList.add(
      "playing"
    );

    musicText.textContent =
      "Love Is • Playing";

    musicButton.setAttribute(
      "aria-label",
      "Pause Love Is"
    );

  } else {

    musicButton.classList.remove(
      "playing"
    );

    musicText.textContent =
      "Play Love Is";

    musicButton.setAttribute(
      "aria-label",
      "Play Love Is"
    );

  }

}


musicButton.addEventListener(
  "click",
  function () {

    if (musicPlaying) {

      song.pause();

      return;

    }

    song.volume = 0.72;

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

        }
      );

  }
);


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

function getTodayString() {

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

  return `${year}-${month}-${day}`;

}


function setMinimumDate() {

  dateInput.min =
    getTodayString();

}


setMinimumDate();


/* =====================================================
   LOCAL STORAGE
===================================================== */

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


if (
  savedDate &&
  savedTime
) {

  dateHint.textContent =
    "May napili na pala... 👀";

}


/* =====================================================
   DATE CHANGE
===================================================== */

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

    animateHint(
      "Ay may napili na... 👀"
    );

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

    localStorage.setItem(
      "carminaTime",
      timeInput.value
    );

    animateHint(
      "Noted... mukhang may pag-asa ako HAHAHA."
    );

  }
);


function animateHint(message) {

  dateHint.classList.remove(
    "changed"
  );

  void dateHint.offsetWidth;

  dateHint.textContent =
    message;

  dateHint.classList.add(
    "changed"
  );

}


/* =====================================================
   VALIDATE DATE + TIME
===================================================== */

function validateDateTime() {

  const date =
    dateInput.value;

  const time =
    timeInput.value;


  if (!date) {

    animateHint(
      "Pili ka muna ng araw, binibini ♡"
    );

    dateInput.focus();

    return false;

  }


  if (!time) {

    animateHint(
      "Okay lang... oras naman muna 👀"
    );

    timeInput.focus();

    return false;

  }


  /*
    Prevent past date/time.
  */

  const selected =
    new Date(
      `${date}T${time}`
    );

  const now =
    new Date();


  if (
    selected.getTime() <
    now.getTime()
  ) {

    animateHint(
      "Uy, past na 'yan HAHAHA. Pumili tayo ng future."
    );

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

    if (
      !validateDateTime()
    ) {

      shakeButton(
        yesBtn
      );

      return;

    }


    const date =
      dateInput.value;

    const time =
      timeInput.value;


    selectedDateTime =
      new Date(
        `${date}T${time}`
      );


    const formattedDate =
      selectedDateTime.toLocaleDateString(
        "en-PH",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      );


    const formattedTime =
      selectedDateTime.toLocaleTimeString(
        "en-PH",
        {
          hour: "numeric",
          minute: "2-digit"
        }
      );


    chosenDate.innerHTML =
      `
        ${formattedDate}
        <br>
        at ${formattedTime}
      `;


    successOverlay.classList.add(
      "show"
    );


    successOverlay.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow =
      "hidden";


    createHearts();

  }
);


/* =====================================================
   BUTTON SHAKE
===================================================== */

function shakeButton(button) {

  button.animate(
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
          "translateX(-4px)"
      },

      {
        transform:
          "translateX(4px)"
      },

      {
        transform:
          "translateX(0)"
      }
    ],
    {
      duration: 350
    }
  );

}


/* =====================================================
   MAYBE BUTTON
===================================================== */

const maybeMessages = [

  "Sure ka ba? 👀",

  "Pwede mo pag-isipan... HAHAHA",

  "Coffee lang naman oh ☕",

  "Hindi kita pine-pressure... konti lang 👀",

  "Libre ko na coffee mo oh",

  "Sige lang, hintayin kita HAHAHA",

  "Last na talaga... coffee tayo? ♡"

];


maybeBtn.addEventListener(
  "click",
  function () {

    maybeBtn.animate(
      [
        {
          transform:
            "scale(1)"
        },

        {
          transform:
            "scale(0.96)"
        },

        {
          transform:
            "scale(1)"
        }
      ],
      {
        duration: 220
      }
    );


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


    animateHint(
      "No pressure... pero sana yes. ♡"
    );

  }
);


/* =====================================================
   SUCCESS CLOSE
===================================================== */

closeSuccess.addEventListener(
  "click",
  function () {

    closeSuccessOverlay();

  }
);


function closeSuccessOverlay() {

  successOverlay.classList.remove(
    "show"
  );

  successOverlay.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      successOverlay.classList.contains("show")
    ) {

      closeSuccessOverlay();

    }

  }
);


/* =====================================================
   CREATE FLOATING HEARTS
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
    "♡",
    "♥",
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
        Math.random() * 100 + "%";


      heart.style.bottom =
        "-35px";


      heart.style.fontFamily =
        "Caveat, cursive";


      heart.style.fontSize =
        (
          18 +
          Math.random() * 20
        ) +
        "px";


      heart.style.color =
        "rgba(112, 184, 210, 0.85)";


      heart.style.zIndex =
        "200";


      heart.style.pointerEvents =
        "none";


      heart.style.transition =
        `
          transform 3.5s ease,
          opacity 3.5s ease
        `;


      document.body.appendChild(
        heart
      );


      setTimeout(
        function () {

          heart.style.transform =
            `
              translateY(
                -${
                  350 +
                  Math.random() * 450
                }px
              )
              translateX(
                ${
                  Math.random() * 100 - 50
                }px
              )
              rotate(
                ${
                  Math.random() * 100 - 50
                }deg
              )
            `;


          heart.style.opacity =
            "0";

        },
        index * 130
      );


      setTimeout(
        function () {

          heart.remove();

        },
        4300
      );

    }
  );

}


/* =====================================================
   SAVE TO CALENDAR
===================================================== */

calendarBtn.addEventListener(
  "click",
  function () {

    if (
      !selectedDateTime
    ) {
      return;
    }


    const start =
      formatCalendarDate(
        selectedDateTime
      );


    /*
      Default coffee duration:
      1 hour 30 minutes.
    */

    const endDate =
      new Date(
        selectedDateTime.getTime() +
        90 * 60 * 1000
      );


    const end =
      formatCalendarDate(
        endDate
      );


    const title =
      "Coffee with Jay ☕";


    const description =
      "Coffee with Jay. See you soon ♡";


    const ics =
      [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Coffee Invitation//EN",
        "BEGIN:VEVENT",
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${escapeICS(title)}`,
        `DESCRIPTION:${escapeICS(description)}`,
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");


    const blob =
      new Blob(
        [ics],
        {
          type:
            "text/calendar;charset=utf-8"
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        "a"
      );


    link.href =
      url;

    link.download =
      "coffee-with-jay.ics";


    document.body.appendChild(
      link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
      url
    );


    calendarBtn.innerHTML =
      `
        <span>✓</span>
        Calendar saved ♡
      `;

  }
);


/* =====================================================
   CALENDAR DATE FORMAT
===================================================== */

function formatCalendarDate(
  date
) {

  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    );


  const hours =
    String(
      date.getHours()
    ).padStart(
      2,
      "0"
    );


  const minutes =
    String(
      date.getMinutes()
    ).padStart(
      2,
      "0"
    );


  const seconds =
    String(
      date.getSeconds()
    ).padStart(
      2,
      "0"
    );


  return (
    `${year}${month}${day}` +
    `T${hours}${minutes}${seconds}`
  );

}


/* =====================================================
   ESCAPE ICS
===================================================== */

function escapeICS(
  text
) {

  return text
    .replace(
      /\\/g,
      "\\\\"
    )
    .replace(
      /;/g,
      "\\;"
    )
    .replace(
      /,/g,
      "\\,"
    )
    .replace(
      /\n/g,
      "\\n"
    );

}


/* =====================================================
   SECRET EASTER EGG
===================================================== */

/*
  Click the "Carmina" title three times.
*/

const carminaTitle =
  document.querySelector(
    "h1 span"
  );


let titleClicks = 0;


carminaTitle.addEventListener(
  "click",
  function () {

    titleClicks++;


    if (
      titleClicks >= 3
    ) {

      showSecret();

      titleClicks = 0;

    }

  }
);


function showSecret() {

  secretMessage.classList.add(
    "show"
  );

  secretMessage.setAttribute(
    "aria-hidden",
    "false"
  );


  setTimeout(
    function () {

      secretMessage.classList.remove(
        "show"
      );

      secretMessage.setAttribute(
        "aria-hidden",
        "true"
      );

    },
    3500
  );

}


/* =====================================================
   PHOTO FALLBACK
===================================================== */

const photo =
  document.querySelector(
    ".photo-frame img"
  );


photo.addEventListener(
  "error",
  function () {

    photo.style.display =
      "none";

    photo.parentElement.style.background =
      `
        linear-gradient(
          135deg,
          #dff5fb,
          #fff8e9
        )
      `;

    photo.parentElement.style.minHeight =
      "210px";

    photo.parentElement.style.display =
      "flex";

    photo.parentElement.style.alignItems =
      "center";

    photo.parentElement.style.justifyContent =
      "center";

    photo.parentElement.innerHTML =
      `
        <div
          style="
            text-align:center;
            padding:30px;
            font-family:Caveat,cursive;
            color:#477f99;
            font-size:22px;
          "
        >
          ♡
          <br>
          our little memory
          <br>
          <span
            style="
              font-family:'DM Sans',sans-serif;
              font-size:10px;
              opacity:.6;
            "
          >
            add photo.jpg
          </span>
        </div>
      `;

  }
);


/* =====================================================
   AUDIO ERROR
===================================================== */

song.addEventListener(
  "error",
  function () {

    musicText.textContent =
      "Add Love Is.mp3";

    musicButton.classList.remove(
      "playing"
    );

  }
);
