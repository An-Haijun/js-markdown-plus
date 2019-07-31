const path = require('path')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  jmp: resolve('src/'),
  core: resolve('src/core'),
  font: resolve('src/core'),
  lib: resolve('src/lib')
}
