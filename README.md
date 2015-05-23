# glsl-extract-reflect

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Takes the type data from [glsl-extract](https://www.npmjs.com/package/glsl-extract) and transforms the names into a JSON structure where each leaf node is the return value of the given `map` function.

This is useful to create wrappers for uniform and attribute structs/arrays.

```js
var reflect = require('glsl-extract-reflect')

var uniforms = [
  { name: 'lights[0].position', type: 'vec4' },
  { name: 'projection', type: 'mat4' },
  { name: 'color', type: 'vec3' }
]

var locations = reflect(uniforms, function (uniform) {
  return {
    type: uniform.type,
    location: gl.getUniformLocation(program, uniform.path)
  }
})
```

The `locations` result looks like this:

```js
{
  "lights": [
    {
      "position": {
        "type": "vec4",
        "location": WebGLUniformLocation
      }
    }
  ],
  "projection": {
    "type": "mat4",
    "location": WebGLUniformLocation
  },
  "color": {
    "type": "vec3",
    "location": WebGLUniformLocation
  }
}
```

Credit goes to @mikolalysenko; this was pulled out of [gl-shader](https://github.com/stackgl/gl-shader) and made a little more generic.

## Usage

[![NPM](https://nodei.co/npm/glsl-extract-reflect.png)](https://www.npmjs.com/package/glsl-extract-reflect)

#### `result = reflect(array, map)`

Takes an `array` of uniforms or attributes with `{ name, type }` values, and returns the "unflattened" object for all structs and arrays. Each leaf node is the result of calling `map(data, index, array)`, where `data` has the following:

```js
{
  name: 'radius'           // the standalone uniform name
  path: 'lights[0].radius' // the qualified name used by WebGL
  type: 'float'            // the original type
  ...
}
```

Other values (like `location`) are also copied into the `data` object.

## See Also

- [glsl-extract-sync](https://www.npmjs.com/package/glsl-extract-sync)
- [gl-shader-extract](https://www.npmjs.com/package/gl-shader-extract) (extracts during runtime)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/glsl-extract-reflect/blob/master/LICENSE.md) for details.
