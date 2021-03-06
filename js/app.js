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
// o Play sounds as well – so for example when someone gets hit it makes a sound.


// Next Problem to sort out
// (i) Get the score to go back to 0 at the end of each game. - done 
// (ii) Log the Scores of each player - done 
// (iii) Change the image of the rat when clicked - done
// (iv) Add a sword/mallet onMouse property to the image for both players 
            // might have to add a class to the ul that says for the name of the person
            // and then for every one 
// (v) Add sound effects
// (vi) Get gifs working - whoever wins, their Gif is not removed
// (vii) Add player pics - done 


$(function(){
  $('.start').on("click", begin);
  $('ul').on("click", ".rat", clickOnRat);
  $('#turn').html("Skinner's turn")

});

var score        = 0;
var turn         = 1
var skinnerScore = 0;
var mabelScore   = 0;

function begin(){ 
  updateScoreBoard();
  $('#skinnerLoses').hide()
  $('#mabelLoses').hide()
  $('#skinnerWins').hide()
  $('#mabelWins').hide()
  $('#skinnerTie').hide()
  $('#mabelTie').hide() 
  $('#turn').html("")
  $('#slayAgain').html("")
  score = 0;
  $('.score span').html(score);
  
  var $lis = $('li');
  var numberOfLis  = $lis.length;
  var timeLapsed   = 0;
  var lengthOfGame = 10000;

  var playing = setInterval(function(selected){
    $('.timer').html((lengthOfGame - timeLapsed) / 1000)
    timeLapsed+=1000;

    var selected = $lis[Math.floor(Math.random()*numberOfLis)];
    $(selected).addClass("rat");

    var randomTime = Math.floor(Math.random()*1000) + 500;

    setTimeout(function(selected){
      $(selected).removeClass("rat");
    }, randomTime, selected);
  }, 1000);

  setTimeout(function(playing){

    clearInterval(playing);
    console.log("Slaughter over...for now");

    if(turn===1){
      console.log("Skinner's Start")
      skinnerScore = score
      turn = 2
      $('.grid').addClass("skinnerCursor");
      $('.grid').removeClass("mabelCursor");
      $('#turn').html("Mabel's Moment")
      updateScoreBoard();

    }else{
      mabelScore = score
      turn = 1
      $('.grid').addClass("mabelCursor");
      $('.grid').removeClass("skinnerCursor");

      if(skinnerScore > mabelScore){
        // Skinner wins do this:
        $('#turn').html("Skinner Slaughters with "+skinnerScore+" to "+mabelScore);
        $('#mabelLoses').show(); 
        $('#skinnerWins').show();
      }else if(skinnerScore===mabelScore){
        // If its a draw do this:
        $('#turn').html("Tie")
        $('#skinnerTie').css("display", "")
        $('#skinnerTie').css("visibility", "")
        $('#mabelTie').css("display", "")
        $('#mabelTie').css("visibility", "")
      }else{
        // Mabel wins do this:
        $('#turn').html("Mabel Mangles with "+mabelScore+" to "+skinnerScore);
        $('#skinnerLoses').show(); 
        $('#mabelWins').show();
      }
      updateScoreBoard();
      $('#slayAgain').html("Click below to recommence Splat").css('color', 'red')

      skinnerScore = 0
      mabelScore = 0
    }

  }, lengthOfGame+2000, playing)

  
} 

function clickOnRat(){
  var $self = $(this);
  score++;
  $('.score span').html(score);
  $self.addClass('dead-rat');
  soundSplat();

  setTimeout(function(){
    $self.removeClass('dead-rat');
  },500)

}

function updateScoreBoard(){
  $('.skinnerScore').html(" "+skinnerScore)
  $('.mabelScore').html(" "+mabelScore);

}

var soundSplat = function(){
    var sound = soundManager.createSound({ 
        id: 'soundSplat', 
        url: './sounds/splat.mp3', 
        volume: 50, 
        autoPlay: true 
    }).play();
}



