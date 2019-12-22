var score;
var main = {
  preload: function(){
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('ground1', 'assets/platform0.png');
	game.load.image('ground2', 'assets/platform2.png');
	game.load.image('ground3', 'assets/plaform3.png');
	game.load.image('life', 'assets/life.png');
	game.load.image('star', 'assets/star.png');
	game.load.image('block', 'assets/block.png');
	game.load.image('box01', 'assets/box01.png');
	game.load.image('box02', 'assets/box02.png');
	game.load.image('box03', 'assets/box03.png');
	game.load.image('bullet', 'assets/bullet.png');
	game.load.image('boss', 'assets/starb.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  },
  create: function(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.image(0, 0, 'sky');
	game.world.setBounds(0, 0, 1500, 600);
	this.platforms = game.add.group();
	this.platforms.enableBody = true;
	
	var ground = this.platforms.create(0, game.world.height-64, 'ground2');
	ground.scale.setTo(1, 1);
	
	this.platforms.create(800, 400, 'ground');
	this.platforms.create(600, 200, 'ground');

	this.platforms.create(1000, 380, 'ground3');
	this.platforms.create(-150, 250, 'ground1');
	this.platforms.create(300, 400, 'ground1');
	this.platforms.create(-350, 100, 'ground1');
	this.platforms.create(500, 270, 'block');
	this.platforms.create(100, 220, 'block');
	this.platforms.create(320, 150, 'block');


	
	this.platforms.setAll('body.immovable', true);
	
	this.box01 = game.add.group();
	this.box01.enableBody = true;
	this.box01.create(765,510,'box01');
	
	this.box02 = game.add.group();
	this.box02.enableBody = true;
	this.box02.create(0,-40,'box02');
	
	this.mylife=5;
	
	this.life = game.add.group();
	this.life.create(16,60,'life');
	this.life.fixedToCamera=true;
	this.life1 = game.add.group();
	this.life1.create(46,60,'life');
	this.life1.fixedToCamera=true;
	this.life2 = game.add.group();
	this.life2.create(76,60,'life');
	this.life2.fixedToCamera=true;
	this.life3 = game.add.group();
	this.life3.create(106,60,'life');
	this.life3.fixedToCamera=true;
	this.life4 = game.add.group();
	this.life4.create(136,60,'life');
	this.life4.fixedToCamera=true;

	this.box03 = game.add.group();
	this.box03.enableBody = true;
	this.box03.create(0,-40,'box03');
	
	this.player = game.add.sprite(32, game.world.height-150, 'dude');
	game.physics.arcade.enable(this.player);
	this.player.body.gravity.y = 300;
	this.player.body.collideWorldBounds = true;
	this.player.body.setSize(20, 32, 5, 16);
	this.player.animations.add('left', [0, 1, 2, 3], 10, true);
	this.player.animations.add('right', [5, 6, 7, 8], 10, true);

	
	this.bulletPool = game.add.group();
	this.bulletPool.enableBody = true;
	this.bulletPool.createMultiple(1000, 'bullet');
	this.bulletPool.setAll('anchor.x', 0.5);
	this.bulletPool.setAll('anchor.y', 0.5);
	this.nextShotAt = 0;
	this.bulletdamage = 15;
	this.bulletDelay = 1000;

	this.bullettype = 1;

	
	this.enemyPool = game.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.createMultiple(50, 'star');
    this.enemyPool.setAll('anchor.x', 0.5);
    this.enemyPool.setAll('anchor.y', 0.5);
	this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);
    this.nextEnemyAt = 0;
    this.enemyDelay = 1000;
	
	
	this.boss = game.add.group();
	this.boss.enableBody = true;
	this.boss.exists = false;
	this.boss.alive = false;
	this.boss.create(1500,0,'boss');
    this.boss.setAll('checkWorldBounds', true);
	this.bossAt = 0;
	this.bossDelay = 10000;
	this.bosslife = 750;

	
	
	this.g = game.add.graphics(40,10);
	this.g.beginFill(0xff6600);
	this.g.drawRoundedRect(0,0,200,10);

	this.s = game.add.sprite(0,0,this.g.generateTexture());
		
	this.s.width = 750;
	this.s.x = 12;
	this.s.y = 13;
	this.g.kill();
 	this.s.fixedToCamera=true;
	this.bosslifeText = game.add.text(15,10, 'BOSS HP: 750',{fontSize: '12px', fill: '#fff'});
 	this.bosslifeText.fixedToCamera=true;
	
	
	this.cursors = game.input.keyboard.createCursorKeys();

	this.jumpbutton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.jumpbutton.onDown.add(this.jump, this);
	

	//this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
	//this.fireButton1 = game.input.keyboard.addKey(Phaser.Keyboard.Z);

	score = 0;
	this.scoreText = game.add.text(16, 30, '分數: 0',{fontSize: '24px', fill: '#000'});
 	this.scoreText.fixedToCamera=true;

 
 
 
  },

  update: function(){


	//  this.score = this.bullettype;
	 // this.scoreText.text = '分數: ' + this.score;

	//this.s.width--;
	if(this.mylife==4)
	{
		this.life4.kill();
	}
	if(this.mylife==3)
	{
		this.life3.kill();
	}

	if(this.mylife==2)
	{
		this.life2.kill();
	}
	if(this.mylife==1)
	{
		this.life1.kill();
	}
	if(this.mylife==0)
	{
		this.life.kill();
		game.state.start('end');
	}
	
	if(this.bullettype==1&&game.input.keyboard.isDown(Phaser.Keyboard.Z))
	{
		this.fire();
	}
	if(this.bullettype==2&&game.input.keyboard.isDown(Phaser.Keyboard.Z))
	{		
		this.fire2();
	}
	if(this.bullettype==3&&game.input.keyboard.isDown(Phaser.Keyboard.Z))
	{		
		this.fire3();
	}
	
	if (this.nextEnemyAt<game.time.now && this.enemyPool.countDead()>0) {
      this.nextEnemyAt = game.time.now + this.enemyDelay;
      var enemy = this.enemyPool.getFirstExists(false);
      enemy.reset(game.rnd.integerInRange(20, 1300), 0);
      enemy.body.velocity.y = game.rnd.integerInRange(30, 60);
	  enemy.body.bounce.y=0.9;


    } 

	game.physics.arcade.collide(this.player, this.platforms);
	game.camera.follow(this.player);
	this.player.body.velocity.x = 0;
	

	if (score>=10) {
		this.bossapper();
		 //score += 100;
	}
	if (this.bosslife<=500) {
	
		this.bossmove();	
	}
	if (this.cursors.left.isDown) {
		this.player.body.velocity.x = -150;
		this.player.animations.play('left');
	}
	else if (this.cursors.right.isDown) {
		this.player.body.velocity.x = 150;
		this.player.animations.play('right');
	}
	else {
		this.player.animations.stop();
		this.player.frame = 4;
	}

	
	game.physics.arcade.collide(this.enemyPool, this.platforms);
	game.physics.arcade.overlap(this.player, this.stars, this.collectStar,null, this);
	game.physics.arcade.overlap(this.player, this.box01, this.collectbox01,null, this);
	game.physics.arcade.overlap(this.player, this.box02, this.collectbox02,null, this);
	game.physics.arcade.overlap(this.player, this.box03, this.collectbox03,null, this);
	game.physics.arcade.overlap(this.player, this.enemyPool, this.hitplayer,null, this);
	game.physics.arcade.overlap(this.player, this.boss, this.bosshitplayer,null, this);
	game.physics.arcade.overlap(this.bulletPool, this.enemyPool,this.killStar, null, this);
	game.physics.arcade.overlap(this.bulletPool, this.boss,this.bosshit, null, this);
	game.physics.arcade.overlap(this.bulletPool, this.platforms,this.fuckyourself, null, this);

  },
  	jump: function() {
		if(this.player.body.touching.down){
			this.player.body.velocity.y = -350;

		}
	},
	fire: function() {

		if (!this.player.alive || this.nextShotAt>game.time.now) {
		  return;
		}
		if (this.bulletPool.countDead()==0) {
		  return;
		}
		this.nextShotAt = game.time.now + this.bulletDelay;
		
		var bullet = this.bulletPool.getFirstExists(false);
		bullet.reset(this.player.x, this.player.y+35);
		if (this.cursors.left.isDown) {
			bullet.body.velocity.x = -500;
			}
			else{
				bullet.body.velocity.x = 500;
			}

	},
	fire2: function() {

		if (!this.player.alive || this.nextShotAt>game.time.now) {
		  return;
		}
		if (this.bulletPool.countDead()==0) {
		  return;
		}
		this.nextShotAt = game.time.now + this.bulletDelay;
		
		var bullet = this.bulletPool.getFirstExists(false);
		bullet.reset(this.player.x, this.player.y+35);
		if (this.cursors.left.isDown) {
			bullet.body.velocity.x = -500;
			}
			else{
				bullet.body.velocity.x = 500;
			}
		var bullet = this.bulletPool.getFirstExists(false);	
		bullet.reset(this.player.x, this.player.y+20);
		if (this.cursors.left.isDown) {
			bullet.body.velocity.x = -500;
			}
			else{
				bullet.body.velocity.x = 500;
			}

	},
	fire3: function() {

		if (!this.player.alive || this.nextShotAt>game.time.now) {
		  return;
		}
		if (this.bulletPool.countDead()==0) {
		  return;
		}
		this.nextShotAt = game.time.now + this.bulletDelay;
		
		var bullet = this.bulletPool.getFirstExists(false);
		bullet.reset(this.player.x, this.player.y+35);
		if (this.cursors.left.isDown) {
			bullet.body.velocity.x = -500;
			}
			else{
				bullet.body.velocity.x = 500;
			}
		var bullet = this.bulletPool.getFirstExists(false);	
		bullet.reset(this.player.x, this.player.y+20);
		if (this.cursors.left.isDown) {
			bullet.body.velocity.x = -500;
			}
			else{
				bullet.body.velocity.x = 500;
			}
			
		var bullet = this.bulletPool.getFirstExists(false);	
		bullet.reset(this.player.x, this.player.y+15);
		if (this.cursors.left.isDown) {
			bullet.body.velocity.x = -500;
			bullet.body.velocity.y = -200;
			}
			else{
				bullet.body.velocity.x = 500;
				bullet.body.velocity.y = -200;
			}	

	},
	
  fuckyourself: function(bullet, platforms) {
	bullet.kill();
  },
  
  hitplayer: function(player, enemy) {
	enemy.kill();  
	this.mylife-=1;
  },
   bosshitplayer: function(player, boss) { 
	this.mylife-=1;

  },
  
  collectbox01: function(player, box01){
	  
	 score += 10;
	  this.bullettype=2;
	  this.scoreText.text = '分數: ' + score;
	  box01.kill();
	  this.box02.x=20;
	  this.box02.y=260;
	  //game.state.start('end');

  },
  
  collectbox02: function(player, box02){
	  
	//  score += 30;
	  this.scoreText.text = '分數: ' + score;
	  box02.kill();
	  this.box03.x=720;
	  this.box03.y=210;
	  this.bulletDelay=500;
	  
  },
  
  collectbox03: function(player, box03){
	  
	//  score += 60;
	  this.scoreText.text = '分數: ' + score;
	  box03.kill();
	  this.bullettype=3;
  },
  
  killStar: function(bullet, enemy) {
	  
	enemy.kill();
	this.touch=0;
	score += 10;
	this.scoreText.text = '分數: ' + score;
	bullet.kill();
	//game.state.start('main');

  },

  bossapper: function() {
	  
	if(this.boss.x>=-300)
	{
		this.boss.x--;
	}	
	this.boss.exists = true;
	this.boss.alive = true;

  },
   bossmove: function() {
	  
	if(this.boss.x>=-480)
	{
		this.boss.x-=4;
	}	

  },
  bosshit: function(bullet, boss) {
	  
	this.s.width-=this.bulletdamage;
	this.bosslife-=this.bulletdamage;
	bullet.kill();
	this.bosslifeText.text = 'BOSS HP: ' + this.bosslife;
	if(this.bosslife<=0)
	{
		boss.kill();
		score += 1000;
		game.state.start('end');
	}

  },

	
};

var end = {

	preload: function(){
		game.load.image('bg', 'assets/sky.png');
	},
	
	
	create: function(){
		var bg = game.add.image(0,0,'bg');	 
		this.scoreText = game.add.text(400, 200, 'Score : '+ score ,{font: '40px Adobe 繁黑體 Std', fill: '#FFF'});
		this.scoreText.anchor.setTo(0.5);
	    this.Text = game.add.text(400, 300, 'Click  To  Restart  The  Game' ,{font: '20px Adobe 繁黑體 Std', fill: '#FFD700'});
	    this.Text.anchor.setTo(0.5);	 
	},
	
	update: function(){
	if (game.input.activePointer.isDown) {
		score = 0 ;  
        game.state.start('main');
      }
	  
	},
	
};

 
 
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
game.state.add('main', main);
game.state.add('end', end);
game.state.start('main');