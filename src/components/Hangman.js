import React from "react"
import randomWord from "./Words"
import logo from "../images/liveHeart.png"
import logo2 from "../images/lostHeart.png"

// Code adapted from https://github.com/simonjsuh/Reactjs-Hangman-Game-Source-Code


class Hangman extends React.Component {

    static defaultProps = {
        maxWrong: 5,
        images: [logo, logo2]
      }

    constructor() {
        super()
        this.state = {
     
        overlay: true,
        mistake: 0,
        guessed: new Set([]),
        answer: randomWord(),
        screen:false,
        win:false,
     
        }
     
        this.changeDisplay = this.changeDisplay.bind(this)
        this.guessedWord = this.guessedWord.bind(this)
        this.displayWinner = this.displayWinner.bind(this)
        this.handleGuess = this.handleGuess.bind(this)
        this.resetButton = this.resetButton.bind(this)
        this.generate_QWERTY_Buttons = this.generate_QWERTY_Buttons.bind(this)
        this.generate_ASDF_Buttons = this.generate_ASDF_Buttons.bind(this)
        this.generate_ZXCVB_Buttons = this.generate_ZXCVB_Buttons.bind(this)
        this.lose = this.lose.bind(this)
        this.displayWinner = this.displayWinner.bind(this)
        // this.backtoOverlay = this.backtoOverlay.bind(this)
       
     }
     
     
     changeDisplay() {
     
       this.setState({
       
       overlay:false,
       }
       
       )
     
     }


     guessedWord() {
        console.log(this.state.answer)
        return this.state.answer.split("").map(
        letter => (this.state.guessed.has(letter) ? <li className="letter show">{letter}</li> :  <li className="letter"></li> ))}



        resetButton = () => {
            this.setState({
              mistake: 0,
              guessed: new Set([]),
              answer: randomWord(),
              screen:false,
              win:false,

            });
          }

 displayWinner() {

       return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ ")); 

 }

lose() {

this.setState({
    
    screen: true,
    mistake:0,

})

 }

 win() {

    this.setState ({


        win : true,
        mistake: 0,
        answer:'win',
    })
    


 }

      handleGuess (event) {
        let letter = event.target.value;
        this.setState(st => ({
          guessed: st.guessed.add(letter),
          mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
        }));
      }


      generate_QWERTY_Buttons() {
        return "qwertyuiop".split("").map(letter => (
          <button
            key={letter}
            value={letter}
            onClick={this.handleGuess}
            disabled={this.state.guessed.has(letter)}
          >
            {letter}
          </button>
        ));
      }


      generate_ASDF_Buttons() {
        return "asdfghjkl".split("").map(letter => (
          <button
            key={letter}
            value={letter}
            onClick={this.handleGuess}
            disabled={this.state.guessed.has(letter)}
          >
            {letter}
          </button>
        ));
      }


      generate_ZXCVB_Buttons() {
        return "zxcvbnm".split("").map(letter => (
          <button
            key={letter}
            value={letter}
            onClick={this.handleGuess}
            disabled={this.state.guessed.has(letter)}
          >
            {letter}
          </button>
        ));
      }

render()
{

    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.displayWinner().join("") === this.state.answer;
    let gameStat_QWERTY = this.generate_QWERTY_Buttons();
    let gameStat_ASDF = this.generate_ASDF_Buttons();
    let gameStat_ZXCVB = this.generate_ZXCVB_Buttons();

    if (isWinner) {
     
 this.win()

    }



return (


    <div>

    
    <div className="main-container">
    
      <div id="overlay" className="start" style = {{ display: !this.state.overlay?'none':'flex'}}>
        <h2 className="title">Wheel of Success</h2>
        
        <button className="btn__reset" onClick = {this.changeDisplay}>Start Game  </button>
      </div>
      

      <div id="overlay" className="lose" style = {{ display: this.state.screen?'flex':'none'}}>
        <h2 className="title">Wheel of Success</h2>


         <h1>You Lose ! </h1>
        
        <button className="btn__reset" onClick = {this.resetButton}>Try Again  </button>
      
      </div>


      <div id="overlay" className="win" style = {{ display: this.state.win?'flex':'none'}}>
        <h2 className="title">Wheel of Success</h2>


         <h1>You Win ! </h1>
        
        <button className="btn__reset" onClick = {this.resetButton}>Try Again  </button>
      
      </div>



        
      
      {/* <button onClick = {this.backtoOverlay}> Go back</button> */}
      <div id="banner" className="section">
        <h2 className="header">Wheel of Success</h2>
      </div>

      <div id="phrase" className="section">
        <ul>
            
             

             {!gameOver ? this.guessedWord() : this.lose() }
          
              
    
        </ul>

        
      </div>

     
      
    
      <div id="qwerty" className="section">
        <div className="keyrow">
       
        {gameStat_QWERTY}
          
        </div>
        <div className="keyrow">
        
        {gameStat_ASDF}
          
        </div>
        <div className="keyrow">
        
        {gameStat_ZXCVB}
          
        </div>
      </div>

      <div id="scoreboard" className="section">
        <ol>
          <li className="tries"><img src={this.state.mistake === 1 || this.state.mistake === 2 || this.state.mistake === 3 || this.state.mistake === 4 || this.state.mistake === 5 ? logo2 : logo } height="35px" width="30px" alt="this is a heart"/></li>
          <li className="tries"><img src={this.state.mistake === 2 || this.state.mistake === 3 || this.state.mistake === 4 || this.state.mistake === 5 ? logo2 : logo } height="35px" width="30px" alt="this is a heart"/></li>
          <li className="tries"><img src={this.state.mistake === 3 || this.state.mistake === 4 || this.state.mistake === 5 ? logo2 : logo } height="35px" width="30px" alt="this is a heart"/></li>
          <li className="tries"><img src={this.state.mistake === 4 || this.state.mistake === 5  ?logo2 : logo } height="35px" width="30px" alt="this is a heart"/></li>
          <li className="tries"><img src={this.state.mistake === 5   ?logo2 : logo } height="35px" width="30px" alt="this is a heart"/></li>
        </ol>
      </div>
    </div> 
  </div>






)


}



}



export default Hangman