/* =========================================================
   FOR CARMINA ♡
   Romantic Coffee Invitation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================== */

  const letterPage =
    document.getElementById("letterPage");

  const datePage =
    document.getElementById("datePage");

  const waitPage =
    document.getElementById("waitPage");

  const confirmationPage =
    document.getElementById("confirmationPage");


  const letter =
    document.getElementById("letter");

  const letterButton =
    document.getElementById("letterButton");

  const letterButtonText =
    document.getElementById("letterButtonText");

  const letterButtonArrow =
    document.getElementById("letterButtonArrow");

  const letterHint =
    document.getElementById("letterHint");


  const song =
    document.getElementById("song");

  const musicButton =
    document.getElementById("musicButton");


  const dateInput =
    document.getElementById("dateInput");

  const timeInput =
    document.getElementById("timeInput");


  const datePreview =
    document.getElementById("datePreview");

  const previewDate =
    document.getElementById("previewDate");

  const previewTime =
    document.getElementById("previewTime");

  const selectionMessage =
    document.getElementById("selectionMessage");


  const yesButton =
    document.getElementById("yesButton");

  const maybeButton =
    document.getElementById("maybeButton");


  const confirmedDate =
    document.getElementById("confirmedDate");

  const confirmedTime =
    document.getElementById("confirmedTime");


  const calendarButton =
    document.getElementById("calendarButton");


  const secretButton =
    document.getElementById("secretButton");

  const secretMessage =
    document.getElementById("secretMessage");


  const memoryImage =
    document.getElementById("memoryImage");

  const memoryFallback =
    document.getElementById("memoryFallback");


  const heartContainer =
    document.getElementById("heartContainer");


  /* =======================================================
     STATE
  ======================================================== */

  let letterOpened = false;
  let musicStarted = false;
  let maybeClicks = 0;
  let secretClicks = 0;
  let bookingStarted = false;


  /* =======================================================
     DATE
  ======================================================== */

  function getToday() {

    const today = new Date();

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

    return `${year}-${month}-${day}`;
  }


  function setupDate() {

    dateInput.min = getToday();

  }


  /* =======================================================
     FRIENDLY DATE
  ======================================================== */

  function formatDate(value) {

    if (!value) {
      return "Choose a day ♡";
    }

    const [
      year,
      month,
      day
    ] = value.split("-").map(Number);

    const date = new Date(
      year,
      month - 1,
      day
    );

    return date.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric"
      }
    );
  }


  /* =======================================================
     FRIENDLY TIME
  ======================================================== */

  function formatTime(value) {

    if (!value) {
      return "Choose a time ☕";
    }

    let [
      hour,
      minute
    ] = value.split(":").map(Number);

    const period =
      hour >= 12
        ? "PM"
        : "AM";

    hour %= 12;

    if (hour === 0) {
      hour = 12;
    }

    return `${hour}:${String(minute).padStart(2, "0")} ${period}`;
  }


  /* =======================================================
     MUSIC
  ======================================================== */

  function startMusic() {

    if (musicStarted) {
      return;
    }

    song.volume = 0.45;

    const play =
      song.play();

    if (!play) {
      return;
    }

    play
      .then(() => {

        musicStarted = true;

        musicButton.classList.add(
          "playing"
        );

        musicButton.setAttribute(
          "aria-pressed",
          "true"
        );

      })
      .catch(() => {

        musicStarted = false;

      });

  }


  musicButton.addEventListener(
    "click",
    () => {

      if (song.paused) {

        song.volume = 0.45;

        song.play()
          .then(() => {

            musicStarted = true;

            musicButton.classList.add(
              "playing"
            );

            musicButton.setAttribute(
              "aria-pressed",
              "true"
            );

          })
          .catch(() => {});

      } else {

        song.pause();

        musicButton.classList.remove(
          "playing"
        );

        musicButton.setAttribute(
          "aria-pressed",
          "false"
        );

      }

    }
  );


  /* =======================================================
     PAGE TRANSITION
  ======================================================== */

  function showPage(
    currentPage,
    nextPage
  ) {

    currentPage.classList.remove(
      "active"
    );

    currentPage.setAttribute(
      "aria-hidden",
      "true"
    );


    nextPage.classList.add(
      "active"
    );

    nextPage.setAttribute(
      "aria-hidden",
      "false"
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* =======================================================
     HEARTS
  ======================================================== */

  function createHearts(amount = 10) {

    const symbols = [
      "♡",
      "♡",
      "♥",
      "✦"
    ];

    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const heart =
        document.createElement("span");

      heart.className =
        "flying-heart";

      heart.textContent =
        symbols[
          Math.floor(
            Math.random() * symbols.length
          )
        ];


      const x =
        (Math.random() - 0.5) * 450;

      const y =
        -100 - Math.random() * 330;

      const rotation =
        (Math.random() - 0.5) * 55;


      heart.style.setProperty(
        "--x",
        `${x}px`
      );

      heart.style.setProperty(
        "--y",
        `${y}px`
      );

      heart.style.setProperty(
        "--rotation",
        `${rotation}deg`
      );


      heart.style.left =
        `${35 + Math.random() * 30}%`;

      heart.style.top =
        `${52 + Math.random() * 10}%`;


      heart.style.animationDelay =
        `${Math.random() * .2}s`;


      heartContainer.appendChild(
        heart
      );


      setTimeout(
        () => heart.remove(),
        1900
      );

    }

  }


  /* =======================================================
     LETTER OPENING
  ======================================================== */

  letterButton.addEventListener(
    "click",
    () => {

      if (!letterOpened) {

        letterOpened = true;

        startMusic();

        letter.classList.add(
          "open"
        );

        letterButtonText.textContent =
          "Okay, next...";

        letterButtonArrow.textContent =
          "☕";

        letterHint.textContent =
          "Take your time. ♡";

        createHearts(10);

        return;

      }


      showPage(
        letterPage,
        datePage
      );

    }
  );


  /* =======================================================
     DATE PREVIEW
  ======================================================== */

  function updatePreview() {

    const hasDate =
      Boolean(dateInput.value);

    const hasTime =
      Boolean(timeInput.value);


    previewDate.textContent =
      hasDate
        ? formatDate(dateInput.value)
        : "Choose a day ♡";


    previewTime.textContent =
      hasTime
        ? formatTime(timeInput.value)
        : "Choose a time ☕";


    if (
      hasDate &&
      hasTime
    ) {

      datePreview.classList.add(
        "ready"
      );

      selectionMessage.textContent =
        "Okay... I'm already looking forward to this. ♡";

    } else if (hasDate) {

      datePreview.classList.remove(
        "ready"
      );

      selectionMessage.textContent =
        "Cute. Now tell me what time. 👀";

    } else if (hasTime) {

      datePreview.classList.remove(
        "ready"
      );

      selectionMessage.textContent =
        "We have a time... now pick a day. ♡";

    } else {

      datePreview.classList.remove(
        "ready"
      );

      selectionMessage.textContent =
        "Your move. 👀";

    }

  }


  function animateMessage() {

    selectionMessage.classList.remove(
      "pop"
    );

    void selectionMessage.offsetWidth;

    selectionMessage.classList.add(
      "pop"
    );

  }


  dateInput.addEventListener(
    "change",
    () => {

      updatePreview();
      animateMessage();

    }
  );


  timeInput.addEventListener(
    "change",
    () => {

      updatePreview();
      animateMessage();

    }
  );


  /* =======================================================
     MAYBE BUTTON
  ======================================================== */

  const maybeMessages = [

    "Sure ka ba? 👀",

    "Coffee lang naman oh ☕",

    "Libre ko na HAHAHA",

    "Hindi kita pine-pressure 😭",

    "...pero sana yes. ♡",

    "Okay last na talaga... 🥹"

  ];


  maybeButton.addEventListener(
    "click",
    () => {

      maybeClicks++;


      const index =
        Math.min(
          maybeClicks - 1,
          maybeMessages.length - 1
        );


      maybeButton.textContent =
        maybeMessages[index];


      animateMessage();

    }
  );


  /* =======================================================
     VALIDATION
  ======================================================== */

  function validateDate() {

    if (!dateInput.value) {

      selectionMessage.textContent =
        "Pick a day first, please. ♡";

      dateInput.focus();

      animateMessage();

      return false;

    }


    if (!timeInput.value) {

      selectionMessage.textContent =
        "And what time should I save for you? ☕";

      timeInput.focus();

      animateMessage();

      return false;

    }


    return true;

  }


  /* =======================================================
     CONFIRMATION
  ======================================================== */

  function prepareConfirmation() {

    confirmedDate.textContent =
      formatDate(
        dateInput.value
      );

    confirmedTime.textContent =
      formatTime(
        timeInput.value
      );

  }


  /* =======================================================
     YES
  ======================================================== */

  yesButton.addEventListener(
    "click",
    () => {

      if (bookingStarted) {
        return;
      }


      if (!validateDate()) {
        return;
      }


      bookingStarted = true;


      prepareConfirmation();

      createHearts(15);


      showPage(
        datePage,
        waitPage
      );


      setTimeout(
        () => {

          showPage(
            waitPage,
            confirmationPage
          );

          createHearts(22);

        },
        2500
      );

    }
  );


  /* =======================================================
     GOOGLE CALENDAR
  ======================================================== */

  calendarButton.addEventListener(
    "click",
    () => {

      if (
        !dateInput.value ||
        !timeInput.value
      ) {
        return;
      }


      const [
        year,
        month,
        day
      ] = dateInput.value
        .split("-")
        .map(Number);


      const [
        hour,
        minute
      ] = timeInput.value
        .split(":")
        .map(Number);


      const start =
        new Date(
          year,
          month - 1,
          day,
          hour,
          minute
        );


      const end =
        new Date(
          start.getTime()
          + 90 * 60 * 1000
        );


      function calendarDate(date) {

        const y =
          date.getFullYear();

        const m =
          String(
            date.getMonth() + 1
          ).padStart(2, "0");

        const d =
          String(
            date.getDate()
          ).padStart(2, "0");

        const h =
          String(
            date.getHours()
          ).padStart(2, "0");

        const min =
          String(
            date.getMinutes()
          ).padStart(2, "0");

        return (
          `${y}${m}${d}` +
          `T${h}${min}00`
        );

      }


      const startTime =
        calendarDate(start);

      const endTime =
        calendarDate(end);


      const url =
        "https://calendar.google.com/calendar/render" +
        "?action=TEMPLATE" +
        "&text=" +
        encodeURIComponent(
          "Coffee date ☕♡"
        ) +
        "&dates=" +
        `${startTime}/${endTime}` +
        "&details=" +
        encodeURIComponent(
          "A little coffee date. ♡\n\n" +
          "Don't be late HAHAHA."
        ) +
        "&location=" +
        encodeURIComponent(
          "Coffee date ☕"
        );


      window.open(
        url,
        "_blank"
      );

    }
  );


  /* =======================================================
     SECRET MESSAGE
  ======================================================== */

  secretButton.addEventListener(
    "click",
    () => {

      secretClicks++;


      if (secretClicks >= 3) {

        secretMessage.classList.add(
          "show"
        );

        secretButton.textContent =
          "♥";

        createHearts(8);

      }

    }
  );


  /* =======================================================
     PHOTO FALLBACK
  ======================================================== */

  memoryImage.addEventListener(
    "error",
    () => {

      memoryImage.style.display =
        "none";

      memoryFallback.style.display =
        "flex";

    }
  );


  /* =======================================================
     PAUSE MUSIC WHEN LEAVING TAB
  ======================================================== */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden &&
        !song.paused
      ) {

        song.pause();

        musicButton.classList.remove(
          "playing"
        );

        musicButton.setAttribute(
          "aria-pressed",
          "false"
        );

      }

    }
  );


  /* =======================================================
     INITIALIZE
  ======================================================== */

  setupDate();

  updatePreview();


  const pages = [
    letterPage,
    datePage,
    waitPage,
    confirmationPage
  ];


  pages.forEach(
    (page) => {

      if (page !== letterPage) {

        page.classList.remove(
          "active"
        );

        page.setAttribute(
          "aria-hidden",
          "true"
        );

      }

    }
  );


  song.volume = 0.45;

});
