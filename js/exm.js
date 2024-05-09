
let scores;
const questionsContainer = document.getElementById('questions-container');
const timerElement = document.getElementById('timer');
const subjectDropdown = document.getElementById('subject');
let timer;



// Define subjects and their corresponding IDs
const subjects = {
    Economics: 1,
    History: 2,
    English: 3,
    'Political Science': 4,
    Sociology: 5,
    Chemistry: 6,
    Physics: 7,
};

const questionsPerSubject = 10;
const timeLimit = 20 * 60; // 20 minutes in seconds

const questionsData = {
    // ... (your existing questions data)

    Economics: [
            {
                question: 'What is the primary goal of microeconomics?',
                options: ['A. Maximize profits', 'B. Minimize costs', 'C. Maximize utility', 'D. Equal distribution of wealth'],
                correctAnswer: 'C',
            },
            {
                question: 'In economics, what does GDP stand for?',
                options: ['A. Gross Domestic Product', 'B. General Development Plan', 'C. Global Demand Projection', 'D. Government Development Program'],
                correctAnswer: 'A',
            },
            {
                question: 'Which economic concept refers to the total value of goods and services produced in a country?',
                options: ['A. Inflation', 'B. Gross Domestic Product', 'C. Supply and Demand', 'D. Budget Deficit'],
                correctAnswer: 'B',
            },
            {
                question: 'What is the law of demand?',
                options: ['A. As prices increase, demand increases', 'B. As prices increase, demand decreases', 'C. Demand and prices are unrelated', 'D. Demand is always constant'],
                correctAnswer: 'B',
            },
            {
                question: 'Who is considered the father of modern economics?',
                options: ['A. Adam Smith', 'B. John Maynard Keynes', 'C. Karl Marx', 'D. Milton Friedman'],
                correctAnswer: 'A',
            },
            {
                question: 'What is an oligopoly?',
                options: ['A. Market with a single seller', 'B. Market with many sellers', 'C. Market with a few sellers', 'D. Market with identical products'],
                correctAnswer: 'C',
            },
            {
                question: 'What is the opportunity cost?',
                options: ['A. Total cost of production', 'B. Cost of the next best alternative', 'C. Fixed cost of production', 'D. Variable cost of production'],
                correctAnswer: 'B',
            },
            {
                question: 'What does the term "invisible hand" refer to in economics?',
                options: ['A. Government intervention', 'B. Natural market forces', 'C. Trade barriers', 'D. Price controls'],
                correctAnswer: 'B',
            },
            {
                question: 'What is the Phillips Curve used to illustrate?',
                options: ['A. Inflation and unemployment', 'B. Supply and demand', 'C. Economic growth', 'D. Fiscal policy'],
                correctAnswer: 'A',
            },
            {
                question: 'What is a fiscal policy tool used to stimulate economic activity?',
                options: ['A. Monetary policy', 'B. Supply-side economics', 'C. Expansionary fiscal policy', 'D. Contractionary fiscal policy'],
                correctAnswer: 'C',
            },

        {
        question: 'What does the term "opportunity cost" refer to in economics?',
        options: ['A. The cost of purchasing opportunities', 'B. The value of the next best alternative foregone', 'C. The total cost of production', 'D. The cost of hiring new opportunities'],
        correctAnswer: 'B',
    },
    {
        question: 'Which economic theory proposes that individuals and firms act in their own self-interest?',
        options: ['A. Mercantilism', 'B. Keynesian economics', 'C. Neoclassical economics', 'D. Behavioral economics'],
        correctAnswer: 'C',
    },
    {
        question: 'What is the main function of the World Bank?',
        options: ['A. Providing financial assistance to developing countries', 'B. Regulating international trade agreements', 'C. Setting global interest rates', 'D. Facilitating diplomatic relations between nations'],
        correctAnswer: 'A',
    },
    {
        question: 'Who is credited with developing the theory of comparative advantage?',
        options: ['A. Adam Smith', 'B. David Ricardo', 'C. John Maynard Keynes', 'D. Milton Friedman'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the term for a situation where one party in an economic transaction has more information than the other party?',
        options: ['A. Perfect competition', 'B. Monopoly', 'C. Information asymmetry', 'D. Cartel'],
        correctAnswer: 'C',
    },
    {
        question: 'Which economic concept refers to the increase in the general price level of goods and services in an economy over a period of time?',
        options: ['A. Inflation', 'B. Deflation', 'C. Recession', 'D. Stagflation'],
        correctAnswer: 'A',
    },
    {
        question: 'In economics, what does the term "elasticity" measure?',
        options: ['A. The responsiveness of quantity demanded to changes in price', 'B. The rate of economic growth', 'C. The level of government intervention in the economy', 'D. The stability of financial markets'],
        correctAnswer: 'A',
    },
    {
        question: 'Which of the following is NOT considered a factor of production in classical economics?',
        options: ['A. Land', 'B. Labor', 'C. Money', 'D. Capital'],
        correctAnswer: 'C',
    },
    {
        question: 'What does the term "monetary policy" refer to?',
        options: ['A. Government policies related to taxation', 'B. Policies aimed at controlling the money supply and interest rates', 'C. International trade agreements', 'D. Government regulation of business practices'],
        correctAnswer: 'B',
    },
    {
        question: 'Which economist is associated with the theory of "rational expectations"?',
        options: ['A. John Maynard Keynes', 'B. Friedrich Hayek', 'C. Milton Friedman', 'D. Paul Krugman'],
        correctAnswer: 'C',
    },
{
        question: 'What is the term for a market structure characterized by a large number of sellers and buyers, with no single firm having control over price?',
        options: ['A. Monopoly', 'B. Oligopoly', 'C. Monopolistic competition', 'D. Perfect competition'],
        correctAnswer: 'D',
    },
    {
        question: 'Which economic concept refers to the total market value of all final goods and services produced within a country in a given period of time?',
        options: ['A. Gross National Product (GNP)', 'B. Gross Domestic Product (GDP)', 'C. Net National Product (NNP)', 'D. National Income'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the term for a sustained decrease in the general price level of goods and services in an economy?',
        options: ['A. Inflation', 'B. Deflation', 'C. Stagflation', 'D. Hyperinflation'],
        correctAnswer: 'B',
    },
    {
        question: 'Which of the following is NOT a characteristic of a traditional economy?',
        options: ['A. Economic decisions are based on customs and traditions', 'B. Little room for innovation and change', 'C. Government control over economic decisions', 'D. Economic activities are often agriculture-based'],
        correctAnswer: 'C',
    },
    {
        question: 'What is the term for the study of how individuals, businesses, and governments allocate resources to satisfy unlimited wants and needs?',
        options: ['A. Microeconomics', 'B. Macroeconomics', 'C. Econometrics', 'D. Behavioral economics'],
        correctAnswer: 'A',
    },
    {
        question: 'Which economic system is characterized by private ownership of resources and decentralized decision-making?',
        options: ['A. Command economy', 'B. Mixed economy', 'C. Free market economy', 'D. Socialist economy'],
        correctAnswer: 'C',
    },
    {
        question: 'What is the term for the maximum output that an economy can produce with its existing resources and technology?',
        options: ['A. Gross Domestic Product (GDP)', 'B. Aggregate demand', 'C. Potential GDP', 'D. Real GDP'],
        correctAnswer: 'C',
    },
    {
        question: 'Who developed the concept of the "invisible hand" in economics?',
        options: ['A. John Maynard Keynes', 'B. Adam Smith', 'C. Karl Marx', 'D. Friedrich Hayek'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the term for the period of economic decline characterized by falling output and employment?',
        options: ['A. Depression', 'B. Recession', 'C. Expansion', 'D. Recovery'],
        correctAnswer: 'B',
    },
    {
        question: 'Which of the following is NOT a factor of production?',
        options: ['A. Labor', 'B. Capital', 'C. Money', 'D. Entrepreneurship'],
        correctAnswer: 'C',
    },
{
        question: 'What is the term for the percentage change in the quantity demanded of a good in response to a one percent change in its price?',
        options: ['A. Elasticity of demand', 'B. Elasticity of supply', 'C. Cross-price elasticity', 'D. Income elasticity'],
        correctAnswer: 'A',
    },
    {
        question: 'Which of the following is an example of a regressive tax?',
        options: ['A. Sales tax', 'B. Progressive income tax', 'C. Corporate income tax', 'D. Property tax'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a situation where a single producer or seller controls the entire supply of a product or service?',
        options: ['A. Oligopoly', 'B. Monopoly', 'C. Monopsony', 'D. Perfect competition'],
        correctAnswer: 'B',
    },
    {
        question: 'In economics, what does the term "externality" refer to?',
        options: ['A. The difference between social and private costs', 'B. The cost of production', 'C. The total value of goods and services produced in a country', 'D. The profit earned by a firm'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a tax that takes a larger percentage of income from high-income earners than from low-income earners?',
        options: ['A. Progressive tax', 'B. Regressive tax', 'C. Proportional tax', 'D. Excise tax'],
        correctAnswer: 'A',
    },
    {
        question: 'Which of the following is NOT a characteristic of monopolistic competition?',
        options: ['A. Many sellers', 'B. Product differentiation', 'C. Price taker', 'D. Easy entry and exit'],
        correctAnswer: 'C',
    },
    {
        question: 'What does the term "fiscal policy" refer to in economics?',
        options: ['A. Government policies related to the money supply', 'B. Government policies related to taxation and spending', 'C. Regulation of financial institutions', 'D. Policies aimed at controlling inflation'],
        correctAnswer: 'B',
    },
    {
        question: 'Who is known as the "father of modern economics"?',
        options: ['A. Adam Smith', 'B. John Maynard Keynes', 'C. Karl Marx', 'D. Milton Friedman'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a situation where the quantity demanded exceeds the quantity supplied at a given price?',
        options: ['A. Surplus', 'B. Shortage', 'C. Equilibrium', 'D. Elasticity'],
        correctAnswer: 'B',
    },
    {
        question: 'Which of the following is NOT a component of Gross Domestic Product (GDP)?',
        options: ['A. Consumption', 'B. Investment', 'C. Government spending', 'D. Imports'],
        correctAnswer: 'D',
    },
{
        question: 'What is the term for the measure of responsiveness of the quantity demanded of a good to a change in consumer income?',
        options: ['A. Price elasticity of demand', 'B. Cross-price elasticity', 'C. Income elasticity of demand', 'D. Price elasticity of supply'],
        correctAnswer: 'C',
    },
    {
        question: 'Which of the following is NOT a determinant of demand?',
        options: ['A. Income', 'B. Price of substitute goods', 'C. Price of complementary goods', 'D. Cost of production'],
        correctAnswer: 'D',
    },
    {
        question: 'In economics, what is the term for a cost that has already been incurred and cannot be recovered?',
        options: ['A. Explicit cost', 'B. Implicit cost', 'C. Sunk cost', 'D. Variable cost'],
        correctAnswer: 'C',
    },
    {
        question: 'Which of the following is NOT a characteristic of a command economy?',
        options: ['A. Centralized decision-making', 'B. Private ownership of resources', 'C. Government control over production', 'D. Lack of consumer choice'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the term for the total quantity of goods and services demanded by households, firms, and the government in an economy?',
        options: ['A. Aggregate demand', 'B. Aggregate supply', 'C. Macroeconomic equilibrium', 'D. Fiscal policy'],
        correctAnswer: 'A',
    },
    {
        question: 'In economics, what does the term "utility" refer to?',
        options: ['A. Ability to produce goods and services', 'B. Total revenue earned by a firm', 'C. Satisfaction derived from consuming goods and services', 'D. Level of government expenditure'],
        correctAnswer: 'C',
    },
    {
        question: 'Which of the following is NOT a function of money?',
        options: ['A. Medium of exchange', 'B. Store of value', 'C. Producer of goods', 'D. Unit of account'],
        correctAnswer: 'C',
    },
    {
        question: 'What is the term for a situation where the quantity supplied exceeds the quantity demanded at a given price?',
        options: ['A. Surplus', 'B. Shortage', 'C. Equilibrium', 'D. Elasticity'],
        correctAnswer: 'A',
    },
    {
        question: 'Which of the following is a measure of the average level of prices in an economy?',
        options: ['A. Inflation rate', 'B. Gross Domestic Product (GDP)', 'C. Consumer Price Index (CPI)', 'D. Real GDP'],
        correctAnswer: 'C',
    },
    {
        question: 'What is the term for the increase in the general level of prices in an economy over a period of time?',
        options: ['A. Deflation', 'B. Stagflation', 'C. Inflation', 'D. Hyperinflation'],
        correctAnswer: 'C',
    },
 {
        question: 'What is the term for a situation where the government spends more money than it receives in revenue?',
        options: ['A. Budget surplus', 'B. Budget deficit', 'C. National debt', 'D. Fiscal policy'],
        correctAnswer: 'B',
    },
    {
        question: 'Which of the following is NOT a characteristic of perfect competition?',
        options: ['A. Many buyers and sellers', 'B. Identical products', 'C. Barrier to entry', 'D. Price taker'],
        correctAnswer: 'C',
    },
    {
        question: 'What is the term for the measure of responsiveness of the quantity supplied of a good to a change in its price?',
        options: ['A. Price elasticity of demand', 'B. Income elasticity of demand', 'C. Price elasticity of supply', 'D. Cross-price elasticity'],
        correctAnswer: 'C',
    },
    {
        question: 'In economics, what does the term "opportunity cost" represent?',
        options: ['A. The cost of the next best alternative foregone', 'B. The total cost of production', 'C. The variable cost of production', 'D. The cost of production'],
        correctAnswer: 'A',
    },
    {
        question: 'Which of the following is NOT a component of aggregate demand?',
        options: ['A. Consumption', 'B. Investment', 'C. Imports', 'D. Government spending'],
        correctAnswer: 'C',
    },
    {
        question: 'What is the term for the situation where there is a sustained decrease in the general price level of goods and services in an economy?',
        options: ['A. Inflation', 'B. Hyperinflation', 'C. Deflation', 'D. Stagflation'],
        correctAnswer: 'C',
    },
    {
        question: 'Which of the following is NOT a tool of monetary policy?',
        options: ['A. Open market operations', 'B. Reserve requirement', 'C. Discount rate', 'D. Fiscal policy'],
        correctAnswer: 'D',
    },
    {
        question: 'What does the term "elasticity" measure in economics?',
        options: ['A. The responsiveness of quantity demanded or supplied to changes in price or income', 'B. The total revenue earned by a firm', 'C. The level of government expenditure', 'D. The difference between social and private costs'],
        correctAnswer: 'A',
    },
    {
        question: 'Which of the following is an example of a public good?',
        options: ['A. Electricity', 'B. Pizza', 'C. Private jet', 'D. Street lighting'],
        correctAnswer: 'D',
    },
    {
        question: 'What is the term for the condition where resources are allocated inefficiently, leading to waste or lost potential?',
        options: ['A. Market failure', 'B. Government intervention', 'C. Production possibility frontier', 'D. Utility maximization'],
        correctAnswer: 'A',
    },
        
        ],
        // Add more questions for Economics...
    
        History: [
            {
                question: 'Who was the first President of the United States?',
                options: ['A. Thomas Jefferson', 'B. George Washington', 'C. Abraham Lincoln', 'D. John Adams'],
                correctAnswer: 'B',
            },
            {
                question: 'Which war was fought between the North and the South during the 1860s in the United States?',
                options: ['A. World War I', 'B. Civil War', 'C. Revolutionary War', 'D. War of 1812'],
                correctAnswer: 'B',
            },
            {
                question: 'Who wrote the Declaration of Independence?',
                options: ['A. Benjamin Franklin', 'B. Thomas Jefferson', 'C. John Adams', 'D. George Washington'],
                correctAnswer: 'B',
            },
            {
                question: 'What event marked the beginning of World War I?',
                options: ['A. Bombing of Pearl Harbor', 'B. Assassination of Archduke Franz Ferdinand', 'C. D-Day Invasion', 'D. Treaty of Versailles'],
                correctAnswer: 'B',
            },
            {
                question: 'Who was the leader of the Soviet Union during the Cuban Missile Crisis?',
                options: ['A. Vladimir Putin', 'B. Joseph Stalin', 'C. Nikita Khrushchev', 'D. Mikhail Gorbachev'],
                correctAnswer: 'C',
            },
            {
                question: 'In what year did Christopher Columbus first reach the Americas?',
                options: ['A. 1492', 'B. 1607', 'C. 1776', 'D. 1812'],
                correctAnswer: 'A',
            },
            {
                question: 'What was the main cause of the French Revolution?',
                options: ['A. Economic inequality', 'B. Religious conflicts', 'C. Colonial expansion', 'D. Industrialization'],
                correctAnswer: 'A',
            },
            {
                question: 'Who was the famous nurse during the Crimean War and is considered the founder of modern nursing?',
                options: ['A. Florence Nightingale', 'B. Clara Barton', 'C. Mary Seacole', 'D. Edith Cavell'],
                correctAnswer: 'A',
            },
            {
                question: 'What was the main goal of the Civil Rights Movement in the United States?',
                options: ['A. Women\'s suffrage', 'B. Racial equality', 'C. Labor rights', 'D. Environmental protection'],
                correctAnswer: 'B',
            },
            {
                question: 'Which U.S. president delivered the famous "I Have a Dream" speech during the March on Washington for Jobs and Freedom?',
                options: ['A. John F. Kennedy', 'B. Lyndon B. Johnson', 'C. Richard Nixon', 'D. Martin Luther King Jr.'],
                correctAnswer: 'D',
            },

             {
        question: 'Who was the first President of the United States?',
        options: ['A. Thomas Jefferson', 'B. George Washington', 'C. Abraham Lincoln', 'D. John Adams'],
        correctAnswer: 'B',
    },
    {
        question: 'Which war was fought between the North and the South during the 1860s in the United States?',
        options: ['A. World War I', 'B. Civil War', 'C. Revolutionary War', 'D. War of 1812'],
        correctAnswer: 'B',
    },
    {
        question: 'Who wrote the Declaration of Independence?',
        options: ['A. Benjamin Franklin', 'B. Thomas Jefferson', 'C. John Adams', 'D. George Washington'],
        correctAnswer: 'B',
    },
    {
        question: 'What event marked the beginning of World War I?',
        options: ['A. Bombing of Pearl Harbor', 'B. Assassination of Archduke Franz Ferdinand', 'C. D-Day Invasion', 'D. Treaty of Versailles'],
        correctAnswer: 'B',
    },
    {
        question: 'Who was the leader of the Soviet Union during the Cuban Missile Crisis?',
        options: ['A. Vladimir Putin', 'B. Joseph Stalin', 'C. Nikita Khrushchev', 'D. Mikhail Gorbachev'],
        correctAnswer: 'C',
    },
    {
        question: 'In what year did Christopher Columbus first reach the Americas?',
        options: ['A. 1492', 'B. 1607', 'C. 1776', 'D. 1812'],
        correctAnswer: 'A',
    },
    {
        question: 'What was the main cause of the French Revolution?',
        options: ['A. Economic inequality', 'B. Religious conflicts', 'C. Colonial expansion', 'D. Industrialization'],
        correctAnswer: 'A',
    },
    {
        question: 'Who was the famous nurse during the Crimean War and is considered the founder of modern nursing?',
        options: ['A. Florence Nightingale', 'B. Clara Barton', 'C. Mary Seacole', 'D. Edith Cavell'],
        correctAnswer: 'A',
    },
    {
        question: 'What was the main goal of the Civil Rights Movement in the United States?',
        options: ['A. Women\'s suffrage', 'B. Racial equality', 'C. Labor rights', 'D. Environmental protection'],
        correctAnswer: 'B',
    },
    {
        question: 'Which U.S. president delivered the famous "I Have a Dream" speech during the March on Washington for Jobs and Freedom?',
        options: ['A. John F. Kennedy', 'B. Lyndon B. Johnson', 'C. Richard Nixon', 'D. Martin Luther King Jr.'],
        correctAnswer: 'D',
    },
    {
        question: 'Who was the first female Prime Minister of the United Kingdom?',
        options: ['A. Margaret Thatcher', 'B. Theresa May', 'C. Indira Gandhi', 'D. Angela Merkel'],
        correctAnswer: 'A',
    },
    {
        question: 'What was the significance of the Battle of Hastings in 1066?',
        options: ['A. It marked the end of the Hundred Years\' War', 'B. It established Norman control over England', 'C. It led to the signing of the Magna Carta', 'D. It resulted in the founding of the Holy Roman Empire'],
        correctAnswer: 'B',
    },
    {
        question: 'Who was the first emperor of the Roman Empire?',
        options: ['A. Julius Caesar', 'B. Augustus', 'C. Constantine', 'D. Nero'],
        correctAnswer: 'B',
    },
    {
        question: 'What was the name of the ancient Egyptian writing system?',
        options: ['A. Cuneiform', 'B. Hieroglyphics', 'C. Sanskrit', 'D. Phoenician alphabet'],
        correctAnswer: 'B',
    },
    {
        question: 'Who was the longest-reigning monarch in British history?',
        options: ['A. Queen Elizabeth I', 'B. Queen Victoria', 'C. King George III', 'D. King Henry VIII'],
        correctAnswer: 'B',
    },
    {
        question: 'What was the name of the ship on which Charles Darwin sailed during his voyage to the Galápagos Islands?',
        options: ['A. Endeavour', 'B. Beagle', 'C. Mayflower', 'D. Discovery'],
        correctAnswer: 'B',
    },
    {
        question: 'Who was the leader of the Bolshevik Revolution in Russia?',
        options: ['A. Joseph Stalin', 'B. Vladimir Lenin', 'C. Leon Trotsky', 'D. Nicholas II'],
        correctAnswer: 'B',
    },
    {
        question: 'What was the name of the treaty that ended World War I?',
        options: ['A. Treaty of Versailles', 'B. Treaty of Paris', 'C. Treaty of Trianon', 'D. Treaty of Brest-Litovsk'],
        correctAnswer: 'A',
    },
    {
        question: 'What was the name of the infamous wall that divided East and West Berlin during the Cold War?',
        options: ['A. Iron Curtain', 'B. Berlin Wall', 'C. Great Wall of China', 'D. Hadrian\'s Wall'],
        correctAnswer: 'B',
    },
    {
        question: 'Who was the first African-American to serve as President of the United States?',
        options: ['A. Barack Obama', 'B. Martin Luther King Jr.', 'C. Malcolm X', 'D. Jesse Jackson'],
        correctAnswer: 'A',
    },
            {
        question: 'Who was the first woman to win a Nobel Prize?',
        options: ['A. Marie Curie', 'B. Mother Teresa', 'C. Rosa Parks', 'D. Amelia Earhart'],
        correctAnswer: 'A',
    },
    {
        question: 'Which ancient civilization built the pyramids?',
        options: ['A. Mesopotamia', 'B. Ancient Greece', 'C. Ancient Egypt', 'D. Maya Civilization'],
        correctAnswer: 'C',
    },
    {
        question: 'Who was the first European explorer to reach India by sea?',
        options: ['A. Christopher Columbus', 'B. Vasco da Gama', 'C. Ferdinand Magellan', 'D. Marco Polo'],
        correctAnswer: 'B',
    },
    {
        question: 'Who was the first female Prime Minister of India?',
        options: ['A. Sonia Gandhi', 'B. Margaret Thatcher', 'C. Golda Meir', 'D. Indira Gandhi'],
        correctAnswer: 'D',
    },
    {
        question: 'What was the main goal of the Renaissance?',
        options: ['A. Political stability', 'B. Religious reform', 'C. Cultural revival', 'D. Industrial advancement'],
        correctAnswer: 'C',
    },
    {
        question: 'What was the name of the ship that carried the Pilgrims to America in 1620?',
        options: ['A. Santa Maria', 'B. Mayflower', 'C. Discovery', 'D. Titanic'],
        correctAnswer: 'B',
    },
    {
        question: 'Who was the first female pilot to fly solo across the Atlantic Ocean?',
        options: ['A. Amelia Earhart', 'B. Bessie Coleman', 'C. Harriet Quimby', 'D. Jacqueline Cochran'],
        correctAnswer: 'A',
    },
    {
        question: 'Which ancient civilization developed the first known writing system?',
        options: ['A. Ancient Egypt', 'B. Ancient Greece', 'C. Sumerians', 'D. Ancient China'],
        correctAnswer: 'C',
    },
    {
        question: 'Who was the leader of the Allied forces during World War II?',
        options: ['A. Winston Churchill', 'B. Joseph Stalin', 'C. Franklin D. Roosevelt', 'D. Dwight D. Eisenhower'],
        correctAnswer: 'D',
    },
    {
        question: 'What was the name of the ship that sank after hitting an iceberg in 1912?',
        options: ['A. Britannic', 'B. Lusitania', 'C. Titanic', 'D. Queen Mary'],
        correctAnswer: 'C',
    },
    {
        question: 'Which country was the first to grant women the right to vote?',
        options: ['A. United States', 'B. New Zealand', 'C. United Kingdom', 'D. Australia'],
        correctAnswer: 'B',
    },
    {
        question: 'What was the main purpose of the Berlin Conference of 1884-1885?',
        options: ['A. To discuss trade agreements', 'B. To address climate change', 'C. To divide Africa among European powers', 'D. To negotiate peace treaties'],
        correctAnswer: 'C',
    },
    {
        question: 'Who was the first woman to fly solo nonstop across the Atlantic?',
        options: ['A. Amelia Earhart', 'B. Bessie Coleman', 'C. Harriet Quimby', 'D. Jacqueline Cochran'],
        correctAnswer: 'D',
    },
    {
        question: 'Which ancient civilization built the city of Machu Picchu?',
        options: ['A. Aztecs', 'B. Incas', 'C. Mayans', 'D. Egyptians'],
        correctAnswer: 'B',
    },
    {
        question: 'What was the name of the treaty that ended the American Revolutionary War?',
        options: ['A. Treaty of Versailles', 'B. Treaty of Paris', 'C. Treaty of Independence', 'D. Treaty of Philadelphia'],
        correctAnswer: 'B',
    },
    {
        question: 'Who was the first European explorer to reach the Americas?',
        options: ['A. Christopher Columbus', 'B. Ferdinand Magellan', 'C. Vasco da Gama', 'D. Marco Polo'],
        correctAnswer: 'A',
    },
    {
        question: 'Which ancient civilization built the Great Wall of China?',
        options: ['A. Han Dynasty', 'B. Qin Dynasty', 'C. Ming Dynasty', 'D. Zhou Dynasty'],
        correctAnswer: 'C',
    },
    {
        question: 'Who was the first woman to be awarded the Nobel Prize in Literature?',
        options: ['A. Virginia Woolf', 'B. Toni Morrison', 'C. Pearl S. Buck', 'D. Selma Lagerlöf'],
        correctAnswer: 'D',
    },
    {
        question: 'What was the main cause of the War of 1812 between the United States and Britain?',
        options: ['A. British impressment of American sailors', 'B. American annexation of Canada', 'C. American support for France', 'D. British blockade of American ports'],
        correctAnswer: 'A',
    },
    {
        question: 'Who was the first President of the United States to be impeached?',
        options: ['A. Richard Nixon', 'B. Andrew Johnson', 'C. Bill Clinton', 'D. Abraham Lincoln'],
        correctAnswer: 'B',
    },
            
        ],
        // Add more questions for History...
    
        English: [
            {
                question: 'What is the meaning of the word "ubiquitous"?',
                options: ['A. Rare', 'B. Common', 'C. Hidden', 'D. Temporary'],
                correctAnswer: 'B',
            },
            {
                question: 'Who is the author of the play "Romeo and Juliet"?',
                options: ['A. Charles Dickens', 'B. William Shakespeare', 'C. Jane Austen', 'D. Emily Brontë'],
                correctAnswer: 'B',
            },
            {
                question: 'Which literary period is known for its focus on reason, logic, and order?',
                options: ['A. Romanticism', 'B. Gothic', 'C. Renaissance', 'D. Enlightenment'],
                correctAnswer: 'D',
            },
            {
                question: 'What is the protagonist\'s name in George Orwell\'s "1984"?',
                options: ['A. Winston Smith', 'B. Big Brother', 'C. Julia', 'D. O\'Brien'],
                correctAnswer: 'A',
            },
            {
                question: 'In Shakespeare\'s "Hamlet," what is the famous soliloquy that begins with "To be or not to be"?',
                options: ['A. The Dagger Speech', 'B. The Seven Ages of Man', 'C. The Sermon on the Mount', 'D. The To Be or Not To Be Speech'],
                correctAnswer: 'D',
            },
            {
                question: 'Who wrote the novel "Pride and Prejudice"?',
                options: ['A. Jane Austen', 'B. Charlotte Brontë', 'C. Emily Brontë', 'D. Charles Dickens'],
                correctAnswer: 'A',
            },
            {
                question: 'What is the genre of George Orwell\'s "Animal Farm"?',
                options: ['A. Science Fiction', 'B. Dystopian Fiction', 'C. Fantasy', 'D. Historical Fiction'],
                correctAnswer: 'B',
            },
            {
                question: 'Who is the narrator in the novel "The Great Gatsby"?',
                options: ['A. Nick Carraway', 'B. Jay Gatsby', 'C. Daisy Buchanan', 'D. Tom Buchanan'],
                correctAnswer: 'A',
            },
            {
                question: 'Which Shakespearean play features the characters Macbeth and Lady Macbeth?',
                options: ['A. Othello', 'B. King Lear', 'C. Macbeth', 'D. Romeo and Juliet'],
                correctAnswer: 'C',
            },
            {
                question: 'Who wrote the poem "The Raven"?',
                options: ['A. Emily Dickinson', 'B. Edgar Allan Poe', 'C. Walt Whitman', 'D. Robert Frost'],
                correctAnswer: 'B',
            },

             {
        question: 'Who wrote the novel "To Kill a Mockingbird"?',
        options: ['A. Harper Lee', 'B. J.D. Salinger', 'C. F. Scott Fitzgerald', 'D. William Faulkner'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the literary term for a comparison using "like" or "as"?',
        options: ['A. Metaphor', 'B. Simile', 'C. Personification', 'D. Hyperbole'],
        correctAnswer: 'B',
    },
    {
        question: 'What literary device is used to give human characteristics to non-human things?',
        options: ['A. Metaphor', 'B. Simile', 'C. Personification', 'D. Alliteration'],
        correctAnswer: 'C',
    },
    {
        question: 'Who wrote the poem "The Waste Land"?',
        options: ['A. T.S. Eliot', 'B. William Wordsworth', 'C. Robert Frost', 'D. Emily Dickinson'],
        correctAnswer: 'A',
    },
    {
        question: 'What literary term refers to the emotional atmosphere of a piece of writing?',
        options: ['A. Theme', 'B. Mood', 'C. Tone', 'D. Setting'],
        correctAnswer: 'B',
    },
    {
        question: 'Who wrote the play "Hamlet"?',
        options: ['A. William Shakespeare', 'B. Arthur Miller', 'C. Tennessee Williams', 'D. Henrik Ibsen'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the repetition of consonant sounds at the beginning of words?',
        options: ['A. Assonance', 'B. Consonance', 'C. Alliteration', 'D. Onomatopoeia'],
        correctAnswer: 'C',
    },
    {
        question: 'Who wrote the novel "1984"?',
        options: ['A. George Orwell', 'B. Aldous Huxley', 'C. Franz Kafka', 'D. Ray Bradbury'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the perspective from which a story is told?',
        options: ['A. Setting', 'B. Theme', 'C. Point of View', 'D. Conflict'],
        correctAnswer: 'C',
    },
    {
        question: 'Who is known for writing "The Canterbury Tales"?',
        options: ['A. Geoffrey Chaucer', 'B. William Shakespeare', 'C. John Milton', 'D. Edmund Spenser'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a brief reference to a person, event, or place in literature?',
        options: ['A. Allusion', 'B. Foreshadowing', 'C. Flashback', 'D. Symbolism'],
        correctAnswer: 'A',
    },
    {
        question: 'Which Shakespearean play features the character Othello?',
        options: ['A. Othello', 'B. Hamlet', 'C. Macbeth', 'D. Romeo and Juliet'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the use of words to create a picture in the reader’s mind?',
        options: ['A. Simile', 'B. Metaphor', 'C. Imagery', 'D. Symbolism'],
        correctAnswer: 'C',
    },
    {
        question: 'Who wrote the poem "The Raven"?',
        options: ['A. Edgar Allan Poe', 'B. Emily Dickinson', 'C. Walt Whitman', 'D. Robert Frost'],
        correctAnswer: 'A',
    },
    {
        question: 'What literary term refers to the sequence of events in a story?',
        options: ['A. Theme', 'B. Plot', 'C. Characterization', 'D. Conflict'],
        correctAnswer: 'B',
    },
    {
        question: 'Who is the author of the novel "Pride and Prejudice"?',
        options: ['A. Jane Austen', 'B. Charlotte Brontë', 'C. Emily Brontë', 'D. Charles Dickens'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the feeling of uncertainty or anxiety about the outcome of events in a literary work?',
        options: ['A. Suspense', 'B. Irony', 'C. Foreshadowing', 'D. Symbolism'],
        correctAnswer: 'A',
    },
    {
        question: 'Who wrote the play "Romeo and Juliet"?',
        options: ['A. William Shakespeare', 'B. Arthur Miller', 'C. Tennessee Williams', 'D. Henrik Ibsen'],
        correctAnswer: 'A',
    },
    {
        question: 'What literary term refers to the use of words to create sound effects?',
        options: ['A. Rhyme', 'B. Meter', 'C. Alliteration', 'D. Onomatopoeia'],
        correctAnswer: 'D',
    },
    {
        question: 'Who wrote the novel "Moby-Dick"?',
        options: ['A. Herman Melville', 'B. Mark Twain', 'C. Nathaniel Hawthorne', 'D. Ralph Waldo Emerson'],
        correctAnswer: 'A',
    },
             {
        question: 'Who wrote the novel "The Catcher in the Rye"?',
        options: ['A. J.D. Salinger', 'B. F. Scott Fitzgerald', 'C. Ernest Hemingway', 'D. Harper Lee'],
        correctAnswer: 'A',
    },
    {
        question: 'What literary term refers to the use of exaggeration for emphasis or effect?',
        options: ['A. Hyperbole', 'B. Irony', 'C. Metaphor', 'D. Simile'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a word that imitates the sound it represents?',
        options: ['A. Onomatopoeia', 'B. Alliteration', 'C. Assonance', 'D. Consonance'],
        correctAnswer: 'A',
    },
    {
        question: 'Who wrote the play "Death of a Salesman"?',
        options: ['A. Arthur Miller', 'B. Tennessee Williams', 'C. Eugene O\'Neill', 'D. David Mamet'],
        correctAnswer: 'A',
    },
    {
        question: 'What literary term refers to the use of hints or clues to suggest what will happen later in a story?',
        options: ['A. Foreshadowing', 'B. Symbolism', 'C. Imagery', 'D. Allegory'],
        correctAnswer: 'A',
    },
    {
        question: 'Who wrote the poem "The Road Not Taken"?',
        options: ['A. Robert Frost', 'B. Emily Dickinson', 'C. Langston Hughes', 'D. Walt Whitman'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the central message or lesson of a literary work?',
        options: ['A. Theme', 'B. Mood', 'C. Tone', 'D. Plot'],
        correctAnswer: 'A',
    },
    {
        question: 'Who wrote the novel "Brave New World"?',
        options: ['A. Aldous Huxley', 'B. George Orwell', 'C. Ray Bradbury', 'D. H.G. Wells'],
        correctAnswer: 'A',
    },
    {
        question: 'What literary device is used to create a contrast between appearance and reality?',
        options: ['A. Irony', 'B. Foreshadowing', 'C. Symbolism', 'D. Allegory'],
        correctAnswer: 'A',
    },
    {
        question: 'Who is known for writing "The Scarlet Letter"?',
        options: ['A. Nathaniel Hawthorne', 'B. Mark Twain', 'C. Herman Melville', 'D. Edgar Allan Poe'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the use of humor, irony, or ridicule to criticize or mock people, society, or institutions?',
        options: ['A. Satire', 'B. Parody', 'C. Irony', 'D. Sarcasm'],
        correctAnswer: 'A',
    },
    {
        question: 'Who wrote the play "A Streetcar Named Desire"?',
        options: ['A. Tennessee Williams', 'B. Arthur Miller', 'C. Eugene O\'Neill', 'D. Edward Albee'],
        correctAnswer: 'A',
    },
    {
        question: 'What literary term refers to the feeling created in the reader by a literary work?',
        options: ['A. Mood', 'B. Theme', 'C. Tone', 'D. Setting'],
        correctAnswer: 'A',
    },
    {
        question: 'Who wrote the novel "The Grapes of Wrath"?',
        options: ['A. John Steinbeck', 'B. Ernest Hemingway', 'C. F. Scott Fitzgerald', 'D. William Faulkner'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the use of symbols to represent ideas or concepts in literature?',
        options: ['A. Symbolism', 'B. Allegory', 'C. Irony', 'D. Foreshadowing'],
        correctAnswer: 'A',
    },
    {
        question: 'Who wrote the poem "Howl"?',
        options: ['A. Allen Ginsberg', 'B. T.S. Eliot', 'C. Langston Hughes', 'D. Sylvia Plath'],
        correctAnswer: 'A',
    },
    {
        question: 'What literary term refers to the repetition of vowel sounds in nearby words?',
        options: ['A. Assonance', 'B. Consonance', 'C. Alliteration', 'D. Onomatopoeia'],
        correctAnswer: 'A',
    },
    {
        question: 'Who wrote the novel "Beloved"?',
        options: ['A. Toni Morrison', 'B. Maya Angelou', 'C. Zora Neale Hurston', 'D. Alice Walker'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the use of language to convey sensory experiences?',
        options: ['A. Imagery', 'B. Simile', 'C. Metaphor', 'D. Personification'],
        correctAnswer: 'A',
    },
    {
        question: 'Who wrote the play "The Importance of Being Earnest"?',
        options: ['A. Oscar Wilde', 'B. George Bernard Shaw', 'C. Henrik Ibsen', 'D. Samuel Beckett'],
        correctAnswer: 'A',
    },
        ],
        // Add more questions for English...
    
        'Political Science': [
            {
                question: 'What is a democracy?',
                options: ['A. Rule by the people', 'B. Rule by a single person', 'C. Rule by the military', 'D. Rule by the elite'],
                correctAnswer: 'A',
            },
            {
                question: 'Who is known as the "Father of Modern Political Science"?',
                options: ['A. Plato', 'B. Aristotle', 'C. Machiavelli', 'D. John Locke'],
                correctAnswer: 'C',
            },
            {
                question: 'What is the main function of the legislative branch of government?',
                options: ['A. Enforcing laws', 'B. Making laws', 'C. Interpreting laws', 'D. Conducting elections'],
                correctAnswer: 'B',
            },
            {
                question: 'What is the term for a system of government where power is divided between a central government and regional governments?',
                options: ['A. Autocracy', 'B. Federalism', 'C. Unitarism', 'D. Totalitarianism'],
                correctAnswer: 'B',
            },
            {
                question: 'Who wrote the book "The Prince," which explores political power and leadership?',
                options: ['A. Thomas Hobbes', 'B. John Locke', 'C. Niccolò Machiavelli', 'D. Jean-Jacques Rousseau'],
                correctAnswer: 'C',
            },
            {
                question: 'In the United States, what is the term length for a member of the House of Representatives?',
                options: ['A. 2 years', 'B. 4 years', 'C. 6 years', 'D. 8 years'],
                correctAnswer: 'A',
            },
            {
                question: 'What is the role of the Supreme Court in the U.S. government?',
                options: ['A. Enforcing laws', 'B. Making laws', 'C. Interpreting laws', 'D. Conducting elections'],
                correctAnswer: 'C',
            },
            {
                question: 'Who is the head of the executive branch in the United States?',
                options: ['A. Speaker of the House', 'B. President', 'C. Chief Justice', 'D. Senate Majority Leader'],
                correctAnswer: 'B',
            },
            {
                question: 'What is the primary responsibility of the President of the United States?',
                options: ['A. Making laws', 'B. Enforcing laws', 'C. Interpreting laws', 'D. Conducting elections'],
                correctAnswer: 'B',
            },
            {
                question: 'What is the purpose of the United Nations?',
                options: ['A. Economic cooperation', 'B. Social media regulation', 'C. International peace and cooperation', 'D. Space exploration'],
                correctAnswer: 'C',
            },

            {
        question: 'Who coined the term "political science"?',
        options: ['A. Aristotle', 'B. Machiavelli', 'C. Plato', 'D. Herodotus'],
        correctAnswer: 'A',
    },
    {
        question: 'Which document outlines the fundamental rights and freedoms of citizens in the United States?',
        options: ['A. Constitution', 'B. Bill of Rights', 'C. Magna Carta', 'D. Declaration of Independence'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the primary function of the executive branch of government?',
        options: ['A. Enforcing laws', 'B. Making laws', 'C. Interpreting laws', 'D. Conducting elections'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a system of government in which power is held by the people, who rule either directly or through elected representatives?',
        options: ['A. Democracy', 'B. Autocracy', 'C. Oligarchy', 'D. Theocracy'],
        correctAnswer: 'A',
    },
    {
        question: 'Who is considered the "Father of Modern Political Science"?',
        options: ['A. Niccolò Machiavelli', 'B. Aristotle', 'C. Jean-Jacques Rousseau', 'D. John Locke'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the process by which citizens vote to elect representatives to make decisions on their behalf?',
        options: ['A. Representative democracy', 'B. Direct democracy', 'C. Oligarchy', 'D. Autocracy'],
        correctAnswer: 'A',
    },
    {
        question: 'Which principle divides governmental powers between the national government and state governments?',
        options: ['A. Federalism', 'B. Unitarism', 'C. Totalitarianism', 'D. Authoritarianism'],
        correctAnswer: 'A',
    },
    {
        question: 'Who is the current Secretary-General of the United Nations?',
        options: ['A. António Guterres', 'B. Ban Ki-moon', 'C. Kofi Annan', 'D. Boutros Boutros-Ghali'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a group of states or countries with a central authority?',
        options: ['A. Confederation', 'B. Federation', 'C. Monarchy', 'D. Aristocracy'],
        correctAnswer: 'B',
    },
    {
        question: 'Who wrote the political treatise "The Leviathan"?',
        options: ['A. Thomas Hobbes', 'B. John Locke', 'C. Jean-Jacques Rousseau', 'D. Montesquieu'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the primary function of the judicial branch of government?',
        options: ['A. Enforcing laws', 'B. Making laws', 'C. Interpreting laws', 'D. Conducting elections'],
        correctAnswer: 'C',
    },
    {
        question: 'Which principle holds that no person is above the law, including government officials?',
        options: ['A. Rule of law', 'B. Due process', 'C. Separation of powers', 'D. Checks and balances'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a form of government in which power is vested in a single individual or small group?',
        options: ['A. Autocracy', 'B. Democracy', 'C. Oligarchy', 'D. Anarchy'],
        correctAnswer: 'A',
    },
    {
        question: 'Which amendment to the U.S. Constitution guarantees freedom of speech, religion, and the press?',
        options: ['A. First Amendment', 'B. Second Amendment', 'C. Fourth Amendment', 'D. Fifth Amendment'],
        correctAnswer: 'A',
    },
    {
        question: 'Who wrote the book "The Republic," which discusses justice and the ideal state?',
        options: ['A. Plato', 'B. Aristotle', 'C. Socrates', 'D. Xenophon'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a system of government in which a single ruler has unlimited power and authority?',
        options: ['A. Autocracy', 'B. Democracy', 'C. Oligarchy', 'D. Republic'],
        correctAnswer: 'A',
    },
    {
        question: 'Who wrote the influential work "Two Treatises of Government"?',
        options: ['A. John Locke', 'B. Thomas Hobbes', 'C. Jean-Jacques Rousseau', 'D. Niccolò Machiavelli'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a system of government in which power is concentrated in the hands of a few people or a small group?',
        options: ['A. Oligarchy', 'B. Democracy', 'C. Autocracy', 'D. Theocracy'],
        correctAnswer: 'A',
    },
    {
        question: 'Who was the primary author of the Federalist Papers, advocating for the ratification of the U.S. Constitution?',
        options: ['A. Alexander Hamilton', 'B. James Madison', 'C. John Jay', 'D. Thomas Jefferson'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the process by which a citizen can propose a new law or amendment to the constitution through a direct vote?',
        options: ['A. Initiative', 'B. Referendum', 'C. Recall', 'D. Plebiscite'],
        correctAnswer: 'A',
    },
            {
        question: 'What is the term for a government ruled by a king or queen?',
        options: ['A. Monarchy', 'B. Oligarchy', 'C. Autocracy', 'D. Republic'],
        correctAnswer: 'A',
    },
    {
        question: 'Who is considered the "Father of Modern Liberalism"?',
        options: ['A. John Locke', 'B. Thomas Hobbes', 'C. Jean-Jacques Rousseau', 'D. Montesquieu'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the primary function of the legislative branch of government?',
        options: ['A. Enforcing laws', 'B. Making laws', 'C. Interpreting laws', 'D. Conducting elections'],
        correctAnswer: 'B',
    },
    {
        question: 'Which type of government is characterized by a division of powers between a central government and regional governments?',
        options: ['A. Federalism', 'B. Unitarism', 'C. Totalitarianism', 'D. Authoritarianism'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a system of government in which power is concentrated in the hands of a single ruler?',
        options: ['A. Autocracy', 'B. Democracy', 'C. Oligarchy', 'D. Republic'],
        correctAnswer: 'A',
    },
    {
        question: 'Who was the first woman appointed to the U.S. Supreme Court?',
        options: ['A. Sandra Day O\'Connor', 'B. Ruth Bader Ginsburg', 'C. Sonia Sotomayor', 'D. Elena Kagan'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a system of government in which power is held by the people, who rule either directly or through elected representatives?',
        options: ['A. Democracy', 'B. Autocracy', 'C. Oligarchy', 'D. Theocracy'],
        correctAnswer: 'A',
    },
    {
        question: 'Who wrote the political treatise "The Social Contract"?',
        options: ['A. Jean-Jacques Rousseau', 'B. Thomas Hobbes', 'C. John Locke', 'D. Montesquieu'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a form of government in which power is vested in a hereditary ruling class or nobility?',
        options: ['A. Aristocracy', 'B. Oligarchy', 'C. Democracy', 'D. Autocracy'],
        correctAnswer: 'A',
    },
    {
        question: 'Which branch of government has the power to declare war?',
        options: ['A. Legislative', 'B. Executive', 'C. Judicial', 'D. All branches'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the process by which citizens can remove an elected official from office before their term expires?',
        options: ['A. Recall', 'B. Referendum', 'C. Initiative', 'D. Plebiscite'],
        correctAnswer: 'A',
    },
    {
        question: 'Who is the current President of Russia?',
        options: ['A. Vladimir Putin', 'B. Dmitry Medvedev', 'C. Boris Yeltsin', 'D. Mikhail Gorbachev'],
        correctAnswer: 'A',
    },
    {
        question: 'Which amendment to the U.S. Constitution guarantees the right to bear arms?',
        options: ['A. Second Amendment', 'B. First Amendment', 'C. Third Amendment', 'D. Fourth Amendment'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a system of government in which power is concentrated in the hands of a small group of wealthy individuals or families?',
        options: ['A. Plutocracy', 'B. Oligarchy', 'C. Democracy', 'D. Autocracy'],
        correctAnswer: 'A',
    },
    {
        question: 'Who was the first Secretary-General of the United Nations?',
        options: ['A. Trygve Lie', 'B. Dag Hammarskjöld', 'C. Kofi Annan', 'D. Ban Ki-moon'],
        correctAnswer: 'A',
    },
    {
        question: 'Which amendment to the U.S. Constitution abolished slavery?',
        options: ['A. Thirteenth Amendment', 'B. Fourteenth Amendment', 'C. Fifteenth Amendment', 'D. Sixteenth Amendment'],
        correctAnswer: 'A',
    },
    {
        question: 'Who was the longest-serving President of the United States?',
        options: ['A. Franklin D. Roosevelt', 'B. George Washington', 'C. Abraham Lincoln', 'D. Thomas Jefferson'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a system of government in which power is vested in a religious leader or religious institution?',
        options: ['A. Theocracy', 'B. Democracy', 'C. Oligarchy', 'D. Autocracy'],
        correctAnswer: 'A',
    },
    {
        question: 'Who was the first woman to run for President of the United States from a major political party?',
        options: ['A. Hillary Clinton', 'B. Geraldine Ferraro', 'C. Shirley Chisholm', 'D. Sarah Palin'],
        correctAnswer: 'B',
    },
    {
        question: 'Which principle ensures that no one branch of government becomes too powerful?',
        options: ['A. Separation of powers', 'B. Checks and balances', 'C. Rule of law', 'D. Due process'],
        correctAnswer: 'B',
    },
        ],
        // Add more questions for Political Science...
    
         Sociology: [
        {
            question: 'What is the term for the process by which individuals internalize the values, beliefs, and norms of a society?',
        options: ['A. Socialization', 'B. Social mobility', 'C. Social stratification', 'D. Social control'],
        correctAnswer: 'A',
    },
    {
        question: 'Which sociological perspective emphasizes the ways in which society promotes inequality and conflict among groups?',
        options: ['A. Functionalism', 'B. Conflict theory', 'C. Symbolic interactionism', 'D. Feminist theory'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the term for the social process through which individuals or groups acquire or create new culture?',
        options: ['A. Assimilation', 'B. Cultural relativism', 'C. Cultural diffusion', 'D. Cultural innovation'],
        correctAnswer: 'D',
    },
    {
        question: 'Who coined the term "the sociological imagination"?',
        options: ['A. Karl Marx', 'B. Max Weber', 'C. Émile Durkheim', 'D. C. Wright Mills'],
        correctAnswer: 'D',
    },
    {
        question: 'What term refers to the process by which individuals or groups are excluded from full participation in society?',
        options: ['A. Socialization', 'B. Social exclusion', 'C. Social stratification', 'D. Social cohesion'],
        correctAnswer: 'B',
    },

    {
        question: 'Which sociologist introduced the idea of the "iron cage" of rationality in modern society?',
        options: ['A. Karl Marx', 'B. Max Weber', 'C. Émile Durkheim', 'D. Talcott Parsons'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the term for a system of ranking individuals or groups based on unequal access to resources and opportunities?',
        options: ['A. Socialization', 'B. Social mobility', 'C. Social stratification', 'D. Social control'],
        correctAnswer: 'C',
    },
    {
        question: 'Which type of society is characterized by a simple division of labor, kinship ties, and a small population?',
        options: ['A. Industrial society', 'B. Post-industrial society', 'C. Agricultural society', 'D. Hunter-gatherer society'],
        correctAnswer: 'D',
    },
    {
        question: 'Which sociological perspective emphasizes the importance of symbols and language in shaping social life?',
        options: ['A. Functionalism', 'B. Conflict theory', 'C. Symbolic interactionism', 'D. Feminist theory'],
        correctAnswer: 'C',
    },
    
    {
        question: 'Which sociologist is known for his work on the theory of social capital?',
        options: ['A. Karl Marx', 'B. Pierre Bourdieu', 'C. Max Weber', 'D. Michel Foucault'],
        correctAnswer: 'B',
    },

             {
        question: 'What is the term for the ability to understand and share the feelings of another?',
        options: ['A. Empathy', 'B. Sympathy', 'C. Compassion', 'D. Altruism'],
        correctAnswer: 'A',
    },
    {
        question: 'Which sociological perspective focuses on how society is structured to maintain stability and order?',
        options: ['A. Functionalism', 'B. Conflict Theory', 'C. Symbolic Interactionism', 'D. Feminist Theory'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a system of beliefs, values, and practices shared by a group of people?',
        options: ['A. Culture', 'B. Society', 'C. Tradition', 'D. Religion'],
        correctAnswer: 'A',
    },
    {
        question: 'Who is known for his theory of social stratification, which includes the concepts of class, status, and power?',
        options: ['A. Karl Marx', 'B. Max Weber', 'C. Émile Durkheim', 'D. Georg Simmel'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the term for the process by which individuals learn the norms, values, and behaviors of a society?',
        options: ['A. Socialization', 'B. Assimilation', 'C. Integration', 'D. Acculturation'],
        correctAnswer: 'A',
    },
    {
        question: 'Who coined the term "sociology" and is often regarded as the founder of sociology?',
        options: ['A. Auguste Comte', 'B. Émile Durkheim', 'C. Karl Marx', 'D. Max Weber'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the process by which individuals or groups are excluded from full participation in society?',
        options: ['A. Social Exclusion', 'B. Social Segregation', 'C. Social Stratification', 'D. Social Stigma'],
        correctAnswer: 'A',
    },
    {
        question: 'Which sociological perspective focuses on the ways in which individuals interact through shared symbols and meanings?',
        options: ['A. Symbolic Interactionism', 'B. Functionalism', 'C. Conflict Theory', 'D. Feminist Theory'],
        correctAnswer: 'A',
    },
    {
        question: 'Who is known for his study "Suicide," which examined the social causes of suicide?',
        options: ['A. Émile Durkheim', 'B. Karl Marx', 'C. Max Weber', 'D. Georg Simmel'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a system of ranked social categories based on unequal access to resources and opportunities?',
        options: ['A. Social Stratification', 'B. Social Hierarchy', 'C. Social Differentiation', 'D. Social Mobility'],
        correctAnswer: 'A',
    },
    {
        question: 'Which sociologist is known for his work on the concept of the "looking-glass self"?',
        options: ['A. Charles Cooley', 'B. George Herbert Mead', 'C. Erving Goffman', 'D. W.E.B. Du Bois'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the process by which cultures become more similar to one another?',
        options: ['A. Cultural Assimilation', 'B. Cultural Diffusion', 'C. Cultural Homogenization', 'D. Cultural Integration'],
        correctAnswer: 'B',
    },
    {
        question: 'Who is known for her work on the intersection of race, class, and gender, particularly in relation to feminism?',
        options: ['A. Patricia Hill Collins', 'B. Simone de Beauvoir', 'C. Betty Friedan', 'D. bell hooks'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the study of how individuals and groups make decisions to allocate resources?',
        options: ['A. Economics', 'B. Anthropology', 'C. Sociology', 'D. Political Science'],
        correctAnswer: 'A',
    },
    {
        question: 'Which sociologist introduced the concept of the "iron cage" of rationality in modern society?',
        options: ['A. Karl Marx', 'B. Max Weber', 'C. Émile Durkheim', 'D. Georg Simmel'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the term for a sudden and widespread outbreak of a disease within a specific population or geographical area?',
        options: ['A. Epidemic', 'B. Pandemic', 'C. Outbreak', 'D. Plague'],
        correctAnswer: 'B',
    },
    {
        question: 'Which sociologist is known for his theory of social action, which emphasizes subjective meanings and interpretations?',
        options: ['A. Max Weber', 'B. Émile Durkheim', 'C. Karl Marx', 'D. Georg Simmel'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the belief in and promotion of the inherent worth of every individual?',
        options: ['A. Individualism', 'B. Collectivism', 'C. Humanism', 'D. Altruism'],
        correctAnswer: 'C',
    },
    {
        question: 'Who is known for her work on the concept of the "feminine mystique," which highlighted the dissatisfaction of women in traditional gender roles?',
        options: ['A. Betty Friedan', 'B. Simone de Beauvoir', 'C. bell hooks', 'D. Patricia Hill Collins'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the systematic study of human society and social behavior?',
        options: ['A. Sociology', 'B. Psychology', 'C. Anthropology', 'D. Economics'],
        correctAnswer: 'A',
    },
              {
        question: 'What term describes a society in which cultural diversity is promoted and respected?',
        options: ['A. Multiculturalism', 'B. Assimilation', 'C. Ethnocentrism', 'D. Xenophobia'],
        correctAnswer: 'A',
    },
    {
        question: 'Who coined the term "sociological imagination"?',
        options: ['A. Karl Marx', 'B. Max Weber', 'C. Émile Durkheim', 'D. C. Wright Mills'],
        correctAnswer: 'D',
    },
    {
        question: 'Which sociological perspective emphasizes the role of power and coercion in society?',
        options: ['A. Conflict Theory', 'B. Functionalism', 'C. Symbolic Interactionism', 'D. Feminist Theory'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the process by which individuals or groups are ranked in society?',
        options: ['A. Social Stratification', 'B. Socialization', 'C. Social Integration', 'D. Social Mobility'],
        correctAnswer: 'A',
    },
    {
        question: 'Who is known for his theory of the "McDonaldization" of society?',
        options: ['A. Max Weber', 'B. Karl Marx', 'C. George Ritzer', 'D. Émile Durkheim'],
        correctAnswer: 'C',
    },
    {
        question: 'What is the term for the spreading of cultural traits from one society to another?',
        options: ['A. Cultural Diffusion', 'B. Cultural Relativism', 'C. Cultural Integration', 'D. Cultural Assimilation'],
        correctAnswer: 'A',
    },
    {
        question: 'Which sociologist introduced the concept of the "iron cage"?',
        options: ['A. Karl Marx', 'B. Max Weber', 'C. Émile Durkheim', 'D. Georg Simmel'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the term for the process by which individuals or groups are excluded from society?',
        options: ['A. Social Isolation', 'B. Social Segregation', 'C. Social Exclusion', 'D. Social Alienation'],
        correctAnswer: 'C',
    },
    {
        question: 'Who developed the theory of "dramaturgy," which views social life as a series of performances?',
        options: ['A. Erving Goffman', 'B. Émile Durkheim', 'C. Max Weber', 'D. Karl Marx'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the process by which individuals adopt the cultural traits of a dominant group?',
        options: ['A. Cultural Assimilation', 'B. Cultural Relativism', 'C. Cultural Appropriation', 'D. Cultural Pluralism'],
        correctAnswer: 'A',
    },
    {
        question: 'Which sociologist is known for his work on the "culture of poverty"?',
        options: ['A. Oscar Lewis', 'B. Karl Marx', 'C. Max Weber', 'D. Émile Durkheim'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the tendency to view one’s own culture as superior to others?',
        options: ['A. Ethnocentrism', 'B. Cultural Relativism', 'C. Multiculturalism', 'D. Xenophobia'],
        correctAnswer: 'A',
    },
    {
        question: 'Who coined the term "the feminine mystique"?',
        options: ['A. Betty Friedan', 'B. Simone de Beauvoir', 'C. bell hooks', 'D. Patricia Hill Collins'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a group of individuals who share a common culture and identity?',
        options: ['A. Ethnicity', 'B. Community', 'C. Tribe', 'D. Nation'],
        correctAnswer: 'A',
    },
    {
        question: 'Who is known for his study of "primary" and "secondary" groups in sociology?',
        options: ['A. Charles Cooley', 'B. George Herbert Mead', 'C. Georg Simmel', 'D. Herbert Spencer'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a set of cultural beliefs and practices that help to maintain social control over behavior?',
        options: ['A. Norms', 'B. Values', 'C. Folkways', 'D. Social Control'],
        correctAnswer: 'D',
    },
    {
        question: 'Who is known for his work on the theory of "social capital"?',
        options: ['A. Pierre Bourdieu', 'B. Émile Durkheim', 'C. Karl Marx', 'D. Max Weber'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for the idea that social phenomena should be studied objectively and without bias?',
        options: ['A. Objectivism', 'B. Positivism', 'C. Subjectivism', 'D. Relativism'],
        correctAnswer: 'B',
    },
    {
        question: 'Who is known for his study of "anomie" and its effects on society?',
        options: ['A. Émile Durkheim', 'B. Karl Marx', 'C. Max Weber', 'D. Georg Simmel'],
        correctAnswer: 'A',
    },
    {
        question: 'What is the term for a system of social stratification based on birth or ascribed status?',
        options: ['A. Caste System', 'B. Class System', 'C. Meritocracy', 'D. Plutocracy'],
        correctAnswer: 'A',
    },
],
    // Add more questions for Sociology...

        
        Chemistry: [
            {
                question: 'What is the atomic number of carbon?',
                options: ['A. 6', 'B. 8', 'C. 12', 'D. 14'],
                correctAnswer: 'A',
            },
            {
                question: 'Which gas is commonly known as laughing gas?',
                options: ['A. Oxygen', 'B. Nitrous oxide', 'C. Carbon dioxide', 'D. Helium'],
                correctAnswer: 'B',
            },
            {
                question: 'What is the chemical symbol for gold?',
                options: ['A. Au', 'B. Ag', 'C. Fe', 'D. Cu'],
                correctAnswer: 'A',
            },
            {
                question: 'In a chemical reaction, what do the reactants produce?',
                options: ['A. Heat', 'B. Light', 'C. Products', 'D. Gases'],
                correctAnswer: 'C',
            },
            {
                question: 'What is the pH of pure water?',
                options: ['A. 5', 'B. 7', 'C. 10', 'D. 14'],
                correctAnswer: 'B',
            },
            {
                question: 'Which element has the chemical symbol "O"?',
                options: ['A. Oxygen', 'B. Osmium', 'C. Oganesson', 'D. Osmium'],
                correctAnswer: 'A',
            },
            {
                question: 'What is the chemical formula for water?',
                options: ['A. H2O', 'B. CO2', 'C. O2', 'D. NaCl'],
                correctAnswer: 'A',
            },
            {
                question: 'Which gas is produced during photosynthesis?',
                options: ['A. Oxygen', 'B. Carbon dioxide', 'C. Nitrogen', 'D. Hydrogen'],
                correctAnswer: 'A',
            },
            {
                question: 'What is the most abundant gas in Earth\'s atmosphere?',
                options: ['A. Oxygen', 'B. Nitrogen', 'C. Carbon dioxide', 'D. Hydrogen'],
                correctAnswer: 'B',
            },
            {
                question: 'What is the chemical symbol for sodium?',
                options: ['A. Na', 'B. Sn', 'C. Mg', 'D. Ca'],
                correctAnswer: 'A',
            },
        ],

        Physics: [
            {
                question: 'What is the formula for calculating force?',
                options: ['A. F = ma', 'B. E = mc^2', 'C. P = mv', 'D. F = mb'],
                correctAnswer: 'A',
            },
            {
                question: 'What is the SI unit of electric current?',
                options: ['A. Volt', 'B. Ampere', 'C. Ohm', 'D. Watt'],
                correctAnswer: 'B',
            },
            {
                question: 'Which law of motion states "For every action, there is an equal and opposite reaction"?',
                options: ['A. Newton\'s First Law', 'B. Newton\'s Second Law', 'C. Newton\'s Third Law', 'D. Law of Inertia'],
                correctAnswer: 'C',
            },
            {
                question: 'What is the speed of light in a vacuum?',
                options: ['A. 300,000 km/s', 'B. 150,000 km/s', 'C. 450,000 km/s', 'D. 600,000 km/s'],
                correctAnswer: 'A',
            },
            {
                question: 'What is the unit of measurement for frequency?',
                options: ['A. Hertz', 'B. Watt', 'C. Newton', 'D. Joule'],
                correctAnswer: 'A',
            },
            {
                question: 'Which type of energy does a moving car have?',
                options: ['A. Kinetic energy', 'B. Potential energy', 'C. Thermal energy', 'D. Chemical energy'],
                correctAnswer: 'A',
            },
            {
                question: 'What is the SI unit of power?',
                options: ['A. Watt', 'B. Joule', 'C. Volt', 'D. Ampere'],
                correctAnswer: 'A',
            },
            {
                question: 'What is the law of conservation of energy?',
                options: ['A. Energy cannot be created or destroyed', 'B. Energy can only be created', 'C. Energy can only be destroyed', 'D. Energy is always decreasing'],
                correctAnswer: 'A',
            },
            {
                question: 'What is the formula for calculating kinetic energy?',
                options: ['A. KE = 1/2 * mv^2', 'B. KE = mgh', 'C. KE = Fd', 'D. KE = PE + W'],
                correctAnswer: 'A',
            },
            {
                question: 'What is the acceleration due to gravity on Earth?',
                options: ['A. 9.8 m/s^2', 'B. 5.0 m/s^2', 'C. 12.0 m/s^2', 'D. 7.5 m/s^2'],
                correctAnswer: 'A',
            },
        ],    

};

function startExam() {
    clearInterval(timer);
    document.getElementsByClassName('start-button')[0].style.display = 'none';
    document.getElementsByClassName('subject-form')[0].style.display = 'none';
    document.getElementsByClassName('submit-button')[0].style.display = 'block';
    displayQuestions();
    startTimer();
}

function displayQuestions() {
    const selectedSubject = subjectDropdown.value;

    questionsContainer.innerHTML = ''; // Clear previous questions

    for (let i = 0; i < questionsPerSubject; i++) {
        const questionNumber = i+1; // Start numbering from 1
        const questionData = questionsData[selectedSubject][i];

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${questionNumber}. ${questionData.question}</p>`;

        const optionsList = document.createElement('ul');
        optionsList.classList.add('options');

        for (let j = 0; j < 4; j++) {
            const optionLabel = String.fromCharCode(65 + j);
            const optionText = questionData.options[j];

            const optionLi = document.createElement('li');
            optionLi.classList.add('option'); // Add the "option" class for styling
            optionLi.onclick = function () {
                selectOption(this); // Call the selectOption function on click
            };

            optionLi.innerHTML = `
                <input type="radio" name="q${questionNumber}" value="${optionLabel}" id="q${questionNumber}${optionLabel}">
                <label for="q${questionNumber}${optionLabel}">${optionText}</label>
            
            `;

            optionsList.appendChild(optionLi);
        }

        questionDiv.appendChild(optionsList);
        questionsContainer.appendChild(questionDiv);
    }
}

function selectOption(option) {
    const selectedOption = option.querySelector('input[type="radio"]');
    
    // If the selected option is already checked, return
    if (selectedOption.checked) return;

    // Remove the "selected" class from all options in the same question
    const questionNumber = selectedOption.name.substring(1);
    document.querySelectorAll(`input[name="q${questionNumber}"]`).forEach(function (opt) {
        opt.parentElement.classList.remove('selected');
    });

    // Add the "selected" class to the clicked option
    option.classList.add('selected');
    selectedOption.checked = true; // Manually check the selected option
}

function startTimer() {
    let secondsRemaining = timeLimit;

    function updateTimer() {
        const minutes = Math.floor(secondsRemaining / 60);
        const seconds = secondsRemaining % 60;

        timerElement.textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (secondsRemaining <= 0) {
            clearInterval(timer);
            timerElement.textContent = 'Time Expired!';
            submitExam(); // Auto-submit or redirect logic here
        }

        secondsRemaining--;
    }

    updateTimer(); // Initial display

    timer = setInterval(updateTimer, 1000);
}

function submitExam() {
    clearInterval(timer);
    calculateScore();
    const scoresParameter = encodeURIComponent(JSON.stringify(scores));
    window.location.href = "../html/performance.html?scores=" + scoresParameter;
    console.log(scores);
}

function calculateScore() {
    const totalQuestions = questionsPerSubject;
    let correctAnswers = 0;
    let attempted=0;
    for (let i = 1; i <= totalQuestions; i++) {

        const radioButtons = document.querySelectorAll(`input[name="q${i}"]`);
        let selectedOption;
        radioButtons.forEach(radioButton => {
            if (radioButton.checked) {
                selectedOption = radioButton;
            }
        });
        

        if (selectedOption) {
            const questionData = questionsData[subjectDropdown.value][i-1];
            const isCorrect = selectedOption.value === questionData.correctAnswer;
            // console.log ("Ansers Verify",i,"--> correct ans is: ",questionData.correctAnswer,"selected: ",selectedOption.value,"flag",isCorrect)
            if (isCorrect) {
                correctAnswers++;
            }
            attempted+=1;
            selectedOption.disabled = true; // Disable the selected option
        }
    }
    console.log(totalQuestions, correctAnswers)
    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    scores = {
        "Percentage": scorePercentage,
        "Correct Answers": correctAnswers,
        "Total Questions": totalQuestions,
        "Attempted Questions":attempted
    };

}
