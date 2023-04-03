module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        [
          'module-resolver',
          {
            alias: {
              src: './src',
            },
          },
        ],
      ],
    },
  },
};
