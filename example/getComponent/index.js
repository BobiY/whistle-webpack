'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/getComponent.min.js');
} else {
  module.exports = require('./dist/getComponent.js');
}