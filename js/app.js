
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.y = this.getRandomRow();
    this.x = -50;
    this.speed = Math.random() * (15- 5)+1;
};

Enemy.prototype.getRandomRow = function(){
    var id = Math.round(Math.random() * (3 - 1)+1);
    switch(id) {
        case 1:
          return  55;
        case 2:
          return  140;
        case 3:
         return  225;
    }
};

Enemy.prototype.update = function(dt) {
    this.checkCollision();
    if(this.x < 525) {
        this.x = this.x + this.speed;
    }else{
        //resets the enemy position and speed
        this.x = -50;
        this.y = this.getRandomRow();
        this.speed = Math.random() * (15- 5)+1;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function(){
        //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        var rect1 = {x: this.x, y: this.y, width: 50, height: 50};
        var rect2 = {x: player.x, y: player.y, width: 50, height: 50};

        if (rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.height + rect1.y > rect2.y) {
            // collision detected!
                player.x = 200;
                player.y = 400;
        }
};

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.speed = 5;
    this.height = 60;
    this.width = 30;
    this.x = 200;
    this.y = 400; 
};

Player.prototype.update = function(dt){
    this.speed = this.speed * dt;
    if(this.y < 60){
            this.x = 200;
            this.y = 400;
    }
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys){
  var ystep = 85;
  var xslide = 100;  
  switch (allowedKeys) {
    case 'left': // Left
        if(player.x > 0){
            player.x = player.x - xslide;  
        }
    break;
    case 'up': // Up
        if(player.y > 50){
            player.y = player.y - ystep; 
        }
    break;
    case 'right': // Right
        if(player.x < 400){
           player.x = player.x + xslide; 
       }
    break;
    case 'down': // Down
        if(player.y < 400){
            player.y = player.y + ystep; 
        }
    break;
  }
};



// Now instantiate your objects.d
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});