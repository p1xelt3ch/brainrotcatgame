var img;
var img1;
var img2;
var img3;

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var isFound;

var canyon;

var collectables;

var trees_x;
var clouds;
var mountains;

var cameraPosX;

var game_score;
//var flagpole;
var lives;

var platforms;
var enemies;

var jumpSound;
var coinSound;
var dieSound;
var yaySound;
var brcSound;

var standingY;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    
    coinSound = loadSound('assets/Coin.mp3');
    coinSound.setVolume(0.1);
    
    dieSound = loadSound('assets/Die.mp3');
    dieSound.setVolume(0.3);
    
    yaySound = loadSound('assets/Yay.mp3');
    yaySound.setVolume(0.3);
    
    brcSound = loadSound('assets/brc.mp3');
    
    img = loadImage('assets/BRCST.png');
    img1 = loadImage('assets/BRCR.png');
    img2 = loadImage('assets/BRCL.png');
    img3 = loadImage('assets/BRCB.png');

}


function setup()
{
	createCanvas(windowWidth, windowHeight);
    if(img)
        {
            console.log("success");
        }
    else
        {
            console.error("fail");
        }
    
    lives = 999; 
    
    startGame();
}


function draw()
{
	///////////DRAWING CODE//////////
    translate(-gameChar_x+510, 0);
	background(100,155,255); //fill the sky blue

    //Mountain
    drawMountains();
    
    //Trees
    drawTrees();
    
    //Clouds
    drawClouds();
    
    if(gameChar_y < floorPos_y)
        {
            var isContact = false;
            for (var i = 0; i < platforms.length; i++)
                {
                    if(platforms[i].checkContact(gameChar_x, gameChar_y) == true)
{
    isFalling = false;
    isContact = true;
    standingY = platforms[i].y; // New!
    break;
}
                    
                }
            if(isContact == false)
{
    gameChar_y += 3;
    isFalling = true;
    standingY = floorPos_y; // New!
}
        }
    
    else if(gameChar_y >= floorPos_y)
        {
            isFalling = false;
            
        }

	noStroke();
	fill(0,155,0);
	rect(-width, floorPos_y, width*width, height - floorPos_y); //draw some green ground
    
    push();
    translate(-cameraPosX, 0);
    
    if(lives < 1)
        {
            fill(255, 0, 0);
            textSize(40);
            text("Game over. Press space to continue.", gameChar_x-350, height/2);
            return;
        }
    
    /*else if(flagpole.isReached)
        {
            fill(255);
            textSize(40);
            text("Congratulations!", gameChar_x-350, height / 2);
            return;
        }*/

    for (var i = 0; i < platforms.length; i++)
        {
            platforms[i].draw();
        }
    
	//draw the canyon
    for (var i = 0; i < canyon.length; i++)
        {
            drawCanyon(canyon[i]);
            checkCanyon(canyon[i]);
        }
        
    //draw a collectable item
    for (var i = 0; i < collectables.length; i++)
        {
            if(!collectables[i].isFound)
            {
              drawCollectable(collectables[i]);
              checkCollectable(collectables[i]);
            }
        }
    
    /*if(!checkFlagpole.isReached)
        {
            checkFlagpole(flagpole);
        }*/
    
    for (var i = 0; i < enemies.length; i++)
        {
            enemies[i].draw();
            
            var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
            if(isContact)
                {
                    dieSound.play();
                    lives -= 1;
                    
                    if(lives > 0)
                        {
                        startGame();
                        break;
                        }
                }
        }
    
    //Score Counter
    fill(255);
    noStroke();
    textSize(40);
    text("score: " + game_score, gameChar_x - 500, 40);
    
    //Lives Counter
    fill(255);
    noStroke();
    textSize(40);
    text("lives: " + lives, gameChar_x - 500, 80);
    
    //renderFlagpole();

    checkPlayerDie();
    
    //the game character
    drawGameChar();
	if (isPlummeting && gameChar_y < standingY - 120) {
    isPlummeting = false;
}
    pop();
    
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here

    if(isLeft == true)
        {
            gameChar_x -= 5;
        }
    
    else if(isRight == true)
        {
            gameChar_x += 5;
        }
    else if(isPlummeting == true)
        {
            gameChar_y -= 30;
        }
    

    
}


function drawGameChar()
{
	if(isLeft && isFalling)
	{
    // add your jumping-left code
if (frameCount % 10 < 5) 
        {
            image(img1, gameChar_x, gameChar_y - 100);
        } 
        
        else 
        {
            image(img2, gameChar_x, gameChar_y - 100);
        }
        
        img1.resize(50, 100);
        img2.resize(50, 100);
    }
	
    else if(isRight && isFalling)
	{
    // add your jumping-right code
if (frameCount % 10 < 5) 
        {
            image(img1, gameChar_x, gameChar_y - 100);
        } 
        
        else 
        {
            image(img2, gameChar_x, gameChar_y - 100);
        }
        
        img1.resize(50, 100);
        img2.resize(50, 100);
    }
	
    else if(isLeft)
	{
    // add your walking left code
        if (frameCount % 10 < 5) 
        {
            image(img1, gameChar_x, gameChar_y - 100);
        } 
        
        else 
        {
            image(img2, gameChar_x, gameChar_y - 100);
        }
        
        img1.resize(50, 100);
        img2.resize(50, 100);
    }
	
    else if(isRight)
	{
    // add your walking right code
        if (frameCount % 10 < 5) 
        {
            image(img1, gameChar_x, gameChar_y - 100);
        } 
        
        else 
        {
            image(img2, gameChar_x, gameChar_y - 100);
        }
        
        img1.resize(50, 100);
        img2.resize(50, 100);
    }
	
    else if(isFalling || isPlummeting)
	{
    // add your jumping facing forwards code
image(img, gameChar_x, gameChar_y-100);
        img.resize(50,100);
    }
	
    else
	{
    // add your standing front facing code
        image(img, gameChar_x, gameChar_y-100);
        img.resize(50,100);
    
    }

}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
    if(keyCode == 65)
        {
            isLeft = true;
            brcSound.play();
        }
    
    else if(keyCode == 68)
        {
            isRight = true;
            brcSound.play();
        }
    
    else if(keyCode == 87)
        {
            isPlummeting = true;   
            jumpSound.play();
            //wbrcSound.play();
        }
    
    if (isFalling == true && gameChar_y > standingY - 5) {
    isPlummeting = false; // you're falling and not grounded
}
    
    /*if(flagpole.isReached == false)
        {
            checkFlagpole();
        }*/
    

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
}


function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
    if(keyCode == 65)
        {
            isLeft = false;
        }
    
    else if(keyCode == 68)
        {
            isRight = false;
        }
        
    else if(keyCode == 87)
        {
            isPlummeting = false;
        }

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
}


function drawClouds()
{
   for (var i = 0; i < clouds.length; i++)
        { 
            noStroke();
            fill(255, 255, 255);
            ellipse(clouds[i].x_pos, clouds[i].y_pos, 90, 90);
            ellipse(clouds[i].x_pos+50, clouds[i].y_pos, 60, 60);
            ellipse(clouds[i].x_pos-50, clouds[i].y_pos, 60, 60);   
        } 
}


function drawMountains()
{
         for (var i = 0; i < mountains.length; i++)
        {
                stroke(150,75,0,90);
                fill(150,75,0,50);
                triangle(mountains[i], floorPos_y-300, mountains[i]+70, floorPos_y, mountains[i]-90, floorPos_y);
                fill(255,255,255,90);
                stroke(255,255,255,100)
                triangle(mountains[i], floorPos_y-300, mountains[i]+10, floorPos_y-250, mountains[i]-10, floorPos_y-250);
        }
}


function drawTrees()
{
        for (var i = 0; i < trees_x.length; i++)
        {
            fill(150,75,0);
            rect(trees_x[i],floorPos_y-100,50,106);
            fill(0,255,0);
            triangle(trees_x[i]-50, floorPos_y-100, trees_x[i] + 100, floorPos_y-100, trees_x[i] + 25, floorPos_y-200);
            triangle(trees_x[i]-50, floorPos_y-50, trees_x[i] + 100, floorPos_y-50, trees_x[i] + 25, floorPos_y-200);
        }
}


function drawCollectable(collectables)
{
        if (collectables.isFound == false)
        {
            fill(212,175,55);
            stroke(255,255,0);
            ellipse(collectables.x_pos,collectables.y_pos,22,25);
        }
}



function drawCanyon(canyon)
{
    fill(100,155,255);
    rect(canyon.x_pos, floorPos_y, canyon.width, height - floorPos_y)
}


function checkCollectable(collectables)
{
        if (dist(gameChar_x, gameChar_y, collectables.x_pos, collectables.y_pos) < 50)
        {
            collectables.isFound = true;
            coinSound.play();
            game_score += 1;
        }
}


function checkCanyon(canyon)
{
        if(gameChar_x > canyon.x_pos && gameChar_x < canyon.x_pos + canyon.width && gameChar_y >= floorPos_y)
        {
            gameChar_y += 5;
            isPlummeting = false;
            isFalling = true;

            isLeft = false;
            isRight = false;     
        }
}


/*function renderFlagpole()
{
    push();
    strokeWeight(5);
    stroke(200);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    
    fill(255,0,0);
    noStroke();
    
    if(flagpole.isReached)
        {
            triangle(flagpole.x_pos, floorPos_y - 250, flagpole.x_pos, floorPos_y - 200, flagpole.x_pos + 80, floorPos_y - 225);
        }
    else
        {
            triangle(flagpole.x_pos, floorPos_y - 50, flagpole.x_pos, floorPos_y, flagpole.x_pos + 80, floorPos_y - 25);
        }
    
    pop();
}


function checkFlagpole()
{
    
    if(gameChar_x+50 > flagpole.x_pos)
        {
            yaySound.play();
            flagpole.isReached = true;
        }
}*/


function checkPlayerDie()
{  
    if(gameChar_y > height)
        {
            if(lives > 0) 
            {
                dieSound.play();
                lives -= 1;
                startGame();
            }
        }
}


function startGame()
{
    floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    cameraPosX = 0;
    
    collectables = [];
var numberOfCollectables = 999;
var currentX_collectable = 0;

for (var i = 0; i < numberOfCollectables; i++) {
    var gap = random(200, 500); // random distance between items
    currentX_collectable += gap;

    var yOffset = random([-32, -100]); // either on ground or higher up
    collectables.push({
        x_pos: currentX_collectable,
        y_pos: floorPos_y + yOffset,
        isFound: false
    });
}
    
    canyon = [];
var spacing = 500; // Minimum horizontal distance between canyons
var numberOfCanyons = 500; // You can set this higher for a longer level
var playerStartX = width / 2;
	
for (var i = 0; i < numberOfCanyons; i++) {
    var x = i * spacing + random(100, 300); // Add randomness to spacing
    var w = random(80, 150); // Vary the width between 80 and 150
if (abs(x - playerStartX) < 200) {
        x += 300; // Push it further away
    }
	
    canyon.push({ x_pos: x, width: w });
}

    
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    
    trees_x = [];
var numberOfTrees = 400;
var currentX_tree = 0;

for (var i = 0; i < numberOfTrees; i++) {
    var gap = random(100, 600); // more varied gap between trees
    currentX_tree += gap;
    trees_x.push(currentX_tree);
}

      clouds = [];
var numberOfClouds = 500;
var currentX = 0;

for (var i = 0; i < numberOfClouds; i++) {
    var gap = random(200, 400); // spacing between clouds
    var x = currentX + gap;
    var y = random(50, 200); // sky height

    clouds.push({ x_pos: x, y_pos: y });

    currentX = x;
}
    
    mountains = [];
var numberOfMountains = 300;
var currentX_mountain = 0;

for (var i = 0; i < numberOfMountains; i++) {
    var gap = random(200, 900); // mountains are wider
    currentX_mountain += gap;
    mountains.push(currentX_mountain);
}
    
    game_score = 0;
    
    //flagpole = {isReached: false , x_pos: 3000};
    
    var P_loc_ran = random(120, width)
    platforms = [];
var numberOfPlatforms = 600;
var currentX = 0;

for (var i = 0; i < numberOfPlatforms; i++) {
    var gap = random(150, 400); // random spacing between platforms
    var length = random(80, 150); // random platform width
    var y = floorPos_y - 80; // varied height

    currentX += gap;
    platforms.push(createPlatforms(currentX, y, length));
}
    
    
    
    enemies = [];
var numberOfEnemies = 50;
var currentX_enemy = 0;

for (var i = 0; i < numberOfEnemies; i++) {
    var gap = random(300, 800); // spacing between enemies
    currentX_enemy += gap;

    var range = random(80, 200); // how far the enemy moves left/right
    var y = floorPos_y; // always place on the ground

    enemies.push(new Enemies(currentX_enemy, y, range));
}
}


function createPlatforms(x, y, length)
{
    var p = {
            x: x,
            y: y,
            length: length,
            draw: function(){
                fill(255,0,255);
                rect(this.x, this.y, this.length, 30);
           },
        checkContact: function(gc_x, gc_y)
        {
            if(gc_x > this.x && gc_x < this.x + this.length)
                {
                    var d = this.y - gc_y;
                    
                    if(d >= 0 && d < 5)
                    {
                        return true;
                    }
                }
            return false;
        }
            
            }
    
    return p;
}


function Enemies(x, y, range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.update = function()
    {
        this.currentX += this.inc;
        
        if(this.currentX >= this.x + this.range)
            {
                this.inc = -1;
            }
        
        else if(this.currentX < this.x)
            {
                this.inc = 1;
            }
    }
    
    this.draw = function()
    {
        this.update()
        fill(0);
        noStroke();
        ellipse(this.currentX, this.y-20, 100, 50)
        
        fill(0);
        triangle(this.currentX-40, this.y-10, this.currentX-50, this.y-70, this.currentX, this.y);
        triangle(this.currentX+40, this.y-10, this.currentX+50, this.y-70, this.currentX, this.y);
        
        fill(255);
        text("#ENEMY", this.currentX-25, this.y-20)
        

    }
    
    this.checkContact = function(gx, gy)
    {
        var d = dist(gx, gy, this.currentX, this.y)
        if(d < 20)
            {
                return true;
            }
        return false;
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    floorPos_y = height * 3/4;
}
