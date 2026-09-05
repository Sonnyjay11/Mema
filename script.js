/* =========================================================
   VERSION 7.2
   Fast / lightweight / no loading screen
========================================================= */


/* =========================
   ELEMENTS
========================= */

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const confirmation = document.getElementById("confirmation");

const letterBtn = document.getElementById("letterBtn");
const paperLetter = document.getElementById("paperLetter");
const hintText = document.getElementById("hintText");

const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");

const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");

const selectionHint = document.getElementById("selectionHint");

const yesButton = document.getElementById("yesButton");
const maybeButton = document.getElementById("maybeButton");

const confirmedDate = document.getElementById("confirmedDate");
const confirmedTime = document.getElementById("confirmedTime");

const calendarButton = document.getElementById("calendarButton");

const secretHeart = document.getElementById("secretHeart");
const secretMessage = document.getElementById("secretMessage");

const heartContainer = document.getElementById("heartContainer");

const memoryPhoto = document.getElementById("memoryPhoto");
const photoFallback = document.getElementById("photoFallback");


/* =========================
   STATE
========================= */

let letterOpened = false;

let maybeClicks = 0;

let secretClicks = 0;

let musicStarted = false;


/* =========================
   SET MIN DATE
========================= */

function setMinimumDate() {

  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  dateInput.min = `${year}-${month}-${day}`;
}

setMinimumDate();


/* =========================
   MUSIC
========================= */

async function startMusic() {

  if (musicStarted) {
    return;
  }

  try {

    song.volume = 0.45;

    await song.play();

    musicStarted = true;

    musicButton.classList.add("playing");

  } catch (error) {

    /*
      Some browsers may still block playback.

      Because this function is called directly from
      the button click, playback normally works.
    */

    musicStarted = false;
  }
}


/* =========================
   MUSIC TOGGLE
========================= */

musicButton.addEventListener("click", async () => {

  if (song.paused) {

    try {

      song.volume = 0.45;

      await song.play();

      musicStarted = true;

      musicButton.classList.add("playing");

    } catch (error) {
      // Browser blocked playback.
    }

  } else {

    song.pause();

    musicButton.classList.remove("playing");
  }

});


/* =========================
   LETTER BUTTON
========================= */

letterBtn.addEventListener("click", () => {

  /*
    FIRST CLICK:
    Open letter + start music.
  */

  if (!letterOpened) {

    letterOpened = true;

    // Start music from user gesture.
    startMusic();

    // Open letter.
    paperLetter.classList.add("open");

    // Update button.
    letterBtn.classList.add("opened");

    letterBtn.innerHTML = `
      <span>Okay, next...</span>
      <span>☕</span>
    `;

    hintText.textContent =
      "Take your time. ♡";

    createHearts();

    return;
  }


  /*
    SECOND CLICK:
    Go to coffee invitation.
  */

  showPage2();

});


/* =========================
   CREATE LITTLE HEARTS
========================= */

function createHearts() {

  const buttonRect =
    letterBtn.getBoundingClientRect();

  const centerX =
    buttonRect.left +
    buttonRect.width / 2;

  const centerY =
    buttonRect.top +
    buttonRect.height / 2;

  const hearts = 7;

  for (let i = 0; i < hearts; i++) {

    const heart =
      document.createElement("span");

    heart.className = "flying-heart";

    heart.textContent =
      Math.random() > 0.5
        ? "♡"
        : "♥";

    heart.style.left =
      `${centerX}px`;

    heart.style.top =
      `${centerY}px`;

    const randomX =
      (Math.random() - 0.5) * 180;

    const randomY =
      -40 -
      Math.random() * 100;

    heart.style.setProperty(
      "--x",
      `${randomX}px`
    );

    heart.style.setProperty(
      "--y",
      `${randomY}px`
    );

    heartContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 850);
  }
}


/* =========================
   PAGE SWITCH
========================= */

function switchPage(fromPage, toPage) {

  fromPage.classList.remove("active");

  fromPage.setAttribute(
    "aria-hidden",
    "true"
  );

  /*
    Only a short CSS transition.

    No fake loading screen.
    No multi-second timer.
  */

  requestAnimationFrame(() => {

    toPage.classList.add("active");

    toPage.setAttribute(
      "aria-hidden",
      "false"
    );

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });

  });
}


/* =========================
   SHOW PAGE 2
========================= */

function showPage2() {

  switchPage(page1, page2);

}


/* =========================
   DATE CHANGE
========================= */

dateInput.addEventListener("change", () => {

  if (!dateInput.value) {
    return;
  }

  selectionHint.textContent =
    "Noted. 👀 Mukhang may ganap tayo...";

  selectionHint.style.transform =
    "translateY(-1px)";

  setTimeout(() => {

    selectionHint.style.transform =
      "translateY(0)";

  }, 180);

});


/* =========================
   TIME CHANGE
========================= */

timeInput.addEventListener("change", () => {

  if (!timeInput.value) {
    return;
  }

  selectionHint.textContent =
    "Okay, noted na talaga. ☕ Jay has been informed. HAHAHA.";

});


/* =========================
   MAYBE / KULIT BUTTON
========================= */

const maybeMessages = [

  "Sure ka ba? 👀",

  "Coffee lang naman oh ☕",

  "Libre ko na HAHAHA",

  "Hindi kita pine-pressure 😭",

  "...pero sana yes. ♡"

];

maybeButton.addEventListener("click", () => {

  const message =
    maybeMessages[
      maybeClicks % maybeMessages.length
    ];

  maybeButton.textContent = message;

  maybeClicks++;

  /*
    Tiny playful movement.
  */

  maybeButton.animate(
    [
      {
        transform: "translateX(0)"
      },
      {
        transform: "translateX(-3px)"
      },
      {
        transform: "translateX(3px)"
      },
      {
        transform: "translateX(0)"
      }
    ],
    {
      duration: 220,
      easing: "ease-out"
    }
  );

});


/* =========================
   CHECK DATE/TIME
========================= */

function validateSelection() {

  const selectedDate =
    dateInput.value;

  const selectedTime =
    timeInput.value;

  if (!selectedDate) {

    selectionHint.textContent =
      "Pili ka muna ng araw. 👀";

    dateInput.focus();

    return false;
  }

  if (!selectedTime) {

    selectionHint.textContent =
      "Okay, pero anong oras? HAHAHA.";

    timeInput.focus();

    return false;
  }

  return true;
}


/* =========================
   YES BUTTON
========================= */

yesButton.addEventListener("click", () => {

  if (!validateSelection()) {
    return;
  }

  showConfirmation();

});


/* =========================
   SHOW CONFIRMATION
========================= */

function showConfirmation() {

  const selectedDate =
    dateInput.value;

  const selectedTime =
    timeInput.value;


  /*
    Format date for display.
  */

  const dateObject =
    new Date(
      `${selectedDate}T12:00:00`
    );

  const formattedDate =
    dateObject.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    );


  /*
    Format time for display.
  */

  const timeObject =
    new Date(
      `2000-01-01T${selectedTime}:00`
    );

  const formattedTime =
    timeObject.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit"
      }
    );


  confirmedDate.textContent =
    formattedDate;

  confirmedTime.textContent =
    formattedTime;


  /*
    Switch page.
  */

  page2.classList.remove("active");

  page2.setAttribute(
    "aria-hidden",
    "true"
  );

  requestAnimationFrame(() => {

    confirmation.classList.add("active");

    confirmation.setAttribute(
      "aria-hidden",
      "false"
    );

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });

  });


  createConfirmationHearts();

}


/* =========================
   CONFIRMATION HEARTS
========================= */

function createConfirmationHearts() {

  const hearts = 10;

  for (let i = 0; i < hearts; i++) {

    const heart =
      document.createElement("span");

    heart.className =
      "flying-heart";

    heart.textContent =
      Math.random() > 0.5
        ? "♡"
        : "♥";

    heart.style.left =
      `${45 + Math.random() * 10}%`;

    heart.style.top =
      `${55 + Math.random() * 5}%`;

    heart.style.setProperty(
      "--x",
      `${(Math.random() - 0.5) * 260}px`
    );

    heart.style.setProperty(
      "--y",
      `${-100 - Math.random() * 180}px`
    );

    heartContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 850);
  }

}


/* =========================
   GOOGLE CALENDAR
========================= */

function formatGoogleDate(date) {

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  const hours =
    String(
      date.getHours()
    ).padStart(2, "0");

  const minutes =
    String(
      date.getMinutes()
    ).padStart(2, "0");

  const seconds =
    String(
      date.getSeconds()
    ).padStart(2, "0");

  return (
    `${year}${month}${day}` +
    `T${hours}${minutes}${seconds}`
  );
}


calendarButton.addEventListener("click", () => {

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
      "Coffee with Jay ♡\n\n" +
      "Don't be late HAHAHA."
    );


  const location =
    encodeURIComponent(
      "Coffee date ☕"
    );


  const calendarURL =
    "https://calendar.google.com/calendar/render" +
    "?action=TEMPLATE" +
    `&text=${title}` +
    `&dates=${startString}/${endString}` +
    `&details=${details}` +
    `&location=${location}`;


  /*
    Opens Google Calendar in a NEW TAB.

    This keeps the GitHub Pages website open.
  */

  window.open(
    calendarURL,
    "_blank",
    "noopener,noreferrer"
  );

});


/* =========================
   SECRET EASTER EGG
========================= */

secretHeart.addEventListener("click", () => {

  secretClicks++;

  if (secretClicks >= 3) {

    secretMessage.classList.add("show");

    secretHeart.textContent = "♥";

    secretClicks = 0;

  }

});


/* =========================
   PHOTO FALLBACK
========================= */

memoryPhoto.addEventListener("error", () => {

  memoryPhoto.style.display =
    "none";

  photoFallback.style.display =
    "grid";

});


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (event) => {

  /*
    Enter / Space can operate the main
    invitation button when focused.
  */

  if (
    event.key === "Enter" ||
    event.key === " "
  ) {

    const activeElement =
      document.activeElement;

    if (
      activeElement === letterBtn ||
      activeElement === yesButton ||
      activeElement === maybeButton
    ) {
      return;
    }
  }

});


/* =========================
   IMPORTANT:
   NO PAGE LOAD AUTOPLAY
========================= */

/*
  Deliberately no:

  window.addEventListener("load", ...)

  and no:

  song.play()

  on page load.

  Music starts only from the user's
  click on "Buksan mo ♡".
*/


/* =========================
   INITIAL STATE
========================= */

page1.classList.add("active");

page1.setAttribute(
  "aria-hidden",
  "false"
);

page2.classList.remove("active");

confirmation.classList.remove("active");

song.volume = 0.45;
