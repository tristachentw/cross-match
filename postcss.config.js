const path = require('path');
const postcss = require('postcss');
const sprites = require('postcss-sprites');

const STYLE_PATH = path.resolve(__dirname, 'dist', 'assets');

module.exports = {
  plugins: [
    sprites({
      stylesheetPath: STYLE_PATH,
      spritePath: path.resolve(STYLE_PATH),
      hooks: {
        onUpdateRule: function(rule, token, image) {
          let backgroundSizeX = (image.spriteWidth / image.coords.width) * 100;
          let backgroundSizeY = (image.spriteHeight / image.coords.height) * 100;
          let backgroundPositionX = (image.coords.x / (image.spriteWidth - image.coords.width)) * 100;
          let backgroundPositionY = (image.coords.y / (image.spriteHeight - image.coords.height)) * 100;

          backgroundSizeX = isNaN(backgroundSizeX) ? 0 : Math.abs(backgroundSizeX);
          backgroundSizeY = isNaN(backgroundSizeY) ? 0 : Math.abs(backgroundSizeY);
          backgroundPositionX = isNaN(backgroundPositionX) ? 0 : Math.abs(backgroundPositionX);
          backgroundPositionY = isNaN(backgroundPositionY) ? 0 : Math.abs(backgroundPositionY);

          let backgroundImage = postcss.decl({
            prop: 'background-image',
            value: 'url(' + image.spriteUrl + ')'
          });

          let backgroundSize = postcss.decl({
            prop: 'background-size',
            value: backgroundSizeX + '% ' + backgroundSizeY + '%'
          });

          let backgroundPosition = postcss.decl({
            prop: 'background-position',
            value: backgroundPositionX + '% ' + backgroundPositionY + '%'
          });

          rule.insertAfter(token, backgroundImage);
          rule.insertAfter(backgroundImage, backgroundPosition);
          rule.insertAfter(backgroundPosition, backgroundSize);
        }
      }
    })
  ]
};
