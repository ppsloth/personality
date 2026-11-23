const questions = [
  { q: "주말에 가장 하고 싶은 것은?", a: [
    ["친구들과 신나게 놀기", "pikachu"], ["집에서 푹 쉬기", "snorlax"],
    ["새로운 곳 탐험하기", "charmander"], ["조용히 책 읽기", "squirtle"],
    ["새로운 취미 도전하기", "eevee"], ["밤새 게임하기", "gengar"] ] },
  { q: "팀 프로젝트에서 나는?", a: [
    ["분위기 메이커", "pikachu"], ["묵묵히 맡은 일 하는 사람", "snorlax"],
    ["앞장서서 이끄는 리더", "charmander"], ["꼼꼼하게 정리하는 사람", "squirtle"],
    ["상황에 맞춰 역할을 바꾸는 사람", "eevee"], ["아이디어로 장난치는 사람", "gengar"] ] },
  { q: "좋아하는 날씨는?", a: [
    ["화창하고 맑은 날", "pikachu"], ["포근한 흐린 날", "snorlax"],
    ["더운 여름날", "charmander"], ["시원한 비 오는 날", "squirtle"],
    ["선선한 가을날", "eevee"], ["어둑어둑한 밤", "gengar"] ] },
  { q: "고민이 생기면?", a: [
    ["친구에게 바로 말한다", "pikachu"], ["일단 잔다", "snorlax"],
    ["몸을 움직이며 푼다", "charmander"], ["혼자 차분히 생각한다", "squirtle"],
    ["여러 사람에게 조언을 구한다", "eevee"], ["웃어넘긴다", "gengar"] ] },
  { q: "내가 듣고 싶은 말은?", a: [
    ["너 때문에 즐거워!", "pikachu"], ["너랑 있으면 편안해", "snorlax"],
    ["넌 정말 용감해!", "charmander"], ["넌 믿음직해", "squirtle"],
    ["넌 정말 매력 있어", "eevee"], ["너 진짜 웃기다", "gengar"] ] },
  { q: "시험 기간 나의 모습은?", a: [
    ["친구와 같이 공부한다", "pikachu"], ["졸려서 자꾸 눕는다", "snorlax"],
    ["벼락치기로 불태운다", "charmander"], ["계획표대로 공부한다", "squirtle"],
    ["그날 기분 따라 공부한다", "eevee"], ["밤에 집중이 제일 잘된다", "gengar"] ] },
  { q: "여행 가면 나는?", a: [
    ["사진 많이 찍고 신나게 논다", "pikachu"], ["숙소에서 푹 쉰다", "snorlax"],
    ["액티비티를 다 해본다", "charmander"], ["일정표를 짜서 움직인다", "squirtle"],
    ["그때그때 끌리는 곳에 간다", "eevee"], ["밤 야경과 야시장을 즐긴다", "gengar"] ] },
  { q: "친구들이 보는 나는?", a: [
    ["에너지가 넘치는 사람", "pikachu"], ["여유롭고 느긋한 사람", "snorlax"],
    ["열정적인 사람", "charmander"], ["침착하고 듬직한 사람", "squirtle"],
    ["적응을 잘하는 사람", "eevee"], ["장난기 많은 사람", "gengar"] ] }
];

const results = {
  pikachu: { id: 25, name: "피카츄", desc: "밝고 에너지 넘치는 분위기 메이커예요." },
  snorlax: { id: 143, name: "잠만보", desc: "느긋하고 편안함을 주는 든든한 타입이에요." },
  charmander: { id: 4, name: "파이리", desc: "열정이 넘치고 도전을 두려워하지 않아요." },
  squirtle: { id: 7, name: "꼬부기", desc: "침착하고 믿음직한 신중파예요." },
  eevee: { id: 133, name: "이브이", desc: "어디서든 잘 적응하는 가능성 많은 타입이에요." },
  gengar: { id: 94, name: "팬텀", desc: "장난기 많고 재치 있는 매력쟁이예요." }
};

const IMG_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

let current = 0;
let scores = {};

const startSec = document.getElementById("pt-start");
const quizSec = document.getElementById("pt-quiz");
const resultSec = document.getElementById("pt-result");

function resetScores() {
  scores = {};
  for (const key in results) scores[key] = 0;
}

function showQuestion() {
  const item = questions[current];
  document.getElementById("pt-progress").textContent =
    (current + 1) + " / " + questions.length;
  document.getElementById("pt-bar-fill").style.width =
    (current / questions.length) * 100 + "%";
  document.getElementById("pt-question").textContent = item.q;

  const box = document.getElementById("pt-choices");
  box.innerHTML = "";
  item.a.forEach(function (choice) {
    const btn = document.createElement("button");
    btn.className = "pt-btn";
    btn.textContent = choice[0];
    btn.addEventListener("click", function () {
      selectChoice(choice[1]);
    });
    box.appendChild(btn);
  });
}

function selectChoice(type) {
  scores[type]++;
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  let best = "pikachu";
  for (const key in scores) {
    if (scores[key] > scores[best]) best = key;
  }
  const r = results[best];
  const img = document.getElementById("pt-img");
  img.src = IMG_BASE + r.id + ".png";
  img.alt = r.name;
  document.getElementById("pt-name").textContent = r.name;
  document.getElementById("pt-desc").textContent = r.desc;
  quizSec.classList.add("pt-hidden");
  resultSec.classList.remove("pt-hidden");
}

function startQuiz() {
  current = 0;
  resetScores();
  startSec.classList.add("pt-hidden");
  resultSec.classList.add("pt-hidden");
  quizSec.classList.remove("pt-hidden");
  showQuestion();
}

document.getElementById("pt-start-btn").addEventListener("click", startQuiz);
document.getElementById("pt-retry-btn").addEventListener("click", startQuiz);
