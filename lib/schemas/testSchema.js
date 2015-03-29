module.exports = {
  type: 'object',
  properties: {
    bar: {
      type: 'number'
    },
    foo: {
      type: 'number'
    }
  },
  required: ['foo', 'bar']
};