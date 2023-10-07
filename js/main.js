$(() => {
  /* 
   * getText and generateText
   * generate the random words
   */

  var letter = "a"
  var words = []
  var currentWordIndex = 0

  let isTyping = false

  function getIndonesianText() {
    $.ajax({
      url: "indonesian-words.txt",
      dataType: "text",
      success: function(data) {
        var lines = data.split("\n")

        var rangeMin = 1; // Minimum value for the range
        var rangeMax = 200; // Maximum value for the range

        // Define the desired distance between the two random numbers
        var desiredDistance = 100;

        // Generate the first random number within the defined range
        var range1 = Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin;

        // Generate the second random number based on the first number and desired distance
        var range2 = range1 + desiredDistance;

  

        for (var i = range1; i < range2 && i < lines.length; i++) {
          words.push(lines[i])
        }

      }, error: function (error) {
        console.error("Error reading the file\n", error)
      }
    })
  }
  getText()
  
  
  function getEnglishText() {
    $.get(`https://random-word-api.vercel.app/api?words=100&letter=${letter}`, (data) => {
      words = data;
      generateText(); // Call generateText() inside the callback
      markWord()
    });
  }

  function getText() {
    getEnglishText()
    generateText()
    markWord()
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
            var accuracy = calculateAccuracy(correctWord, typedWord)
            var nwpm = calculateNetWPM(correctWord, typedWord, 0.5)

            console.log(`gross wpm is ${gwpm}`);
            console.log(`net wpm is ${nwpm}`)
            console.log(`accuracy is approximately ${accuracy}`)
            console.log(`total correct words ${correctWord}`)
            console.log(`total incorrect words ${inCorrectWord}`)

            setTimeout(function(){
              /*$('.main-content').css({
                "animation": "0.8s fadeOut ease-in-out",
                "animation-fill-mode": "forwards"
              })*/
              $("#countdown").text(`WPM ${nwpm}`)
              
            }, 1000)
        }
    }, 1000); // update every second
  }   

  // Handle each and every words
  var correctWord = 0;
  var inCorrectWord = 0;
  var typedWord = 0;

  function calculateAccuracy(totalCorrectWords, totalTypedWords) {
    const accuracy = (totalCorrectWords / totalTypedWords) * 100;
    return accuracy;
  }
  

  function calculateGrossWPM(totalCorrectWords, timeInMinutes) {
    const netWPM = totalCorrectWords / timeInMinutes;
    return netWPM;
  }

  function calculateNetWPM(totalCorrectWords, totalTypedWords, timeInMinutes) {
    const accuracy = (totalCorrectWords / totalTypedWords) * 100;
    const wpmWithAccuracy = (totalCorrectWords / timeInMinutes) * (accuracy / 100);
    return wpmWithAccuracy;
  }
  

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
        typedWord++;
  
        markWord(same); // Call markWord after the user has pressed spacebar
        input.val("");   // Clear the input value

        console.log(correctWord)
      }
    }
  });



})
