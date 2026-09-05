/* ================================= */
/* ELEMENTS */
/* ================================= */

const page1 =
  document.getElementById("page1");

const page2 =
  document.getElementById("page2");

const letter =
  document.getElementById("letter");

const letterBtn =
  document.getElementById("letterBtn");

const letterHint =
  document.getElementById("letterHint");

const songBtn =
  document.getElementById("songBtn");

const song =
  document.getElementById("song");

const dateInput =
  document.getElementById("date");

const timeInput =
  document.getElementById("time");

const hint =
  document.getElementById("hint");

const yesBtn =
  document.getElementById("yesBtn");

const noBtn =
  document.getElementById("noBtn");

const success =
  document.getElementById("success");

const chosenDate =
  document.getElementById("chosenDate");

const chosenTime =
  document.getElementById("chosenTime");


/* ================================= */
/* STATE */
/* ================================= */

let letterOpened = false;

let noCount = 0;


/* ================================= */
/* TODAY */
/* ================================= */

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


/* ================================= */
/* LETTER */
/* ================================= */

letterBtn.addEventListener(
  "click",
  function () {

    /*
      FIRST CLICK:
      Reveal the letter.
    */

    if (!letterOpened) {

      letterOpened = true;

      letter.classList.add(
        "revealed"
      );

      letterBtn.textContent =
        "May itatanong ako sa'yo →";

      letterBtn.classList.add(
        "continue"
      );

      letterHint.textContent =
        "Basahin mo muna. Take your time. ♡";

      /*
        Scroll slightly so the
        complete letter is visible
        on smaller screens.
      */

      setTimeout(
        function () {

          letter.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        },
        250
      );

      return;
    }


    /*
      SECOND CLICK:
      Go to Page 2.

      There is NO timer.
      There is NO automatic
      page transition.
    */

    if (letterOpened) {

      goToPageTwo();

    }

  }
);


/* ================================= */
/* PAGE 2 */
/* ================================= */

function goToPageTwo() {

  page1.classList.remove(
    "active"
  );

  page2.classList.add(
    "active"
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ================================= */
/* MUSIC */
/* ================================= */

song.addEventListener(
  "error",
  function () {

    songBtn.textContent =
      "♫ Check song file";

  }
);


songBtn.addEventListener(
  "click",
  async function () {

    try {

      if (song.paused) {

        await song.play();

        songBtn.textContent =
          "❚❚ Pause our little song";

      }

      else {

        song.pause();

        songBtn.textContent =
          "♫ Play our little song";

      }

    }

    catch (error) {

      console.log(error);

      songBtn.textContent =
        "♫ Song unavailable";

    }

  }
);


song.addEventListener(
  "ended",
  function () {

    songBtn.textContent =
      "♫ Play our little song";

  }
);


/* ================================= */
/* DATE / TIME */
/* ================================= */

function updateDateHint() {

  if (
    !dateInput.value ||
    !timeInput.value
  ) {

    hint.textContent =
      "Pili ka muna ng araw at oras. ♡";

    return;

  }


  hint.textContent =
    "Okay... parang magandang date 'yan. ♡";

}


dateInput.addEventListener(
  "change",
  updateDateHint
);


timeInput.addEventListener(
  "change",
  updateDateHint
);


/* ================================= */
/* YES */
/* ================================= */

yesBtn.addEventListener(
  "click",
  function () {

    /*
      Require both selections.
    */

    if (
      !dateInput.value ||
      !timeInput.value
    ) {

      hint.textContent =
        "Pili ka muna ng araw at oras, Mimz. ♡";

      shake(hint);

      return;

    }


    /* ================================= */
    /* FORMAT DATE */
    /* ================================= */

    const selectedDate =
      new Date(
        `${dateInput.value}T00:00:00`
      );


    const formattedDate =
      selectedDate.toLocaleDateString(
        "en-US",
        {
          weekday:
            "long",

          month:
            "long",

          day:
            "numeric",

          year:
            "numeric"
        }
      );


    /* ================================= */
    /* FORMAT TIME */
    /* ================================= */

    const formattedTime =
      new Date(
        `1970-01-01T${timeInput.value}`
      ).toLocaleTimeString(
        "en-US",
        {
          hour:
            "numeric",

          minute:
            "2-digit"
        }
      );


    chosenDate.textContent =
      formattedDate;


    chosenTime.textContent =
      formattedTime;


    /*
      Try playing the song because
      this action came from a
      user tap/click.
    */

    if (song.paused) {

      song.play().catch(
        function () {}
      );

    }


    /*
      Show success screen.
    */

    success.classList.add(
      "show"
    );


    createHeartBurst();

  }
);


/* ================================= */
/* SHAKE */
/* ================================= */

function shake(element) {

  element.animate(
    [
      {
        transform:
          "translateX(0)"
      },

      {
        transform:
          "translateX(-6px)"
      },

      {
        transform:
          "translateX(6px)"
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
      duration:
        350
    }
  );

}


/* ================================= */
/* MAYBE BUTTON */
/* ================================= */

const noMessages = [

  "Are you sure? 🥺",

  "Maybe coffee will change your mind?",

  "I'll bring good coffee. ♡",

  "Mimz pleaseee...",

  "Think about the coffee...",

  "Sige, pag-isipan mo muna. ♡"

];


noBtn.addEventListener(
  "mouseenter",
  moveMaybeButton
);


/*
  Works on phones/tablets.
*/

noBtn.addEventListener(
  "touchstart",
  function (event) {

    event.preventDefault();

    moveMaybeButton();

  },
  {
    passive: false
  }
);


function moveMaybeButton() {

  noCount++;


  const x =
    (Math.random() - 0.5) * 130;


  const y =
    (Math.random() - 0.5) * 60;


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


/* ================================= */
/* HEART BURST */
/* ================================= */

function createHeartBurst() {

  const symbols = [
    "♡",
    "♡",
    "✦",
    "✧"
  ];


  for (
    let i = 0;
    i < 30;
    i++
  ) {

    const heart =
      document.createElement(
        "span"
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
      "50%";

    heart.style.top =
      "50%";

    heart.style.zIndex =
      "999";

    heart.style.pointerEvents =
      "none";

    heart.style.fontSize =
      `${14 + Math.random() * 20}px`;

    heart.style.color =
      "#69b4d2";


    document.body.appendChild(
      heart
    );


    const x =
      (Math.random() - 0.5) *
      430;


    const y =
      (Math.random() - 0.5) *
      500;


    heart.animate(
      [

        {
          transform:
            "translate(-50%, -50%) scale(1)",

          opacity:
            1

        },

        {

          transform:
            `translate(
              calc(-50% + ${x}px),
              calc(-50% + ${y}px)
            )
            scale(.25)`,

          opacity:
            0

        }

      ],
      {

        duration:
          1000 +
          Math.random() * 700,

        easing:
          "cubic-bezier(.17,.67,.38,1.2)"

      }

    ).onfinish =
      function () {

        heart.remove();

      };

  }

}
