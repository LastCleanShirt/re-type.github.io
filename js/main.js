$(() => {
  /* 
   * getText and generateText
   * generate the random words
   */

  var letter = "a"
  var words = []
  var currentWordIndex = 0

  let isTyping = false

  function getText() {
    $.get(`https://random-word-api.vercel.app/api?words=30&letter=${letter}`, (data) => {
      words = data;
      generateText(); // Call generateText() inside the callback
      markWord()
    });
  }
  
  function generateText() {
    console.log(words);
    $.each(words, (i, e) => {
      $(".text").append(`<p class="word" id="${i}">${e}</p>`);
    });
  }

  

  getText()

  /* Input mechanics
   */
  const input = $("input");
  var inputValue = ""



  /*
   * countdown
   */

  var countdown = 10

  function updateCountdownDisplay() {
    $('#countdown').text(countdown);
  }

  function startCountdown() {
    countdown = 15; // reset the countdown time
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


            setTimeout(function(){
              $('.main-content').css({
                "animation": "0.8s fadeOut ease-in-out",
                "animation-fill-mode": "forwards"
              })
              
            }, 1000)
        }
    }, 1000); // update every second
  }   

  // Handle each and every words
  var correctWord = 0;
  var inCorrectWord = 0;

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
        "padding": "200px",
        "padding-top": "120px",
        "padding-bottom": "90px"
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
  
        markWord(same); // Call markWord after the user has pressed spacebar
        input.val("");   // Clear the input value

        console.log(correctWord)
      }
    }
  });



})
