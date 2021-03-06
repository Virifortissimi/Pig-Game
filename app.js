/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, diceDOM, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        // 1. Random Number 
            var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the Result
            diceDOM.style.display = 'block';
            document.querySelector('img').src = 'dice-' + dice + '.png';

        // 3. Update the round score IF the rolled number was not a 1
            if (dice !== 1) {
        //Add Score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
        nextPlayer();
        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.add('active');

        diceDOM.style.display = 'none';
    }   
    }

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
        // roundScore += roundScore;
        // document.querySelector('#score-' + activePlayer).textContent = roundScore;
        //Add Current Score to Global Score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        //Check if player won the game
        if (scores[activePlayer] >= 100) {
            var nameOfPlayer = document.querySelector('#name-' + activePlayer).textContent;
            window.alert('Congrats ' + nameOfPlayer + ', You won the game...');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            window.alert('Press New Game!!!');

            gamePlaying = false;
    }else {
        nextPlayer();
        diceDOM.style.display = 'none';
    }   
    }
});

document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;    
        roundScore = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        diceDOM.style.display = 'none';
};

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    diceDOM = document.querySelector('.dice');
    gamePlaying = true;

    diceDOM.style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Name of Players
    var nameOfPlayer1 = document.querySelector('#name-0');
    var nameOfPlayer2 = document.querySelector('#name-1');

    var chooseNameForPlayer_0 = prompt('Whats your name?');
    var chooseNameForPlayer_1 = prompt('Whats your name?');

    nameOfPlayer1.textContent = chooseNameForPlayer_0;
    nameOfPlayer2.textContent = chooseNameForPlayer_1;

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');    
};
