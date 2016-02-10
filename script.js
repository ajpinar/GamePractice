//$('#container').text("Hello World!");

var game = new Phaser.Game(800, 500, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('dude', 'assets/Wrestler_1.png', 67, 92);
    game.load.image('background', 'assets/Ring_1.png');

    game.load.crossOrigin = 'anonymous';

    game.load.image('platform', 'http://examples.phaser.io/assets/sprites/platform.png');

}

var player;
var moving = 'no';
var jumpTimer = 0;
var strikeTimer = 0;
var strikeDelay = 300;
var cursors;
var jumpButton;
var bg;
var mat;
var platforms;

function create() {

    //game.physics.startSystem(Phaser.Physics.ARCADE);

    game.time.desiredFps = 30;

    bg = game.add.tileSprite(-350, -120, 672, 425, 'background');
    bg.scale.setTo(2.2,2.2);


    player = game.add.sprite(32, 32, 'dude');
    player.scale.setTo(1.8,1.8);
    game.physics.arcade.enable(player);
	player.body.gravity.y = 250;
    platforms = game.add.physicsGroup();

    platforms.create(0, 350, 'platform');

    platforms.setAll('body.immovable', true);
    platforms.setAll('scale.x',20);
    platforms.setAll('visible', false);

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
	game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

            player.animations.play('left');
            moving = 'yes';
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;


            player.animations.play('right');
            moving = 'yes';

    }
    else
    {
        if (moving != 'no')
        {
            player.animations.stop();

            player.frame = 0;

            moving = 'no';
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
