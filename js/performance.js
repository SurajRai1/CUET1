function getAnswerCounts() {
    let correctCount = 0;
    let incorrectCount = 0;

    const questionsForSubject = questionsData[subjectDropdown.value];
    const totalQuestions = questionsForSubject.length;

    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        const questionData = questionsForSubject[i - 1];

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

function displayAnswers() {
    const answersList = document.getElementById('answers-list');
    const questionsForSubject = questionsData[subjectDropdown.value];
    const totalQuestions = questionsForSubject.length;

    // Iterate through submitted answers (you may need to adapt this based on your data structure)
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        const questionData = questionsForSubject[i - 1];

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
