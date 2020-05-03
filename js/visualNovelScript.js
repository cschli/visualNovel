var paragraph = "textArea";
var allTextLines;
var blockIndex = 0
var textIndex = 0;
var runFlag = true;
var existingLeftActor;
var existingRightActor;
var existingMusic;
var existingBackground;
var loadUserInteraction = false;
var settings = document.getElementById("settingsModal");


$(document).ready(function() {
    if(window.location.search == "?loaded") {
        loadGame();
    }
})

//settings related functions
function goToSetting() {
    settings.style.display = "block";
}

function closeSettings(){
    settings.style.display = "none";
}

window.onclick = function(event){
    if(event.target == settings){
        this.settings.style.display = "none";
    }
}

//script related functions
function addNextText() {
    if (runFlag) {
        runFlag = false;
        if(loadUserInteraction){
            loadPreviousContent();
        } else {
            checkMusic(blockArray[blockIndex].music);
            checkBackground(blockArray[blockIndex].background);
        }
        if (Number(textIndex) + 1 <= blockArray[blockIndex].text.length) {
            runFlag = false;
            var textBlock = "";
            if (blockArray[blockIndex].text[textIndex].charAt(0) == "*") {
                $("#textArea").append(document.createElement("br"));
                $("#textArea").append(document.createElement("br"));
                textIndex++;
            }
            textBlock = blockArray[blockIndex].text[textIndex];
            insertActor(blockArray[blockIndex].name, blockArray[blockIndex].position);
            typeWriter(textBlock, 0);
        } else if (Number(textIndex) + 1 > blockArray[blockIndex].text.length) {
            $("#textArea").html("");
            runFlag = false;
            blockIndex++;
            textIndex = 0;
            var textBlock = "";
            textBlock = blockArray[blockIndex].text[textIndex];
            insertActor(blockArray[blockIndex].name, blockArray[blockIndex].position);
            typeWriter(textBlock, 0);
        }
    }
    
}

function checkMusic(file_name, isLoad = false){
    if (existingMusic != file_name || isLoad) {
        var bgm = document.getElementById("bgm");
        bgm.src = `./music/${file_name}`
        bgm.play();
        existingMusic = file_name;
    }
}

function checkBackground(file_name, isLoad = false) {
    if (existingBackground != file_name || isLoad) {
        var background = document.getElementById("backgroundLayer");
        background.style.backgroundImage = `url(./pictures/backgrounds/${file_name})`;
        background.style.backgroundSize = '800px 600px';
        existingBackground = file_name;
        console.log(`${background.style.backgroundImage}`); 
    }
}

function typeWriter(txt, counter) {
    if (counter < txt.length) {
        document.getElementById(paragraph).innerHTML += txt.charAt(counter);
        counter++;
        setTimeout(function () { typeWriter(txt, counter) }, 20);
    } else if (counter >= txt.length) {
        textIndex++;
        runFlag = true;
    }
}

function saveGame() {
    saveLocalStorage();
    console.log("Game saved in local storage.");
    alert("Game saved to Local Storage.");
}

function saveLocalStorage() {
    localStorage.setItem('blockIndex', blockIndex);
    localStorage.setItem('textIndex', textIndex);
    localStorage.setItem('existingLeftActor', existingLeftActor);
    localStorage.setItem('existingRightActor', existingRightActor);
    localStorage.setItem('existingMusic', existingMusic);
    localStorage.setItem('existingBackground', existingBackground);
}

function redirect() {
    window.location.href = "gamePage.html?loaded";
}

function loadGame() {
    if(runFlag) {
        console.log("Game loaded from local storage.");
        loadUserInteraction ? alert("Click to continue.") : alert("Game loaded from Local Storage.");
        clearExistingContent();
        getFromLocalStorage();
        loadPreviousContent();
    }
}

function clearExistingContent() {
    clearContent("textArea");
    clearContent("actorLeft");
    clearContent("actorRight");
}

function getFromLocalStorage() {
    blockIndex = localStorage.getItem('blockIndex');
    textIndex = localStorage.getItem('textIndex');
    existingLeftActor = localStorage.getItem('existingLeftActor');
    existingRightActor = localStorage.getItem('existingRightActor');
    existingMusic = localStorage.getItem('existingMusic');
    existingBackground = localStorage.getItem('existingBackground');
}

function loadPreviousContent() {
    if(loadUserInteraction) {
        checkMusic(existingMusic, true);
        checkBackground(existingBackground, true);
        insertActor(blockArray[blockIndex].name, blockArray[blockIndex].position);
        var tempTextIndex = 0;
        while (tempTextIndex < textIndex) {
            if(blockArray[blockIndex].text[tempTextIndex] == "*") {
                $("#textArea").append(document.createElement("br"));
                $("#textArea").append(document.createElement("br"));
            } else {
                document.getElementById(paragraph).innerHTML += (blockArray[blockIndex].text[tempTextIndex]);
            }
            tempTextIndex++;
        }
        loadUserInteraction = false;
    } else {
        loadUserInteraction = true;
    }
}

function insertActor(actorName, actorPosition) {
    var src;
    var actorPosition;
    if (actorName == "c" && actorPosition == "l") {
        src = "pictures/characters/cee_left.png";
    } else if (actorName == "c" && actorPosition == "r") {
        src = "pictures/characters/cee_right.png";
    } else if (actorName == "j" && actorPosition == "l") {
        src = "pictures/characters/jean_left.png";
    } else if (actorName == "j" && actorPosition == "r") {
        src = "pictures/characters/jean_right.png";
    } else if (actorName == "m" && actorPosition == "l") {
        src = "pictures/characters/michelle_left.png";
    } else if (actorName == "m" && actorPosition == "r") {
        src = "pictures/characters/michelle_right.png";
    } else if (actorName == "r" && actorPosition == "l") {
        src = "pictures/characters/rin_left.png";
    } else if (actorName == "r" && actorPosition == "r") {
        src = "pictures/characters/rin_right.png";
    } else if (actorName == "t" && actorPosition == "l") {
        src = "pictures/characters/teddy_left.png";
    } else if (actorName == "t" && actorPosition == "r") {
        src = "pictures/characters/teddy_right.png";
    }

    if(actorPosition == "n") {
        $("#actorRight").html("");
        existingLeftActor = "";
        existingRightActor = "";
        return;
    }
    
    var actor = document.createElement("img");
    actor.src = src;
    actor.width = "200";
    if (actorPosition == "l") {
        $("#actorLeft").html("");
        $("#actorLeft").append(actor);
        existingLeftActor = actorName;
    }
    else if (actorPosition == "r") {
        $("#actorRight").html("");
        $("#actorRight").append(actor);
        existingRightActor = actorName;
    }
}

function clearContent(elementId) {
    var div = document.getElementById(elementId);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}


//all script below
var textArrayIntro =
{
    name: "n",
    position: "n",
    text:
        [
            "The world has ended.",
            " When we woke up, everyone was gone...except for the five of us.",
            " What could we do then?",
            " What else could we have done, except to continue living?",
            " We just kept breathing, kept moving, one foot in front of the other...",
            " Untold number of years had passed since whatever had happened.",
            " Mother nature had long taken over the ruins of the sprawling metropolis...",
            "those places that we once called home."
        ],
    newPage: true,
    music: "bgm1.mp3",
    background: "blue_sky_background.jpg"
};

var secondBlockTest =
{
    name: "n",
    position: "n",
    text:
        [
            " There were only traces of people having been there, but no corpses.",
            " It was as if they all disappeared.",
            " We didn't know what happened to everyone else, but we could at least determine what happens to us.",
            "*",
            " The five of us began to learn what it means to live in a world devoid of others.",
            " We tried to figure out how to survive.",
            " We started trying to build a life together.",
            " This is the story of the survivors of Event Ex.",
            " This is our story."
        ],
    newPage: true,
    music: "bgm1.mp3",
    background: "blue_sky_background.jpg"
}

var chapter1_scene1 =
{
    name: "r",
    position: "l",
    text:
        [
            "\"It's so quiet out here,",
            " hard to imagine that we're the only people remaining.\""
        ],
    newPage: true,
    music: "bgm1.mp3",
    background: "blue_sky_background.jpg"
}


var blockArray =
    [textArrayIntro,
        secondBlockTest, chapter1_scene1
    ];