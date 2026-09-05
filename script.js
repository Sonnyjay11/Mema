/* =========================================
   VERSION 7
   Coffee Invitation
   Carmina + Jay ♡
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const transitionScreen =
  document.getElementById("transitionScreen");

const letterBtn =
  document.getElementById("letterBtn");

const paperLetter =
  document.getElementById("paperLetter");

const hintText =
  document.getElementById("hintText");

const musicButton =
  document.getElementById("musicButton");

const song =
  document.getElementById("song");

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

const closeSuccess =
  document.getElementById("closeSuccess");

const confirmedDate =
  document.getElementById("confirmedDate");

const confirmedTime =
  document.getElementById("confirmedTime");

const calendarButton =
  document.getElementById("calendarButton");

const secretHeart =
  document.getElementById("secretHeart");

const secretMessage =
  document.getElementById("secretMessage");

const closeSecret =
  document.getElementById("closeSecret");

const photo =
  document.getElementById("photo");


/* =========================================
   DATE
========================================= */

const today = new Date();

const year = today.getFullYear();

const month =
  String(today.getMonth() + 1).padStart(2, "0");

const day =
  String(today.getDate()).padStart(2, "0");

const todayString =
  `${year}-${month}-${day}`;

dateInput.min = todayString;


/* =========================================
   LOCAL STORAGE
========================================= */

const savedDate =
  localStorage.getItem("coffeeDate");

const savedTime =
  localStorage.getItem("coffeeTime");

if (savedDate) {
  dateInput.value = savedDate;
}

if (savedTime) {
  timeInput.value = savedTime;
}


/* =========================================
   MUSIC
========================================= */

let musicStarted = false;


/*
   Browsers often block audible autoplay.

   We try to autoplay, but if the browser
   blocks it, the music button remains available.
*/

window.addEventListener("load", () => {

  setTimeout(() => {

    song.volume = 0.45;

    const playAttempt = song.play();

    if (playAttempt !== undefined) {

      playAttempt
        .then(() => {

          musicStarted = true;

          musicButton.classList.add("playing");

        })
        .catch(() => {

          /*
            Autoplay blocked.
            User can tap the music button.
          */

        });

    }

  }, 700);

});


musicButton.addEventListener("click", () => {

  if (song.paused) {

    song.play()
      .then(() => {

        musicStarted = true;

        musicButton.classList.add("playing");

        createHeart(
          musicButton.getBoundingClientRect().left,
          musicButton.getBoundingClientRect().top
        );

      })
      .catch(() => {});

  } else {

    song.pause();

    musicButton.classList.remove("playing");

  }

});


song.addEventListener("play", () => {

  musicButton.classList.add("playing");

});


song.addEventListener("pause", () => {

  musicButton.classList.remove("playing");

});


/* =========================================
   PAGE 1
========================================= */

let letterOpened = false;

letterBtn.addEventListener("click", () => {

  if (letterOpened) {
    return;
  }

  letterOpened = true;

  letterBtn.classList.add("opened");

  letterBtn.innerHTML = `
    <span>Reading...</span>
    <span>♡</span>
  `;

  hintText.textContent =
    "okay wait... may letter talaga HAHAHA.";

  paperLetter.classList.add("open");

  /*
    Create little hearts around button.
  */

  const rect =
    letterBtn.getBoundingClientRect();

  for (let i = 0; i < 4; i++) {

    setTimeout(() => {

      createHeart(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );

    }, i * 180);

  }


  /*
    Move to booking page after letter
    has had time to reveal.
  */

  setTimeout(() => {

    showTransition();

  }, 6500);

});


/* =========================================
   PAGE TRANSITION
========================================= */

function showTransition() {

  transitionScreen.classList.add("show");

  setTimeout(() => {

    page1.classList.remove("active");

    page2.classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

  }, 900);


  setTimeout(() => {

    transitionScreen.classList.add("hide");

  }, 1500);


  setTimeout(() => {

    transitionScreen.classList.remove(
      "show",
      "hide"
    );

  }, 2300);

}


/* =========================================
   DATE
========================================= */

dateInput.addEventListener("change", () => {

  const selectedDate =
    dateInput.value;

  if (!selectedDate) {

    dateHint.textContent = "";

    dateHint.classList.remove("show");

    return;

  }


  /*
    Save date.
  */

  localStorage.setItem(
    "coffeeDate",
    selectedDate
  );


  /*
    Don't allow past dates.
  */

  if (selectedDate < todayString) {

    dateHint.textContent =
      "Hoy... future date naman tayo HAHAHA.";

    dateHint.classList.add("show");

    dateInput.value = "";

    localStorage.removeItem("coffeeDate");

    return;

  }


  dateHint.textContent =
    "Noted. 👀 Mukhang may ganap tayo...";

  dateHint.classList.add("show");


  createHeartFromElement(dateInput);

});


/* =========================================
   TIME
========================================= */

timeInput.addEventListener("change", () => {

  const selectedTime =
    timeInput.value;

  if (!selectedTime) {

    timeHint.textContent = "";

    timeHint.classList.remove("show");

    return;

  }


  /*
    Save time.
  */

  localStorage.setItem(
    "coffeeTime",
    selectedTime
  );


  /*
    If selected date is today,
    prevent choosing a past time.
  */

  if (
    dateInput.value === todayString
  ) {

    const now = new Date();

    const currentHours =
      String(now.getHours()).padStart(2, "0");

    const currentMinutes =
      String(now.getMinutes()).padStart(2, "0");

    const currentTime =
      `${currentHours}:${currentMinutes}`;

    if (selectedTime < currentTime) {

      timeHint.textContent =
        "Medyo past na yan HAHAHA. Pili ulit.";

      timeHint.classList.add("show");

      timeInput.value = "";

      localStorage.removeItem("coffeeTime");

      return;

    }

  }


  timeHint.textContent =
    "Okay, noted na talaga. ☕ Jay has been informed. HAHAHA.";

  timeHint.classList.add("show");


  createHeartFromElement(timeInput);

});


/* =========================================
   MAYBE / KULIT BUTTON
========================================= */

const maybeMessages = [

  "Sure ka ba? 👀",

  "Coffee lang naman oh ☕",

  "Libre ko na HAHAHA",

  "Hindi kita pine-pressure 😭",

  "...pero sana yes. ♡"

];

let maybeIndex = 0;

maybeButton.addEventListener("click", () => {

  maybeButton.animate(
    [
      {
        transform: "scale(1)"
      },
      {
        transform: "scale(0.95)"
      },
      {
        transform: "scale(1.03)"
      },
      {
        transform: "scale(1)"
      }
    ],
    {
      duration: 350
    }
  );


  maybeButton.textContent =
    maybeMessages[maybeIndex];


  maybeIndex++;

  if (
    maybeIndex >= maybeMessages.length
  ) {
    maybeIndex = 0;
  }


  createHeartFromElement(maybeButton);

});


/* =========================================
   YES BUTTON
========================================= */

yesButton.addEventListener("click", () => {

  const selectedDate =
    dateInput.value;

  const selectedTime =
    timeInput.value;


  /*
    Require both.
  */

  if (!selectedDate) {

    dateHint.textContent =
      "Pili ka muna ng date please. 👀";

    dateHint.classList.add("show");

    dateInput.focus();

    shakeElement(dateInput);

    return;

  }


  if (!selectedTime) {

    timeHint.textContent =
      "Tapos oras naman. Para official HAHAHA.";

    timeHint.classList.add("show");

    timeInput.focus();

    shakeElement(timeInput);

    return;

  }


  /*
    Validate date again.
  */

  if (selectedDate < todayString) {

    dateHint.textContent =
      "Past date yan HAHAHA. Future naman tayo.";

    dateHint.classList.add("show");

    dateInput.value = "";

    return;

  }


  /*
    Validate today's time.
  */

  if (
    selectedDate === todayString
  ) {

    const now = new Date();

    const currentTime =
      `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    if (selectedTime < currentTime) {

      timeHint.textContent =
        "Past time na yan HAHAHA.";

      timeHint.classList.add("show");

      timeInput.value = "";

      return;

    }

  }


  /*
    Format date and time.
  */

  confirmedDate.textContent =
    formatDate(selectedDate);

  confirmedTime.textContent =
    formatTime(selectedTime);


  /*
    Save confirmation.
  */

  localStorage.setItem(
    "coffeeConfirmed",
    "true"
  );

  localStorage.setItem(
    "coffeeDate",
    selectedDate
  );

  localStorage.setItem(
    "coffeeTime",
    selectedTime
  );


  /*
    Show success.
  */

  successOverlay.classList.add("show");


  /*
    Create celebration hearts.
  */

  for (let i = 0; i < 10; i++) {

    setTimeout(() => {

      createRandomHeart();

    }, i * 120);

  }

});


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(dateString) {

  const date =
    new Date(
      `${dateString}T12:00:00`
    );

  return date.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  );

}


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(timeString) {

  const [hours, minutes] =
    timeString.split(":");

  const date =
    new Date();

  date.setHours(
    Number(hours),
    Number(minutes),
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


/* =========================================
   CLOSE SUCCESS
========================================= */

closeSuccess.addEventListener("click", () => {

  successOverlay.classList.remove("show");

});


/*
   Click outside card
*/

successOverlay.addEventListener("click", (event) => {

  if (
    event.target === successOverlay
  ) {

    successOverlay.classList.remove("show");

  }

});


/*
   Escape key
*/

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    successOverlay.classList.remove("show");

    secretMessage.classList.remove("show");

  }

});


/* =========================================
   GOOGLE CALENDAR
========================================= */

calendarButton.addEventListener("click", () => {

  const selectedDate =
    dateInput.value;

  const selectedTime =
    timeInput.value;


  if (!selectedDate || !selectedTime) {
    return;
  }


  /*
    Create start time.

    We use local Manila time for the
    Google Calendar link.
  */

  const start =
    new Date(
      `${selectedDate}T${selectedTime}:00`
    );


  /*
    Default coffee duration:
    1 hour 30 minutes.
  */

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


  /*
    Google Calendar URL.

    It opens in a NEW TAB,
    so the GitHub website stays open.
  */

  const calendarURL =
    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startString}/${endString}&details=${details}&location=${location}`;


  window.open(
    calendarURL,
    "_blank",
    "noopener,noreferrer"
  );

});


/* =========================================
   GOOGLE CALENDAR DATE FORMAT
========================================= */

function formatGoogleDate(date) {

  const year =
    date.getFullYear();

  const month =
    String(date.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(date.getDate())
      .padStart(2, "0");

  const hours =
    String(date.getHours())
      .padStart(2, "0");

  const minutes =
    String(date.getMinutes())
      .padStart(2, "0");

  const seconds =
    String(date.getSeconds())
      .padStart(2, "0");


  /*
    Google Calendar accepts
    YYYYMMDDTHHMMSS format.

    We intentionally don't append Z
    because this represents local time.
  */

  return (
    `${year}${month}${day}` +
    `T${hours}${minutes}${seconds}`
  );

}


/* =========================================
   SECRET EASTER EGG
========================================= */

let secretClicks = 0;

let secretTimer = null;

secretHeart.addEventListener("click", () => {

  secretClicks++;

  clearTimeout(secretTimer);

  secretTimer = setTimeout(() => {

    secretClicks = 0;

  }, 1500);


  if (secretClicks >= 3) {

    secretClicks = 0;

    secretMessage.classList.add("show");

    for (let i = 0; i < 5; i++) {

      setTimeout(() => {

        createRandomHeart();

      }, i * 150);

    }

  }

});


/* =========================================
   CLOSE SECRET
========================================= */

closeSecret.addEventListener("click", () => {

  secretMessage.classList.remove("show");

});


secretMessage.addEventListener("click", (event) => {

  if (
    event.target === secretMessage
  ) {

    secretMessage.classList.remove("show");

  }

});


/* =========================================
   PHOTO FALLBACK
========================================= */

photo.addEventListener("error", () => {

  photo.style.display = "none";

  photo.parentElement.style.background =
    "linear-gradient(135deg, #dff4ff, #fff7ea)";

  const fallback =
    document.createElement("div");

  fallback.style.minHeight = "210px";

  fallback.style.display = "flex";

  fallback.style.alignItems = "center";

  fallback.style.justifyContent = "center";

  fallback.style.fontFamily =
    '"Caveat", cursive';

  fallback.style.fontSize = "30px";

  fallback.style.color =
    "#438caf";

  fallback.textContent =
    "our little coffee memory ♡";

  photo.parentElement.insertBefore(
    fallback,
    photo
  );

});


/* =========================================
   SHAKE
========================================= */

function shakeElement(element) {

  element.animate(
    [
      {
        transform: "translateX(0)"
      },
      {
        transform: "translateX(-6px)"
      },
      {
        transform: "translateX(6px)"
      },
      {
        transform: "translateX(-4px)"
      },
      {
        transform: "translateX(4px)"
      },
      {
        transform: "translateX(0)"
      }
    ],
    {
      duration: 350
    }
  );

}


/* =========================================
   CREATE HEART FROM ELEMENT
========================================= */

function createHeartFromElement(element) {

  const rect =
    element.getBoundingClientRect();

  createHeart(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2
  );

}


/* =========================================
   CREATE HEART
========================================= */

function createHeart(x, y) {

  const heart =
    document.createElement("div");

  heart.className =
    "click-heart";

  heart.textContent =
    "♡";

  heart.style.left =
    `${x}px`;

  heart.style.top =
    `${y}px`;

  heart.style.setProperty(
    "--x",
    `${Math.random() * 80 - 40}px`
  );

  document.body.appendChild(heart);

  setTimeout(() => {

    heart.remove();

  }, 1400);

}


/* =========================================
   RANDOM HEART
========================================= */

function createRandomHeart() {

  const heart =
    document.createElement("div");

  heart.className =
    "click-heart";

  heart.textContent =
    Math.random() > 0.5
      ? "♡"
      : "♥";

  heart.style.left =
    `${Math.random() * window.innerWidth}px`;

  heart.style.top =
    `${window.innerHeight - 10}px`;

  heart.style.setProperty(
    "--x",
    `${Math.random() * 160 - 80}px`
  );

  document.body.appendChild(heart);

  setTimeout(() => {

    heart.remove();

  }, 1400);

}


/* =========================================
   PREVENT ACCIDENTAL FORM SUBMISSION
========================================= */

document.addEventListener("submit", (event) => {

  event.preventDefault();

});


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
  "%c☕ Coffee Invitation V7 ♡",
  "font-size:18px;color:#438caf;font-weight:bold;"
);

console.log(
  "Made with a little effort by Jay. HAHAHA."
);
