module.exports = {
  title: 'Chaster Extension Framework Style Guide',
  serverPort: 3001, // Setzt den Port für den Styleguidist-Server
  // Passe den Pfad zu deinen Komponenten an:
  components: 'app/ext/**/*.{js,jsx,ts,tsx}',
  require: [
    '<rootDir>/app/globals.sass'
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.sass$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: { indentedSyntax: true },
            },
          ],
        },
      ],
    },
  },
};