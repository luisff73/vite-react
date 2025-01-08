// jest.config.cjs
module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Usar babel-jest para JS y JSX
  },
  testEnvironment: 'jest-environment-jsdom', // Asegúrate de que esté configurado correctamente
  moduleFileExtensions: ['js', 'jsx', 'json'],
};