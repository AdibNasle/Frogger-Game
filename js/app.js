// define initial player position and score

var PlayerX = 200;
var PlayerY = 400;
var PlayerScore = 0;

// Enemies our player must avoid
var Enemy = function(startingX, startingY) {
    // Variables applied to each of our instances go here,
    this.x = startingX;
    this.y = startingY;
    this.speed = this.randomSpeed();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// generate a random speed for the enemies
Enemy.prototype.randomSpeed = function(){
    var speed = Math.floor((Math.random()*400 + 100)); 
    return speed;
};

// generate a radom position for the y loction enemies re-spawn
Enemy.prototype.randomY = function(){
    var yLocation = Math.floor((Math.random()*170 + 64));
    return yLocation;
};

// function that re-spawns enemies
Enemy.prototype.reset = function () {
    this.x = -100;
    this.y = this.randomY();   
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > 480){
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player function that sets up a new player
var Player = function (startingX, startingY){
    this.x = startingX;
    this.y = startingY;
    this.sprite = 'images/char-boy.png';
};

// function that re-spawns a player
Player.prototype.reset = function() {
    this.x = PlayerX;
    this.y = PlayerY;
};

// player update function that also checks to see
// if player collided with an enemy
Player.prototype.update = function () {
    this.checkCollisions();
}

// draws player on screen
Player.prototype.render= function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.font = "11pt Calibri";
    ctx.strokeStyle = "black";
    ctx.strokeText(("Score: "+PlayerScore), 450,600);  
};

// uses a hit box approach to see if an enemy 
// collided with player.  May need to tweek the width
// and height values.  If collision is detected, score is 
// decreased by one.
Player.prototype.checkCollisions = function() {

    for (var i=0; i<allEnemies.length; i++)
    {
        if (this.x < allEnemies[i].x + 40 && 
            this.x + 40 > allEnemies[i].x && 
            this.y < allEnemies[i].y + 50 && 
            this.y + 50> allEnemies[i].y)
        {
            PlayerScore --;
            this.reset();
        }
    }
        
};

// function to move player on board.
// if player reaches the top score is increased by 1
Player.prototype.handleInput = function(keyPressed){

    if (this.x < 20 || this.y < -30 || this.x > 400 || this.y > 420){
        this.reset();
    }
    else if (keyPressed == "left"){
        this.x -= 30;
    }
    else if (keyPressed == "right"){
        this.x += 30;
    }
    else if (keyPressed == "up"){
        this.y -= 30;
    }
    else if (keyPressed == "down"){
        this.y += 30;
    }
        if (player.y < 0 && player.y > -30){
        PlayerScore++;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bigBug = new Enemy(0, 145);
var crazyGuy = new Enemy(0, 65);
var crazyGirl = new Enemy(0, 225);

var allEnemies = [bigBug, crazyGuy, crazyGirl];
var player = new Player(PlayerX, PlayerY);


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
