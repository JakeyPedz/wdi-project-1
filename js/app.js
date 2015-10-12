// // ***SPLAT THE RAT*** Pseudo Code...

// Very high level…
// • You have to divide the page into different sections or squares. 
// • Rat pops up at each random point (for a certain amount of time).
// o Therefore, presumably it will be an array of different options?
// • You then have to click on his head. 
// • How many rats get the splat in 15 seconds?

// A bit more advanced…
// • Scoring;
// o “Thorex Thump” – top of the rat – 1 point
// o “Abdomen Attack” – half way up the rat – 2 points
// o “Crus Crush” – bottom of the rat – 3 points 
// • More points if crush rat fully. 
// o “Hit Danger Mouse and you are done son” – your score goes back to 0. 

// • Difficulty 
// o Gets faster and faster as game progresses

// Making it interesting and engaging…
// o “Rat Chat” from famous Rat Characters and quotes
// o Rizzo the Rat from The Muppets
// o Ratty from Wind in the Willows
// o Peter Pettigrew/ Scabbers from Harry Potter
// o Remy from Ratatouille 
// o 
// o Play sounds as well – so for example when someone gets hit it makes a sound.

// Scoring system 

// addEventListener 

$(function(){
  $('.start').on("click", begin);
});

var score = 0;

function begin(){
  var $lis = $('li');
  var numberOfLis = $lis.length;

  var timeLapsed   = 0;
  var lengthOfGame = 10000; 
  
  var playing = setInterval(function(selected){
    $('.timer').html((lengthOfGame - timeLapsed) / 1000)
    timeLapsed+=1000;

    // Choose a random li using a random number as an index.
    // Math.floor will convert the random number to have no decimal places
    var selected = $lis[Math.floor(Math.random()*numberOfLis)];
    
    $(selected).addClass("rat");

    var randomTime = Math.floor(Math.random()*1000) + 500;

    // setTimeout allows you to run the code inside the inner function after a 
    // certain amount of time. In this case, the value of randomTime
    setTimeout(function(selected){
      $(selected).removeClass("rat");
    }, randomTime, selected);
  }, 1000);

  // Ensure the game stops after x number of seconds
  setTimeout(function(playing){
    clearInterval(playing);
  }, lengthOfGame+2000, playing)

  // Handle click events
  $('ul').on("click", ".rat", clickOnRat)
} 

function clickOnRat(){
  score++;
  $('.score').html(score);
}