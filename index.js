class Board {
    constructor(gameElements,length){
        this.gameElements = gameElements // [GameElement]
        this.length = length
    }
}

class Player {
    constructor(id,board) {
        this.position = 1
        this.id = id
        this.board = board;
        this.score = 0;
    }

}

class GameElement {
    constructor(id, elementType, startPosition, endPosition) {
        this.id = id
        this.startPosition = startPosition
        this.endPosition = endPosition
        this.elementType = elementType
    }
}

Player.prototype.moveOnBoard = function (numOfMoves,callback){

    var newPos = this.position + numOfMoves
    var lastTile = this.board.length
    
    if(newPos<=this.board.length){
        debugger
        var that = this
        var id = setInterval(function(){
            if (newPos === that.position){
                clearInterval(id)
                let gameElement = board.gameElements.filter(function(element){
                    return element.startPosition === newPos
                })[0]
                if (gameElement) {
                    that.position = gameElement.endPosition
                    callback(that)
                }
                if(newPos === lastTile){
                    that.position = 1
                    that.score++
                    callback(that)
                }
            } else if (that.position < newPos) {
                that.position++
                callback(that)
            }
        }, 500); 
    } 
}

class Game {
    constructor(board,players) {
        this.players = players;
        this.board = board;
        this.renderGame();
    }

    takeTurn(numOfMoves,callback) {
        this.players[this.currentTurn].moveOnBoard(numOfMoves,callback); 
        if(this.currentTurn + 1 === this.players.length) this.currentTurn = 0
        else this.currentTurn++
    }

    randDice(){
        return Math.ceil(Math.random()*6)
    }

    currentTurn = 0;


}

Game.prototype.getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

Game.prototype.renderGame = function() {
    var game = this;
    var board = this.board;

    document.addEventListener("DOMContentLoaded", function(event) { 
        var html = ''
        for (let i=1; i <= board.length; i++){
            html += `<div class="tile" id="${i}" style="background-color: ${game.getRandomColor()}">${i}</div>`
        }
    
        document.querySelector('#board').innerHTML = html;
    
        var elem = document.createElement("img");
        elem.setAttribute("id",player1.id) 
        elem.src = "krosh.png";
        elem.setAttribute("height", "75");
        elem.setAttribute("width", "65");
        elem.setAttribute("alt", "Rabbit");
        document.getElementById("1").appendChild(elem);
    
        var elem2 = document.createElement("img")
        elem2.setAttribute("id",player2.id)
        elem2.src = "Losyash.png"
        elem2.setAttribute("height", "55");
        elem2.setAttribute("width", "55");
        elem2.setAttribute("alt", "Moose");
        document.getElementById("1").appendChild(elem2);
    
        var finish = document.createElement("img")
        finish.setAttribute("id","finish")
        finish.src = "finish.png"
        finish.setAttribute("height", "85");
        finish.setAttribute("width", "85");
        document.getElementById("36").appendChild(finish);
    
        createElements(board,document)
    
        document.getElementById("score-left").innerHTML = `${player1.id} score: ${player1.score}`
        document.getElementById("score-right").innerHTML = `${player2.id} score: ${player2.score}`
    
        document.getElementById("dice").onclick = function() {
           let numOfMoves = game.randDice()
    
            game.takeTurn(numOfMoves, function(player){
            document.getElementById("current-moves").innerHTML = `${player.id} move ${numOfMoves} tiles`
    
            let playerNode = document.getElementById(player.id)
            let dest_div = document.getElementById(player.position)
            dest_div.appendChild(playerNode)
            document.getElementById("score-left").innerHTML = `${player1.id} score: ${player1.score}`
            document.getElementById("score-right").innerHTML = `${player2.id} score: ${player2.score}`
           })
        }
    
        
    });
    
    function createElements(board,document){
        board.gameElements.forEach(element => {
            var image = document.createElement("img")
            image.setAttribute("id",element.id)
            if (element.elementType === "ladder"){
                image.setAttribute("class","ladders") 
                image.src = "ladder-1.png";
                image.setAttribute("height", "100");
                image.setAttribute("width", "50");
                document.getElementById(element.endPosition).appendChild(image);
            } else {
                image.setAttribute("class","snakes") 
                image.src = "snake-5.png";
                image.setAttribute("height", "140");
                image.setAttribute("width", "100");
                document.getElementById(element.startPosition).appendChild(image);
            }
        });
    }
}