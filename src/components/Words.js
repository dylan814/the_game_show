let phrases = [

"hello how are you ", 
"this is react", 
"this is good", 
"liverpool are champions", 
"react is king"

]


function randomWord() {
    let words = phrases[Math.floor(Math.random() * phrases.length)]
    return words.replace(/\s/g,'');
  }
  
console.log(randomWord())

export default randomWord 