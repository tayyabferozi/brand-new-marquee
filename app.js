const spacing = 0;
const speed = 20;
let dir = "left";
const someUnknownOffset = 16;

let marqueeContainer = $(".marquee");

marqueeContainer.wrapInner("<div class='marquee-text'></div>");

let marqueeText = $(".marquee .marquee-text");

const marqueeWidth = marqueeText.width();
const windowWidth = window.innerWidth;

const nOfMarquees = Math.ceil(windowWidth / marqueeWidth);

let markup = "";

for (let i = 0; i <= nOfMarquees; i++) {
  markup += `<div class='marquee-text'>${marqueeText.html()}</div>`;
}

marqueeContainer.html(markup);
marqueeText = $(".marquee-container > .marquee-text");

marqueeContainer.wrapInner("<div class='marquee-group'></div>");
marqueeContainer.append(marqueeContainer.html());

const g1 = marqueeContainer.find(".marquee-group").first();
const g2 = marqueeContainer.find(".marquee-group").last();

const gWidth = g1.width();

g2.css("left", `${gWidth + spacing}px`);

const interValRef = setInterval(function () {
  const g1Left = parseInt(g1.css("left"));
  const gWidth = g1.width();
  const g1Right = g1Left + gWidth;
  const g2Left = parseInt(g2.css("left"));
  const g2Right = g2Left + gWidth;
  let g1NewPos1;
  let g2NewPos1 = g2Left - speed;
  if (dir === "left") {
    g1NewPos1 = g1Left - speed;
    g2NewPos1 = g2Left - speed;
  } else {
    g1NewPos1 = g1Left + speed;
    g2NewPos1 = g2Left + speed;
  }

  g1.css("left", `${g1NewPos1}px`);
  g2.css("left", `${g2NewPos1}px`);

  if (dir == "left") {
    if (g1Left < -gWidth) {
      g1.css("left", `${g1Left + gWidth * 2 - someUnknownOffset}px`); // first out
    }
    if (g2Left < -gWidth) {
      g2.css("left", `${g2Left + gWidth * 2 - someUnknownOffset}px`); // second out
    }
  } else {
    if (g1Left > windowWidth) {
      g1.css("left", `${g1Left - gWidth * 2 - someUnknownOffset}px`); // first out
    }
    if (g2Left > windowWidth) {
      g2.css("left", `${g2Left - gWidth * 2 - someUnknownOffset}px`); // second out
    }
  }
}, 50);

$("button").click(function () {
  clearInterval(interValRef);
});
