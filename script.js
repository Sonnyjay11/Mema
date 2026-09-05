/* =====================================
   ELEMENTS
===================================== */

const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");

const pageOne = document.getElementById("pageOne");
const pageTwo = document.getElementById("pageTwo");

const letterBtn = document.getElementById("letterBtn");
const letterBtnText = document.getElementById("letterBtnText");

const paperLetter = document.getElementById("paperLetter");
const hintText = document.getElementById("hintText");

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
  document.getElementById("selectedDateDisplay");

const selectedTimeDisplay =
  document.getElementById("selectedTimeDisplay");

const calendarButton =
  document.getElementById("calendarButton");

const secretHeart =
  document.getElementById("secretHeart");

const secretOverlay =
  document.getElementById("secretOverlay");

const closeSecret =
  document.getElementById("closeSecret");

const photo =
  document.getElementById("photo");


/* =====================================
   VARIABLES
===================================== */

let letterOpened = false;
let musicStarted = false;

let maybeCount = 0;
let secretClicks = 0;


/* =====================================
   DATE MINIMUM
===================================== */

function setMinimumDate() {

  const today = new Date();

  const year =
    today.getFullYear();

  const month =
    String(today.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(today.getDate())
      .padStart(2, "0");

  dateInput.min =
    `${year}-${month}-${day}`;
}

setMinimumDate();


/* =====================================
   MUSIC
===================================== */

/*
  IMPORTANT:

  There is NO autoplay on page load.

  The song begins when the user clicks
  "Buksan mo ♡".
*/

async function startMusic() {

  try {

    song.volume = 0.45;

    await song.play();

    musicStarted = true;

    musicButton.classList.add("playing");

  } catch (error) {

    /*
      Some browsers may still block playback.

      The music pill remains available so
      the user can manually start the song.
    */

    musicStarted = false;

  }
}


musicButton.addEventListener(
  "click",
  async () => {

    if (song.paused) {

      try {

        song.volume = 0.45;

        await song.play();

        musicStarted = true;

        musicButton.classList.add("playing");

      } catch (error) {

        console.log(
          "Music could not start.",
          error
        );

      }

    } else {

      song.pause();

      musicButton.classList.remove("playing");

    }

  }
);


/* =====================================
   PAGE 1
===================================== */

letterBtn.addEventListener(
  "click",
  async () => {

    /*
      FIRST CLICK

      Open the letter and start music.
    */

    if (!letterOpened) {

      letterOpened = true;


      /* Start song because this is
         a direct user interaction. */

      await startMusic();


      /* Open letter */

      paperLetter.classList.add("open");


      /* Change button */

      letterBtn.classList.add("opened");

      letterBtnText.textContent =
        "Okay, next...";


      /*
        This is NOT a timer.

        The user can read the letter for
        as long as they want.
      */

      hintText.textContent =
        "Take your time. ♡";


      /* Small heart animation */

      const rect =
        letterBtn.getBoundingClientRect();

      for (let i = 0; i < 5; i++) {

        setTimeout(
          () => {

            createHeart(
              rect.left +
                rect.width / 2,

              rect.top +
                rect.height / 2
            );

          },
          i * 130
        );

      }

      return;
    }


    /*
      SECOND CLICK

      Only now do we move to Page 2.
    */

    showTransition();

  }
);


/* =====================================
   PAGE TRANSITION
===================================== */

function showTransition() {

  transitionScreen.classList.add("show");

  setTimeout(
    () => {

      pageOne.classList.remove("active");

      pageTwo.classList.add("active");

    },
    850
  );

  setTimeout(
    () => {

      transitionScreen.classList.remove("show");

    },
    1450
  );

}


/* =====================================
   DATE PICKER
===================================== */

dateInput.addEventListener(
  "change",
  () => {

    if (!dateInput.value) {

      dateHint.classList.remove("show");

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
      `Noted. 👀 ${formatted} sounds good...`;

    dateHint.classList.add("show");


    localStorage.setItem(
      "coffeeDate",
      dateInput.value
    );

  }
);


/* =====================================
   TIME PICKER
===================================== */

timeInput.addEventListener(
  "change",
  () => {

    if (!timeInput.value) {

      timeHint.classList.remove("show");

      return;
    }


    const [hours, minutes] =
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

    timeHint.classList.add("show");


    localStorage.setItem(
      "coffeeTime",
      timeInput.value
    );

  }
);


/* =====================================
   MAYBE BUTTON
===================================== */

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
      maybeMessages[maybeCount];

    maybeCount++;

    if (
      maybeCount >=
      maybeMessages.length
    ) {

      maybeCount = 0;

    }


    /* Little playful movement */

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
            "translateX(0)"
        }
      ],
      {
        duration: 300
      }
    );

  }
);


/* =====================================
   YES BUTTON
===================================== */

yesButton.addEventListener(
  "click",
  () => {

    const selectedDate =
      dateInput.value;

    const selectedTime =
      timeInput.value;


    if (!selectedDate) {

      dateHint.textContent =
        "Pili ka muna ng date. 👀";

      dateHint.classList.add("show");

      dateInput.focus();

      return;

    }


    if (!selectedTime) {

      timeHint.textContent =
        "Pili ka rin ng time. ☕";

      timeHint.classList.add("show");

      timeInput.focus();

      return;

    }


    /* Save */

    localStorage.setItem(
      "coffeeDate",
      selectedDate
    );

    localStorage.setItem(
      "coffeeTime",
      selectedTime
    );


    /* Display */

    selectedDateDisplay.textContent =
      formatDate(selectedDate);

    selectedTimeDisplay.textContent =
      formatTime(selectedTime);


    /* Show success */

    successOverlay.classList.add("show");


    /* Hearts */

    for (let i = 0; i < 7; i++) {

      setTimeout(
        () => {

          createHeart(
            window.innerWidth / 2,
            window.innerHeight / 2
          );

        },
        i * 120
      );

    }

  }
);


/* =====================================
   DATE FORMAT
===================================== */

function formatDate(value) {

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


/* =====================================
   TIME FORMAT
===================================== */

function formatTime(value) {

  const [hours, minutes] =
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


/* =====================================
   GOOGLE CALENDAR
===================================== */

function formatGoogleDate(date) {

  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

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
      formatGoogleDate(start);

    const endString =
      formatGoogleDate(end);


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
      IMPORTANT:

      Opens Google Calendar in a NEW TAB.

      It does NOT redirect the GitHub Pages
      website itself.
    */

    window.open(
      calendarURL,
      "_blank",
      "noopener,noreferrer"
    );

  }
);


/* =====================================
   SECRET EASTER EGG
===================================== */

secretHeart.addEventListener(
  "click",
  () => {

    secretClicks++;


    if (secretClicks >= 3) {

      secretOverlay.classList.add("show");

      secretClicks = 0;

    }

  }
);


closeSecret.addEventListener(
  "click",
  () => {

    secretOverlay.classList.remove("show");

  }
);


/* Close secret by clicking outside */

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


/* =====================================
   PHOTO FALLBACK
===================================== */

photo.addEventListener(
  "error",
  () => {

    photo.style.display = "none";

    photo.parentElement.style.minHeight =
      "240px";

    photo.parentElement.style.display =
      "flex";

    photo.parentElement.style.alignItems =
      "center";

    photo.parentElement.style.justifyContent =
      "center";

    photo.parentElement.innerHTML +=
      `
        <div
          style="
            font-family: Caveat, cursive;
            font-size: 25px;
            color: #6b8797;
          "
        >
          our little memory ♡
        </div>
      `;

  }
);


/* =====================================
   FLOATING HEARTS
===================================== */

function createHeart(x, y) {

  const heart =
    document.createElement("div");

  heart.className =
    "created-heart";

  heart.textContent =
    Math.random() > 0.35
      ? "♡"
      : "♥";


  heart.style.left =
    `${x}px`;

  heart.style.top =
    `${y}px`;


  const randomX =
    `${(Math.random() - 0.5) * 100}px`;

  const randomY =
    `${-50 - Math.random() * 90}px`;


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
    1300
  );

}


/* =====================================
   RESTORE SAVED DATE/TIME
===================================== */

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
