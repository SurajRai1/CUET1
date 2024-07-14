document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM content loaded");

    const urlParams = new URLSearchParams(window.location.search);
    const scoresParameter = urlParams.get('scores');
    const scores = JSON.parse(decodeURIComponent(scoresParameter));

    console.log("Scores:", scores);

    // Display the score
    document.getElementById('percentage').textContent = `${scores.Percentage}%`;
    document.getElementById('correct').textContent = `${scores['Correct Answers']}`;
    document.getElementById('accuracy').textContent = `${(scores['Correct Answers']/scores['Attempted Questions']*100).toFixed(2)}%`;
    document.getElementById('attempted').textContent = `${scores['Attempted Questions']}`;
    document.getElementById('unattempted').textContent = `${scores['Total Questions']-scores['Attempted Questions']}`;
    document.getElementById('totalQuestion').textContent = `${scores['Total Questions']}`;

    // Create chart data
    const chartData = [
        { name: 'Correct', value: scores['Correct Answers'] },
        { name: 'Incorrect', value: scores['Attempted Questions'] - scores['Correct Answers'] },
        { name: 'Unattempted', value: scores['Total Questions'] - scores['Attempted Questions'] }
    ];

    console.log("Chart Data:", chartData);

    // Create responsive chart
    const chartContainer = document.querySelector('.chart-section');
    console.log("Chart container:", chartContainer);

    if (!chartContainer) {
        console.error("Chart container not found!");
        return;
    }

    const chart = document.createElement('div');
    chart.id = 'performance-chart';
    chart.style.width = '100%';
    chart.style.height = '300px';
    chartContainer.appendChild(chart);

    console.log("Chart element:", chart);

    if (typeof Recharts === 'undefined') {
        console.error("Recharts is not defined. Make sure the script is loaded correctly.");
        return;
    }

    const { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } = Recharts;

    const ChartComponent = React.createElement(ResponsiveContainer, { width: '100%', height: '100%' },
        React.createElement(BarChart, { data: chartData },
            React.createElement(XAxis, { dataKey: 'name' }),
            React.createElement(YAxis),
            React.createElement(Bar, { dataKey: 'value', fill: '#8884d8' })
        )
    );

    try {
        ReactDOM.render(ChartComponent, document.getElementById('performance-chart'));
        console.log("Chart rendered successfully");
    } catch (error) {
        console.error("Error rendering chart:", error);
    }

    // Add "Back to Home" button functionality
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function () {
            // Navigate back to the home page
            window.location.href = '../index.html';
        });
    } else {
        console.error("Back button not found!");
    }
});
