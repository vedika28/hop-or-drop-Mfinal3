class Player {

    constructor(x, y, w, h) {

        this.body = createSprite(x, y, w, h);
        this.body.addAnimation("walking", playerAnm);
        //this.body.debug = true;
        this.body.setCollider("rectangle", 0, 0, 40, 70);
        this.body.addAnimation("shield",player_shield);
        this.body.addImage("die",player_die);
        this.body.addImage("jump",player_jump);
    }

    behaviour() {
        if (keyDown("UP_ARROW")&&this.body.position.y>=block1.body.y-height/5||
        keyDown("space")&&this.body.position.y>=block1.body.y-height/5) {
            this.body.velocityY = -10;
        }
        if (keyDown("UP_ARROW")||keyDown("space")) {
            this.body.changeImage("jump",player_jump);
            this.body.scale = 1;
            playerImgNum = 1;
        } else {
            playerImgNum = 0;
            this.body.changeAnimation("walking", playerAnm);
            this.body.scale = 1;
            this.body.setCollider("rectangle", 0, 0, 40, 70);
        }
        this.body.velocityY += 1;

        if (keyDown("RIGHT_ARROW")) {
            this.body.velocityX = 5;
        }

        if (this.body.position.y > height/2+10) {
            gameOverSound.play();
            gameState = "end";
        }
    }

    die() {
        if (this.body.isTouching(enemy.body)&&life===0) {
            gameOverSound.play();
            gameState = "end";
        }
    }

    shield() {
        if (keyDown("s")) {
            this.body.changeAnimation("shield", player_shield);
            this.body.setCollider("circle", 0, -12, 50);
            this.body.scale = 1;
            shieldImg = 1;
            life=1;
        } else {
            shieldImg = 0;
            this.body.changeAnimation("walking", playerAnm);
            this.body.scale = 1;
            this.body.setCollider("rectangle", 0, 0, 40, 70);
            life=0;
        }
    }
}