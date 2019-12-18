let phrases = [

"hello how are you ", 
"this is react", 
"this is good", 
"liverpool are champions", 
"react is king"

]


// the function below randomizes the phrase selected and returns a word like 
// this is react

function randomWord() {
    let words = phrases[Math.floor(Math.random() * phrases.length)]
    return words
  }
  

export default randomWord 