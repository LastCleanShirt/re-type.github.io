function calculateAccuracy(totalCorrectWords, totalTypedWords) {
    const accuracy = (totalCorrectWords / totalTypedWords) * 100;
    return accuracy;
}


function calculateGrossWPM(totalCorrectWords, timeInMinutes) {
    const netWPM = totalCorrectWords / timeInMinutes;
    return netWPM;
}

function calculateNetWPM(totalCorrectWords, totalTypedKeystrokes, timeInMinutes) {
    const accuracy = (totalCorrectWords / (totalTypedKeystrokes / 5)) * 100;
    const wpmWithAccuracy = (totalCorrectWords / timeInMinutes) * (accuracy / 100);
    return wpmWithAccuracy;
}

export { calculateGrossWPM,  calculateNetWPM, calculateAccuracy }