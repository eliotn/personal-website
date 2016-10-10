//uses Howl for sounds: https://github.com/goldfire/howler.js/

var failtext = ["much wrong", "such error", "so fail", "many fails", "so bad", "sadness", "youtube", "bad doge", "such sound"];
var wintext = ["wow", "much skill", "such pro", "so win", "doge amaze", "mlg", "top doge", "good doge", "ez", "so good", "amaze"];
var buttonids = ["#dogered", "#dogeblue", "#dogegreen", "#dogeyellow"];
var textids = ["#text1", "#text2", "#text3", "#text4"];
var randomcolors = ["blue", "chartreuse", "brown", "darkgolenrod", "yellow", "purple", "green", "red", "darkorchid", "hotpink", "mediumvioletred"];

var soundsfrombutton = [0, 0, 0, 0]
var audio = {}
//thanks http://stackoverflow.com/questions/10240110/how-do-you-cache-an-image-in-javascript for a preloading image solution

audio[0] = new Howl({
                    src: "http://s3.amazonaws.com/freecodecamp/simonSound1.mp3", onend: function() {soundsfrombutton[0] -= 1;  if (soundsfrombutton[0] === 0) $(buttonids[0]).removeClass("active");}
                    
                    });
audio[1] = new Howl({src:"http://s3.amazonaws.com/freecodecamp/simonSound2.mp3", onend: function() {soundsfrombutton[1] -= 1;  if (soundsfrombutton[1] === 0) $(buttonids[1]).removeClass("active");}});
audio[2] = new Howl({src:"http://s3.amazonaws.com/freecodecamp/simonSound3.mp3", onend: function() {soundsfrombutton[2] -= 1;  if (soundsfrombutton[2] === 0) $(buttonids[2]).removeClass("active");}});
audio[3] = new Howl({src:"http://s3.amazonaws.com/freecodecamp/simonSound4.mp3", onend: function() {soundsfrombutton[3] -= 1;  if (soundsfrombutton[3] === 0) $(buttonids[3]).removeClass("active");}});
var simonsturn = true;
var isstrictmode = true;
var notenum = 0;
var winon = 20;
var textnum = 0;
var notes = [];
var gamerunning = false;
var nextnotetimeout;

function playSequenceIn(milliseconds) {
    clearTimeout(nextnotetimeout);
    nextnotetimeout = setTimeout(playsequence,milliseconds);
}
function simonClick(i, isbutton) {
    if (!gamerunning) {
        return;
    }
    if (isbutton) {
        if (simonsturn) {
            return;
        }
        if (i === notes[notenum]) {
            //correct
            notenum++;
            if (notenum >= notes.length) {
                simonsturn = true;
                notenum = 0;
                if (notes.length >= winon) {
                    //epic win!!!
                    for (var i = 0; i < 5; i++) {
                        randomText("#text" + i, "WIN");
                    }
                    $("#startSwitch").click();
                } notes.push(Math.floor(Math.random()*4));
                randomText("#textcount", notes.length);
                randomText("#text" + textnum, wintext[Math.floor(Math.random()*failtext.length)]);
                textnum = (textnum + 1)%5;
                playSequenceIn(1500);
            }
        }
        else {
            //incorrect
            for (var i = 0; i < 5; i++) {
                randomText("#text" + i, failtext[Math.floor(Math.random()*failtext.length)]);
            }
            notenum = 0;
            for (var f = 0; f <= 3; f++) {
                simonClick(f, false);
            }
            if (isstrictmode) {
                $("#startSwitch").click();
                return;
            }
            simonsturn = true;
            if (gamerunning) {
                playSequenceIn(3000);
            }
        }
    }
    var buttonname = buttonids[i];
    $(buttonname).addClass('active');
    soundsfrombutton[i] += 1;
    audio[i].play();
    
}

function playsequence() {
    if (notenum >= notes.length) {
        simonsturn = false;
        notenum = 0;
        
        return;
    }
    nextnote = notes[notenum];
    
    simonClick(nextnote, false);
    notenum += 1;
    playSequenceIn(700);
}
function toggleGame() {
    if (!gamerunning) {
        gamerunning = true;
        notes = [Math.floor(Math.random()*buttonids.length)];
        notenum = 0;
        simonsturn = true;
        $("#strictSwitchPositioning").addClass("disabled");
        playSequenceIn(700);
    }
    else {
        gamerunning = false;
        notes = [];
        notenum = 0;
        simonsturn=false;
        $("#strictSwitchPositioning").removeClass("disabled");
        clearTimeout(nextnotetimeout);
    }
    randomText("#textcount", notes.length);
}
function toggleStrict() {
    isstrictmode = !isstrictmode;
}
function randomText(element, thetext) {
    $(element).text(thetext);
    $(element).css("left", Math.floor(Math.random()*200));
    $(element).css("top", Math.floor(Math.random()*450));
    $(element).css("color", randomcolors[Math.floor(Math.random()*randomcolors.length)]);
}
console.log("HI!")
//ready to go :)
$("#page").removeClass("invis");

randomText("#textcount", notes.length);
randomText("#text1", "wow");
randomText("#text2", "much clicking");
randomText("#text3", "such css");
randomText("#text4", "so ez");
