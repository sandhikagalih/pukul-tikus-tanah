const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const level = document.querySelectorAll('#levels');
let modal = document.getElementById("myModal");
const pop = document.querySelector('#pop');

let tanahSebelumnya;
let selesai;
let skor;
let wRandom;
let seconds;
let timer;
let span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
  const tRandom = randomTanah(tanah);
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikus();
    }
  }, wRandom);
}

function getLevel() {
  for (let i = 0; i < level.length; i++) {
    const element = level[i].checked;
    if (element) {
      if (level[i].value == '1') { // mudah
        wRandom = randomWaktu(900, 2000);
      } else if (level[i].value == '2') { // sedang
        wRandom = randomWaktu(800, 1500);
      } else if (level[i].value == '1') { // sulit
        wRandom = randomWaktu(500, 1000);
      }
    }
  }
}

function mulai() {
  getLevel();
  seconds = 1000 * 60; // set 1 menit
  countDown();
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  munculkanTikus();
  setTimeout(() => {
    selesai = true;
  }, 59998);
}

function pukul() {
  skor++;
  this.parentNode.classList.remove('muncul');
  pop.play();
  papanSkor.textContent = skor;
}

tikus.forEach(t => {
  t.addEventListener('click', pukul);
});

function countDown() {
  if (seconds == 60000) {
    timer = setInterval(countDown, 1000)
  }
  seconds -= 1000;
  document.querySelector(".timer").innerHTML = '00:' + seconds / 1000 + ' ';
  if (seconds <= 0) {
    clearInterval(timer);
    modal.style.display = "block";
    document.querySelector(".timer").innerHTML = "00:00";
  }
}