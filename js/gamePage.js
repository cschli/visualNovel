var paragraph = "textArea";
var allTextLines;
var blockIndex = 0
var textIndex = 0;
var runFlag = true;
var existingLeftActor;
var existingRightActor;

function addNextText() {
    if (Number(textIndex) + 1 <= blockArray[blockIndex].text.length && runFlag) {
        runFlag = false;
        var textBlock = "";
        textBlock = blockArray[blockIndex].text[textIndex];
        insertActor(blockArray[blockIndex].name, blockArray[blockIndex].position);
        typeWriter(textBlock, 0);
    } else if (Number(textIndex) + 1 > blockArray[blockIndex].text.length && runFlag) {
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

function typeWriter(txt, counter) {
    if (txt.charAt(counter) == "*") {
        $("#textArea").append(document.createElement("br"));
        $("#textArea").append(document.createElement("br"));
        counter++;;
        setTimeout(function () { typeWriter(txt, counter) }, 20);
    }
    else if (counter < txt.length) {
        document.getElementById(paragraph).innerHTML += txt.charAt(counter);
        counter++;
        setTimeout(function () { typeWriter(txt, counter) }, 20);
    } else if (counter >= txt.length) {
        textIndex++;
        runFlag = true;
    }
}

function saveGame() {
    localStorage.setItem('blockIndex', blockIndex);
    localStorage.setItem('textIndex', textIndex);
    localStorage.setItem('existingLeftActor', existingLeftActor);
    localStorage.setItem('existingRightActor', existingRightActor);
    console.log("Game saved in local storage.");
}

function loadGame() {
    clearContent("textArea");
    clearContent("actorLeft");
    clearContent("actorRight");
    blockIndex = localStorage.getItem('blockIndex', blockIndex);
    textIndex = localStorage.getItem('textIndex', textIndex);
    existingLeftActor = localStorage.getItem('existingLeftActor', existingLeftActor);
    existingRightActor = localStorage.getItem('existingRightActor', existingRightActor);
    loadPreviousContent();
    console.log("Game loaded from local storage.");
}

function loadPreviousContent() {
    insertActor(blockArray[blockIndex].name, blockArray[blockIndex].position);
    var tempTextIndex = 0;
    while (tempTextIndex < textIndex) {
        document.getElementById(paragraph).innerHTML += (blockArray[blockIndex].text[tempTextIndex]);
        tempTextIndex++;
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
    console.log("actorName: " + actorName + ", actorPosition: " + actorPosition);

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
    else {
        $("#actorRight").html("");
        existingLeftActor = "";
        existingRightActor = "";
    }
}

function clearContent(elementId) {
    var div = document.getElementById(elementId);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

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
    newPage: true
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
            "*The five of us began to learn what it means to live in a world devoid of others.",
            " We tried to figure out how to survive.",
            " We started trying to build a life together.",
            " This is the story of the survivors of Event Ex.",
            " This is our story."
        ],
    newPage: true
}

var chapter1_scene1 =
{
    name: "r",
    position: "l",
    text:
        [
            "\"It's so quiet out here,",
            "*Hard to imagine that we're the only people remaining.\""
        ],
    newPage: true
}


var blockArray =
    [textArrayIntro,
        secondBlockTest, chapter1_scene1
    ];