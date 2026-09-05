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

const inviteCard =
  document.getElementById("inviteCard");

const success =
  document.getElementById("success");

const chosenDate =
  document.getElementById("chosenDate");

const chosenTime =
  document.getElementById("chosenTime");

const songBtn =
  document.getElementById("songBtn");

const song =
  document.getElementById("song");


// TODAY

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


// DATE/TIME MESSAGE

function updateHint() {

  if (
    !dateInput.value ||
    !timeInput.value
  ) {

    hint.textContent =
      "Choose a date and time first.";

    return;
  }

  hint.textContent =
    "Looks good... now just say yes. ♡";
}


dateInput.addEventListener(
  "change",
  updateHint
);

timeInput.addEventListener(
  "change",
  updateHint
);


// YES

yesBtn.addEventListener(
  "click",
  () => {

    if (
      !dateInput.value ||
      !timeInput.value
    ) {

      hint.textContent =
        "Pick a date and time first, Mimz. ♡";

      hint.animate(
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
          duration: 250
        }
      );

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


    inviteCard.classList.add(
      "hidden"
    );

    success.classList.remove(
      "hidden"
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


    createHeartBurst();

  }
);


// HEART ANIMATION

function createHeartBurst() {

  for (
    let i = 0;
    i < 18;
    i++
  ) {

    const heart =
      document.createElement("span");

    heart.textContent =
      "♡";

    heart.style.position =
      "fixed";

    heart.style.left =
      `${45 + Math.random() * 10}%`;

    heart.style.top =
      `${45 + Math.random() * 10}%`;

    heart.style.fontSize =
      `${14 + Math.random() * 18}px`;

    heart.style.color =
      "#4baed8";

    heart.style.pointerEvents =
      "none";

    heart.style.zIndex =
      "999";

    document.body.appendChild(
      heart
    );


    heart.animate(

      [

        {
          transform:
            "translate(0,0) scale(1)",

          opacity: 1

        },

        {

          transform:
            `translate(
              ${(Math.random() - .5) * 300}px,
              ${-80 - Math.random() * 250}px
            )
            scale(.5)`,

          opacity: 0

        }

      ],

      {

        duration:
          1100 +
          Math.random() * 500,

        easing:
          "ease-out"

      }

    ).onfinish = () =>
      heart.remove();

  }

}


// NO BUTTON

let noCount = 0;


const noMessages = [

  "Are you sure? 🥺",

  "Think again...",

  "I'll bring good coffee.",

  "Mimz pleaseee ♡",

  "The button is getting shy.",

  "Okay... one more try?"

];


noBtn.addEventListener(
  "mouseenter",
  dodgeNo
);


noBtn.addEventListener(
  "touchstart",
  (event) => {

    event.preventDefault();

    dodgeNo();

  }
);


function dodgeNo() {

  noCount++;


  const card =
    inviteCard.getBoundingClientRect();


  const maxX =
    Math.max(
      30,
      Math.min(
        130,
        card.width / 3
      )
    );


  const maxY =
    55;


  noBtn.style.transform =
    `translate(
      ${(Math.random() - .5) * 2 * maxX}px,
      ${(Math.random() - .5) * 2 * maxY}px
    )`;


  hint.textContent =
    noMessages[
      Math.min(
        noCount - 1,
        noMessages.length - 1
      )
    ];

}


// MUSIC

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

      hint.textContent =
        "Please upload love-is.mp3 to the GitHub repository first.";

    }

  }
);


// RESET BUTTON TEXT WHEN SONG ENDS

song.addEventListener(
  "ended",
  () => {

    songBtn.textContent =
      "♫ Play our little song";

  }
);
