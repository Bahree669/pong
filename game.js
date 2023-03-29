import {intersect, pick} from './utils';

class Game {
  constructor({ball: Ball, player: Player, ctx, dialog: Dialog}) {
    this.ball = new Ball({
      pos: {x: innerWidth / 2, y: innerHeight / 2},
      velocity: {x: 0, y: 0},
      color: '#FFF',
      radius: 10,
      ctx: ctx,
    });
    this.playerOne = new Player({
      x: 50,
      y: innerHeight / 2 - 50,
      color: '#FC2947',
      ctx: ctx,
      imgSrc: './player-one.png',
    });
    this.playerTwo = new Player({
      x: innerWidth - 80,
      y: innerHeight / 2 - 50,
      color: '#537FE7',
      ctx: ctx,
      imgSrc: './player-two.png',
    });

    // player
    this.player = {a: '', b: ''};

    // a -> playerOne; b -> playerTwo;
    this.score = {a: 0, b: 0};
    this.playerDirection = {a: 0, b: 0, speed: 10};

    // @bool used in main.js to pause || unpause the game
    this.animationState = true;

    this.playerOneScoreContainer = document.getElementById('score-a');
    this.playerTwoScoreContainer = document.getElementById('score-b');
    this.playerOneName = document.getElementById('sp-a');
    this.playerTwoName = document.getElementById('sp-b');

    // strtDialog
    this.dialog = new Dialog();
    this.dialogTitle = document.getElementById('dialogTitle');

    // @array int ballVelocity is to manipulate tha ball valocity
    this.ballVelocity = [-8, 8];
  }

  init() {
    this.playerOneName.innerHTML = this.player.a;
    this.playerTwoName.innerHTML = this.player.b;

    this.score.a = 0;
    this.score.b = 0;

    this.ball.vel.x = pick(this.ballVelocity);
    this.ball.vel.y = pick(this.ballVelocity);

    this.dialog.remove();

    this.ball.draw();
    this.playerOne.draw();
    this.playerTwo.draw();
  }

  resetPosition() {
    // move the ball to its initial position
    this.ball.x = this.ball.init.x;
    this.ball.y = this.ball.init.y;
    this.playerOne.x = this.playerOne.init.x;
    this.playerOne.y = this.playerOne.init.y;
    this.playerTwo.x = this.playerTwo.init.x;
    this.playerTwo.y = this.playerTwo.init.y;
  }

  trackPlayerScore() {
    // @int used to incrememnt the ball velocity by the highest score
    const speedIncrementVal =
      this.ballVelocity[1] + Math.max(this.score.a, this.score.b);

    if (this.ball.x < this.playerOne.x - 30) {
      this.score.b += 1;
      this.animationState = false;
      this.displayScore();
      this.resetPosition();

      // speed up the ball by @n point
      this.ball.vel.x = speedIncrementVal;
      this.ball.vel.y = speedIncrementVal;
    }
    if (this.ball.x > this.playerTwo.x + 30) {
      this.score.a += 1;
      this.animationState = false;
      this.displayScore();
      this.resetPosition();

      // speed up the ball by @n point
      this.ball.vel.x = speedIncrementVal * -1;
      this.ball.vel.y = speedIncrementVal * -1;
    }

    return {a: this.score.a, b: this.score.b};
  }

  displayScore() {
    this.playerOneScoreContainer.innerHTML = this.score.a;
    this.playerTwoScoreContainer.innerHTML = this.score.b;
  }

  start() {
    if (
      intersect(this.ball, this.playerOne) ||
      intersect(this.ball, this.playerTwo)
    ) {
      this.ball.vel.x *= -1;
    }

    this.playerOne.update(this.playerDirection.a);
    this.playerTwo.update(this.playerDirection.b);
    this.ball.update();
  }

  startAgain(start) {
    start();
  }

  movementListener() {
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();

      switch (key) {
        case 'w':
          this.playerDirection.a = this.playerDirection.speed * -1;
          break;
        case 's':
          this.playerDirection.a = this.playerDirection.speed;
          break;
        case 'arrowup':
          this.playerDirection.b = this.playerDirection.speed * -1;
          break;
        case 'arrowdown':
          this.playerDirection.b = this.playerDirection.speed;
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase();

      if (key === 'w' || key === 's') {
        this.playerDirection.a = 0;
      }
      if (key === 'arrowup' || key === 'arrowdown') {
        this.playerDirection.b = 0;
      }
    });
  }
}

export default Game;
