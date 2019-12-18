import React from "react"
import randomWord from "./Words"
import logo from "../images/liveHeart.png"
import logo2 from "../images/lostHeart.png"

// Code adapted from https://github.com/simonjsuh/Reactjs-Hangman-Game-Source-Code


class Hangman extends React.Component {
// maxWrong is the maximum number of tries a user gets to guess a letter and come out with the right one.
// the images array consists of the logo elements which are imported from the images directory as logo and logo2
    static defaultProps = {
        maxWrong: 5, 
        images: [logo, logo2]
      }

    //   the state variables are the important concept in react and toggle  JSX execution flow in the program 
    // the overlay variable controls whether the initial start screen is true or not. Setting it to False lets the 
    // game start. Mistake is the counter for everytime a wrong letter is guessed. guessed is an ES6 set array 
    // which is different from a regular array. It only accepts unique values. Entering the same key will not be 
    // accepted into the guessed Set iterator. The answer variable is the random word that is selected from 
    // the phrases from Words.js. Screen is the variable for when the losing screen is shown and Win is the
    // variable for the Win screen. 

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
        this.handleGuess = this.handleGuess.bind(this)
        this.resetButton = this.resetButton.bind(this)
        this.lose = this.lose.bind(this)
        
       
       
     }
     

    //  When called changeDislay changes the overlay to false and takes the user to game screen. 
     
     changeDisplay() {
     
       this.setState({
       
       overlay:false,
       }
       
       )
     
     }


    //  this is the core function in the game. It splits the words into letters and using the map function from 
    // ES6 , compares each letter from the guessed Set array ( which holds the guessed letters). There are nested
    // ternary operators so the logic is if a letter in the guessed array exists in the split letter from the
    //  then show the letter using the className "show Letter". 
    // If the letter from the answer is just a space, then output a list item with the className space

     guessedWord() {
        // console.log(this.state.answer)
        return this.state.answer.split("").map(
        letter => (this.state.guessed.has(letter) ?
         <li className="letter show">{letter}</li> :  letter === ' '? <li className="space"></li>: 
         <li className="letter"></li> ))}



        resetButton = () => {
            this.setState({
              mistake: 0,
              guessed: new Set([]),
              answer: randomWord(),
              screen:false,
              win:false,

            });
          }


        //   this function is called to check to see it is the same as the answer variable (the actual word). 
        // if it is true then the isWinner function is called which calls the isWin and displays the Win overlay 
        // screen
 displayWinner() {

       return this.state.answer.split('').map(letter => (this.state.guessed.has(letter) ? letter : " ")); 

 }

//  similar to the Win function, the lose function is called when the mistakes have exceeded 5 tries and
// this sets up the lose overlay screen in JSX

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

// the guess function is called everytime a letter is clicked on the on-screen keyboard
// the mistake variable is constantly being updated everytime there is a wrong try
// The guessed Set array is also constantly being updated with right and wrong guesses.

      handleGuess (event) {
        let letter = event.target.value;
        this.setState(prevState => ({
          guessed: prevState.guessed.add(letter),
          mistake: prevState.mistake + (prevState.answer.includes(letter) ? 0 : 1)
        }));
      }


// The onscreen keyboard is generated for all rows of the keyboard. A handleGuess function is also 
// associated with the onClick event. THe button gets disabled when the conditon for disabled becomes true.
// guess.has() becomes true when the letter is found inside the array. 

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
//  the variable gameOver becomes trues when the variable mistake is the same as variable maWrong, 
// at this point, this.lose() is called which dislays the lose screen

// the isWinner is true when the words guessed and the answer are the same. If true, the If isWinner is true,
// which calls the this.win() overlay screen by changing the state variable win to true
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.displayWinner().join("") === this.state.answer;
    let gameStat_QWERTY = this.generate_QWERTY_Buttons();
    let gameStat_ASDF = this.generate_ASDF_Buttons();
    let gameStat_ZXCVB = this.generate_ZXCVB_Buttons();

    if (isWinner) {
     
 this.win()

    }



return (

// **************************************JSX*****************************************
    <div>

    
    <div className="main-container">

        {/* this is the start overlay screen which gets toggled off by setting display to none when
        the changeDisplay function is called on the onClick event  */}
    
      <div id="overlay" className="start" style = {{ display: !this.state.overlay?'none':'flex'}}>
        <h2 className="title">Wheel of Success</h2>
        
        <button className="btn__reset" onClick = {this.changeDisplay}>Start Game  </button>
      </div>
      

      {/* this is the lose overlay screen toggled from the state screen variable.
      The reset button resets all the necessary state variables and therefore reloads the 
      game */}

      <div id="overlay" className="lose" style = {{ display: this.state.screen?'flex':'none'}}>
        <h2 className="title">Wheel of Success</h2>


         <h1>You Lose ! </h1>
        
        <button className="btn__reset" onClick = {this.resetButton}>Try Again  </button>
      
      </div>


      {/* this is the win screen toggled by the win state variable. the reset button is applied here to 
       */}


      <div id="overlay" className="win" style = {{ display: this.state.win?'flex':'none'}}>
        <h2 className="title">Wheel of Success</h2>


         <h1>You Win ! </h1>
        
        <button className="btn__reset" onClick = {this.resetButton}>Try Again  </button>
      
      </div>

      {/* the actual game screen begins here */}

      <div id="banner" className="section">
        <h2 className="header">Wheel of Success</h2>
      </div>

      <div id="phrase" className="section">
        <ul>
            {/* this list item is the most important item on the page . If the !gameOver variable 
            is true, then the guessWord function is called which displays the list items with the class
            names depending on what event is called . If the !gameOver is false, the losing screen is shown.  */}
             {!gameOver ? this.guessedWord() : this.lose() }                   
    
        </ul>        
      </div>

    {/* The keyboard characters are generated on the webpages using functions. There is no  need to 
    manually type <button> for each character on the keyboard. */}
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
{/* the heart icon gets displayed based on the ternary operator. for the first mistake, only the first heart 
image is changed, notice the logo2 which is the heart for incorrect guesses */}
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