/* =====================================================
   ELEMENTS
===================================================== */

const song =
  document.getElementById("song");

const musicButton =
  document.getElementById("musicButton");

const musicIcon =
  document.getElementById("musicIcon");

const musicLabel =
  document.getElementById("musicLabel");


const page1 =
  document.getElementById("page1");

const page2 =
  document.getElementById("page2");


const paperLetter =
  document.getElementById("paperLetter");

const letterButton =
  document.getElementById("letterButton");

const letterHint =
  document.getElementById("letterHint");


const dateInput =
  document.getElementById("date");

const timeInput =
  document.getElementById("time");

const messageInput =
  document.getElementById("message");

const characterCount =
  document.getElementById("characterCount");

const bookingHint =
  document.getElementById("bookingHint");


const confirmButton =
  document.getElementById("confirmButton");


const confirmation =
  document.getElementById("confirmation");

const ticketDate =
  document.getElementById("ticketDate");

const ticketTime =
  document.getElementById("ticketTime");

const ticketMessage =
  document.getElementById("ticketMessage");

const closeButton =
  document.getElementById("closeButton");


/* =====================================================
   STATE
===================================================== */

let letterOpened = false;

let musicPlaying = false;


/* =====================================================
   MUSIC
===================================================== */

musicButton.addEventListener(
  "click",
  async () => {

    if (song.paused) {

      try {

        await song.play();

        musicPlaying = true;

      } catch (error) {

        console.log(error);

      }

    } else {

      song.pause();

      musicPlaying = false;

    }

    updateMusic();

  }
);


function updateMusic() {

  if (musicPlaying) {

    musicButton.classList.add(
      "playing"
    );

    musicIcon.textContent =
      "♫";

    musicLabel.textContent =
      "Love Is";

  } else {

    musicButton.classList.remove(
      "playing"
    );

    musicIcon.textContent =
      "▶";

    musicLabel.textContent =
      "Music";

  }

}


/* =====================================================
   LETTER
===================================================== */

letterButton.addEventListener(
  "click",
  () => {

    if (!letterOpened) {

      openLetter();

    } else {

      goToDatePage();

    }

  }
);


function openLetter() {

  paperLetter.classList.add(
    "open"
  );

  letterOpened = true;


  letterButton.textContent =
    "May itatanong ako sa'yo →";


  letterHint.textContent =
    "Basahin mo muna... ♡";


  setTimeout(() => {

    paperLetter.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 350);

}


/* =====================================================
   PAGE 2
===================================================== */

function goToDatePage() {

  page1.classList.remove(
    "active"
  );


  setTimeout(() => {

    page2.classList.add(
      "active"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, 180);

}


/* =====================================================
   MINIMUM DATE
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
   SAVE DATE / TIME
===================================================== */

dateInput.addEventListener(
  "change",
  () => {

    localStorage.setItem(
      "coffeeDate",
      dateInput.value
    );


    if (dateInput.value) {

      bookingHint.textContent =
        "Okay... may napili ka nang araw. 👀";

    }

  }
);


timeInput.addEventListener(
  "change",
  () => {

    localStorage.setItem(
      "coffeeTime",
      timeInput.value
    );


    if (
      dateInput.value &&
      timeInput.value
    ) {

      bookingHint.textContent =
        "Noted... parang legit na 'to. ☕";

    }

  }
);


/* =====================================================
   MESSAGE
===================================================== */

messageInput.addEventListener(
  "input",
  () => {

    characterCount.textContent =
      messageInput.value.length;


    localStorage.setItem(
      "coffeeMessage",
      messageInput.value
    );

  }
);


/* =====================================================
   RESTORE
===================================================== */

function restoreSavedData() {

  const savedDate =
    localStorage.getItem(
      "coffeeDate"
    );

  const savedTime =
    localStorage.getItem(
      "coffeeTime"
    );

  const savedMessage =
    localStorage.getItem(
      "coffeeMessage"
    );


  if (savedDate) {

    dateInput.value =
      savedDate;

  }


  if (savedTime) {

    timeInput.value =
      savedTime;

  }


  if (savedMessage) {

    messageInput.value =
      savedMessage;

    characterCount.textContent =
      savedMessage.length;

  }


  if (
    savedDate &&
    savedTime
  ) {

    bookingHint.textContent =
      "May napili ka na pala. 👀";

  }

}

restoreSavedData();


/* =====================================================
   CONFIRM DATE
===================================================== */

confirmButton.addEventListener(
  "click",
  () => {

    const date =
      dateInput.value;

    const time =
      timeInput.value;


    /* No date */

    if (!date) {

      bookingHint.textContent =
        "Pili ka muna ng date please. ♡";

      dateInput.focus();

      shakeElement(
        dateInput
      );

      return;

    }


    /* No time */

    if (!time) {

      bookingHint.textContent =
        "Okay na yung date... oras naman. 👀";

      timeInput.focus();

      shakeElement(
        timeInput
      );

      return;

    }


    /* Build date */

    const selected =
      new Date(
        `${date}T${time}`
      );


    /* Date formatting */

    const formattedDate =
      selected.toLocaleDateString(
        "en-PH",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      );


    /* Time formatting */

    const formattedTime =
      selected.toLocaleTimeString(
        "en-PH",
        {
          hour: "numeric",
          minute: "2-digit"
        }
      );


    ticketDate.textContent =
      formattedDate;


    ticketTime.textContent =
      formattedTime;


    /* Message */

    const message =
      messageInput.value.trim();


    if (message) {

      ticketMessage.innerHTML =
        `"${escapeHTML(message)}" ♡`;

    } else {

      ticketMessage.textContent =
        "No message needed. I'll see you there. ♡";

    }


    /* Save confirmation */

    localStorage.setItem(
      "coffeeConfirmed",
      "true"
    );


    /* Show ticket */

    confirmation.classList.add(
      "show"
    );


    /* Celebration */

    createHearts();

  }
);


/* =====================================================
   SHAKE
===================================================== */

function shakeElement(element) {

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
   SAFE HTML
===================================================== */

function escapeHTML(text) {

  const div =
    document.createElement(
      "div"
    );

  div.textContent =
    text;

  return div.innerHTML;

}


/* =====================================================
   HEART CELEBRATION
===================================================== */

function createHearts() {

  const symbols = [
    "♡",
    "♥",
    "✿",
    "✧",
    "♡",
    "☕"
  ];


  for (
    let i = 0;
    i < 28;
    i++
  ) {

    const heart =
      document.createElement(
        "div"
      );


    heart.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    heart.style.position =
      "fixed";

    heart.style.left =
      Math.random() * 100 + "vw";

    heart.style.top =
      (70 + Math.random() * 25) +
      "vh";

    heart.style.zIndex =
      "800";

    heart.style.pointerEvents =
      "none";

    heart.style.fontSize =
      (14 + Math.random() * 20) +
      "px";

    heart.style.color =
      "rgba(255,255,255,.9)";


    heart.animate(
      [
        {
          opacity: 0,

          transform:
            "translateY(0) scale(.5)"
        },

        {
          opacity: 1
        },

        {
          opacity: 0,

          transform:
            "translateY(-300px) rotate(25deg) scale(1.2)"
        }
      ],
      {
        duration:
          2200 +
          Math.random() * 1200,

        delay:
          Math.random() * 500,

        easing:
          "ease-out"
      }
    );


    document.body.appendChild(
      heart
    );


    setTimeout(
      () => heart.remove(),
      4000
    );

  }

}


/* =====================================================
   CLOSE TICKET
===================================================== */

closeButton.addEventListener(
  "click",
  () => {

    confirmation.classList.remove(
      "show"
    );

  }
);


/* =====================================================
   ESCAPE
===================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      confirmation.classList.remove(
        "show"
      );

    }

  }
);
