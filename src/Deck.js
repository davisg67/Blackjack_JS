'use strict';


class Deck {
    constructor() {
        this.cards = []; 
    }
}

Deck.prototype.deckSize = function () {
  return this.cards.length;
}

Deck.prototype.getNextCard = function () {
  if (this.cards.length > 0) {
    return this.cards.shift();
  } else {
      return null;
  }
}

Deck.prototype.shuffleDeck = function (shuffleCount = 1) {
  let size = this.cards.length;

  for (let x = 0; x < shuffleCount; x++) {
    
    for (let i = 0; i < size-1; i++) {
      let swapIndex = Math.floor(Math.random() * size); //Get random index from 0-51.
  
      //Swap current card with random card.
      let tmp = this.cards[swapIndex];   
      this.cards[swapIndex] = this.cards[i];
      this.cards[i] = tmp;
    }

  }
  
}

Deck.prototype.createDeck = function () {
  let path = 'images/';
  let imagePath = '';
  let cardText = '';
  let scoreValue = 0;
  let deck = [];

  
  for (let i = 0; i < 52; i++)
  {
    switch(i) {
      case 0:
        cardText = 'Ace of Clubs'
        imagePath = path + '1.png'
        scoreValue = 1;  
        break;
      case 1:
        cardText = 'Ace of Spades'
        imagePath = path + '2.png'
        scoreValue = 1;
        break;
      case 2:
        cardText = 'Ace of Hearts'
        imagePath = path + '3.png'
        scoreValue = 1;
        break;
      case 3:
        cardText = 'Ace of Diamonds'
        imagePath = path + '4.png'
        scoreValue = 1;
        break;

      case 4:
        cardText = 'King of Clubs'
        imagePath = path + '5.png'
        scoreValue = 10;
        break;
      case 5:
        cardText = 'King of Spades'
        imagePath = path + '6.png'
        scoreValue = 10;
        break;
      case 6:
        cardText = 'King of Hearts'
        imagePath = path + '7.png'
        scoreValue = 10;
        break;
      case 7:
        cardText = 'King of Diamonds'
        imagePath = path + '8.png'
        scoreValue = 10;
        break;

      case 8:
        cardText = 'Queen of Clubs'
        imagePath = path + '9.png'
        scoreValue = 10;
        break;
      case 9:
        cardText = 'Queen of Spades'
        imagePath = path + '10.png'
        scoreValue = 10;
        break;
      case 10:
        cardText = 'Queen of Hearts'
        imagePath = path + '11.png'
        scoreValue = 10;
        break;
      case 11:
        cardText = 'Queen of Diamonds'
        imagePath = path + '12.png'
        scoreValue = 10;
        break;

      case 12:
        cardText = 'Jack of Clubs'
        imagePath = path + '13.png'
        scoreValue = 10;
        break;
      case 13:
        cardText = 'Jack of Spades'
        imagePath = path + '14.png'
        scoreValue = 10;
        break;
      case 14:
        cardText = 'Jack of Hearts'
        imagePath = path + '15.png'
        scoreValue = 10;
        break;
      case 15:
        cardText = 'Jack of Diamonds'
        imagePath = path + '16.png'
        scoreValue = 10;
        break;

      case 16:
        cardText = 'Ten of Clubs'
        imagePath = path + '17.png'
        scoreValue = 10;
        break;
      case 17:
        cardText = 'Ten of Spades'
        imagePath = path + '18.png'
        scoreValue = 10;
        break;
      case 18:
        cardText = 'Ten of Hearts'
        imagePath = path + '19.png'
        scoreValue = 10;
        break;
      case 19:
        cardText = 'Ten of Diamonds'
        imagePath = path + '20.png'
        scoreValue = 10;
        break;

      case 20:
        cardText = 'Nine of Clubs'
        imagePath = path + '21.png'
        scoreValue = 9;
        break;
      case 21:
        cardText = 'Nine of Spades'
        imagePath = path + '22.png'
        scoreValue = 9;
        break;
      case 22:
        cardText = 'Nine of Hearts'
        imagePath = path + '23.png'
        scoreValue = 9;
        break;
      case 23:
        cardText = 'Nine of Diamonds'
        imagePath = path + '24.png'
        scoreValue = 9;
        break;

      case 24:
        cardText = 'Eight of Clubs'
        imagePath = path + '25.png'
        scoreValue = 8;
        break;
      case 25:
        cardText = 'Eight of Spades'
        imagePath = path + '26.png'
        scoreValue = 8;
        break;
      case 26:
        cardText = 'Eight of Hearts'
        imagePath = path + '27.png'
        scoreValue = 8;
        break;
      case 27:
        cardText = 'Eight of Diamonds'
        imagePath = path + '28.png'
        scoreValue = 8;
        break;

      case 28:
        cardText = 'Seven of Clubs'
        imagePath = path + '29.png'
        scoreValue = 7;
        break;
      case 29:
        cardText = 'Seven of Spades'
        imagePath = path + '30.png'
        scoreValue = 7;
        break;
      case 30:
        cardText = 'Seven of Hearts'
        imagePath = path + '31.png'
        scoreValue = 7;
        break;
      case 31:
        cardText = 'Seven of Diamonds'
        imagePath = path + '32.png'
        scoreValue = 7;
        break;

      case 32:
        cardText = 'Six of Clubs'
        imagePath = path + '33.png'
        scoreValue = 6;
        break;
      case 33:
        cardText = 'Six of Spades'
        imagePath = path + '34.png'
        scoreValue = 6;
        break;
      case 34:
        cardText = 'Six of Hearts'
        imagePath = path + '35.png'
        scoreValue = 6;
        break;
      case 35:
        cardText = 'Six of Diamonds'
        imagePath = path + '36.png'
        scoreValue = 6;
        break;

      case 36:
        cardText = 'Five of Clubs'
        imagePath = path + '37.png'
        scoreValue = 5;
        break;
      case 37:
        cardText = 'Five of Spades'
        imagePath = path + '38.png'
        scoreValue = 5;
        break;
      case 38:
        cardText = 'Five of Hearts'
        imagePath = path + '39.png'
        scoreValue = 5;
        break;
      case 39:
        cardText = 'Five of Diamonds'
        imagePath = path + '40.png'
        scoreValue = 5;
        break;

      case 40:
        cardText = 'Four of Clubs'
        imagePath = path + '41.png'
        scoreValue = 4;
        break;
      case 41:
        cardText = 'Four of Spades'
        imagePath = path + '42.png'
        scoreValue = 4;
        break;
      case 42:
        cardText = 'Four of Hearts'
        imagePath = path + '43.png'
        scoreValue = 4;
        break;
      case 43:
        cardText = 'Four of Diamonds'
        imagePath = path + '44.png'
        scoreValue = 4;
        break;

      case 44:
        cardText = 'Three of Clubs'
        imagePath = path + '45.png'
        scoreValue = 3;
        break;
      case 45:
        cardText = 'Three of Spades'
        imagePath = path + '46.png'
        scoreValue = 3;
        break;
      case 46:
        cardText = 'Three of Hearts'
        imagePath = path + '47.png'
        scoreValue = 3;
        break;
      case 47:
        cardText = 'Three of Diamonds'
        imagePath = path + '48.png'
        scoreValue = 3;
        break;

      case 48:
        cardText = 'Two of Clubs'
        imagePath = path + '49.png'
        scoreValue = 2;
        break;
      case 49:
        cardText = 'Two of Spades'
        imagePath = path + '50.png'
        scoreValue = 2;
        break;
      case 50:
        cardText = 'Two of Hearts'
        imagePath = path + '51.png'
        scoreValue = 2;
        break;
      case 51:
        cardText = 'Two of Diamonds'
        imagePath = path + '52.png'
        scoreValue = 2;
        break;
    }

    let card = {
        cardtext: cardText,
        score: scoreValue,
        path: imagePath,
        node: null
    }

    deck.push(card);
  }

  this.cards = deck;
  return deck;
}





