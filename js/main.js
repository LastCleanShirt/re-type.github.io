import { settings, setTheme } from "./settings.js"
import { getEnglishText, getIndonesianText } from "./getWords.js"
import { calculateAccuracy, calculateGrossWPM, calculateNetWPM } from "./calculate.js"

$(() => {
  console.log(`Hello there, congrats, you found an easter egg
  Nadhira, if you  read these, i want you to know that i loved you, and this website is dedicated solely to you.`)
  settings()
  /* 
  * getText and generateText
  * generate the random words
  */
  
  
  
  var currentWordIndex = 0
  var numberOfLetters = 200
  var words = []
  
  let isTyping = false
  
  /*
   * Cookies and data
   */
  const theme = Cookies.get("theme");
  const language = Cookies.get("lang")

  
  getText()
  
  function getText() {
    if (language === "id") {
      getIndonesianText(function(indonesianData) {// Handle the Indonesian data here
        words = indonesianData;
        generateText()
        markWord()
        $("#countdown").text("Ketik untuk memulai")
      });
    } else if (language === "en") {
      getEnglishText(function(englishData) {
        words = englishData // Handle the English data here
        
        generateText()
        markWord()
      });
    }
    

  }
  function generateText() {
    console.log(words);
    $.each(words, (i, e) => {
      $(".text").append(`<p class="word" id="${i}">${e}</p>`);
    });
  }
  
  
  
  
  /* Input mechanics
  */
  const input = $("input");
  var inputValue = ""
  
  
  
  /*
  * countdown
  */
  
  var countdown = 30
  
  function updateCountdownDisplay() {
    $('#countdown').text(countdown);
  }
  
  function startCountdown() { // reset the countdown time
    updateCountdownDisplay();
    
    $('#countdown').addClass("fadeIn");
    $('#countdown').on("animationend", function () {
      $("#countdown").removeClass("fadeIn")
    })
    var interval = setInterval(function() {
      countdown--;
      updateCountdownDisplay();
      
      if (countdown <= 0) {
        clearInterval(interval);
        $('#countdown').text("Countdown completed!");
        var gwpm = calculateGrossWPM(correctWord, 0.5)
        var accuracy = calculateAccuracy(correctWord, typedKeystrokes)
        var nwpm = calculateNetWPM(correctWord, typedKeystrokes, 0.5)
        
        console.log(`gross wpm is ${gwpm}`);
        console.log(`net wpm is ${nwpm}`)
        console.log(`accuracy is approximately ${accuracy}`)
        console.log(`total correct words ${correctWord}`)
        console.log(`total incorrect words ${inCorrectWord}`)
        console.log(`total keystrokes ${typedKeystrokes}`)
        
        setTimeout(function(){
          /*$('.main-content').css({
            "animation": "0.8s fadeOut ease-in-out",
            "animation-fill-mode": "forwards"
          })*/
          $("#countdown").text(`WPM ${gwpm}`)
          
        }, 1000)
      }
    }, 1000); // update every second
  }   
  
  // Handle each and every words
  var correctWord = 0;
  var inCorrectWord = 0;
  var typedWord = 0;
  var typedKeystrokes = 0;
  
  
  
  
  function markWord(c) { // Handle word box animation
    console.log(currentWordIndex)
    if (currentWordIndex < 0) {  currentWordIndex = 0 }
    $(`#${currentWordIndex}`).removeClass("wordIn");
    
    if (c == true) {
      $(`#${currentWordIndex}`).addClass("correctWord")
    } else {
      $(`#${currentWordIndex}`).addClass("incorrectWord")
    }
    
    $(`#${currentWordIndex}`).on("animationend", function () {
      executeAfterAnimation(); // Call the function after the animation is complete
    });
  }
  
  function executeAfterAnimation() {
    // This code will execute after the animation is complete
    $(`#${currentWordIndex}`).remove();
    currentWordIndex++;
    $(`#${currentWordIndex}`).addClass("wordIn");
    $(`#${currentWordIndex}`).addClass("currentWord");
    $('.text').animate({
      scrollTop: $(".text").offset().top - 200
    }, 100);
    //console.log(currentWordIndex)
  }
  
  input.keydown((e) => {
    if (!isTyping) {
      startCountdown();
      $(".main-content").css({
        "animation": "0.3s expanding ease-in-out",
        "animation-fill-mode": "forwards"
      });
      isTyping = true;
    }
    if (e.which === 32) {
      e.preventDefault(); // Prevent the default space key behavior
      if (input.val() != "") {
        
        var same = false;
        if (input.val() == words[currentWordIndex]) {
          same = true;
          correctWord++;
        } else {
          same = false;
          inCorrectWord++;
        }
        typedKeystrokes += input.val().length
        typedWord++;
        
        markWord(same); // Call markWord after the user has pressed spacebar
        input.val("");   // Clear the input value
        
        console.log(correctWord)
      }
    }
  });
  
  
  
})
