import { upgradeElement } from "../dist/main.mjs"
// const upgradeElement = require('../dist/main.mjs').upgradeElement;
const WORKER ='../dist/worker.mjs';

function Render (options) {
  upgradeElement(options.id, WORKER)
}

// module.exports = Render;

// 1. 如何拿到document
// 2. .svelte配套的main.js中target是? 如何在此处取到/使用?

console.log(typeof upgradeElement);