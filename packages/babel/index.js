module.exports = () => ({
  presets: [
    // Transpile ES6+ code
    '@babel/preset-env',
    // Transpile JSX
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import'
  ],
  env: {
    production: {
      plugins: [
        // Remove prop-types in production
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true
          }
        ]
      ]
    }
  }
});
