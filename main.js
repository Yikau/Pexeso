var arr;
var emoji = ["😂", "🥰", "🤔", "🙂", "😍", "😎", ]
var allem = emoji.concat(emoji)
var arr = allem;


var cardsContainer = document.getElementById('cards-container');
var values  = [];
var cover_id = [];
var count   = 0;

var modal    = document.getElementById('myModal');
var close    = document.getElementById('closeModal');
var gameWin  = document.getElementById('gameWin');
var gameLose = document.getElementById('gameLose');

var yesPlay = document.getElementById('yesPlay');
var noPlay  = document.getElementById('noPlay');

var gameCounter = document.getElementById('gameCounter');
var counter = 16;
var timer;

function countDown(){
    counter--;
    if (counter < 10){
        gameCounter.innerHTML = "0"+counter;
    }else{
        gameCounter.innerHTML = counter;
    }
    if (counter == 0){
        counter = 16;
        modal.style.visibility = 'visible';
        gameLose.style.display = 'block';
        clearInterval(timer);
    }
    window.onclick = function (e){
        if (e.target === modal || e.target === close){
            modal.style.visibility = 'hidden';
        }
        if (e.target === yesPlay){
            modal.style.visibility = 'hidden';
            document.getElementById('cards-container').innerHTML = "";
            newGame();
            counter = 16;
            timer = setInterval(function(){countDown()}, 1000);
        }
        else if (e.target === noPlay){
            modal.style.visibility = 'hidden';
            document.getElementById('cards-container').innerHTML = "";
        }
    }
}

timer = setInterval(function(){countDown()}, 1000);

Array.prototype.shuffle = function(){
    for (var i = (arr.length - 1) ; i >= 0 ; i--){
        var randomInput = Math.floor(Math.random() * i + 1);
        var indexNum    = arr[randomInput];
        arr[randomInput]= arr[i] ;
        arr[i] = indexNum ;
    }
    return arr;
}

function newGame(){
    count = 0;
    var output = '';
    arr.shuffle();
    for(var i = 0 ; i < arr.length ; i++){
        output = output + '<div class="card" id="cover_'+i+'" onclick="memoryFlipcover(this, \''+arr[i]+'\')"></div>' ;
    }
    cardsContainer.innerHTML = output;
}
window.addEventListener('load' , newGame);

function memoryFlipcover(cover, val){
    if(cover.innerHTML === "" && values.length < 2){
        cover.style.background = '#fff';
        cover.innerHTML = val ;
        if (values.length === 0){
            values.push(val);
            cover_id.push(cover.id);
        } else if (values.length === 1){
            values.push(val);
            cover_id.push(cover.id);
            if (values[0] === values[1]){
                var c1 = document.getElementById(cover_id[0]);
                var c2 = document.getElementById(cover_id[1]);
                setTimeout(function(){
                    c1.style.visibility = 'hidden';
                    c2.style.visibility = 'hidden';
                } , 500);
                count += 2;
                values  = [];
                cover_id = [];
                if ( count === arr.length){
                    clearInterval(timer);
                    setTimeout(function(){
                        modal.style.visibility = 'visible';
                        gameWin.style.display = 'block';
                        window.onclick = function (e){
                            if (e.target === modal || e.target === close){
                                modal.style.visibility = 'hidden';
                            }
                            if (e.target === yesPlay){
                                modal.style.visibility = 'hidden';
                                document.getElementById('cards-container').innerHTML = "";
                                newGame();
                                counter = 16;
                                timer = setInterval(function(){countDown()}, 1000);
                            }
                            else if (e.target === noPlay){
                                modal.style.visibility = 'hidden';
                                document.getElementById('cards-container').innerHTML = "";
                            }
                        }
                    }, 500);
                }

            } else {
                function flipToBack(){
                    var CardOne = document.getElementById(cover_id[0]);
                    var CardTwo = document.getElementById(cover_id[1]);
                    CardOne.setAttribute("style", "background-color: rgba(255, 255, 255, 0.8);");
                    CardOne.innerHTML = '';
                    CardTwo.setAttribute("style", "background-color: rgba(255, 255, 255, 0.8);");
                    CardTwo.innerHTML = '';
                    values  = [];
                    cover_id = [];
                }
                setTimeout(flipToBack , 500);

            }
        }
    }
}