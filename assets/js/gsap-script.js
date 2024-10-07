// オープニング
window.addEventListener("load", function () {
  const openingTL = gsap.timeline();
  openingTL
    .to(".loading span", { autoAlpha: 0, scale: 1.2, delay: 0.5 })
    .to(".loading", { autoAlpha: 0 });
});

// ヘッダー
gsap.to(".header", {
  autoAlpha: 0,
  yPercent: -100,
  duration: 0.4,
  ease: "none",
  scrollTrigger: {
    trigger: ".main",
    start: "120 top", //.main要素の上から120pxの部分が画面の一番上端
    toggleActions: "play none none reverse",
  },
});

// プログレスバー
gsap.fromTo(
  ".progress-bar",
  { scaleY: 0 },
  {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".body",
      start: "top top",
      end: "bottom -300%",
      scrub: true,
    },
  }
);

// 横スクロール
let pages = document.querySelectorAll(".slide__item").length;
let moveX = -100 + 100 / pages;
let horizontalScroll = gsap.to(".slide__list", {
  xPercent: moveX,
  ease: "none",
  scrollTrigger: {
    trigger: ".slide",
    start: "center center",
    end: "bottom -300%",
    pin: true,
    scrub: 1,
  },
});

// 横スクロール中にアニメーション発火
gsap.utils.toArray(".slide__item").forEach((item) => {
  let img = item.querySelector("img");
  let contents = item.querySelectorAll(".slide__container > *");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top center",
      containerAnimation: horizontalScroll, //横スクロールするアニメーションTweenを指定
    },
  });
  tl.fromTo(
    img,
    { filter: "brightness(100%)" },
    { filter: "brightness(50%)" }
  ).fromTo(
    contents,
    { y: 20, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, stagger: 0.1 },
    "<"
  );
});

// 背景の円が広がる

const mm = gsap.matchMedia();
mm.add("(min-width:768px)", () => {
  gsap.fromTo(
    ".feature__background",
    { scale: 0 },
    {
      scale: 1.5,
      scrollTrigger: {
        trigger: ".feature",
        start: "top center",
        scrub: true,
      },
    }
  );
});
mm.add("(max-width:767px)", () => {
  gsap.fromTo(
    ".feature__background",
    { scale: 0 },
    {
      scale: 3,
      scrollTrigger: {
        trigger: ".feature",
        start: "top center",
        scrub: true,
      },
    }
  );
});

let stalker = document.querySelector(".stalker");
const xTo = gsap.quickTo(stalker, "x", { duration: 0.5, ease: "power3" });
const yTo = gsap.quickTo(stalker, "y", { duration: 0.5, ease: "power3" });
const anchors = document.querySelectorAll("a");

window.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});

anchors.forEach((anchor) => {
  anchor.addEventListener("mouseenter", () => {
    gsap.to(stalker, { scale: 2 });
  });
  anchor.addEventListener("mouseleave", () => {
    gsap.to(stalker, { scale: 1 });
  });
});
