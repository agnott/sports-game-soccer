import io from 'socket.io-client';

import Renderer from './engine/Renderer';
import Engine from './engine/Engine';

import Field from './objects/Field';

const socket = io('http://localhost:3000');

const renderer = new Renderer('background');
const engine = new Engine({ socket });

const field = new Field();

engine.communicator.addSender('state.client', () => {
  return field.pos;
});

engine.communicator.addReceiver('state.server', (state) => {
  field.pos = state;
});

engine.addUpdater('main', (delta) => {
  // console.log('Calculating', delta);
  if (engine.keys.has(68)) field.move(1 * delta, 0);
  if (engine.keys.has(65)) field.move(-1 * delta, 0);
  if (engine.keys.has(83)) field.move(0, 1 * delta);
  if (engine.keys.has(87)) field.move(0, -1 * delta);

  engine.communicator.send('state.client');
});

engine.addDrawer('main', (delta) => {
  // console.log('Rendering', delta);
  renderer.clear();
  renderer.draw(field);
});

console.log(engine.time);

engine.start();

window.setTimeout(() => {
  engine.stop();
}, 10000);

console.log('here');
