

# Scripts
| Script  | Command                                             | Description                                                                                                                                                                              |
| ------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start` | `webpack-dev-server --config webpack.dev.js --open` | Starts a development server using `webpack-dev-server` with the config from `webpack.dev.js`. Automatically opens your default browser. Great for local development with live reloading. |
| `build` | `webpack --config webpack.prod.js`                  | Builds the project for production using the config in `webpack.prod.js`. Outputs optimized and minified files ready for deployment.                                                      |



# Dependencies
| Dependency            | Purpose                                      |
| --------------------- | -------------------------------------------- |
| `webpack`             | Core module bundler                          |
| `webpack-cli`         | CLI tool to run webpack commands             |
| `webpack-dev-server`  | Local dev server with live reloading         |
| `style-loader`        | Injects CSS into the DOM                     |
| `css-loader`          | Allows importing CSS in JS                   |
| `sass`                | Sass compiler                                |
| `sass-loader`         | Loads and compiles Sass to CSS in Webpack    |
| `html-loader`         | Loads and processes HTML files               |
| `html-webpack-plugin` | Generates an HTML file with injected scripts |

