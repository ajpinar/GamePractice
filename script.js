//$('#container').text("Hello World!");

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('dude', 'assets/Wrestler_1.png', 67, 92);
    game.load.image('background', 'assets/background2.png');

}

var player;
var facing = 'left';
var jumpTimer = 0;
var strikeTimer = 0;
var strikeDelay = 300;
var cursors;
var jumpButton;
var bg;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.time.desiredFps = 30;

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');

    game.physics.arcade.gravity.y = 250;

    player = game.add.sprite(32, 500, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(67, 92, 0, 0);

    player.animations.add('left', [35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12], 10, true);
    player.animations.add('turn', [0], 20, true);
    player.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 10, true);
    player.animations.add('punch', [1, 0], 5, false)
    player.animations.add('kick', [2, 3, 2, 0], 5, false)

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    punchButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    kickButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

}

function update() {

    // game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            player.frame = 0;

            facing = 'idle';
        }
    }

    if (punchButton.isDown && game.time.now > strikeTimer)
    {
    	player.animations.play('punch');
    	strikeTimer = game.time.now + strikeDelay;
    }

    else if (kickButton.isDown && game.time.now > strikeTimer)
    {
    	player.animations.play('kick');
    	strikeTimer = game.time.now + strikeDelay;
    }

    else if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }

}

function render () {

    //game.debug.text(game.time.suggestedFps, 32, 32);

    //game.debug.text(game.time.physicsElapsed, 32, 32);
    //game.debug.body(player);
    game.debug.bodyInfo(player, 16, 24);

}

