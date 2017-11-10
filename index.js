var basicCard = require('./basic');

var clozeCard = require('./Other');

var inquirer = require('inquirer');

var uncaught = require('uncaught');

uncaught.start();
uncaught.addListener(function (error) {
   console.log('Uncaught error or rejection: ', error.message);
});

var basicCards = [];
var clozeCards = [];
var basicCorrect = 0;
var clozeCorrect = 0;
var basicIncorrect = 0;
var clozeIncorrect = 0;

function startBasic() {
	var questions = basicCards.map(function(basicCard, i) {
		return {
			name: i.toString(),
			message: basicCard.front
		};
	});

	inquirer.prompt(questions).then(function(answers) {
		for ( var key in answers ) {
			if ( basicCards[Number(key)].back == answers[key] ) {
				basicCorrect++;
			} else {
                basicIncorrect++;
			}
		}
		
		console.log('Correct: ' + basicCorrect, 'Incorrect: ' + basicIncorrect);
	});
}

function basic() {
	inquirer.prompt([
		{
			type: 'list',
			choices: ['yes', 'no'],
			name: 'continue',
			message: 'Create a card?'
		}
	]).then(function(answer) {
		if ( answer.continue == 'yes' )
			createBasic();
        else startBasic();
	});
}

function uno() {
	inquirer.prompt([
		{
			type: 'list',
			choices: ['Front/back', 'Fill-in-the-blank'],
			name: 'style',
			message: 'Front/back flashcards or Fill-in-the-blank flashcards?'
		}
	]).then(function(response) {
		if ( response.style == 'Front/back' )
			basic();
		else clozeGo();
	});
}

function createBasic() {
	inquirer.prompt([
		{
			name: 'front',
			message: 'What is the question?'
		},
		{
			name: 'back',
			message: 'What is the anwser?'
		}
	]).then(function(basicCard) {
		basicCards.push(basicCard);
		basic();
	});
}

function clozeGo() {
	inquirer.prompt([
		{
			type: 'list',
			choices: ['yes', 'no'],
			name: 'go',
			message: 'Create a card?'
		}
	]).then(function(answer) {
		if ( answer.go == 'yes' )
			createCloze();
        else startCloze();
	});
}

function createCloze() {
	inquirer.prompt([
		{
			name: 'text',
			message: 'What is the text statement?'
		},
		{
			name: 'cloze',
			message: 'What would you like removed from the text statement?'
		}
	]).then(function(answers) {
        var text = answers.text;
        var cloze = answers.cloze;
        if (text.includes(cloze)) {
            var newCloze = new clozeCard(text, cloze);
            clozeCards.push(newCloze);
            clozeGo();
        } else {
            console.log('The cloze portion you provided is not found in the full text. Please try again.');
            createCloze();
        }
	});
}

function startCloze() {
    console.log("FILL IN THE BLANK");
	var questions = clozeCards.map(function(clozeCard, i) {
		return {
			name: i.toString(),
			message: clozeCard.partial
		};
	});

	inquirer.prompt(questions).then(function(answers) {
		for ( var key in answers ) {
			if ( clozeCards[Number(key)].cloze == answers[key] ) {
				clozeCorrect++;
			} else {
                clozeIncorrect++;
			}
		}
		
		console.log('Correct: ' + clozeCorrect, 'Incorrect: ' + clozeIncorrect);
	});
}

uno();


// var card1 = new BasicCard('What color is the sky?', 'blue');

// console.log(card1);