import io from 'socket.io-client';
import Engine from './engine/Engine';

import Distance from './utils/Distance';

import Field from './objects/Field';
import Player from './objects/Player';
import Cursor from './objects/Cursor';
import Ball from './objects/Ball';

const socket = io('http://localhost:3000');

const engine = new Engine({
  socket,
  interactor: { element: document.getElementById('cursor') },
});

const renderers = {
  background: engine.addRenderer('background'),
  cursor: engine.addRenderer('cursor'),
};

const field = new Field();
const player = new Player({
  pos: {
    x: renderers.background.canvas.width / 2,
    y: renderers.background.canvas.height / 2,
  }
});
const pointer = new Cursor();
const ball = new Ball();

engine.communicator.addSender('state.client', () => {
  return field.pos;
});

engine.communicator.addReceiver('state.server', (state) => {
  field.pos = state;
});

engine.addUpdater('main', (delta) => {
  const cursor = engine.interactor.cursor;

  // console.log('Calculating', delta);
  // if (engine.interactor.keys.has(68)) field.move(-.25 * delta, 0);
  // if (engine.interactor.keys.has(65)) field.move(.25 * delta, 0);
  // if (engine.interactor.keys.has(83)) field.move(0, -.25 * delta);
  // if (engine.interactor.keys.has(87)) field.move(0, .25 * delta);
  const playerRotation = Math.atan2(
    cursor.x - renderers.background.dims.width / 2,
    - (cursor.y - renderers.background.dims.height / 2)
  );

  pointer.move({ x: cursor.x, y: cursor.y });

  const playerToPointer = Distance.measure(
    cursor.x,
    cursor.y,
    renderers.background.dims.width / 2,
    renderers.background.dims.height / 2,
  );
  player.rotate(playerRotation);

  if (playerToPointer > 50) {
    field.move(
      - Math.sin(playerRotation) * playerToPointer / 50,
      Math.cos(playerRotation) * playerToPointer / 50,
    );
    ball.shift(
      - Math.sin(playerRotation) * playerToPointer / 50,
      Math.cos(playerRotation) * playerToPointer / 50,
    );
  }

  engine.communicator.send('state.client');
});

engine.addDrawer('main', (delta) => {
  // console.log('Rendering', delta);
  renderers.background.clear();
  renderers.background.draw(field);
  renderers.background.draw(ball);
  renderers.background.draw(player);

  renderers.cursor.clear();
  renderers.cursor.draw(pointer)
});

console.log(engine.time);

engine.start();

// window.setTimeout(() => {
//   engine.stop();
// }, 10000);

console.log('here');
