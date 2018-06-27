import React, { Component } from 'react';
import './cards.css';

class Cards extends Component {
  constructor(){
    super();
    this.state = {
      cards: [],
    }

    this.getCards = this.getCards.bind(this);
    this.addCard = this.addCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }

  componentWillMount(){
    this.getCards();
    this.addCard;
    this.removeCard;
  }

  //gets cards via fetch
  getCards(){
    fetch('/api/cards')
      .then(res => res.json())
      .then(cards => this.setState({cards}, () => console.log('Cards fetched..', cards)));
  }

  //add card via post request
  addCard(e){
    e.preventDefault();
    let addName = this.refs.cardName.value;
    let addType = this.refs.cardType.value;
    let addFaction = this.refs.cardFaction.value;
    let addColor = function(){
      switch(addFaction){
        case "BedLamal":
          return("#462c63")
          break;
        case "Savage Lands":
          return("#a33030")
          break;
        case "Forest":
          return("#48a548")
          break;
        case "Aubadel Orda":
          return("#fbffc9")
          break;
        case "Neutral":
          return("#e2e2e2")
          break;
        default:
          return("#e2e2e2");
      }
    };
    console.log(addName);
    console.log(addType);
    console.log(addFaction);
    fetch('/api/cards/', {
      method: 'POST',
      body: JSON.stringify(
        {
          "name": addName,
          "type": addType,
          "faction": addFaction,
          "color": addColor()
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json());
    console.log("Just added " + addName + " as a " + addType + " card!");
    this.getCards();  //refreshes list
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
    .then(res => res.json())
    .then(console.log(card.name + ' deleted!'));
    this.getCards();  //refreshes list
  }

  render() {
    return (
      <div className="cards">
        <h2>Cards Working!</h2>
        <form onSubmit={this.addCard}>
          <input ref="cardName" placeholder="Name here" type="text" name="cardName" />
          <select ref="cardType">
            <option value="cleric">Cleric</option>
            <option value="mage">Mage</option>
            <option value="warrior">Warrior</option>
            <option value="marksman">Marksman</option>
            <option value="trickster">Trickster</option>
            <option value="beast">Beast</option>
            <option value="spirit">Spirit</option>
            <option value="black_smith">Black Smith</option>
            <option value="siege">Siege</option>
            <option value="action">Action</option>
            <option value="reaction">Reaction</option>
            <option value="fortress">Fortress</option>
            <option value="territory">Territory</option>
          </select>
          <select ref="cardFaction">
            <option value="Bedlamal">Bedlamal</option> {/* Indigo #462c63 */}
            <option value="Forest">Forest</option> {/* Green #48a548 */}
            <option value="Savage Lands">Savage Lands</option> {/* Crimson #a33030 */}
            <option value="Aubadel Orda">Aubadel Orda</option> {/* Cream #fbffc9 */}
            <option value="Neutral">Neutral</option> {/* Silver #e2e2e2 */}
          </select>
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {this.state.cards.map((card) =>
            <li key={card._id}>
              {card.name} - {card.type} - {card.faction} - {card.color} <span className="close" onClick={(e) => this.removeCard(e, card)}>X</span>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Cards;
