var board = [
  ['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-']
];
var status;
var audio1 = document.getElementById("myAudio");

function start() {
  $('h1').html('<strong onclick="startGame(' + "'X'" + ')" >X</strong> or <strong onclick="startGame(' + "'O'" + ')" >O</strong>');
}

function startGame(str) {
  status = str;
  $('.winner').fadeOut(500);
  if (status === 'O') {
    $('#0-0').html('X');
    board[0][0] = 'X';
  }
}

$(document).ready(function() {
  $('.winner').show();
  start();
});

$("td").click(function() {
  if ($('#' + this.id).text() === '' &&
    status !== 'there is a winner!') {
    $('#' + this.id).html(status);
    board[this.id.charAt(0)][this.id.charAt(2)] = status;
    var spots = findFreeSpots();
    var c = checkWin(board);
    if (c === '-' && spots.length === 0)
      showWinner('no one');
    if (spots.length > 0) {
      computerTurn(spots);
      spots = findFreeSpots();
      c = checkWin(board);
      if (c !== '-')
        showWinner(c);
      if (c === '-' && spots.length === 0)
        showWinner('no one');
    }

  }
});

function computerTurn(spots) {
  var length = findFreeSpots().length;
  var newBoard, id;
  if (status === 'X') {
    newBoard = computerAI(board, length, 'O')[0];
    id = findID(newBoard);
    $('#' + id).html('O');
    board[id.charAt(0)][id.charAt(2)] = 'O';
  } else {
    newBoard = computerAI(board, length, 'X')[0];
     id = findID(newBoard);
    $('#' + id).html('X');
    board[id.charAt(0)][id.charAt(2)] = 'X';
  }
}

function showWinner(c) {
  status = 'there is a winner!';
  audio1.play();
  $('h1').html(c + ' wins !');
  $('.winner').fadeIn(1000, 'swing');
  setTimeout(function() {
    board = [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ];
    $('td').text('');
    start();
  }, 3000);
}

function computerAI(fatherBoard, num, turn) {
  var c = checkWin(fatherBoard);
  if ((c === 'X' && status === 'X') || (c === 'O' && status === 'O'))
    return [fatherBoard, -100];
  if ((c === 'O' && status === 'X') || (c === 'X' && status === 'O'))
    return [fatherBoard, 100];
  if (num > 0) {
    var boards = [];
    fatherBoard.forEach(function(y, j) {
      y.forEach(function(x, i) {
        var newBoard = [];
        if (x === '-') {
          if (turn === status) {
            //console.log(j+'.'+i+ ': ');
            fatherBoard.forEach(function(x) {
              var arr = [];
              x.forEach(function(y) {
                arr.push(y);
              });
              newBoard.push(arr);
            });
            newBoard[j][i] = status;
            boards.push(newBoard);
            //showBoard(newBoard);
          } else {
            //console.log(j+'.'+i+ ': ');
            fatherBoard.forEach(function(x) {
              var arr = [];
              x.forEach(function(y) {
                arr.push(y);
              });
              newBoard.push(arr);
            });
            if (status === 'X')
              newBoard[j][i] = 'O';
            else
              newBoard[j][i] = 'X';
            boards.push(newBoard);
            //showBoard(newBoard);
          }
        }
      });

    });

    points = boards.map(function(x) {
      var y;
      if (turn === 'X')
        y = computerAI(x, (num - 1), 'O');
      else
        y = computerAI(x, (num - 1), 'X');
      return y[1];
    });

    if ((turn === 'X' && status === 'X') || (turn === 'O' && status === 'O')) {
      var min = points[0];
      for (var i = 0; i < points.length; i++)
        min = Math.min(min, points[i]);
      var j = points.indexOf(min);
      return [boards[j], min];
    } 
    else {
      var max = points[0];
      for (var k = 0; k < points.length; k++)
        max = Math.max(max, points[k]);
      var l = points.indexOf(max);
      return [boards[l], max];
    }
  }
  return [fatherBoard, 0];
}

function checkWin(Theboard) {
  var rowS = row(Theboard);
  if (rowS !== '-')
    return rowS;
  var columnS = column(Theboard);
  if (columnS !== '-')
    return columnS;
  return slant(Theboard);
}

function row(theBoard) {
  if (theBoard[0][0] === theBoard[0][1] &&
    theBoard[0][2] === theBoard[0][1] &&
    theBoard[0][0] !== '-')
    return theBoard[0][0];
  if (theBoard[1][0] === theBoard[1][1] &&
    theBoard[1][2] === theBoard[1][1] &&
    theBoard[1][0] !== '-')
    return theBoard[1][0];
  if (theBoard[2][0] === theBoard[2][1] &&
    theBoard[2][2] === theBoard[2][1] &&
    theBoard[2][0] !== '-')
    return theBoard[2][0];
  return '-';
}

function column(theBoard) {
  //console.log(theBoard);
  if (theBoard[0][0] === theBoard[1][0] &&
    theBoard[2][0] === theBoard[1][0] &&
    theBoard[0][0] !== '-')
    return theBoard[0][0];
  if (theBoard[0][1] === theBoard[1][1] &&
    theBoard[2][1] === theBoard[1][1] &&
    theBoard[0][1] !== '-')
    return theBoard[0][1];
  if (theBoard[0][2] === theBoard[1][2] &&
    theBoard[2][2] === theBoard[1][2] &&
    theBoard[0][2] !== '-')
    return theBoard[0][2];
  return '-';
}

function slant(theBoard) {
  if (theBoard[0][0] === theBoard[1][1] &&
    theBoard[2][2] === theBoard[1][1] &&
    theBoard[0][0] !== '-')
    return theBoard[0][0];

  if (theBoard[0][2] === theBoard[1][1] &&
    theBoard[2][0] === theBoard[1][1] &&
    theBoard[0][2] !== '-')
    return theBoard[0][2];

  return '-';
}

function findFreeSpots() {
  var freeSpots = [];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] === '-')
        freeSpots.push(i.toString() + '-' + j.toString());
    }
  }
  return freeSpots;
}

function findID(newBoard) {
  var arr = findFreeSpots();
  //console.log('-------');
  for (var i = 0; i < arr.length; i++) {
    if ((newBoard[arr[i].charAt(0)][arr[i].charAt(2)] === 'O' && status === 'X') ||
      (newBoard[arr[i].charAt(0)][arr[i].charAt(2)] === 'X' && status === 'O'))
      return arr[i];
  }
}