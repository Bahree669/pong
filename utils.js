function intersect(circle, rect) {
  let circleDistanceX = Math.abs(circle.x - rect.x - rect.w / 2);
  let circleDistanceY = Math.abs(circle.y - rect.y - rect.h / 2);

  if (circleDistanceX > rect.w / 2 + circle.radius) return false;
  if (circleDistanceY > rect.h / 2 + circle.radius) return false;

  if (circleDistanceX <= rect.w / 2) return true;
  if (circleDistanceY <= rect.h / 2) return true;

  let cornerDistance =
    Math.pow(circleDistanceX - rect.w / 2, 2) +
    Math.pow(circleDistanceY - rect.h / 2, 2);

  return cornerDistance <= Math.pow(circle.radius, 2);
}

function pick(vel) {
  const randomIndex = Math.floor(Math.random() * vel.length);
  return vel[randomIndex];
}

function stopAnimation(frame) {
  window.cancelAnimationFrame(frame);
}

export {pick, intersect, stopAnimation};
