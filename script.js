/* -------------------------------------------------------------------------- */
/*                            Genererer 10*20 bokse                           */
/* -------------------------------------------------------------------------- */
for (let i = 0; i < 10 * 20; i++) {
  const box = document.createElement("div");
  box.className = `box ${i + 1}`;
  document.querySelector(".board").appendChild(box);
}
/* ---------------------------- Henter alle bokse --------------------------- */
const boxes = document.querySelectorAll(".box");
/* --------------------------- Genererer 25 miner --------------------------- */
const mines = [];
for (let m = 0; m < 25; m++) {
  let mine = Math.floor(Math.random() * 200) + 0;
  if (mines.includes(mine)) {
    m--;
  } else {
    mines.push(mine);
    boxes[mine].classList.add("mine");
    boxes[mine].addEventListener("click", () => {
      dead();
      boxes[mine].style.backgroundColor = "red";
    });
  }
}
/* -------------------------- Definerer boks typen -------------------------- */
boxes.forEach((box) => {
  box.addEventListener("dblclick", () => {
    box.classList.add("mine");
    box.addEventListener("click", () => {
      dead();
    });
  });
  if (box.classList.contains("mine")) {
    return;
  }
  box.classList.add("safeSpot");
  greenFields(box);
});
/* ------------------------ Function hvis spiller dør ----------------------- */
function dead() {
  console.log("dead");
  document.querySelector(".status").innerHTML = "Spiller er død";
}
/* ---------------- Function der finder omkringliggende miner --------------- */
/* ---------------------------- Ved ikke hvordan ---------------------------- */
function greenFields(box) {
  console.log(box)
  let numb = 0;
  box.setAttribute("data-value", numb);
/*   for (let n = 0; n < boxes.length; n++) {
    if(boxes[n -8].classList.contains("mine")|| boxes[n -10].classList.contains('mine') || boxes[n -9].classList.contains("mine") || boxes[n -1].classList.contains("mine") || boxes[n +2].classList.contains("mine") || boxes[n +9].classList.contains("mine") || boxes[n +10].classList.contains("mine") || boxes[n + 11].classList.contains("mine")){ 
      numb++;
    }
    if(boxes[n].classList.contains("safeSpot")){
     boxes[n].setAttribute("data-value", numb);
    }
  } */
  /* if (box.classList.contains("safeSpot")) {
    box.addEventListener("click", () => {
      box.setAttribute("data-value", numb);
    });
  } */
}
/* -------------------------------------------------------------------------- */
/*                             Gemmer til storage                             */
/* -------------------------------------------------------------------------- */
/* --------------------------- Finder spiller navn -------------------------- */

let playerNames = [];
let score = 0;
Swal.fire({
  title: "Skriv spillerens navn",
  input: "text",
  confirmButtonText: "Tilføj",
  showLoaderOnConfirm: true,
  allowOutsideClick: false,
}).then((result) => {
  if (result.isConfirmed) {
    logData(result);
    outputData();
  }
});
/* --------------------------- Samler storage data -------------------------- */
function logData(result) {
  let historyJSON = localStorage.getItem("playerLog");
  if (historyJSON) {
    playerNames = JSON.parse(historyJSON);
    /* ---------------- Hvis spiller allerede findes, tilføj ikke --------------- */
    /* ----------- Point ville istedet blive plusset på samme spiller ----------- */
    /* ------------ Men kunne ikke finde ud af at lave pointsystemet ------------ */
    let historikSpiller = playerNames.find(
      (x) => x["playername"] == result.value
    );
    if (historikSpiller) {
    } else {
      playerNames.push({
        playername: result.value,
        score: score,
      });
    }
  } else {
    playerNames = [{ playername: result.value, score: score }];
  }
  localStorage.setItem("playerLog", JSON.stringify(playerNames));
}
/* ------------------------- Outputter storage data ------------------------- */
function outputData() {
  let historyJSON2 = localStorage.getItem("playerLog");
  if (historyJSON2) {
    let playerNames2 = JSON.parse(historyJSON2);
    console.log(playerNames2);
    for (let i in playerNames2) {
      console.log(playerNames2[i].playername);
      const addPlayer = document.createElement("div");
      addPlayer.className = "player";
      document.querySelector(".players").appendChild(addPlayer);
      addPlayer.innerHTML = `<h2>navn : ${playerNames2[i].playername} point : ${playerNames2[i].score} </h2>`;
    }
  }
}

//Read more asdasd as [[Rapport.md]]


// boxes inner value kommer an på hvor mange miner der er omkring