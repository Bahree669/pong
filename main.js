import './style.scss';
import Dialog from './startDialog';
import Game from './game';
import Ball from './ball';
import Player from './player';

import {stopAnimation} from './utils';

let isOnMobile = false;
if (
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i)
) {
  isOnMobile = true;
  alert('Sorry this game is not available on mobile device yet :(');
}

if (!isOnMobile) {
  const c = document.getElementById('canvas');
  const ctx = c.getContext('2d');

  c.width = innerWidth;
  c.height = innerHeight;

  const game = new Game({
    dialog: Dialog,
    ball: Ball,
    player: Player,
    ctx: ctx,
  });

  const playerForm = document.getElementById('player-form');
  playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(playerForm);
    for (const [name, value] of data) {
      if (name === 'playerOne') {
        game.player.a = value;
      } else {
        game.player.b = value;
      }
    }

    game.init();
    game.movementListener();

    setTimeout(() => {
      playAnimation();
    }, 1000);
  });

  let animationFrame;
  function playAnimation() {
    animationFrame = window.requestAnimationFrame(playAnimation);
    // clear the frame
    ctx.fillStyle = 'transparent';
    ctx.clearRect(0, 0, c.width, c.height);

    game.start();
    const score = game.trackPlayerScore();
    game.displayScore();

    if (score.a === 5 || score.b === 5) {
      stopAnimation(animationFrame);
      game.dialogTitle.innerHTML =
        score.a === 5 ? game.player.a + ' WIN!' : game.player.b + ' WIN!';
      game.dialog.show();
    }

    if (!game.animationState) {
      stopAnimation(animationFrame);
      game.resetPosition();
      game.animationState = true;

      setTimeout(() => {
        game.startAgain(playAnimation);
      }, 1000);
    }
  }
}
