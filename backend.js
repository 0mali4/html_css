'use strict'

document.addEventListener('DOMContentLoaded', function() {
const name1 = document.querySelector('.name');
const birthday1 = document.querySelector('.birthday');
const age1 = document.querySelector('.age');
const info1 = document.querySelector('.info');
const ava1 = document.querySelector('.profile-image');
const emote1 = document.querySelector('.emote');

const main_sh = document.querySelector('.base');
const like_btn = document.querySelector('.love_button');
const hate_btn = document.querySelector('.hate_button');

async function getCharacterInfoById(characterId) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${characterId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const json = await response.json();
    const character = json.data;
    console.log(character);////////////////////////////////////////////
    return {
      name: character.name || "Unknown",
      birthday: character.birthday
        ? new Date(character.birthday).toDateString()
        : "Not available",
      about: character.about || "No description available",
      image: character.images?.jpg?.image_url || ""
    };
  } catch (error) {
    console.error("Failed to fetch character:", error);
    return null;
  }
}

async function loadCharacter(characterId) {
  const character = await getCharacterInfoById(characterId);
  if (!character) return;
  
  name1.textContent = character.name;
  ///////////////
//  let rbthday = "" , ag = "";
// for (let i = 0; i < character.about.length; i++) {
//   // console.log(character.about[i]);/////////////////
//   if (i <= 3 && character.about[i] === ':' && character.about[i-1] === 'e' && character.about[i-2] === 'g' && character.about[i-3] === 'A'){
//     let j = i + 1;
//     console.log("birthday found");/////////////////
//     while (character.about[j] !== 'n'){
//       ag = ag + character.about[j];
//       j++;
//     }
//    }
// }
  //////////////
const rawAbout = character.about; // the long string from API
const lines = rawAbout.split('\n').filter(line => line.trim() !== '');
console.log(lines);
  let z = 1;
  let s = ["", "Just chilling guy who loves pancakes and guns", "Definetly not gay,sorry sugar", "See ya 💋 "];
  for (let i = 0; i < lines.length; i++) {
    if (z == 4)break;
    if (lines[i].length <= 100){
      s[z] = lines[i];
      z++;
    }
  }
  ///////////////
  // birthday1.textContent = "Birthday: ${character.birthday}";
  birthday1.textContent = s[1];
  age1.textContent = s[2];
  info1.textContent = s[3];

  ava1.src = character.image;
}
let cur = 1;
loadCharacter(cur);

// like_btn.addEventListener('', function() {
//   cur++;
//   loadCharacter(cur);
//   if (cur == 100){cur = 11;}
// });
let kl1 = 0 , kl2 = 0;

like_btn.addEventListener('click', function() {
  kl1++;
  cur++;
  // console.log(kl1 , kl2);/////////////////
    if (kl1 == 50 && kl2 == 0){
      alert("You are a true fan of anime! 💖 or just weirdo💀");
    }

  loadCharacter(cur);
  // if (cur == 100){cur = 11;}
});

like_btn.addEventListener('mouseover', () => {
  like_btn.classList.add('darken');
  emote1.src = "Photos/happy_emote.jpeg";
});

like_btn.addEventListener('mouseout', () => {
  like_btn.classList.remove('darken');
  emote1.src = "Photos/neutral_emote.jpeg";
});

hate_btn.addEventListener('click', function() {
  kl2++;
  cur++;
  //  console.log(kl1 , kl2);/////////////////
  if (kl1 == 0 && kl2 == 50){
    alert("Why do you hate everyone so much? 💔 , Are you bululu?");
  }

  loadCharacter(cur);
  // if (cur == 100){cur = 11;}
});

hate_btn.addEventListener('mouseover', () => {
  hate_btn.classList.add('darken');
  emote1.src = "Photos/sad_emote.jpeg";
});

hate_btn.addEventListener('mouseout', () => {
  hate_btn.classList.remove('darken');
  emote1.src = "Photos/neutral_emote.jpeg";
});
});
