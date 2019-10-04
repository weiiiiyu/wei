var main = {
  preload: function(){
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.image('block', 'assets/block.png');
	game.load.image('block2', 'assets/block2.png');
	game.load.image('block3', 'assets/block3.png');
	game.load.image('box01', 'assets/box01.png');
	game.load.image('box02', 'assets/box02.png');
	game.load.image('box03', 'assets/box03.png');
	game.load.image('tank', 'assets/tank.png');
	game.load.image('turret', 'assets/turret.png');
	game.load.image('bullet', 'assets/bullet.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  },
  create: function(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.image(0, 0, 'sky');
	
	this.platforms = game.add.group();
	this.platforms.enableBody = true;
	
	var ground = this.platforms.create(0, game.world.height-64, 'ground');
	ground.scale.setTo(2, 2);

	this.platforms.create(400, 400, 'ground');
	this.platforms.create(0, 10, 'block2');
	this.platforms.create(0, 0, 'block3');

	this.platforms.create(770, 10, 'block2');
	this.platforms.create(400, 430, 'ground');
	this.platforms.create(-150, 250, 'ground');
	this.platforms.create(700, 200, 'ground');
	this.platforms.create(-350, 100, 'ground');
	this.platforms.create(500, 370, 'block');
	this.platforms.create(100, 220, 'block');
	this.platforms.create(320, 150, 'block');
	this.platforms.create(320, 300, 'block');
	this.platforms.create(320, 270, 'block');
	this.platforms.create(320, 400, 'block');
	//this.platforms.create(345, 510, 'block');
	this.platforms.create(400, 460, 'block');
	this.platforms.create(455, 510, 'block');
	this.platforms.create(510, 460, 'block');
	this.platforms.create(565, 510, 'block');
	//this.platforms.create(620, 460, 'block');
	//this.platforms.create(675, 510, 'block');
	this.platforms.create(730, 460, 'block');
	
	this.touch=0;

	this.platforms.setAll('body.immovable', true);
	
	this.box01 = game.add.group();
	this.box01.enableBody = true;
	this.box01.create(730,510,'box01');
	
	this.box02 = game.add.group();
	this.box02.enableBody = true;
	this.box02.create(10,-40,'box02');
	
	this.box03 = game.add.group();
	this.box03.enableBody = true;
	this.box03.create(10,-40,'box03');
	
	this.bullet = game.add.sprite(0, 0, 'bullet');
	//this.bullet.gravity.y = 20;
	//this.bullet.body.bounce.x = 0.8;
	this.bullet.exists = false;

	game.physics.arcade.enable(this.bullet);
	this.tank = game.add.sprite(30, 500, 'tank');
	game.physics.arcade.enable(this.tank);
	this.turret = game.add.sprite(this.tank.x+33, this.tank.y+14, 'turret');
	game.physics.arcade.enable(this.turret);

	this.power = 300;
	this.cursors = game.input.keyboard.createCursorKeys();
	this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.fireButton.onDown.add(this.fire, this);
	
	

	
	this.cursors = game.input.keyboard.createCursorKeys();
	
	this.stars = game.add.group();
	this.stars.enableBody = true;
	
	for (var i=1; i<11; i++) {
		var star = this.stars.create(i*70, 0, 'star');
		star.body.gravity.y = 20;
		star.body.bounce.y = 0.9 + Math.random()*0.1;
	}

	this.score = 0;
	this.scoreText = game.add.text(30, 50, '分數: 0',{fontSize: '24px', fill: '#000'});
 
  },
	fire: function() {
	
	if (this.bullet.exists) {
	return;
	}

	this.bullet.reset(this.turret.x, this.turret.y);
	var p = new Phaser.Point(this.turret.x, this.turret.y);
	p.rotate(p.x, p.y, this.turret.rotation, false, 32);


	game.physics.arcade.velocityFromRotation(this.turret.rotation, this.power,
									  this.bullet.body.velocity);
	this.bullet.body.bounce.y = 0.8;
	this.bullet.body.bounce.x = 0.8;
	},
	

  
  update: function(){
	this.turret.x= this.tank.x+33;
	//this.turret.x= this.tank.x+33;

	game.physics.arcade.collide(this.tank, this.platforms);
	this.tank.body.velocity.x = 0;
	this.turret.body.velocity.x = 0;

	if (this.cursors.left.isDown) {
		this.tank.body.velocity.x = -150;
		this.turret.body.velocity.x = -150;

	}
	if (this.cursors.right.isDown) {
		this.tank.body.velocity.x = 150;
		this.turret.body.velocity.x = 150;

	}

	if (this.cursors.up.isDown && this.turret.angle>-180) {
	this.turret.angle--;
	}
	else if (this.cursors.down.isDown && this.turret.angle<180) {
	this.turret.angle++;
	}
	
	


	game.physics.arcade.collide(this.bullet, this.platforms, this.fuckyourself,null, this);
	game.physics.arcade.collide(this.stars, this.platforms);
	game.physics.arcade.overlap(this.bullet, this.stars, this.collectStar,null, this);
	game.physics.arcade.overlap(this.bullet, this.box01, this.collectbox01,null, this);
	game.physics.arcade.overlap(this.bullet, this.box02, this.collectbox02,null, this);
	game.physics.arcade.overlap(this.bullet, this.box03, this.collectbox03,null, this);
  },
  fuckyourself: function(bullet, platforms) {

	  this.touch+=1;
	  
	  if(this.touch>=5){
		  this.touch=0;
		  this.bullet.kill();
	  }


  },
  collectbox01: function(player, box01){
	  
	  this.score += 10;
	  this.touch=0;
	  this.scoreText.text = '分數: ' + this.score;
	  box01.kill();
	  this.bullet.kill();
	  this.box02.x=20;
	  this.box02.y=260;
	  
  },
  
  collectbox02: function(bullet, box02){
	  
	  this.score += 30;
	  this.touch=0;
	  this.scoreText.text = '分數: ' + this.score;
	  box02.kill();
	  this.bullet.kill();
	  this.box03.x=720;
	  this.box03.y=210;
	  
  },
  
  collectbox03: function(bullet, box03){
	  
	  this.score += 60;
	  this.touch=0;
	  this.scoreText.text = '分數: ' + this.score;
	  box03.kill();
	  this.bullet.kill();
	  game.state.start('main');
  },
  
  collectStar: function(bullet, star) {
	  
	star.kill();
	this.touch=0;
	this.score += 10;
	this.scoreText.text = '分數: ' + this.score;
	this.bullet.kill();
	//game.state.start('main');

  },

	
};
 
 
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
game.state.add('main', main);
game.state.start('main');