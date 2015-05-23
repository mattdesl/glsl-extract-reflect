var assign = require('object-assign')
module.exports = reflectTypes

function reflectTypes (array, map) {
  if (typeof map !== 'function') {
    throw new TypeError('must provide map function')
  }

  var data
  var obj = {}
  for (var i = 0; i < array.length; ++i) {
    var n = array[i].name
    var parts = n.split('.')
    var o = obj
    // for each nested struct
    for (var j = 0; j < parts.length; ++j) {
      // see if we have an array
      var x = parts[j].split('[')
      if (x.length > 1) { // it's an array...
        if (!(x[0] in o)) {
          o[x[0]] = []
        }
        o = o[x[0]]
        for (var k = 1; k < x.length; ++k) {
          var y = parseInt(x[k], 10)
          if (k < x.length - 1 || j < parts.length - 1) {
            if (!(y in o)) {
              if (k < x.length - 1) {
                o[y] = []
              } else {
                o[y] = {}
              }
            }
            o = o[y]
          } else {
            data = assign({ path: array[i].name }, array[i], { name: y })
            o[y] = map(data, i, array)
          }
        }
      } else if (j < parts.length - 1) {
        if (!(x[0] in o)) {
          o[x[0]] = {}
        }
        o = o[x[0]]
      } else {
        data = assign({ path: array[i].name }, array[i], { name: x[0] })
        o[x[0]] = map(data, i, array)
      }
    }
  }
  return obj
}
