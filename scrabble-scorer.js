
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function transform(oldPointStructure) {
  let newPointStructure = {};
  for (let pointValue in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[pointValue].length; i++) {
      let letter = oldPointStructure[pointValue][i].toLowerCase();
      newPointStructure[letter] = Number(pointValue);
    }
  }
  return newPointStructure;
}

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    letterPoints += 1;
  }
  return letterPoints;
}

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    letterPoints += newPointStructure[letter.toLowerCase()];
  }
  return letterPoints;
}

function vowelBonusScorer(word) {
  word = word.toUpperCase();
  let score = 0;
  for (const letter of word) {
    if (['A', 'E', 'I', 'O', 'U'].includes(letter)) {
      score += 3; // Vowel
    } else {
      score += 1; // Consonant
    }
  }
  return score;
}
function scrabbleScorer(word) {
  word = word.toLowerCase();
  let score = 0;
  for (const letter of word) {
    score += newPointStructure[letter];
  }
  return score;
}
const scoringAlgorithms = [
  {
    name: 'Simple Score',
    description: 'Each letter is worth 1 point.',
    scorerFunction: simpleScorer
  },
  {
    name: 'Bonus Vowels',
    description: 'Vowels are 3 pts, consonants are 1 pt.',
    scorerFunction: vowelBonusScorer
  },
  {
    name: 'Scrabble',
    description: 'The traditional scoring algorithm.',
    scorerFunction: scrabbleScorer // Use the oldScrabbleScorer function
  }
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?");
  console.log("0 - Simple: One point per character");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points");
  console.log("2 - Scrabble: Uses scrabble point system");
  let algorithmIndex = input.question("Enter 0, 1, or 2: ");
  return scoringAlgorithms[algorithmIndex];
}

function initialPrompt() {
  console.log("Let's play some scrabble!");
  let userWord = input.question("Enter a word to score: ");
  let selectedAlgorithm = scorerPrompt();
  let scoreResult = selectedAlgorithm.scorerFunction(userWord);
  console.log(`Score for '${userWord}': ${scoreResult}`);
}

// Run the program
function runProgram() {
  initialPrompt();
}
//initialPrompt();

module.exports = {
    initialPrompt: initialPrompt,
    transform: transform,
    oldPointStructure: oldPointStructure,
    simpleScorer: simpleScorer,
    vowelBonusScorer: vowelBonusScorer,
    scrabbleScorer: scrabbleScorer,
    scoringAlgorithms: scoringAlgorithms,
    newPointStructure: newPointStructure,
     runProgram: runProgram,
     scorerPrompt: scorerPrompt
 };