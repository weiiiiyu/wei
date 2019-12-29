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
	game.load.image('bossbullet', 'assets/star2.png');

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
	
	this.bossenemyPool = game.add.group();
    this.bossenemyPool.enableBody = true;
    this.bossenemyPool.createMultiple(50, 'star');
    this.bossenemyPool.setAll('anchor.x', 0.5);
    this.bossenemyPool.setAll('anchor.y', 0.5);
	this.bossenemyPool.setAll('outOfBoundsKill', true);
    this.bossenemyPool.setAll('checkWorldBounds', true);
    this.nextbossEnemyAt = 0;
	
	this.boss = game.add.group();
	this.boss.enableBody = true;
	this.boss.exists = false;
	this.boss.alive = false;
	this.boss.create(1500,0,'boss');
    this.boss.setAll('checkWorldBounds', true);
	this.bossAt = 0;
	this.bossDelay = 10000;
	this.bosslife = 750;


	this.bossbulletPool = game.add.group();
	this.bossbulletPool.enableBody = true;
	this.bossbulletPool.createMultiple(20, 'bossbullet');
	this.bossbulletPool.setAll('anchor.x', 0.5);
	this.bossbulletPool.setAll('anchor.y', 0.5);
	this.bossbulletPool.setAll('outOfBoundsKill', true);
    this.bossbulletPool.setAll('checkWorldBounds', true);
	this.bossnextShotAt = 0;
	this.bossbulletDelay = 1000;
	
	
	
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
	
	this.instructions1 = game.add.text(400,200,'', {font: '20px Adobe 繁黑體 Std', fill: '#000',align: 'center'});
	this.instructions2 = game.add.text(400,200,'', {font: '20px Adobe 繁黑體 Std', fill: '#000',align: 'center'});
	this.instructions3 = game.add.text(400,200,'', {font: '20px Adobe 繁黑體 Std', fill: '#000',align: 'center'});
	this.instructions1.fixedToCamera=true;
	this.instructions2.fixedToCamera=true;
	this.instructions3.fixedToCamera=true;
	this.instructions1.alpha=0.5;
	this.instructions2.alpha=0.5;
	this.instructions3.alpha=0.5;
	this.instructions1.anchor.setTo(0.5);
	this.instructions2.anchor.setTo(0.5);
	this.instructions3.anchor.setTo(0.5);
	this.textdestorycd=4000;
	this.textdestorycd2=4000;
	this.textdestorycd3=4000;
	this.textdestorycd4=4000;

	
	this.bossinstro = game.add.text(400,150,'', {font: '20px Adobe 繁黑體 Bold ', fill: '#FF3030',align: 'center'});
	this.bossinstro.fixedToCamera=true;
	this.bossinstro.alpha=0.5;
	this.bossinstro.anchor.setTo(0.5);
  },

  update: function(){


	 // this.score = this.boss.x;
	  //this.scoreText.text = '分數: ' + this.score;

	//this.s.width--;





	if(this.mylife<=0)
	{
		this.life.kill();
		game.state.start('end');
	}else if(this.mylife==1)
	{
		this.life1.kill();
	}else if(this.mylife==2)
	{
		this.life2.kill();
	}else if(this.mylife==3)
	{
		this.life3.kill();
	}else if(this.mylife==4)
	{
		this.life4.kill();
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
	
	if (this.nextEnemyAt<game.time.now && this.enemyPool.countDead()>0&&this.bosslife>=749) {
      this.nextEnemyAt = game.time.now + this.enemyDelay;
      var enemy = this.enemyPool.getFirstExists(false);
      enemy.reset(game.rnd.integerInRange(20, 1300), 0);
      enemy.body.velocity.y = game.rnd.integerInRange(30, 60);
	  enemy.body.bounce.y=0.9;

    } 

	game.physics.arcade.collide(this.player, this.platforms);
	game.camera.follow(this.player);
	this.player.body.velocity.x = 0;
	

	if (score>=100) {
		this.bossapper();
		 //score += 100;
	}
	if (this.bosslife<=550) {
	
		this.bossmove();	
	}
	if (this.bosslife<=500&this.nextbossEnemyAt<game.time.now && this.bossenemyPool.countDead()>0) {
		if (this.nextbossEnemyAt<game.time.now && this.bossenemyPool.countDead()>0) {
			this.nextbossEnemyAt = game.time.now + 800;
			var bossenemy = this.bossenemyPool.getFirstExists(false);
			bossenemy.reset(1000,game.rnd.integerInRange(20, 500));
			bossenemy.body.velocity.x = game.rnd.integerInRange(-30, -160);
		}
	}
	if (this.bosslife<=300&this.bosslife>=100) {
	
		this.bossfire();	
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
	game.physics.arcade.overlap(this.player, this.bossbulletPool, this.bossbhitplayer,null, this);
	game.physics.arcade.overlap(this.player, this.bossenemyPool, this.bossehitplayer,null, this);
	game.physics.arcade.overlap(this.bulletPool, this.enemyPool,this.killStar, null, this);
	game.physics.arcade.overlap(this.bulletPool, this.bossbulletPool,this.killbossb, null, this);
	game.physics.arcade.overlap(this.bulletPool, this.bossenemyPool,this.killbosse, null, this);
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
	
	bossfire: function() {

		if (!this.boss.alive || this.bossnextShotAt>game.time.now) {
		  return;
		}
		if (this.bossbulletPool.countDead()==0) {
		  return;
		}
		this.bossnextShotAt = game.time.now + this.bossbulletDelay;
		
		var bossx = game.rnd.integerInRange(0,1)
		
		var bullet = this.bossbulletPool.getFirstExists(false);	
		bullet.reset(1100, 300);
		bullet.body.velocity.x = -500;
		
		
		if(bossx==0){
			var bullet = this.bossbulletPool.getFirstExists(false);	
			bullet.reset(1100, 300);
			bullet.body.velocity.x = -500;
			bullet.body.velocity.y = 150;
			var bullet = this.bossbulletPool.getFirstExists(false);	
			bullet.reset(1100, 300);
			bullet.body.velocity.x = -500;
			bullet.body.velocity.y = 300;
		}
		if(bossx==1)
		{
			var bullet = this.bossbulletPool.getFirstExists(false);	
			bullet.reset(1100, 300);
			bullet.body.velocity.x = -500;
			bullet.body.velocity.y = -150;
			var bullet = this.bossbulletPool.getFirstExists(false);	
			bullet.reset(1100, 300);
			bullet.body.velocity.x = -500;
			bullet.body.velocity.y = -300;
		}
			


	},
	
  fuckyourself: function(bullet, platforms) {
	bullet.kill();
  },
  instructions1destroy: function() {
	this.instructions1.destroy();
  },
  instructions2destroy: function() {
	this.instructions2.destroy();
  },
  instructions3destroy: function() {
	this.instructions3.destroy();
  },
  bossintrodelay: function() {
	this.bossinstro.destroy();
  },
  hitplayer: function(player, enemy) {
	enemy.kill();  
	this.mylife-=1;
  },
  bosshitplayer: function(player, boss) { 
	this.mylife-=1;

  },
  bossbhitplayer: function(player,bossbullet) { 
	this.mylife-=1;
	bossbullet.kill();

  },
  bossehitplayer: function(player,bossenemy) { 
	this.mylife-=1;
	bossenemy.kill();
  },
  collectbox01: function(player, box01){
	  
	  this.bullettype=2;
	  this.scoreText.text = '分數: ' + score;
	  box01.kill();
	  this.box02.x=20;
	  this.box02.y=260;
	  //game.state.start('end');
	  this.instructions1.text='因獲得了秋行軍蟲的知識，農藥子彈+1(幼蟲時頭上有著黃色倒Y標誌)'
	  game.time.events.add(this.textdestorycd,this.instructions1destroy, this);

  },
  
  collectbox02: function(player, box02){
	  
	//  score += 30;
	  this.scoreText.text = '分數: ' + score;
	  box02.kill();
	  this.box03.x=720;
	  this.box03.y=210;
	  this.bulletDelay=500;
	  this.instructions2.text='因獲得了秋行軍蟲的知識，農藥攻速x2(幼蟲時背上每節都有4個斑點)'
	  game.time.events.add(this.textdestorycd,this.instructions2destroy, this);
	  
  },
  
  collectbox03: function(player, box03){
	  
	//  score += 60;
	  this.scoreText.text = '分數: ' + score;
	  box03.kill();
	  this.bullettype=3;
	  this.instructions3.text='因獲得了秋行軍蟲的知識，農藥子彈再+1(幼蟲時背上4個斑點連起呈梯形狀)'
	  game.time.events.add(this.textdestorycd,this.instructions3destroy, this);
  },
  
  killStar: function(bullet, enemy) {
	  
	enemy.kill();
	score += 10;
	this.scoreText.text = '分數: ' + score;
	bullet.kill();

  },
  killbosse: function(bullet, bossenemy) {
	  
	bossenemy.kill();
	score += 10;
	this.scoreText.text = '分數: ' + score;
	bullet.kill();

  },
   killbossb: function(bullet, bossbullet) {
	  
	bossbullet.kill();
	score += 10;
	this.scoreText.text = '分數: ' + score;
	bullet.kill();

  },

  bossapper: function() {
	  
	if(this.boss.x>=-300)
	{
		this.boss.x--;
	}	
	this.bossinstro.text='巨型秋行軍蟲王出現啦，打敗他拯救玉米田吧'
	game.time.events.add(this.textdestorycd,this.bossintrodelay, this);
	this.boss.exists = true;
	this.boss.alive = true;
	this.enemyPool.kill();
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