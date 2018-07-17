import React, { Component } from 'react';
import './cards.css';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const cardsUrl= '/api/cards/';  //url for cards

class Cards extends Component {

  constructor(props){
    super(props);
    this.state = {
      cards: [],
      modalIsOpen: false,
      currentCard: ''
    }
    //bind ups
    this.getCards = this.getCards.bind(this);
    this.addCard = this.addCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.removeCard = this.removeCard.bind(this);

    //modal binds
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  //modal functions-------------------------
  openModal(e, card) {
    e.preventDefault();
    let cardId = card._id;
    console.log(cardId);
    this.setState({modalIsOpen: true});
    this.setState({currentCard: card});
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  //----------------------------------------

  componentWillMount(){
    this.getCards();
    this.updateCard;
    this.addCard;
    this.removeCard;
    this.currentCard;
    this.openModal;
  }

  //function for splicing text
  infoCleanup(info){
    if(info.length > 75){
      return info.slice(0, 75) + "... ";
    }
    else if(info.length < 75){
      let num = 75 - info.length;
      let spaces = " ";
      for(var i = 0; i < num; i++){
        spaces += " ";
      }
      return info + spaces;
    }
  }

  //gets cards via fetch
  getCards(){
    fetch(cardsUrl)
      .then(res => res.json())
      .then(cards => this.setState({cards}, () => console.log('Cards fetched..', cards)));
  }

  //sort cards
  sortCards(cards){
    this.cards.sort(function(a, b){
      return a.value - b.value;
    })
  }

  setCardColor(card){
    switch(card){
      case "Bedlamal":
        return("#a971e8")
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
  }

  //applies color for
  //add card via post request
  addCard(e){
    e.preventDefault();
    let addName = this.refs.cardName.value;
    let addType = this.refs.cardType.value;
    let addFaction = this.refs.cardFaction.value;
    let addHp = this.refs.cardHp.value;
    let addDef = this.refs.cardDef.value;
    let addBaseAp = this.refs.cardBaseAp.value;
    let addRank = this.refs.cardRank.value;
    let addReq = this.refs.cardReq.value;
    let addImg = this.refs.cardImgUrl.value;
    let addPassive = this.refs.cardPassive.value;
    let addSkill1 = this.refs.cardSkill_1.value;
    let addSkill2 = this.refs.cardSkill_2.value;
    let addSkill3 = this.refs.cardSkill_3.value;
    fetch(cardsUrl, {
      method: 'POST',
      body: JSON.stringify(
        {
          "name": addName,
          "type": addType,
          "faction": addFaction,
          "color": this.setCardColor(addFaction), //addColor(),
          "hp": addHp,
          "def": addDef,
          "base_ap": addBaseAp,
          "rank": addRank,
          "req": addReq,
          "image_url": addImg,
          "passive": addPassive,
          "skill_1": addSkill1,
          "skill_2": addSkill2,
          "skill_3": addSkill3
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json());
    console.log("Just added " + addName + " as a " + addType + " card!");
    document.getElementById("submit-form").reset(); //resets form
    this.getCards();  //refreshes list
  }

  //edit a card via put request
  updateCard(e){
    e.preventDefault();
    let card = this.state.currentCard;
    let id = card._id;
    let editName = this.refs.editName.value;
    let editType = this.refs.editType.value;
    let editFaction = this.refs.editFaction.value; //probation
    let editHp = this.refs.editHp.value;
    let editDef = this.refs.editDef.value;
    let editBaseAp = this.refs.editBaseAp.value;
    let editRank = this.refs.editRank.value;
    let editReq = this.refs.editReq.value;
    let editImg = this.refs.editImgUrl.value;
    let editPassive = this.refs.editPassive.value;
    let editSkill1 = this.refs.editSkill_1.value;
    let editSkill2 = this.refs.editSkill_2.value;
    let editSkill3 = this.refs.editSkill_3.value;
    fetch(cardsUrl + id, {
      method: 'PUT',
      body: JSON.stringify(
        {
          "name": editName,
          "type": editType,
          "faction": editFaction, //probation
          "color": this.setCardColor(editFaction),  //this.state.currentCard.color, probation
          "hp": editHp,
          "def": editDef,
          "base_ap": editBaseAp,
          "rank": editRank,
          "req": editReq,
          "image_url": editImg,
          "passive": editPassive,
          "skill_1": editSkill1,
          "skill_2": editSkill2,
          "skill_3": editSkill3
        })
      ,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(console.log(card.name + ' updated! as ' + card.faction));
    this.closeModal();
    this.getCards();  //refreshes list
  }

  //deleteCard
  removeCard(e, card){
    e.preventDefault();
    let id = card._id;
    fetch(cardsUrl + id, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(console.log(card.name + ' deleted!'));
    this.getCards();  //refreshes list
  }

  render() {
    return (
      <div className="cards">
        {/*  Modal */}
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal">

            {/*<h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>*/}
            <section className="update-card-modal">
              <div style={{backgroundColor: "#fcedde"}} className="whole-card">
                <div className="inner-card">
                <div style={{color: "orange"}}>Update {this.state.currentCard.name}</div>
                <div className="card-input">
                  <form id="modal-form">
                    <input ref="editName" placeholder="Name here" type="text" name="editName" defaultValue={this.state.currentCard.name} />
                    <input ref="editHp" placeholder="HP Amount" type="text" name="editHp" defaultValue={this.state.currentCard.hp} />
                    <input ref="editDef" placeholder="Defense here" type="text" name="editDef" defaultValue={this.state.currentCard.def} />
                    <input ref="editBaseAp" placeholder="Base AP here" type="text" name="editBaseAp" defaultValue={this.state.currentCard.base_ap} />
                    <input ref="editRank" placeholder="Rank here" type="text" name="editRank" defaultValue={this.state.currentCard.rank} />
                    <input ref="editReq" placeholder="Required here" type="text" name="editReq" defaultValue={this.state.currentCard.req} />
                    <input ref="editImgUrl" placeholder="Image URL here" type="text" name="editImgUrl" defaultValue={this.state.currentCard.image_url} />
                    <input ref="editPassive" placeholder="Passive here" type="text" name="editPassive" defaultValue={this.state.currentCard.passive} />
                    <input ref="editSkill_1" placeholder="Skill #1 here" type="text" name="editSkill_1" defaultValue={this.state.currentCard.skill_1} />
                    <input ref="editSkill_2" placeholder="Skill #2 here" type="text" name="editSkill_2" defaultValue={this.state.currentCard.skill_2} />
                    <input ref="editSkill_3" placeholder="Skill #3 here" type="text" name="editSkill_3" defaultValue={this.state.currentCard.skill_3} />
                    <select ref="editType" defaultValue={this.state.currentCard.type}>
                      <option value="-">-</option>
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

                    <select ref="editFaction" defaultValue={this.state.currentCard.faction}>
                      <option value="-">-</option>
                      <option value="Bedlamal">Bedlamal</option>
                      <option value="Forest">Forest</option>
                      <option value="Savage Lands">Savage Lands</option>
                      <option value="Aubadel Orda">Aubadel Orda</option>
                      <option value="Neutral">Neutral</option>
                    </select>
                  
                  </form>
                </div>
              </div>
              </div>
              <div className="card-foot">
                <button className="card-foot-button-1" onClick={(e) => this.updateCard(e)}>Update {this.state.currentCard.name}</button>
                <button className="card-foot-button-2" onClick={this.closeModal}>Cancel</button>
              </div>
            </section>
          </Modal>
        </div>
        {/* End Modal */}

        <div className="card-title">
          <h2>Cards Working!</h2>
        </div>
        <div className="legend">
          <i style={{color: "#a971e8"}} className="ion ion-record">Bedlamal</i>
          <i style={{color: "#48a548"}} className="ion ion-record">Forest</i>
          <i style={{color: "#a33030"}} className="ion ion-record">Savage Lands</i>
          <i style={{color: "#fbffc9"}} className="ion ion-record">Aubadel Orda</i>
          <i style={{color: "#e2e2e2"}} className="ion ion-record">Neutral</i>
        </div>
        <div className="new-list">
          <ul>
            <li>
              <div style={{backgroundColor: "#bef4c2"}} className="whole-card">
                <div style={{color: "green"}}>New Card</div>
                <div className="card-input">
                  <form id="submit-form">
                    <input ref="cardName" placeholder="Name here" type="text" name="cardName" />
                    <input ref="cardHp" placeholder="HP Amount" type="text" name="cardHp" />
                    <input ref="cardDef" placeholder="Defense here" type="text" name="cardDef" />
                    <input ref="cardBaseAp" placeholder="Base AP here" type="text" name="cardBaseAp" />
                    <input ref="cardRank" placeholder="Rank here" type="text" name="cardRank" />
                    <input ref="cardReq" placeholder="Required here" type="text" name="cardReq" />
                    <input ref="cardImgUrl" placeholder="Image URL here" type="text" name="cardImgUrl" />
                    <input ref="cardPassive" placeholder="Passive here" type="text" name="cardPassive" />
                    <input ref="cardSkill_1" placeholder="Skill #1 here" type="text" name="cardSkill_1" />
                    <input ref="cardSkill_2" placeholder="Skill #2 here" type="text" name="cardSkill_2" />
                    <input ref="cardSkill_3" placeholder="Skill #3 here" type="text" name="cardSkill_3" />
                    <br/>
                    <select ref="cardType">
                      <option value="-">-</option>
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
                      <option value="-">-</option>
                      <option value="Bedlamal">Bedlamal</option> {/* Indigo #a971e8 */}
                      <option value="Forest">Forest</option> {/* Green #48a548 */}
                      <option value="Savage Lands">Savage Lands</option> {/* Crimson #a33030 */}
                      <option value="Aubadel Orda">Aubadel Orda</option> {/* Cream #fbffc9 */}
                      <option value="Neutral">Neutral</option> {/* Silver #e2e2e2 */}
                    </select>
                  </form>
                </div>
              </div>
              <div className="card-foot">
                <i className="ion-plus-round new" onClick={this.addCard}></i><br/>
              </div>
            </li>
            {this.state.cards.reverse().map((card) =>
              <li onChange={this.getCards} key={card._id}>  {/* onChange seemingly fixes the no-refresh problem */}
              <div style={{backgroundColor: card.color}} className="whole-card">
                  <div className="full">
                    <div className="left">
                      {card.name}
                    </div>
                    <div className="right">
                      <span style={{color:"#3c7ee8"}}>HP:</span> {card.hp}
                    </div>
                  </div>
                  <div className="full">
                    <div className="crop">
                      <img className="card-img" width="150px" alt={card.name} src={card.image_url} />
                    </div>
                  </div>
                  <div className="full">
                    <div className="underline left">
                      {card.rank}
                    </div>
                    <div className="underline right">
                      {card.req}
                    </div>
                  </div>
                  <div className="underline justified full">
                    <p title={card.passive}>{this.infoCleanup(String(card.passive))}</p>
                  </div>
                  <div className="full align-left">
                    <span style={{color:"#3c7ee8"}}>Skill 1</span> - {card.skill_1}
                  </div>
                  { card.skill_2 != "-" &&
                  <div className="full align-left">
                    <span style={{color:"#3c7ee8"}}>Skill 2</span> - {card.skill_2}
                  </div>
                  }
                  { card.skill_3 != "-" &&
                  <div className="full align-left">
                    <span style={{color:"#3c7ee8"}}>Skill 3</span> - {card.skill_3}
                  </div>
                  }
                  <div className="overline full">
                    <div className="left">
                      AP: {card.base_ap}
                    </div>
                    <div className="right">
                      Def: {card.def}
                    </div>
                  </div>
                </div>
                <div className="card-foot">
                  {/*<i className="ion-edit update" onClick={(e) => this.updateCard(e, card)}></i>*/}
                  <i className="ion-edit update" onClick={(e) => this.openModal(e, card)}></i>
                  <i className="ion-close close" onClick={(e) => this.removeCard(e, card)}></i>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Cards;
