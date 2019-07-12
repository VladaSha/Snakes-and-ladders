let board = new Board([new GameElement("ladder1","ladder",10,16), new GameElement("ladder2","ladder",27,33),
new GameElement("ladder3","ladder",18,24), new GameElement("snake1","snake",35,22), 
new GameElement("snake2","snake",15,2), new GameElement("snake3","snake",26,13),],36);
var player1 = new Player("Rabbit",board)
var player2 = new Player("Moose",board)

let game = new Game(board, [player1,player2])

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