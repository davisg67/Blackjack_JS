'use strict';


class Game {
    constructor() {
        this.newGameButton = document.getElementById('new-game-link');
        this.newGameButton.addEventListener('click', ()=> this.newGame());

        this.newGameButtonSub = document.getElementById('new-game-link-sub');
        this.newGameButtonSub.addEventListener('click', ()=> this.newGame());

        this.hitButton = document.getElementById('hit-button');
        this.hitButton.addEventListener('click', ()=> this.hitMe());

        this.stayButton = document.getElementById('stay-button');
        this.stayButton.addEventListener('click', ()=> this.stay());

        //Scoring section
        this.scoreText = document.getElementById('scores-section');
        this.showDealerScore = document.getElementById('dealer-score-span');
        this.showPlayerScore = document.getElementById('player-score-span');
        this.winnerSection = document.getElementById('winner-section');
        this.winnerText = document.getElementById('winner-text');

        //Card display
        this.cardArea = document.getElementById('card-area');
        this.dealerArea = document.getElementById('dealer-area');
        this.playerArea = document.getElementById('player-area');

        this.gameStatus = {
          gameOver: false,
          playerDone: false,
          playerWins: false,
          dealerWins: false,
          playersTied: false,
          playerBlackjack: false,
          dealerBlackjack: false
        }

        this.dealerHiddenCard = {};
        this.dealerCards = [];
        this.playerCards = [];
        this.dealerScore = 0;
        this.playerScore = 0;
        
        this.deck = new Deck();
        this.setGameElements(0); 
    }

}


Game.prototype.newGame = function () {
  this.setGameElements(1); 
  this.deck.createDeck();
  this.deck.shuffleDeck(2);

  let hiddenCard = {
    cardtext: 'hidden',
    score: 0,
    path: 'images/card_back.png',
    node: null
  }
  
  //Both players start with two cards.
  this.dealerCards = [this.deck.getNextCard(), hiddenCard];
  this.dealerHiddenCard = this.deck.getNextCard();                          //Temporary hold the face down card value.
  this.playerCards = [this.deck.getNextCard(), this.deck.getNextCard()];

  //this.dealerCards, this.playerCards
  this.placeCards();
  this.updateScores();
  this.checkBlackjack(this.playerScore, this.playerCards.length);
  
  this.updateGameState();
  this.checkForEndOfGame();
}

Game.prototype.checkBlackjack = function (score, cardCount) {
   if (score == 21 && cardCount == 2) {
      this.gameStatus.playerDone = true;
      this.gameStatus.playerBlackjack = true;
      return
   }

   if (score == 21) {
      this.gameStatus.playerDone = true;
      return;
   }

   return;
}

Game.prototype.hitMe = function () {
  if (!this.gameStatus.playerDone) {
    this.playerCards.push(this.deck.getNextCard());
    this.placeCards();
    this.updateScores();
    this.checkBlackjack(this.playerScore, this.playerCards.length);
    this.updateGameState(this.dealerScore, this.playerScore);
    this.checkForEndOfGame();
  }
}

Game.prototype.stay = function () {
  if (!this.gameStatus.playerDone) {
    this.gameStatus.playerDone = true;
   
    this.updateGameState();
    this.checkForEndOfGame();
  }
}

//Create card div with class='card'.
Game.prototype.createCardNode = function () {
  let cardNode = document.createElement("DIV");
  cardNode.className = "card";
  return cardNode;
}

//Create card node, set card image, append to dealer and player areas.
Game.prototype.placeCards = function () {
  this.clearCards();

  //Dealer
  for (let i = 0; i < this.dealerCards.length; i++) {
    let cardNode = this.createCardNode();
    
    //Card image
    let imageNode = document.createElement("IMG");
    imageNode.src = this.dealerCards[i].path;               
    cardNode.appendChild(imageNode);      

    //cardNode.style.zIndex = i;
    let node = this.dealerArea.appendChild(cardNode);       //Add card to dealer area.
    this.dealerCards[i].node = node;                        //Used to id the card.
  }

  //Player
  for (let i = 0; i < this.playerCards.length; i++) {
    let cardNode = this.createCardNode();
    
    //Card image
    let imageNode = document.createElement("IMG");
    imageNode.src = this.playerCards[i].path;
    cardNode.appendChild(imageNode);
    
    let node = this.playerArea.appendChild(cardNode);
    this.playerCards[i].node = node;
  }
}


Game.prototype.updateScores = function () {
  this.dealerScore = this.getScore(this.dealerCards);
  this.playerScore = this.getScore(this.playerCards);

  this.showDealerScore.innerHTML = this.dealerScore;
  this.showPlayerScore.innerHTML = this.playerScore;
}

Game.prototype.getScore = function (cardArray) {
  let score = 0;
  let hasAce = false;
  
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    
    score += card.score;
    if (card.score === 1) {
      hasAce = true;
    }
  }
  
  //Ace is treated as 1 or 11; whichever is better for the hand.
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

Game.prototype.clearCards = function () {
  if (this.dealerCards.length > 0) {
    for (let i = 0; i < this.dealerCards.length; i++) {
      if (this.dealerCards[i].node != null) {
        this.dealerArea.removeChild(this.dealerCards[i].node);
      }
    }
  }
  
  if (this.playerCards.length > 0) {
    for (let i = 0; i < this.playerCards.length; i++) {
      if (this.playerCards[i].node != null) {
        this.playerArea.removeChild(this.playerCards[i].node);
      } 
    }
  }
}

Game.prototype.setGameElements = function (state) {
  if (state === 1){
    //Starting new game.
    this.clearCards();

    this.gameStatus.gameOver = false;
    this.gameStatus.playerWins = false;
    this.gameStatus.dealerWins = false;
    this.gameStatus.playersTied = false;
    this.gameStatus.playerDone = false;
    this.gameStatus.playerBlackjack = false;
    this.gameStatus.dealerBlackjack = false;

    this.dealerCards = [];
    this.playerCards = [];
    this.dealerScore = 0;
    this.playerScore = 0;
    this.deck = new Deck();
    this.dealerHiddenCard = {};
    
    this.scoreText.style.display = 'inline';
    this.cardArea.style.display = 'block';
  } else {
    this.scoreText.style.display = 'none';
    this.cardArea.style.display = 'none';
  }

  this.winnerSection.style.display = 'none';
  
}

Game.prototype.checkForEndOfGame = function () {
  if (this.gameStatus.gameOver) {

    //Player
    if (this.gameStatus.playerWins) {
      this.winnerSection.style.display = 'inline';
      this.winnerText.innerText = 'Player Wins!';
      return;
    } 
    
    //Dealer
    if (this.gameStatus.dealerWins) {
      this.winnerSection.style.display = 'inline';
      this.winnerText.innerText = 'Dealer Wins!';
      return;
    } 
    
    //Tied Game
    if (this.gameStatus.playersTied) {
      this.winnerSection.style.display = 'inline';
      this.winnerText.innerText = 'Tie Game';
      return;
    }
  }
}


//Replaces the face down card with it's face up card.
Game.prototype.swapHiddenCard = function (hiddenCard) {
  for (let i = 0; i < this.dealerCards.length; i++) {
    if (this.dealerCards[i].cardtext == 'hidden') {
      //this.dealerArea.removeChild(this.dealerCards[i].node);
      let node = this.dealerCards[i].node;
      this.dealerCards[i] = hiddenCard;
      return node;
    }
  }

  return -1;
}

Game.prototype.removeCard = function (area, node) {
  let result = null;

  if (area == 'dealer') {
    result = this.dealerArea.removeChild(node);
  } else {
    result = this.playerArea.removeChild(node);
  }

  if (result == null) {
    console.log('Error: removeCard() = null');
  }
}

Game.prototype.updateGameState = function () {
  let result = null;

  if (!this.gameStatus.playerDone) {
    if (this.playerScore > 21) {
        //Bust
        this.gameStatus.dealerWins = true;
        this.gameStatus.gameOver = true;
    } 
  } else {
    //Dealer's Turn
    result = this.swapHiddenCard(this.dealerHiddenCard)        //Dealer gets second card. Card stored in dealerHiddenCard.
    if (result == null) {
      console.log('Error: Hidden card node not set.');
    } else if (result == -1) {
      console.log('Error: Hidden card not found.');
    } else {
      this.removeCard('dealer', result);              //Remove the hidden card from dealer's hand.
    }

    this.updateScores();
    this.placeCards();

    //Evaluate natural blackjacks - 21 with first two cards only.
    this.evalNaturalBlackjacks(this.dealerScore);
    
    if (!this.gameStatus.gameOver) {
      this.dealerDraws();
      this.placeCards();
      this.setFinalGameStatus(this.dealerScore, this.playerScore);
    }
    
  }
}

//Dealer draws until 17 or greater.
Game.prototype.dealerDraws = function () {
  while (this.dealerScore < 17) {
    this.dealerCards.push(this.deck.getNextCard());
    this.updateScores();
  }
}

Game.prototype.evalNaturalBlackjacks = function (dealerScore) {
  if (dealerScore == 21) {
    this.gameStatus.dealerBlackjack = true;
  }
 
  if (this.gameStatus.playerBlackjack && this.gameStatus.dealerBlackjack) {
    this.gameStatus.playersTied = true;
    this.gameStatus.gameOver = true;
  } else if (this.gameStatus.playerBlackjack) {
    this.gameStatus.playerWins = true;
    this.gameStatus.gameOver = true;
  } else if (this.gameStatus.dealerBlackjack) {
    this.gameStatus.dealerWins = true;
    this.gameStatus.gameOver = true;
  }
}

Game.prototype.setFinalGameStatus = function (dealerScore, playerScore) {
  if (dealerScore > 21) {
    this.gameStatus.playerWins = true;
  } else if (dealerScore == playerScore) {
    this.gameStatus.playersTied = true;
  } else if (dealerScore > playerScore) {
    this.gameStatus.dealerWins = true;
  } else {
    this.gameStatus.playerWins = true;
  }

  this.gameStatus.gameOver = true;
}

new Game();




















