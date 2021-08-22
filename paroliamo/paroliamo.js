function addLetter(letter) {
    if (game.state == 'CHOOSE_LETTERS') {
        game.letters.push(letter);
        redrawLetters();

        if (game.letters.length >= 9) {
            game.state = 'TIME_RUNNING';
            game.timer = game.maxTimer;
            startTimer();
        }
    }
}

function redrawLetterPack(elementId, letters) {
    let divLetters = document.getElementById(elementId);

    let html = '';

    for (let i=0; i < letters.length; ++i) {
        let letter = letters[i].toUpperCase();
        html += "<div>" + letter + "</div>";
    }

    divLetters.innerHTML = html;
}

function redrawLetters() {
   redrawLetterPack('letters', game.letters);
}

function redrawSolutionLetters() {
    redrawLetterPack('solutionLetters', game.bestWords[game.currentWordIndex]);
}


function redrawTimer() {
    let timer = document.getElementById('timer');
    
    timer.innerHTML = game.timer;
    timer.hidden = (game.state != 'TIME_RUNNING');
}

function drawVowel() {
    addLetter(game.vowels.pop());
}

function drawConsonant() {
    addLetter(game.consonants.pop());
}

function startTimer() {
    redrawTimer();
    
    if (game.state != 'TIME_RUNNING')
        return;

    game.timer -= 1;

    if (game.timer >= 0) {
        setTimeout(
            startTimer,
            1000
        );
    } else {
        game.state = 'SOLVE_WORD';
        solveWord(game.lastSolution);
        drawSolution();
        redrawTimer();
    }
}

function solveWord() {
    game.currentWordIndex = 0;
    game.bestWords = [];
    let letters = game.letters.join('').toLowerCase();
    let lettersQuantity = {};

    for (var i = 0; i<game.letters.length; ++i) {
        lettersQuantity[letters[i]] = countLetter(letters, letters[i]);
    }

    for (let w=0; w < game.words.length; ++w) {
        let word = game.words[w];

        if (game.bestWords.length > 0 && word.length < game.bestWords[0].length) {
            return;
        }

        isFound = true;

        for (var i=0; isFound && i<word.length; ++i) {
            let letter = word[i];

            let letterCount = lettersQuantity[letter];
            
            if (letterCount == undefined || lettersQuantity[letter] < countLetter(word, letter)) {
                isFound = false;
            }
        }

        if (isFound) {
            game.bestWords.push(word);
        }
    }
}

function countLetter(word, letter) {
    let result = 0;

    for (let i=0; i<word.length; ++i) {
        if (word[i] == letter) {
            ++result;    
        }
    }

    return result;
}

function drawSolution() {
    document.getElementById('solution').hidden = false;

    game.letters = [...game.bestWords[game.currentWordIndex]];
    document.getElementById('solutionCount').innerHTML = "Soluzione " + (game.currentWordIndex + 1) + " di " + game.bestWords.length;

    redrawSolutionLetters();
}

function onNext() {
    if (game.currentWordIndex < game.bestWords.length - 1)
        ++game.currentWordIndex;

    drawSolution();
}

function onPrev() {
    if (game.currentWordIndex > 0)
        --game.currentWordIndex;

   drawSolution();
}

function startGame() {
    restartGame();
}

function restartGame() {
    window.game = {
        allVowels: "AAAAAAAAEEEEEEEEEIIIIIIIIIIIIOOOOOOOOUUUU",
        allConsonants: "BBCCCCCCDDFFFGGGGHHLLLLMMMMMMNNNNNNPPPPPPQQRRRRRRRRSSSSSSSSSSTTTTTTTTTTVVZZZZZ",
        letters: [],
        state: 'CHOOSE_LETTERS',
        timer: 0,
        maxTimer: 60,
        words: [],
        bestWords: [],
        currentWordIndex: 0,
        words: words,
    }

    window.game.vowels = shuffle([...window.game.allVowels]);
    window.game.consonants = shuffle([...window.game.allConsonants]);

    let regexTimer = location.href.match(/t=(\d+)/);

    if (regexTimer) {
        game.maxTimer = regexTimer[1];
    }

    document.getElementById('solution').hidden = true;
    redrawLetters();
    redrawSolutionLetters();
    redrawTimer();

    window.isMobile = mobileCheck();
}

function shuffle(array) {    
    for (let i = array.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
} 

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}