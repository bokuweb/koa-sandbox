'use strict';

const Nightmare = require('nightmare');
const co = require('co');
const fs = require('fs');
const im = require('imagemagick');
// const gm = require('gm').subClass({imageMagick: true});
const util = require('util');

const browser = {
  width: 1200,
  height: 800,
};

function *start() {
  const nightmare = new Nightmare(browser);
  const height = yield nightmare.goto('http://blackrockdigital.github.io/startbootstrap-grayscale/')
          .wait('body')
          .evaluate(() => {
            const body = document.querySelector('body');
            return body.scrollHeight;
          });

  yield nightmare.goto('http://blackrockdigital.github.io/startbootstrap-grayscale/')
          .wait('body')
          .screenshot(require('path').join('./', `g0.png`));

  console.log(height);

  for (var i = 1; i < height / browser.height; i ++) {
    yield nightmare.viewport(browser.width, browser.height)
      .wait('body')
    // のこりheightがブラウザ高さ未満の場合veiwポートを変更？して高さをあわせる？
      .scrollTo(browser.height * i, 0)
      .wait(100)
      .evaluate(i => {
        const searchNodes = root => {
          // const list = [];
          const search = node => {
            while (node != null) {
              var position;
              if (node.style) {
                position = window.getComputedStyle(node, null).getPropertyValue("position");
              }
              if (position === 'fixed') {
                try { node.style.display = 'none' } catch(e) {};
              }
              search(node.firstChild);
              node = node.nextSibling;
            }
          }
          search(root.firstChild);
        }
        return searchNodes(document.querySelector('body'));
      })
      .screenshot(require('path').join('./', `g${i}.png`));
  }
  yield nightmare.end();
  return 'test';
};

module.exports = () => (
  co(start)
    .then(() => {
      console.log('done');
      im.convert(['-append', 'g0.png', 'g1.png', 'g2.png', 'convetred.png'], (err, stdout) => {
        if (err) throw err;
        console.log('stdout:', stdout);
      });
    }, err => {
      console.error(err.stack);
    })
);
