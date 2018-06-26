import React, { Component } from 'react';
import './cards.css';

class Cards extends Component {
  constructor(){
    super();
    this.state = {
      cards: [],
      index: 0
    }

    this.addCard = this.addCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.getCards = this.getCards.bind(this);
  }

  componentDidMount(){
    this.getCards();
    this.addCard();
  }

  //gets cards via fetch
  getCards(){
    fetch('/api/cards')
      .then(res => res.json())
      .then(cards => this.setState({cards}, () => console.log('Cards fetched..', cards)));
  }

  //add card via post request
  addCard(){
    console.log(this.refs.cardName.value);
    console.log(this.refs.cardType.value);
    let addName = String(this.refs.cardName.value);
    let addType = String(this.refs.cardType.value);
    fetch('/api/cards/', {
      method: 'POST',
      body: JSON.stringify(
        {
          "name": addName,
          "type": addType
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  }

  //edit a card via put request
  updateCard(e){
    console.log(e);
    fetch('/api/card/' + e._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  //deleteCard
  removeCard(e, card){
    e.preventDefault();
    let id = card._id;
    fetch('/api/cards/' + id, {
      method: 'DELETE'
    })
    //.then(res => res.json());
  }

  render() {
    return (
      <div className="cards">
        <h2>Cards Working!</h2>
        <form onSubmit={() => this.addCard}>
          <input ref="cardName" placeholder="Name here" type="text" name="cardName" />
          <select ref="cardType">
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {this.state.cards.map((card) =>
            <li key={card._id}>
              {card.name} - {card.type} <span onClick={(e) => this.removeCard(e, card)}>X</span>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Cards;
