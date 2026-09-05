/* =====================================================
   ELEMENTS
===================================================== */

const entryScreen =
  document.getElementById("entryScreen");

const enterButton =
  document.getElementById("enterButton");

const song =
  document.getElementById("song");

const musicButton =
  document.getElementById("musicButton");

const musicIcon =
  document.getElementById("musicIcon");

const musicText =
  document.getElementById("musicText");

const page1 =
  document.getElementById("page1");

const page2 =
  document.getElementById("page2");

const paperLetter =
  document.getElementById("paperLetter");

const letterBtn =
  document.getElementById("letterBtn");

const hintText =
  document.getElementById("hintText");

const dateInput =
  document.getElementById("date");

const timeInput =
  document.getElementById("time");

const dateHint =
  document.getElementById("dateHint");

const messageInput =
  document.getElementById("message");

const characterCount =
  document.getElementById("characterCount");

const yesBtn =
  document.getElementById("yesBtn");

const maybeBtn =
  document.getElementById("maybeBtn");

const kiligText =
  document.getElementById("kiligText");

const successOverlay =
  document.getElementById("successOverlay");

const ticketDate =
  document.getElementById("ticketDate");

const ticketTime =
  document.getElementById("ticketTime");

const ticketMessage =
  document.getElementById("ticketMessage");

const closeTicket =
  document.getElementById("closeTicket");


/* =====================================================
   STATE
===================================================== */

let letterOpened = false;

let musicPlaying = false;

let maybeIndex = 0;


/* =====================================================
   ENTRY + MUSIC
===================================================== */

enterButton.addEventListener("click", async () => {

  entryScreen.classList.add("hide");

  try {

    await song.play();

    musicPlaying = true;

    updateMusicButton();

  } catch (error) {

    console.log(
      "Music could not start automatically."
    );

  }

});


/* =====================================================
   MUSIC BUTTON
===================================================== */

musicButton.addEventListener("click", async () => {

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

  updateMusicButton();

});


function updateMusicButton() {

  if (musicPlaying) {

    musicButton.classList.add("playing");

    musicIcon.textContent = "♫";

    musicText.textContent = "Love Is";

  } else {

    musicButton.classList.remove("playing");

    musicIcon.textContent = "▶";

    musicText.textContent = "Music";

  }

}


/* =====================================================
   LETTER
===================================================== */

letterBtn.addEventListener("click", () => {

  if (!letterOpened) {

    paperLetter.classList.add("open");

    letterOpened = true;

    letterBtn.textContent =
      "May itatanong ako sa'yo →";

    hintText.textContent =
      "Basahin mo muna... don't rush ♡";

    setTimeout(() => {

      paperLetter.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }, 300);

    return;
  }


  goToPage2();

});


/* =====================================================
   PAGE TRANSITION
===================================================== */

function goToPage2() {

  page1.classList.remove("active");

  setTimeout(() => {

    page2.classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, 200);

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
   DATE
===================================================== */

dateInput.addEventListener(
  "change",
  saveBooking
);

timeInput.addEventListener(
  "change",
  saveBooking
);


function saveBooking() {

  localStorage.setItem(
    "coffeeDate",
    dateInput.value
  );

  localStorage.setItem(
    "coffeeTime",
    timeInput.value
  );


  if (
    dateInput.value &&
    timeInput.value
  ) {

    dateHint.textContent =
      "Okay... may schedule na tayo. 👀";

    changeKiligMessage(
      "Wait... legit may date na tayo? 👀"
    );

  }

}


/* =====================================================
   RESTORE BOOKING
===================================================== */

function restoreBooking() {

  const savedDate =
    localStorage.getItem("coffeeDate");

  const savedTime =
    localStorage.getItem("coffeeTime");

  const savedMessage =
    localStorage.getItem("coffeeMessage");


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

    dateHint.textContent =
      "May napili ka na pala. 👀";

  }

}

restoreBooking();


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
   KULIT MESSAGES
===================================================== */

const kiligMessages = [

  "Sige na... pumili ka na HAHAHA.",

  "Hindi naman kita pine-pressure... konti lang. 👀",

  "Imagine mo na lang may coffee tayo habang nagkukwentuhan. ☕",

  "Okay lang mag-isip... basta pili ka. HAHAHA.",

  "Jay has entered his booking-system era. 😭",

  "Please cooperate with the management. HAHAHA.",

  "This is a very serious business transaction. ☕",

  "Date application form po ito. Kindly accomplish. 😂",

  "Mimz, wag mo akong pahirapan. HAHAHA.",

  "Lowkey hoping na pili ka ng malapit. 👀",

  "Take your time... pero sana ngayon. HAHAHA.",

  "Imagine natin na reservation na talaga 'to. ♡"

];


function changeKiligMessage(message) {

  kiligText.style.opacity = "0";

  setTimeout(() => {

    kiligText.textContent =
      message;

    kiligText.style.opacity = "1";

  }, 180);

}


/* =====================================================
   RANDOM KULIT MESSAGE
===================================================== */

setInterval(() => {

  if (
    page2.classList.contains("active") &&
    !successOverlay.classList.contains("show")
  ) {

    const random =
      kiligMessages[
        Math.floor(
          Math.random() *
          kiligMessages.length
        )
      ];

    changeKiligMessage(random);

  }

}, 7000);


/* =====================================================
   MAYBE BUTTON
===================================================== */

const maybeMessages = [

  "Maybe... 👀",

  "Sure ka ba? 😭",

  "Pag-isipan mo muna HAHAHA.",

  "May coffee naman. ☕",

  "Hindi kita pine-pressure...",

  "Pero sana oo. 👀",

  "Last chance na 'to.",

  "Mimz naman oh HAHAHA.",

  "One coffee lang. Promise. ♡",

  "Okay... I'll wait. 🥹",

  "So... yes? 👀"

];


maybeBtn.addEventListener("click", () => {

  maybeIndex++;

  if (
    maybeIndex >=
    maybeMessages.length
  ) {

    maybeIndex = 0;

  }

  maybeBtn.textContent =
    maybeMessages[maybeIndex];


  changeKiligMessage(
    maybeMessages[maybeIndex]
  );

});


/* =====================================================
   CONFIRM
===================================================== */

yesBtn.addEventListener(
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

      dateHint.textContent =
        "Hoyyy, date and time muna please. 😂♡";

      changeKiligMessage(
        "Hindi pa complete ang booking form, Mimz. 👀"
      );

      dateInput.focus();

      return;

    }


    const dateObject =
      new Date(
        `${selectedDate}T${selectedTime}`
      );


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


    const formattedTime =
      dateObject.toLocaleTimeString(
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


    const message =
      messageInput.value.trim();


    if (message) {

      ticketMessage.innerHTML =
        `"${escapeHTML(message)}" ♡`;

    } else {

      ticketMessage.textContent =
        "No message needed. I'll see you there. ♡";

    }


    localStorage.setItem(
      "coffeeConfirmed",
      "true"
    );


    successOverlay.classList.add(
      "show"
    );


    createCelebration();


    setTimeout(() => {

      changeKiligMessage(
        "AYAN NA. DATE NA TALAGA. 😭♡"
      );

    }, 500);

  }
);


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent =
    text;

  return div.innerHTML;

}


/* =====================================================
   CELEBRATION
===================================================== */

function createCelebration() {

  const symbols = [
    "♡",
    "♥",
    "✿",
    "✧",
    "☕",
    "♡",
    "✿"
  ];


  for (
    let i = 0;
    i < 35;
    i++
  ) {

    const item =
      document.createElement("div");


    item.className =
      "celebration";


    item.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    item.style.left =
      Math.random() * 100 + "vw";


    item.style.top =
      70 +
      Math.random() * 30 +
      "vh";


    item.style.animationDelay =
      Math.random() * .8 + "s";


    item.style.fontSize =
      15 +
      Math.random() * 25 +
      "px";


    document.body.appendChild(item);


    setTimeout(() => {

      item.remove();

    }, 3500);

  }

}


/* =====================================================
   CLOSE TICKET
===================================================== */

closeTicket.addEventListener(
  "click",
  () => {

    successOverlay.classList.remove(
      "show"
    );


    changeKiligMessage(
      "Okay... so when are we getting coffee? 👀♡"
    );

  }
);


/* =====================================================
   KEYBOARD SUPPORT
===================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      successOverlay.classList.contains("show")
    ) {

      successOverlay.classList.remove(
        "show"
      );

    }

  }
);
