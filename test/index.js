var reflect = require('../')
var test = require('tape')
var types = require('./types.json')

test('turn glsl-extract into a JSON tree', function (t) {
  var uniforms = reflect(types.uniforms, function (uniform, index, array) {
    return { data: uniform, index: index }
  })
  t.deepEqual(uniforms, require('./expected.json'), 'matches JSON')
  t.end()
})
