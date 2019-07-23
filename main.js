let board = new Board([
    new GameElement("ladder1","ladder",10,16), 
    new GameElement("ladder2","ladder",27,33),
    new GameElement("ladder3","ladder",18,24), 
    new GameElement("snake1","snake",35,22), 
    new GameElement("snake2","snake",15,2), 
    new GameElement("snake3","snake",26,13),
],36);


var player1 = new Player("Rabbit",board)
var player2 = new Player("Moose",board)

let game = new Game(board, [player1,player2])

