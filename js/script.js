const tanah = document.querySelectorAll(".tanah");
const tikus = document.querySelectorAll(".tikus");
const papanSkor = document.querySelector(".papan-skor");
const pop = document.querySelector("#pop");

let tanahSebelumnya;
let selesai;
let skor;
let i;

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

function munculkanTikus(min, max) {
  i++;
  console.log(i);
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(min, max);
  tRandom.classList.add("muncul");
  tambahEvent(); // Menambah eventListener penambah score
  setTimeout(() => {
    tRandom.classList.remove("muncul");
    if (!selesai) {
      munculkanTikus(min, max);
    }
  }, wRandom);
}

function mulai(min, max) {
  i = 0;
  console.log("Min: " + min + "|| Max: " + max);
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  munculkanTikus(min, max);
  setTimeout(() => {
    selesai = true;
  }, 10000);
}

function pukul() {
  hapusEvent(); // Hapus eventListener penambah score
  skor++;
  this.parentNode.classList.remove("muncul");
  pop.play();
  papanSkor.textContent = skor;
}

function tambahEvent() {
  tikus.forEach((t) => {
    t.addEventListener("click", pukul);
  });
}

function hapusEvent() {
  tikus.forEach((t) => {
    t.removeEventListener("click", pukul);
  });
}
