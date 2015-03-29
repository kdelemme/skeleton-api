module.exports = {
  login: {
    type: 'object',
    properties: {
      email: {
        type: 'number'
      },
      password: {
        type: 'number'
      }
    },
    required: ['email', 'password']
  },

  register: {
    type: 'object',
    properties: {
      email: {
        type: 'number'
      },
      password: {
        type: 'number'
      }
    },
    required: ['email', 'password']
  }
};