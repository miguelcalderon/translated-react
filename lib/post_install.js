/* eslint-disable */

var execSync = require('child_process').execSync;
var stat = require('fs').stat;

function exec(command) {
  execSync(command, {
    stdio: [0, 1, 2]
  });
}

stat('dist-modules', function(error, stat) {
  if (process.env.TRAVIS) {
    return
  }
  if (error || !stat.isDirectory()) {
    exec('npm run dist:modules')
  }
})
