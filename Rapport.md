# _Navn:_ Marc Kastholm 🙋🏽‍♂️

-

# _Opgave:_ Projekt 1.2 – Mine sweeper

-

# _Emne_ Web development 👨🏽‍💻

-

# _Studiets navn_ Dkpbw22a1

-

# _Skolens navn_ IBA Erhversakademi

-

### [Link Til GitHub Rep](https://github.com/Kastholm/Mine-Projekt.git) 🌐

Se [Rapport] ctrl+click
-
Se [Projektbeskrivelse] ctrl+click


[Projektbeskrivelse]:


### I der skal produceres et spil, programmeret i JavaScript og præsenteret fra et site som skrivers i HTML5 og styles med CSS3. 
 
### Minesweeper: Et spillebræt på 10X20 felter, hvor der placeres 25 miner på tilfældige positioner. Felter kan enten holde en mine, eller et tal der indikerer hvor mange af de omkringliggende 8 felter der er miner. (Hvis tallet er 0 vises det ikke). I starten skules alle felters indhold. Når spilleren venstre-klikker på 

### et felt, vil dets indhold blive vist. Hvis spilleren venstreklikker på et felt der indeholder en mine, taber de spillet. Hvis spilleren højreklikker på et felt, markerer de det som en mine. Når alle felter der ikke indeholder en mine er blevet klikket på er spillet vundet (så kun mine felter er gemt). Der scores på hvor mange miner der er markeret korrekt (25 for vundet spil), og hvor lang tid det tog. Den seneste og/eller bedste score gemmes i cookies eller localstorage, og vises frem ved de respektive spil. Der bruges Git til version styring undervejs. 



Der bruges Git til version styring undervejs. 


[Rapport]:
> Dertil også et dokument der beskriver udviklingen med udgangspunkt i problemstillingen, med fokus på ikke trivielle, gerne besværlige punkter i udviklingen. Produktet beskrives udførligt. Proces præsenteredes med udgangspunkt i fremgangsmåde og overvejelser.

### Projektet omhandlede at kreere et spil, der på en <[Spilleplade] med 10x20 felter lavede tilfældige minefelter, hvor brugeren ikke måtte klikke på. <[Minefelter]

### Hvis brugeren klikkede på et ikke mine felt, ville det ved 1 Klik vise hvor mange miner der var omkring, eller ved dobbeltklik forvandle den til en mine.<[Ikke-Minefelter]

### De resterende felter der ikke var miner, skulle fremvise, hvor mange miner der var omkring. Hvis brugeren klikkede på en mine, resulterede det i at brugeren tabte spillet. <[MinerOmkring]

### Den seneste og/eller bedste score gemmes i cookies eller localstorage, og vises frem ved de respektive spil <[localStorage]

### Der scores på hvor mange miner der er markeret korrekt (25 for vundet spil), og hvor lang tid det tog. <[MinerOmkring]

[Spilleplade]: script.js

```javascript
`Generering af selve spillepladen, blev lavet med et for loop, for loopet generere 200 felter. Det gøres ved at [i] øges med 1 for hver af 10*20 felter === 200; Derved generer for loopet, 200 divs === (bokse); Hver boks blev tildelt et className blot for at gøre materialet mere overskueligt. Dette className blev +1 grundet at index er 0, så boks 0 hed boks 1 i stedet; Til sidst apender den alle divs på spillebrættet`;
/* -------------------------- Genererer 10*20 bokse ------------------------- */
for (let i = 0; i < 10 * 20; i++) {
  const box = document.createElement("div");
  box.className = `box ${i + 1}`;
  document.querySelector(".board").appendChild(box);
}
```

[Minefelter]: script.js

```javascript
`Startet med at lave et array hvor jeg kan tilføje minerne. Her 25 miner. Jeg laver derfor et for loop der ${m = 0; m < 25; m++} så den kører 25 gange. inde i loopet kører jeg en ${Math.floor(Math.random())} for at vælge 25 tilfældige bokse, jeg påsætter værdien 200, så den vælger udfra de 200 tilgængelige bokse. jeg laver et if statement, for at fortælle den at hvis det generede nummer allerede findes i mit array, skal den minus m med 1 for at kører for loopet igen og derved genererer et nyt tal. Jeg fortæller programmet at hvis en boks er blevet til en mine, skal den tilføje minen til mit array og tilføje et click event der får spilleren til at tabe`;
/* --------------------------- Genererer 25 miner --------------------------- */
const mines = []
for (let m = 0; m < 25; m++) {
     let mine = Math.floor(Math.random() * 200) + 0;
     if(mines.includes(mine)){
          m--;
     }else{
          mines.push(mine);
          boxes[mine].classList.add('mine')
          boxes[mine].addEventListener('click', () => { dead(); boxes[mine].style.backgroundColor = 'red'; } )
     }
}
```

[Ikke-Minefelter]: script.js

```javascript
`Jeg laver en forEach function for at tilgå hver og et felt. Hvis feltet ikke er en mine og man dobbeltklikker på det, vil der for forvandle sig til en mine. og hvis man klikker igen taber man spillet, da man har klikket på en mine; Jeg fortæller i bunden at hvis feltet ikke er en mine, får den classNamet safeSpot som er felterne der ikke er miner og kan kalde en function så jeg kan se tallet der viser hvor mange miner safeSpot er omringet af`;
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
```

[MinerOmkring]: script.js

```javascript
`Her begyndte jeg at få problemer da jeg slet ikke kunne tænke mig til hvordan jeg skal affecte eller få værdier fra de andre bokse der lå omkring ikke-mine felterne. Og måttte til sidst give op da jeg ikke kunne løse det; Min tanke omkring det var, at finde alle bokse der containede className safeSpot === ikke-minfelter; og herefter finde className mine værdierne der lå omkring. Men kunne ikke komme videre med løsnigen desværre`;
/* ---------------- Function der finder omkringliggende miner --------------- */
/* ---------------------------- Ved ikke hvordan ---------------------------- */
function greenFields(box) {
  let numb = 0;
  if (box.classList.contains("safeSpot")) {
    box.addEventListener("click", () => {
      box.setAttribute("data-value", numb);
    });
  }
}
```

[localStorage]: script.js

```javascript
`Jeg laver først et array som skal indeholde spillernavn og score. Bruger script sweetAlert2 for at få en pop-up box frem hvor brugeren kan skrive sit navn. Når brugeren har skrevet sit navn og klikker tilføj kalder den 2 funktioner.Jeg Første function logger den data jeg ønsker til localStorage, her spillerens navn og den score spilleren har fået; Hvis ${historyJSON} findes JSONparsen den mit array: Jeg lader storage finde dataen, men hvis navnet allerede findes, bliver det ikke tilføjer, dog vil det opdaterer spillerens point(virker ikke grundet, se:` <
  [MinerOmring];
`hvis spillernavnet ikke findes, vil den pushe det nye navn ind i mit array. Herefter bliver ${outputData()} kaldt, som outputter alt min data ved at fortælle hvilket materiale den skal appende til den ny generede div,herved bliver highscore feltet opdateret med nye spillernavne og deres point`;
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
```
