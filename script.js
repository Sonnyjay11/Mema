/* ========================= */
/* ELEMENTS */
/* ========================= */

const page1 =
  document.getElementById("page1");

const page2 =
  document.getElementById("page2");

const envelope =
  document.getElementById("envelope");

const openBtn =
  document.getElementById("openBtn");

const tapHint =
  document.getElementById("tapHint");

const songBtn =
  document.getElementById("songBtn");

const song =
  document.getElementById("song");

const dateInput =
  document.getElementById("date");

const timeInput =
  document.getElementById("time");

const yesBtn =
  document.getElementById("yesBtn");

const noBtn =
  document.getElementById("noBtn");

const hint =
  document.getElementById("hint");

const success =
  document.getElementById("success");

const chosenDate =
  document.getElementById("chosenDate");

const chosenTime =
  document.getElementById("chosenTime");


/* ========================= */
/* TODAY */
/* ========================= */

const today = new Date();

const yyyy =
  today.getFullYear();

const mm =
  String(today.getMonth() + 1)
    .padStart(2, "0");

const dd =
  String(today.getDate())
    .padStart(2, "0");

dateInput.min =
  `${yyyy}-${mm}-${dd}`;


/* ========================= */
/* OPEN LETTER */
/* ========================= */

openBtn.addEventListener(
  "click",
  () => {

    envelope.classList.add("open");

    tapHint.textContent =
      "I hope you like what's inside... ♡";

    openBtn.textContent =
      "Keep reading... ♡";


    setTimeout(() => {

      page1.classList.remove("active");

      page2.classList.add("active");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 1200);

  }
);


/* ========================= */
/* MUSIC */
/* ========================= */

song.addEventListener(
  "error",
  () => {

    songBtn.textContent =
      "♫ Check song file";

    console.log(
      "Could not load: Love Is.mp3"
    );

  }
);


songBtn.addEventListener(
  "click",
  async () => {

    try {

      if (song.paused) {

        await song.play();

        songBtn.textContent =
          "❚❚ Pause our little song";

      } else {

        song.pause();

        songBtn.textContent =
          "♫ Play our little song";

      }

    } catch (error) {

      console.error(error);

      songBtn.textContent =
        "♫ Song unavailable";

    }

  }
);


song.addEventListener(
  "ended",
  () => {

    songBtn.textContent =
      "♫ Play our little song";

  }
);


/* ========================= */
/* DATE / TIME */
/* ========================= */

function updateHint() {

  if (
    !dateInput.value ||
    !timeInput.value
  ) {

    hint.textContent =
      "Choose a day and time for us. ♡";

    return;
  }


  hint.textContent =
    "That sounds like a date to me... ♡";

}


dateInput.addEventListener(
  "change",
  updateHint
);

timeInput.addEventListener(
  "change",
  updateHint
);


/* ========================= */
/* YES */
/* ========================= */

yesBtn.addEventListener(
  "click",
  () => {

    if (
      !dateInput.value ||
      !timeInput.value
    ) {

      hint.textContent =
        "Choose our day and time first, Mimz. ♡";

      shake(hint);

      return;

    }


    const selectedDate =
      new Date(
        `${dateInput.value}T00:00:00`
      );


    const formattedDate =
      selectedDate.toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      );


    const formattedTime =
      new Date(
        `1970-01-01T${timeInput.value}`
      ).toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit"
        }
      );


    chosenDate.textContent =
      formattedDate;

    chosenTime.textContent =
      formattedTime;


    /* Play music from the button gesture */

    if (song.paused) {

      song.play().catch(() => {});

    }


    success.classList.add("show");

    createHeartBurst();

  }
);


/* ========================= */
/* SHAKE */
/* ========================= */

function shake(element) {

  element.animate(

    [
      { transform: "translateX(0)" },

      { transform: "translateX(-6px)" },

      { transform: "translateX(6px)" },

      { transform: "translateX(-4px)" },

      { transform: "translateX(4px)" },

      { transform: "translateX(0)" }

    ],

    {
      duration: 350
    }

  );

}


/* ========================= */
/* MAYBE BUTTON */
/* ========================= */

let noCount = 0;

const noMessages = [

  "Are you sure? 🥺",

  "Maybe coffee will change your mind?",

  "I'll bring good coffee. ♡",

  "Mimz pleaseee...",

  "Think about the coffee...",

  "Okay, I'll keep asking nicely. ♡"

];


noBtn.addEventListener(
  "mouseenter",
  moveNo
);


noBtn.addEventListener(
  "touchstart",
  (event) => {

    event.preventDefault();

    moveNo();

  }
);


function moveNo() {

  noCount++;

  const x =
    (Math.random() - .5) * 140;

  const y =
    (Math.random() - .5) * 70;


  noBtn.style.transform =
    `translate(${x}px, ${y}px)`;


  hint.textContent =
    noMessages[
      Math.min(
        noCount - 1,
        noMessages.length - 1
      )
    ];

}


/* ========================= */
/* HEART BURST */
/* ========================= */

function createHeartBurst() {

  for (
    let i = 0;
    i < 35;
    i++
  ) {

    const heart =
      document.createElement("span");

    heart.textContent =
      Math.random() > .5
        ? "♡"
        : "✦";

    heart.style.position =
      "fixed";

    heart.style.left =
      "50%";

    heart.style.top =
      "50%";

    heart.style.zIndex =
      "999";

    heart.style.pointerEvents =
      "none";

    heart.style.fontSize =
      `${14 + Math.random() * 22}px`;

    heart.style.color =
      "#69b5d5";

    document.body.appendChild(
      heart
    );


    const x =
      (Math.random() - .5) * 450;

    const y =
      (Math.random() - .5) * 500;


    heart.animate(

      [

        {
          transform:
            "translate(-50%, -50%) scale(1)",

          opacity: 1
        },

        {
          transform:
            `translate(
              calc(-50% + ${x}px),
              calc(-50% + ${y}px)
            )
            scale(.3)`,

          opacity: 0
        }

      ],

      {

        duration:
          1200 +
          Math.random() * 800,

        easing:
          "cubic-bezier(.17,.67,.38,1.2)"

      }

    ).onfinish =
      () => heart.remove();

  }

}
