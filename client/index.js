import io from 'socket.io-client';

import Renderer from './engine/Renderer';

const socket = io('http://localhost:3000');

const Render = new Renderer('background');

Render.drawRect(0, 0, 50, 50, 'green');

const Eng = new Engine({
  steps: {
    update: 120,
    render: 60,
  }
});

console.log('here');
