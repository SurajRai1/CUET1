document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const scoresParameter = urlParams.get('scores');
    scores = JSON.parse(decodeURIComponent(scoresParameter));

    // Display the score
    document.getElementById('percentage').textContent = `${scores.Percentage}%`;
    document.getElementById('correct').textContent = `${scores['Correct Answers']}`;
    document.getElementById('wrong').textContent = `${scores['Wrong Answers']}`;
    document.getElementById('total').textContent = `${scores['Total Questions']}`;

    // Get total questions from scores or another source
    const totalQuestions = scores['Total Questions'];

    displayAnswers(totalQuestions);

    // Add "Back to Home" button
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', goBack);
});

function getAnswerCounts(totalQuestions) {
    let correctCount = 0;
    let incorrectCount = 0;

    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        const questionData = questionsData[subjectDropdown.value][i - 1];

        if (selectedOption) {
            const isCorrect = selectedOption.value === questionData.correctAnswer;

            if (isCorrect) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        } else {
            incorrectCount++;
        }
    }

    return { correctCount, incorrectCount };
}

function displayAnswers(totalQuestions) {
    const answersList = document.getElementById('answers-list');

    // Iterate through submitted answers (you may need to adapt this based on your data structure)
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        const questionData = questionsData[subjectDropdown.value][i - 1];

        const answerItem = document.createElement('li');
        answerItem.innerHTML = `<p>${i}. ${questionData.question}</p>`;

        if (selectedOption) {
            const isCorrect = selectedOption.value === questionData.correctAnswer;

            // Mark correct and incorrect answers
            if (isCorrect) {
                answerItem.classList.add('correct-answer');
            } else {
                answerItem.classList.add('incorrect-answer');
            }

            answerItem.innerHTML += `<p>Your Answer: ${selectedOption.value} (${isCorrect ? 'Correct' : 'Incorrect'})</p>`;
        } else {
            answerItem.innerHTML += '<p>Your Answer: Not Submitted</p>';
        }

        answersList.appendChild(answerItem);
    }
}

function goBack() {
    // Navigate back to the home page
    window.location.href = '../index.html';
}
