let board = new Board([new GameElement("ladder1","ladder",10,16), new GameElement("ladder2","ladder",27,33),
    new GameElement("snake1","snake",35,22), new GameElement("snake1","snake",15,2)],36);
var player1 = new Player("p1",board)
var player2 = new Player("p2",board)

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
    elem.setAttribute("class", "krosh");
    elem.setAttribute("height", "75");
    elem.setAttribute("width", "65");
    elem.setAttribute("alt", "Krosh");
    document.getElementById("1").appendChild(elem);

    var elem2 = document.createElement("img")
    elem2.setAttribute("id",player2.id)
    elem2.src = "Losyash.png"
    elem2.setAttribute("class", "losyash");
    elem2.setAttribute("height", "55");
    elem2.setAttribute("width", "55");
    elem2.setAttribute("alt", "Losyash");
    document.getElementById("1").appendChild(elem2);

    createElements(board,document)
    document.getElementById("start-button").onclick = function() {
       let numOfMoves = game.randDice()
       document.getElementById("current-moves").innerHTML = numOfMoves
       // show number of moves in UI

       game.takeTurn(numOfMoves, function(player){
        let playerNode = document.getElementById(player.id)
        let dest_div = document.getElementById(player.position)
        dest_div.appendChild(playerNode)
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