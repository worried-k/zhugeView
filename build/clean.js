var shell = require('shelljs')
var path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
shell.rm('-rf', resolve('dist'))
shell.rm('-rf', resolve('lib'))