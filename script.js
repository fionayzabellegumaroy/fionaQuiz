let choiceOne = document.getElementById("choiceOne");
let choiceTwo = document.getElementById("choiceTwo");
let choiceThree = document.getElementById("choiceThree");
let choiceFour = document.getElementById("choiceFour");
let choiceOneContainer = document.getElementById("choiceOneContainer");
let choiceTwoContainer = document.getElementById("choiceTwoContainer");
let choiceThreeContainer = document.getElementById("choiceThreeContainer");
let choiceFourContainer = document.getElementById("choiceFourContainer");
let choicesContainer = document.getElementById("choicesContainer");


let inputField = document.getElementById("inputField");
let submit = document.getElementById("submitInput");

let scriptContainer = document.getElementById("scriptContainer");

let ageText = document.getElementById("age");

let age = 0;

let numQuestion = 0;

let numPersons = -1;

let value;

var day;
var month;

let persons = [];

let leaderboard = [];

let scores = [];

let choicesBoxes = [choiceOneContainer, choiceTwoContainer, choiceThreeContainer, choiceFourContainer];

let questions = [
    `what is your name?`,
    `how old was fiona when she came to the united states?`,
    `does fiona suffer from mental health issues?`,
    `when is fiona's spiritual birthday?`,
    `what is fiona's MBTI?`,
    `what is fiona's favorite game?`,
    `what is fiona's favorite instrument to play?`,
    `how many times has fiona been to the philippines since moving to america?`,
    `where is fiona's top place to vacation when she has the moola?`,
    `when did fiona get her first tattoo?`,
    `how many piercings does fiona have?`,
    `what is fiona's dream job?`,
    `who is fiona's favorite BTS member?`,
    `how many kids does fiona want?`,
    `what is fiona's favorite plant?`,
    `on average, how many bottles of water does fiona intake a day?`,
    `what is not one of fiona's favorite movies?`,
    `which singer was fiona's first concert?`,
    `what is the most expensive thing fiona spent money on?`,
    `which game did fiona first spend money on?`,
    `what is not one of fiona's favorite animes?`,
    `how long did it take fiona to create this?`
];

let choices = [
    [""],
    ["three", "five", "seven", "nine"],
    ["yes", "no", "what is a mental health issue?","LOL"],
    ["march 8", "june 5", "september 7", "she doesn't have one"],
    ["INTJ", "INFP", "ISTP", "ISFJ"],
    ["league of legends", "minecraft", "oxygen not included", "valorant"],
    ["drums", "violin", "piano", "ukelele"],
    ["one times", "two times", "three times", "four times"],
    ["iceland", "hawaii", "south korea", "japan"],
    ['march 2023', 'june 2024', 'october 2022', 'january 2023'],
    ['three', 'four', 'five', 'six'],
    ['sugar baby', 'content creator', 'filmmaker', 'no job bruh'],
    ['rm', 'v', 'jungkook', 'suga'],
    ['zero', 'one', 'two', 'three'],
    ['sunflower', 'cactus', 'daisy', 'rose'],
    ['barely one', 'two on a lucky day', 'three cause slay', 'four or more cause so demure'],
    ['parasite', 'everything everywhere all at once', 'oppenheimer', 'howl`s moving castle'],
    ['joe hisaishi', 'daniel caesar', 'niki', 'thee sacred souls'],
    ['niki concert ticket', 'year subscription plan to codeacademy', 'a shopping spree at the mall', 'college tuition'],
    ['league of legends', 'guild wars 2', 'valorant', 'minecraft'],
    ['naruto', 'cowboy bebop', 'neon genesis evangelion', 'devilman crybaby'],
    ['less than 6 hours', 'less than 12 hours', 'less than 24 hours', 'less than 36 hours']
];

let correctAnswers = [
    "seven",
    "yes",
    "march 8",
    "INFP",
    "minecraft",
    "drums",
    "three times",
    "iceland",
    "january 2023",
    "five",
    "filmmaker",
    "suga",
    "zero",
    "cactus",
    "barely one",
    "oppenheimer",
    "daniel caesar",
    "year subscription plan to codeacademy",
    "guild wars 2",
    "naruto",
    "less than 24 hours"
];

class Person{
    construtor(name, rank, answers, correct){
        this._name = name;
        this.rank = rank;
        this._answers = answers;
        this._correct = correct;
    }

    get name(){
        return this._name;
    }
    get rank(){
        return this._rank;
    }
    get answers(){
        return this._answers;
    }
    get correct(){
        return this._correct;
    }

    set name(name){
        this._name = name;
    }
    set rank(_rank){
        this._rank = rank;
    }
    set answers(answers){
        this._answers = answers;
    }
    set correct(correct){
        this._correct = correct;
    }
}

function changeScenario(i){
    document.getElementById("question").innerText = questions[i];
    choiceOne.innerText = choices[i][0];
    choiceTwo.innerText = choices[i][1];
    choiceThree.innerText = choices[i][2];
    choiceFour.innerText = choices[i][3];
}

function rechangeRank(){
    for (let i = 0; i < leaderboard.length; i++){
        leaderboard[i]._rank = (i + 1);
    }
    return;
}

function rank(numPersons){
    if (leaderboard.length == 0){
        persons[numPersons]._rank = numPersons + 1;
        scores.push(persons[numPersons]._correct);
        leaderboard.push(persons[numPersons]);
    } else {
        var temp = persons[numPersons]._correct;
        for (let r = 0; r < leaderboard.length; r++){
            if (temp > leaderboard[r]._correct){
                persons[numPersons]._rank = r + 1;
                scores.splice(r, 0, persons[numPersons]._correct);
                leaderboard.splice(r, 0, persons[numPersons])
                return;
            } else if (temp == leaderboard[r]._correct){
                //find the last element that has the same score and its index so you can splice it!
                var wantedIndex = scores.findLastIndex((elem) => elem == temp);
                persons[numPersons]._rank = wantedIndex + 1;
                scores.splice(wantedIndex + 1, 0, persons[numPersons]._correct);
                leaderboard.splice(wantedIndex + 1, 0, persons[numPersons]);
                return;    
            }
        }
        //push to end of the thing
        leaderboard.push(persons[numPersons]);
        scores.push(persons[numPersons]._correct);
        persons[numPersons]._rank = leaderboard.length;
        return;
    }
}

let yesNo = [document.getElementById("yes"), document.getElementById("no")];

yesNo.forEach((button) => {
    button.addEventListener("click", ()=>{
        if (document.getElementById("title").classList != "moveTitleUp"){
            document.getElementById("title").classList.toggle("moveTitleUp");

        }
        displayInputContainer();
        scriptContainer.style.display = "flex";
        changeScenario(0);
        yesNo[0].style.display = "none";
        yesNo[1].style.display = "none";
    })
})

inputField.addEventListener("input", ()=>{
    if (inputField.value == ""){
        submit.disabled = true;
    } else {
        submit.disabled = false;
    }
})

//submits the name of the person taking the quiz
submit.addEventListener("click", ()=>{
    numPersons++;
    createPerson();
    createAnswersArray();
    persons[numPersons]._name = inputField.value;
    inputField.value = "";
    removeInputContainer();
    choicesContainer.style.display = "flex";
    numQuestion++;
    changeScenario(numQuestion);
})

function displayYesNo(){
    document.getElementById("yes").style.display = "block";
    document.getElementById("no").style.display = "block";
    submit.disabled = true;
}

function anothuh(){
    displayYesNo();
    numQuestion = 0;
}


function printLeaderboard(){
    document.getElementById("leaderboard").style.display = "flex";
    for (let i = 0; i < leaderboard.length; i++){
        var personDiv = document.createElement('div');
        var rankVal = document.createElement('p');
        var nameVal = document.createElement('p');
        var scoreVal = document.createElement('p');

        personDiv.id = "personRank";
        rankVal.id = "rank";
        nameVal.id = "name";
        scoreVal.id = "score";

        rankVal.innerText = leaderboard[i]._rank;
        nameVal.innerText = leaderboard[i]._name;
        scoreVal.innerText = leaderboard[i]._correct;

        document.getElementById("personRankDiv").appendChild(personDiv);
        personDiv.appendChild(rankVal);
        personDiv.appendChild(nameVal);
        personDiv.appendChild(scoreVal);
    }
}

function createAnswersArray(){
    var answers = [];
    return answers;
}

function createPerson(){
    var person = new Person();
    persons.push(person);
    var arrays = createAnswersArray();
    persons[numPersons]._answers = arrays;
    persons[numPersons]._rank = -1;
    return person;
}

function removeInputContainer(){
    document.getElementById("inputContainer").style.display = "none";
    return;
}

function displayInputContainer(){
    document.getElementById("inputContainer").style.display = "block";
    return;
}

function calculateCorrect(answers){
    let score = 0;
    for (let j = 0; j < answers.length; j++){
        if (answers[j] == correctAnswers[j]){
            score++;
        }
    }
    return score;
}

function eraseLeaderboard(){
    var temp = document.getElementById("personRank");
    while (temp != null){
        document.getElementById("personRankDiv").removeChild(temp);
        temp = document.getElementById("personRank");
    }
    return;
}

function removeContainers(){
    choicesContainer.style.display = "none";
    scriptContainer.style.display = "none";
    console.log("removing containers")
}

choicesBoxes.forEach((choiceBox) => {
    choiceBox.addEventListener("click", () => {
        document.getElementById("leaderboard").style.animationName = "";
        eraseLeaderboard();

        persons[numPersons]._answers.push(choiceBox.querySelector(':last-child').innerText);
        numQuestion++;

        if (numQuestion == questions.length){
            removeContainers();
            persons[numPersons]._correct = calculateCorrect(persons[numPersons]._answers);
            rank(numPersons);
            rechangeRank();
            printLeaderboard();
        } else {
            changeScenario(numQuestion);
        }
    })
})

document.getElementById("close").addEventListener("click", () =>{
    document.getElementById("leaderboard").style.animationName = "disinegrate";
    anothuh();
})

