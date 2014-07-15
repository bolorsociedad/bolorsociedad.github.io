function placeRandomTile() {
  if (won == 0) {
  free = [];
  for (i=0; i<4; i++) {
    for (j=0; j<4; j++) {
      if (grid[i][j] == 0) {
        free.push([i, j]);
      }
    }
  }
  coordenadas = free[Math.floor(Math.random()*free.length)];
  grid[coordenadas[0]][coordenadas[1]] = 2;
  $(".board").html($(".board").html() + '<div id="tile' + iii + '" class="valueTile tile-2" style="left: ' + (106.25 + 15)*coordenadas[0] + 'px; top: ' + (106.25 + 15)*coordenadas[1] + 'px;">2</div>');
  }
}

function loose() {
  free = [];
  for (i=0; i<4; i++) {
    for (j=0; j<4; j++) {
      if (grid[i][j] == 0) {
        free.push([i, j]);
      }
    }
  }

  return free.length == 0;
}

function createBoard() {

  for (i=0; i < 4; i++) {
    for (j=0; j < 4; j++) {
        $(".board").html($(".board").html() + '<div class="tile" style="left: ' + (106.25 + 15)*i + 'px; top: ' + (106.25 + 15)*j + 'px;">&nbsp;</div>');
    }
  }
}


function paintBoard() {
$(".valueTile").remove();
  for (i=0; i < 4; i++) {
    for (j=0; j < 4; j++) {
        if (grid[i][j] != 0) {
          $(".board").html($(".board").html() + '<div id="tile' + iii + '" class="valueTile tile-' + grid[i][j] + '" style="left: ' + (106.25 + 15)*i + 'px; top: ' + (106.25 + 15)*j + 'px;">' + grid[i][j] + '</div>');
        }
    }
  }
}

function removePaint() {
if (loose()) {
  won = 1;
  $("#lose").fadeIn();
  $(".valueTile").hide();
  $(".tile").hide();
}
else if (maxValue>=2048) {
  won = 1;
  $("#win").fadeIn();
  $(".valueTile").hide();
  $(".tile").hide();
} else {

  paintBoard();
}
}

function moveLeft() {
  
  mainLoop:
  for (i=1; i<4; i++) {
    for (j=0; j<4; j++) {
      if (grid[i][j] != 0) {

          if (grid[i][j] == grid[i-1][j]) {
          grid[i-1][j] = grid[i-1][j] + grid[i][j]; // REAL VALUE
          maxValue = Math.max(maxValue, grid[i-1][j]);
          grid[i][j] = 0;
        moveLeft();
        break mainLoop;
        }
          if (grid[i-1][j]==0) {
          grid[i-1][j] = grid[i-1][j] + grid[i][j]; // REAL VALUE
          maxValue = Math.max(maxValue, grid[i-1][j]);
          grid[i][j] = 0;
          moved = 1;

        moveLeft();
        break mainLoop;
        }


          


      }
    }
  }
if (won == 0) {
removePaint();
}
}


function moveUp() {

  mainLoop:
  for (i=0; i<4; i++) {
    for (j=1; j<4; j++) {
      if (grid[i][j] != 0) {
        if (grid[i][j] == grid[i][j-1] || grid[i][j-1]==0) {
          grid[i][j-1] = grid[i][j-1] + grid[i][j]; // REAL VALUE
          maxValue = Math.max(maxValue, grid[i][j-1]);
          grid[i][j] = 0;
          moved = 1;

        moveUp();
        break mainLoop;
        }

      }
    }
  }
if (won == 0) {
removePaint();
}
}
function moveDown() {

  mainLoop:
  for (i=0; i<4; i++) {
    for (j=2; j>=0; j--) {
      if (grid[i][j] != 0) {
        if (grid[i][j] == grid[i][j+1] || grid[i][j+1]==0) {
          grid[i][j+1] = grid[i][j+1] + grid[i][j]; // REAL VALUE
          maxValue = Math.max(maxValue, grid[i][j+1]);
          grid[i][j] = 0;
          moved = 1;

        moveDown();
        break mainLoop;
        }

      }
    }
  }
if (won == 0) {
removePaint();
}
}

function moveRight() {

  mainLoop:
  for (i=2; i>=0; i--) {
    for (j=0; j<4; j++) {
      if (grid[i][j] != 0) {
        if (grid[i][j] == grid[i+1][j] || grid[i+1][j]==0) {
          grid[i+1][j] = grid[i+1][j] + grid[i][j]; // REAL VALUE
          maxValue = Math.max(maxValue, grid[i+1][j]);
          grid[i][j] = 0;
          moved = 1;
        moveRight();
        break mainLoop;
        }

      }
    }
  }
  if (won == 0) {
removePaint();
}
}



$(document).keydown(function( event ) {

  // UP: 38
  // LEFT: 37
  // DOWN: 40
  // RIGHT: 39
  if (won == 0) {
  if (event.which == 37) {
    moveLeft();
    if (moved == 1) {
        placeRandomTile();
        moved = 0;
  }
  }
  if (event.which == 38) {
    moveUp();
    if (moved == 1) {
        placeRandomTile();
        moved = 0;
  }
  }
  if (event.which == 40) {
    moveDown();
    if (moved == 1) {
        placeRandomTile();
        moved = 0;
  }
  }
  if (event.which == 39) {
    moveRight();
    if (moved == 1) {
        placeRandomTile();
        moved = 0;
  }
}
  }


  
});
iii=0;
maxValue = 2;
won = 0;
moved = 0;
grid = [[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]];
createBoard();
placeRandomTile();
placeRandomTile();
