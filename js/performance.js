document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const scoresParameter = urlParams.get('scores');
    const scores = JSON.parse(decodeURIComponent(scoresParameter));

    // Display the score
    document.getElementById('percentage').textContent = `${scores.Percentage}%`;
    document.getElementById('correct').textContent = `${scores['Correct Answers']}`;
    document.getElementById('accuracy').textContent = `${(scores['Correct Answers']/scores['Attempted Questions'])*100}%`;

    document.getElementById('attempted').textContent = `${scores['Attempted Questions']}`;
    document.getElementById('unattempted').textContent = `${scores['Total Questions']-scores['Attempted Questions']}`;
    document.getElementById('totalQuestion').textContent = `${scores['Total Questions']}`;
    
    // Add "Back to Home" button functionality
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function () {
        // Navigate back to the home page
        window.location.href = '../index.html';
    });
});

