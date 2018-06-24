import React, { Component } from 'react';
import './cards.css';

class Cards extends Component {
  constructor(){
    super();
    this.state = {
      cards: []
    }
  }

  componentDidMount(){
    this.getCards();
  }

  getCards(){
    fetch('/api/cards')
      .then(res => res.json())
      .then(cards => this.setState({cards}, () => console.log('Cards fetched..', cards)));
  }

  render() {
    return (
      <div className="cards">
        <h2>Cards Working!</h2>
        <ul>
          {this.state.cards.map((card) =>
            <li key={card.id}>
              {card.name} - {card.type}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Cards;
