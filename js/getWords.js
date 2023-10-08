var letter = "g"

function getIndonesianText(callback) {
    $.ajax({
        url: "indonesian-words.txt",
        dataType: "text",
        success: function(data) {
            var lines = data.split("\n");
            var data = [];

            var rangeMin = 1; // Minimum value for the range
            var rangeMax = 200; // Maximum value for the range

            // Define the desired distance between the two random numbers
            var desiredDistance = 100;

            // Generate the first random number within the defined range
            var range1 = Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin;

            // Generate the second random number based on the first number and desired distance
            var range2 = range1 + desiredDistance;

            for (var i = range1; i < range2 && i < lines.length; i++) {
                data.push(lines[i]);
            }

            // Call the callback function with the data
            callback(data);
        },
        error: function(error) {
            console.error("Error reading the file\n", error);
        }
    });
}

function getEnglishText(callback) {
    $.get(`https://random-word-api.vercel.app/api?words=200&letter=${letter}`, (data) => {
        // Call the callback function with the data
        callback(data);
    });
}

export { getIndonesianText, getEnglishText };

