var config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 1000},
      debug: true
    }
  },
  scene: {
    init: init,
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

var score = 0;
var scoretexte;
var joueur1;
var policier1;
var policier2;
var policier3;
var policier4;
var savepolicier = 1;
var savesaut = 0;
var veriftouche = 1;

function init() {

  var platformes;
  var touches;

}




function preload() {

  // chargement fond
  this.load.image('background','assets/background.jpg');

  // chargement sol
  this.load.image('sol1','assets/plateforme.jpg');
  this.load.image('sol2','assets/plateforme.jpg');
  this.load.image('sol3','assets/plateforme.jpg');
  this.load.image('sol4','assets/plateforme.jpg');
  this.load.image('sol5','assets/plateforme.jpg');

  // chargement plateformes
  this.load.image('plateforme1','assets/plateforme.jpg');
  this.load.image('plateforme2','assets/plateforme.jpg');
  this.load.image('plateforme3','assets/plateforme.jpg');
  this.load.image('plateforme4','assets/plateforme.jpg');
  this.load.image('plateforme5','assets/plateforme.jpg');
  this.load.image('plateforme6','assets/plateforme.jpg');
  this.load.image('plateforme7','assets/plateforme.jpg');
  this.load.image('plateforme8','assets/plateforme.jpg');
  this.load.image('plateforme9','assets/plateforme.jpg');

  // chargement petites plateformes
  this.load.image('petiteplateforme1','assets/petiteplateforme.jpg');
  this.load.image('petiteplateforme2','assets/petiteplateforme.jpg');
  this.load.image('petiteplateforme3','assets/petiteplateforme.jpg');
  this.load.image('petiteplateforme4','assets/petiteplateforme.jpg');

  // chargement perso1
  this.load.image('perso1','assets/perso1.jpg');

  // chargement boites aux lettres
  this.load.image('bal1','assets/boite_aux_lettres.jpg');
  this.load.image('bal2','assets/boite_aux_lettres.jpg');
  this.load.image('bal3','assets/boite_aux_lettres.jpg');
  this.load.image('bal4','assets/boite_aux_lettres.jpg');

  // chargement policiers
  this.load.image('policier1','assets/policier.png');
  this.load.image('policier2','assets/policier.png');
  this.load.image('policier3','assets/policier.png');
  this.load.image('policier4','assets/policier.png');

  // chargement sortie
  this.load.image('sortie','assets/sortie.png');

  // chargement lettre
  this.load.image('lettre','assets/lettre.png');


}




function create() {

  // image de fond
  //this.add.image(960,540,'background');

  // groupe plateformes
  platformes = this.physics.add.staticGroup();

  // placement sol
  platformes.create(200,1065,'sol1');
  platformes.create(600,1065,'sol2');
  platformes.create(1000,1065,'sol3');
  platformes.create(1400,1065,'sol4');
  platformes.create(1800,1065,'sol5');

  // sortie
  sortie = this.physics.add.image(190,235,'sortie').setScale(0.5);

  // placement plateformes
  platformes.create(600,915,'plateforme1');
  platformes.create(800,915,'plateforme2');
  platformes.create(1500,765,'plateforme3');
  platformes.create(650,565,'plateforme4');
  platformes.create(1200,415,'plateforme5');
  platformes.create(1650,250,'plateforme6');
  platformes.create(700,195,'plateforme7');
  platformes.create(1000,195,'plateforme8');
  plateforme9 = platformes.create(150,100,'plateforme9').setSize(30,400).setAlpha(0);
  plateforme9.angle = 90;
  this.physics.add.collider(plateforme9,sortie);

  // placement petites plateformes
  platformes.create(1050,665,'petiteplateforme1');
  platformes.create(150,725,'petiteplateforme2');
  platformes.create(200,300,'petiteplateforme3');
  platformes.create(1800,550,'petiteplateforme4');

  // placement boites aux lettres
  bal1 = this.physics.add.image(140,690,'bal1');
  bal2 = this.physics.add.image(1000,630,'bal2');
  bal3 = this.physics.add.image(1850,515,'bal3');
  bal4 = this.physics.add.image(1600,215,'bal4');
	this.physics.add.collider(bal1,platformes);
	this.physics.add.collider(bal2,platformes);
	this.physics.add.collider(bal3,platformes);
	this.physics.add.collider(bal4,platformes);

  // policiers
  policier1 = this.physics.add.image(700,530,'policier1');
  policier2 = this.physics.add.image(1000,160,'policier2');
  policier3 = this.physics.add.image(1700,215,'policier3');
  policier4 = this.physics.add.image(1450,730,'policier4');
	this.physics.add.collider(policier1,platformes);
	this.physics.add.collider(policier2,platformes);
	this.physics.add.collider(policier3,platformes);
	this.physics.add.collider(policier4,platformes);
  policier1.setFlipX(false).setOrigin(0.9,0.5);
  policier2.setFlipX(true).setOrigin(0.1,0.5);
  policier3.setFlipX(false).setOrigin(0.9,0.5);
  policier4.setFlipX(true).setOrigin(0.1,0.5);

  // touches
  cursors = this.input.keyboard.createCursorKeys();

  // joueur1
  joueur1 = this.physics.add.image(40,1030,'perso1');
	joueur1.setCollideWorldBounds(true);
	joueur1.body.setGravityY(300);
	this.physics.add.collider(joueur1,platformes);
  this.physics.add.collider(joueur1,policier1,reset1,null,this);
  this.physics.add.collider(joueur1,policier2,reset2,null,this);
  this.physics.add.collider(joueur1,policier3,reset3,null,this);
  this.physics.add.collider(joueur1,policier4,reset4,null,this);

  // lettre
  this.add.image(40,40,'lettre');

  // score
  scoretexte = this.add.text(80, 20, '0/4', {fontSize: '50px', fill:'#fff'});

  // collisions boite aux lettres
  this.physics.add.collider(joueur1,bal1,lettrepostee1,null,this);
  this.physics.add.collider(joueur1,bal2,lettrepostee2,null,this);
  this.physics.add.collider(joueur1,bal3,lettrepostee3,null,this);
  this.physics.add.collider(joueur1,bal4,lettrepostee4,null,this);

  // collisions sortie
  this.physics.add.collider(sortie,platformes);
  this.physics.add.collider(joueur1,sortie,fin,null,this);

}


function update() {

  // déplacement joueur1
  if (savesaut === 0 && joueur1.body.touching.down && cursors.up.isDown) {
  		//joueur1.anims.play('jump', true);
  		joueur1.setVelocityY(-500);
  		savesaut = 1;
  		veriftouche = 0;
  	}

  	/*if (cursors.up.isDown) {
  		joueur1.anims.play('jump', true);
  	}*/

  	if (cursors.up.isUp) {
  		veriftouche = 1;
  	}
  	if (savesaut === 1 && cursors.up.isDown && veriftouche === 1) {
  		joueur1.setVelocityY(-500);
  		savesaut = 0;
  	}


  	/*else if (cursors.down.isDown && !joueur1.body.touching.down) {
      joueur1.setVelocityY(300);
      //joueur1.anims.play('stop', true);
  	}*/
  	if (cursors.right.isDown) {
  		//joueur1.anims.play('right', true);
  		joueur1.setVelocityX(300);
  		joueur1.setFlipX(false);
  	} else if (cursors.left.isDown) {
  		joueur1.setVelocityX(-300);
  		//joueur1.anims.play('right', true);
  		joueur1.setFlipX(true);
  	} else  {
  		//joueur1.anims.play('stop', true);
  		joueur1.setVelocityX(0);
  	}




    // rotation policiers
    if (savepolicier == 1) {
      this.time.addEvent({
      delay: 2000,
      callback: ()=>{
          // effectuer une rotation
          policier1.setFlipX(true);
          policier1.setOrigin(0.1,0.5);
          policier2.setFlipX(false);
          policier2.setOrigin(0.9,0.5);
          policier3.setFlipX(true);
          policier3.setOrigin(0.1,0.5);
          policier4.setFlipX(false);
          policier4.setOrigin(0.9,0.5);
          savepolicier = 0;
      },
      loop: false
  })
    }

    if (savepolicier == 0) {
      this.time.addEvent({
      delay: 2000,
      callback: ()=>{
          // effectuer une rotation
          policier1.setFlipX(false);
          policier1.setOrigin(0.9,0.5);
          policier2.setFlipX(true);
          policier2.setOrigin(0.1,0.5);
          policier3.setFlipX(false);
          policier3.setOrigin(0.9,0.5);
          policier4.setFlipX(true);
          policier4.setOrigin(0.1,0.5);
          savepolicier = 1;
      },
      loop: false
  })
    }




}

// collision entre joueur et policiers
function reset1(joueur1, policier1){
  joueur1.setPosition(40,1000);
  policier1.setVelocityX(0);
  policier1.setVelocityY(-50);
  /*score = 0;
  scoretexte.setText(score+'/4');
  bal1.enableBody(true,true).setPosition(140,690);
  bal2.enableBody(true,true).setPosition(1000,630);
  bal3.enableBody(true,true).setPosition(1850,515);
  bal4.enableBody(true,true).setPosition(1600,215);*/
}
function reset2(joueur1, policier2){
  joueur1.setPosition(40,1000);
  policier2.setVelocityX(0);
  policier2.setVelocityY(-100);
  /*score = 0;
  scoretexte.setText(score+'/4');*/
}
function reset3(joueur1, policier3){
  joueur1.setPosition(40,1000);
  policier3.setVelocityX(0);
  policier3.setVelocityY(-100);
  /*score = 0;
  scoretexte.setText(score+'/4');*/
}
function reset4(joueur1, policier4){
  joueur1.setPosition(40,1000);
  policier4.setVelocityX(0);
  policier4.setVelocityY(-100);
  /*score = 0;
  scoretexte.setText(score+'/4');*/
}

function lettrepostee1(joueur1, bal1){
	  bal1.disableBody(true,true);
    score += 1;
	  scoretexte.setText(score+'/4');
}
function lettrepostee2(joueur1, bal2){
	  bal2.disableBody(true,true);
    score += 1;
	  scoretexte.setText(score+'/4');
}
function lettrepostee3(joueur1, bal3){
	  bal3.disableBody(true,true);
    score += 1;
	  scoretexte.setText(score+'/4');
}
function lettrepostee4(joueur1, bal4){
	  bal4.disableBody(true,true);
    score += 1;
	  scoretexte.setText(score+'/4');
}


function fin(joueur1, sortie){
  if (score === 4) {
    this.physics.pause();
  } else {
    joueur1.setPosition(40,1000);
    sortie.setVelocityX(-100);
  }
}
