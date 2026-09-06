document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================== */

  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");
  const waitScreen = document.getElementById("waitScreen");
  const confirmation = document.getElementById("confirmation");

  const letterBtn = document.getElementById("letterBtn");
  const buttonText = document.getElementById("buttonText");
  const buttonArrow = document.getElementById("buttonArrow");

  const paperLetter = document.getElementById("paperLetter");
  const hintText = document.getElementById("hintText");

  const song = document.getElementById("song");
  const musicButton = document.getElementById("musicButton");

  const dateInput = document.getElementById("dateInput");
  const timeInput = document.getElementById("timeInput");

  const selectionPreview =
    document.getElementById("selectionPreview");

  const previewDate =
    document.getElementById("previewDate");

  const previewTime =
    document.getElementById("previewTime");

  const selectionHint =
    document.getElementById("selectionHint");

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

  const secretHeart =
    document.getElementById("secretHeart");

  const secretMessage =
    document.getElementById("secretMessage");

  const heartContainer =
    document.getElementById("heartContainer");

  const memoryPhoto =
    document.getElementById("memoryPhoto");

  const photoFallback =
    document.getElementById("photoFallback");


  /* =======================================================
     STATE
  ======================================================== */

  let letterOpened = false;
  let musicStarted = false;
  let maybeClicks = 0;
  let secretClicks = 0;
  let bookingLocked = false;


  /* =======================================================
     DATE HELPERS
  ======================================================== */

  function getLocalDateString() {

    const now = new Date();

    const year = now.getFullYear();

    const month = String(
      now.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      now.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }


  function setMinimumDate() {

    dateInput.min = getLocalDateString();

  }


  /* =======================================================
     FRIENDLY DATE
  ======================================================== */

  function formatFriendlyDate(value) {

    if (!value) {
      return "Choose a day ♡";
    }

    const parts = value.split("-");

    if (parts.length !== 3) {
      return value;
    }

    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);

    const date = new Date(
      year,
      month,
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

  function formatFriendlyTime(value) {

    if (!value) {
      return "Choose a time ☕";
    }

    const parts = value.split(":");

    let hour = Number(parts[0]);
    const minute = parts[1];

    const suffix = hour >= 12
      ? "PM"
      : "AM";

    hour = hour % 12;

    if (hour === 0) {
      hour = 12;
    }

    return `${hour}:${minute} ${suffix}`;
  }


  /* =======================================================
     MUSIC
  ======================================================== */

  function startMusic() {

    if (musicStarted) {
      return;
    }

    musicStarted = true;

    song.volume = 0.45;

    const playPromise = song.play();

    if (playPromise !== undefined) {

      playPromise
        .then(() => {

          musicButton.classList.add("playing");

          musicButton.setAttribute(
            "aria-pressed",
            "true"
          );

        })
        .catch(() => {

          musicStarted = false;

        });

    }

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


  song.addEventListener(
    "ended",
    () => {

      musicButton.classList.remove(
        "playing"
      );

      musicButton.setAttribute(
        "aria-pressed",
        "false"
      );

    }
  );


  /* =======================================================
     PAGE SWITCHING
  ======================================================== */

  function switchPage(from, to) {

    from.classList.remove("active");
    from.setAttribute("aria-hidden", "true");

    to.classList.add("active");
    to.setAttribute("aria-hidden", "false");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* =======================================================
     FLYING HEARTS
  ======================================================== */

  function createHearts(amount = 10) {

    const symbols = [
      "♡",
      "♡",
      "♥",
      "✦"
    ];

    for (let i = 0; i < amount; i++) {

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
        (Math.random() - 0.5) * 420;

      const y =
        -120 - Math.random() * 300;

      const rotation =
        (Math.random() - 0.5) * 50;

      heart.style.setProperty(
        "--x",
        `${x}px`
      );

      heart.style.setProperty(
        "--y",
        `${y}px`
      );

      heart.style.setProperty(
        "--r",
        `${rotation}deg`
      );

      heart.style.left =
        `${35 + Math.random() * 30}%`;

      heart.style.top =
        `${50 + Math.random() * 15}%`;

      heart.style.animationDelay =
        `${Math.random() * .25}s`;

      heartContainer.appendChild(
        heart
      );

      setTimeout(() => {
        heart.remove();
      }, 1900);

    }

  }


  /* =======================================================
     LETTER
  ======================================================== */

  letterBtn.addEventListener(
    "click",
    () => {

      if (!letterOpened) {

        letterOpened = true;

        startMusic();

        paperLetter.classList.add("open");

        letterBtn.classList.add("opened");

        buttonText.textContent =
          "Okay, next...";

        buttonArrow.textContent =
          "☕";

        hintText.textContent =
          "Take your time. ♡";

        createHearts(10);

        return;

      }

      switchPage(
        page1,
        page2
      );

    }
  );


  /* =======================================================
     DATE/TIME PREVIEW
  ======================================================== */

  function updatePreview() {

    const hasDate =
      Boolean(dateInput.value);

    const hasTime =
      Boolean(timeInput.value);

    if (hasDate) {

      previewDate.textContent =
        formatFriendlyDate(
          dateInput.value
        );

    } else {

      previewDate.textContent =
        "Choose a day ♡";

    }


    if (hasTime) {

      previewTime.textContent =
        formatFriendlyTime(
          timeInput.value
        );

    } else {

      previewTime.textContent =
        "Choose a time ☕";

    }


    if (hasDate && hasTime) {

      selectionPreview.classList.add(
        "ready"
      );

      selectionHint.textContent =
        "Okay... I'm already looking forward to this. ♡";

    } else if (hasDate) {

      selectionPreview.classList.remove(
        "ready"
      );

      selectionHint.textContent =
        "Cute. Now tell me what time. 👀";

    } else if (hasTime) {

      selectionPreview.classList.remove(
        "ready"
      );

      selectionHint.textContent =
        "We have a time... now pick a day. ♡";

    } else {

      selectionPreview.classList.remove(
        "ready"
      );

      selectionHint.textContent =
        "Your move. 👀";

    }

  }


  function animateHint() {

    selectionHint.classList.remove(
      "pop"
    );

    void selectionHint.offsetWidth;

    selectionHint.classList.add(
      "pop"
    );

  }


  dateInput.addEventListener(
    "change",
    () => {

      updatePreview();
      animateHint();

    }
  );


  timeInput.addEventListener(
    "change",
    () => {

      updatePreview();
      animateHint();

    }
  );


  /* =======================================================
     PLAYFUL MAYBE BUTTON
  ======================================================== */

  const maybeMessages = [

    "Sure ka ba? 👀",

    "Coffee lang naman oh ☕",

    "Libre ko na HAHAHA",

    "Hindi kita pine-pressure 😭",

    "...pero sana yes. ♡",

    "Last na talaga... please? 🥹"

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

      animateHint();

      if (maybeClicks >= 4) {

        maybeButton.style.transform =
          "rotate(-3deg)";

      }

    }
  );


  /* =======================================================
     VALIDATION
  ======================================================== */

  function validateSelection() {

    if (!dateInput.value) {

      selectionHint.textContent =
        "Pick a day first, please. ♡";

      dateInput.focus();

      animateHint();

      return false;

    }


    if (!timeInput.value) {

      selectionHint.textContent =
        "And what time should I save for you? ☕";

      timeInput.focus();

      animateHint();

      return false;

    }


    return true;

  }


  /* =======================================================
     YES BUTTON
  ======================================================== */

  yesButton.addEventListener(
    "click",
    () => {

      if (bookingLocked) {
        return;
      }

      if (!validateSelection()) {
        return;
      }

      bookingLocked = true;

      createHearts(16);

      switchPage(
        page2,
        waitScreen
      );


      setTimeout(() => {

        showConfirmation();

      }, 2500);

    }
  );


  /* =======================================================
     CONFIRMATION
  ======================================================== */

  function showConfirmation() {

    const friendlyDate =
      formatFriendlyDate(
        dateInput.value
      );

    const friendlyTime =
      formatFriendlyTime(
        timeInput.value
      );

    confirmedDate.textContent =
      friendlyDate;

    confirmedTime.textContent =
      friendlyTime;

    switchPage(
      waitScreen,
      confirmation
    );

    setTimeout(() => {

      createHearts(22);

    }, 250);

  }


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


      const [year, month, day] =
        dateInput.value
          .split("-")
          .map(Number);


      const [hour, minute] =
        timeInput.value
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


      function calendarFormat(date) {

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

        const s = "00";

        return `${y}${m}${d}T${h}${min}${s}`;

      }


      const startString =
        calendarFormat(start);

      const endString =
        calendarFormat(end);


      const calendarUrl =
        "https://calendar.google.com/calendar/render" +
        "?action=TEMPLATE" +
        "&text=" +
        encodeURIComponent(
          "Coffee date ☕♡"
        ) +
        "&dates=" +
        startString +
        "/" +
        endString +
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
        calendarUrl,
        "_blank"
      );

    }
  );


  /* =======================================================
     SECRET EASTER EGG
  ======================================================== */

  secretHeart.addEventListener(
    "click",
    () => {

      secretClicks++;

      if (secretClicks >= 3) {

        secretMessage.classList.add(
          "show"
        );

        createHearts(8);

        secretHeart.textContent =
          "♥";

      }

    }
  );


  /* =======================================================
     PHOTO FALLBACK
  ======================================================== */

  memoryPhoto.addEventListener(
    "error",
    () => {

      memoryPhoto.style.display =
        "none";

      photoFallback.style.display =
        "flex";

    }
  );


  /* =======================================================
     TAB VISIBILITY
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
     INITIAL STATE
  ======================================================== */

  setMinimumDate();

  updatePreview();

  page1.classList.add("active");

  page2.classList.remove("active");
  waitScreen.classList.remove("active");
  confirmation.classList.remove("active");

  page1.setAttribute(
    "aria-hidden",
    "false"
  );

  page2.setAttribute(
    "aria-hidden",
    "true"
  );

  waitScreen.setAttribute(
    "aria-hidden",
    "true"
  );

  confirmation.setAttribute(
    "aria-hidden",
    "true"
  );

  song.volume = 0.45;

});
