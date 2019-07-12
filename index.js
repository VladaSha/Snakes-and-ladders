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
    constructor(board, players) {
        this.players = players;
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
