class Button {

    constructor() {
        this.button = createButton('Play Again');
        this.button.position(width / 2, -15);
    }

    display() {
        this.button.position((width / 2)-40, (height/2)-height/5);
        this.button.velocityX = player.body.velocityX;
        this.button.mousePressed(() => {
            gameState = "play";
            score = 0;
            player.body.position.x=width/2;
            player.body.position.y=height/2-50;
            resetButton.hide();
        })
    }

    hide() {
        this.button.position((width / 2), -25);
        this.button.visible = false;
        this.button.mousePressed(() => {
            gameState = "play";
            score = 0;
            resetButton.hide();
        })
    }
}