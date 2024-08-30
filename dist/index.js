"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("process");
const rl = readline.createInterface({ input, output });
const x = new Date();
console.log(`Welcome to the Number Guessing Game! \nI'm thinking of a number between 1 and 100. \n`);
console.log(`Please select the difficulty level: \n 1. Easy (10 chances) \n 2. Medium (5 chances) \n 3. Hard (3 chances)`);
function randomNumber() {
    return Math.round(Math.random() * 100);
}
function askQuestion(query) {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}
function provideHint(guess, targetNum, previousGuesses) {
    const highGuesses = previousGuesses.filter((g) => g > targetNum);
    const lowGuesses = previousGuesses.filter((g) => g < targetNum);
    if (guess > targetNum) {
        console.log(`lower than this!`);
    }
    else {
        console.log("More than this!");
    }
    if (highGuesses.length > 0 && lowGuesses.length > 0) {
        console.log(`Your lowest high guess was: ${Math.min(...highGuesses)}`);
        console.log(`Your highest low guess was: ${Math.max(...lowGuesses)}`);
    }
    else if (highGuesses.length > 2) {
        console.log("You keep guessing too high, try something lower.");
    }
    else if (lowGuesses.length > 2) {
        console.log("You keep guessing too low, try something higher.");
    }
}
function guessNumber(targetNum, attempsLeft, previousGuesses) {
    return __awaiter(this, void 0, void 0, function* () {
        const attemps = attempsLeft;
        while (attempsLeft > 0) {
            const answer = yield askQuestion(`You have ${attempsLeft} attemps left. Enter your guess: `);
            const guess = parseInt(answer);
            if (isNaN(guess)) {
                console.log("Please enter a valid number.");
            }
            else if (previousGuesses.includes(guess)) {
                console.log("You’ve already guessed that number! Try something different.");
            }
            else {
                previousGuesses.push(guess);
                if (guess === targetNum) {
                    console.log(`🎉 Congratulations! You guessed the correct number in ${attemps - attempsLeft + 1} attemps.`);
                    return attemps - attempsLeft + 1;
                }
                else {
                    provideHint(guess, targetNum, previousGuesses);
                }
                attempsLeft--;
            }
        }
        console.log(`😢 Sorry, you've used all your attemps! The correct number was ${targetNum}.`);
        return null;
    });
}
function game() {
    return __awaiter(this, void 0, void 0, function* () {
        const difficultyChoice = yield askQuestion("Enter your choice: ");
        let attemps;
        let difficulty;
        switch (difficultyChoice) {
            case "1":
                difficulty = "easy";
                attemps = 10;
                console.log(`Great! You have selected the Easy difficulty level. You have 10 chances to guess the correct number.`);
                break;
            case "2":
                attemps = 5;
                difficulty = "medium";
                console.log(`Great! You have selected the Meduim difficulty level. You have 5 chances to guess the correct number.`);
                break;
            case "3":
                attemps = 3;
                difficulty = "hard";
                console.log(`Great! You have selected the Hard difficulty level. You have 3 chances to guess the correct number.`);
                break;
            default:
                console.log("Invalid choice. Please select a valid difficulty level.");
                rl.close();
                return;
        }
        console.log("Let's start the game!");
        const date = Date.now();
        const targetNumber = randomNumber();
        const previousGuesses = [];
        yield guessNumber(targetNumber, attemps, previousGuesses);
        console.log("you took " + (Date.now() - date) / 1000 + "s");
        const replayAnswer = yield askQuestion("Do you want to play another round (y/n): ");
        if (replayAnswer.toLowerCase() === "y") {
            return game();
        }
        else {
            console.log("Thanks for playing! Goodbye!");
            rl.close();
        }
    });
}
game();
//# sourceMappingURL=index.js.map