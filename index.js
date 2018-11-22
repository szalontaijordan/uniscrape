var shell = require('shelljs');
shell.exec('cd ui && npm install && npm run prod && cd .. && cd server && npm install && npm run start');
