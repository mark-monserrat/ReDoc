/* tslint:disable:no-implicit-dependencies */
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as  fs from 'fs-extra';
import * as path from 'path';
import * as PostCompile from 'post-compile-webpack-plugin';
import * as webpack from 'webpack';

const nodeExternals = require('webpack-node-externals')({
  // bundle in moudules that need transpiling + non-js (e.g. css)
  whitelist: [
    'swagger2openapi',
    /reftools/,
    'oas-resolver',
    'oas-kit-common',
    'oas-schema-walker',
    /\.(?!(?:jsx?|json)$).{1,5}$/i,
  ],
});

const VERSION = JSON.stringify(require('./package.json').version);
const REVISION = JSON.stringify(
  require('child_process')
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim(),
);

const BANNER = `ReDoc - OpenAPI/Swagger-generated API Reference Documentation
-------------------------------------------------------------
  Version: ${VERSION}
  Repo: https://github.com/Rebilly/ReDoc`;

export default (env: { standalone?: boolean } = {}, { mode }) => ({
  entry: env.standalone ? ['./src/polyfills.ts', './src/standalone.tsx'] : './src/index.ts',
  output: {
    filename: env.standalone ? 'redoc.standalone.js' : 'redoc.lib.js',
    path: path.join(__dirname, '/bundles'),
    library: 'Redoc',
    libraryTarget: 'umd',
    globalObject: 'this',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  node: {
    fs: 'empty',
  },

  performance: false,

  optimization: {
    minimize: !!env.standalone,
  },

  externals: env.standalone
    ? {
      esprima: 'esprima',
      'node-fetch': 'null',
    }
    : (context, request, callback) => {
      // ignore node-fetch dep of swagger2openapi as it is not used
      if (/node-fetch$/i.test(request)) {
        return callback(null, 'var undefined');
      }
      if (/esprima$/i.test(request)) {
        return callback(null, 'var undefined');
      }
      return nodeExternals(context, request, callback);
    },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'es2015',
                declaration: false,
              },
            },
          },
          {
            loader: 'babel-loader',
            options: {
              generatorOpts: {
                decoratorsBeforeExport: true,
              },
              plugins: [
                ['@babel/plugin-syntax-typescript', { isTSX: true }],
                ['@babel/plugin-syntax-decorators', { legacy: true }],
                '@babel/plugin-syntax-jsx',
                [
                  'babel-plugin-styled-components',
                  {
                    minify: true,
                    displayName: mode !== 'production',
                  },
                ],
              ],
            },
          },
        ],
        exclude: [/node_modules/],
      },
      {
        test: /node_modules\/(swagger2openapi|reftools|oas-resolver|oas-kit-common|oas-schema-walker)\/.*\.js$/,
        use: {
          loader: 'ts-loader',
          options: {
            instance: 'ts2js-transpiler-only',
            transpileOnly: true,
            compilerOptions: {
              allowJs: true,
              declaration: false,
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            minimize: true,
          },
        },
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __REDOC_VERSION__: VERSION,
      __REDOC_REVISION__: REVISION,
    }),
    new ForkTsCheckerWebpackPlugin({ silent: true }),
    new webpack.BannerPlugin(BANNER),
    ignore(/js-yaml\/dumper\.js$/),
    ignore(/json-schema-ref-parser\/lib\/dereference\.js/),
    env.standalone ? ignore(/^\.\/SearchWorker\.worker$/) : ignore(/$non-existing^/),
    new PostCompile(() => {
      // createIfDoesntExist('./build');
      // createIfDoesntExist('./build/bundles');
      // createIfDoesntExist('./build/typings');

      console.log('Copying bundles to build...');
      copySync('./bundles', './build/bundles', true);
      console.log('Copying typings to build...');
      copySync('./typings', './build/typings', true);
      console.log('Copying package.json to build...');
      copySync('./package.json', './build/package.json', true);
      console.log('Copying CHANGELOG to build...');
      copySync('./CHANGELOG.md', './build/CHANGELOG.md', true);
      console.log('Copying README to build...');
      copySync('./README.md', './build/README.md', true);
      console.log('Copying LICENSE to build...');
      copySync('./LICENSE', './build/LICENSE', true);
    }),
  ],
});

function ignore(regexp) {
  return new webpack.NormalModuleReplacementPlugin(regexp, require.resolve('lodash/noop.js'));
}

// const createIfDoesntExist = dest => {
//   try {
//     if (!fs.existsSync(dest)) {
//       fs.mkdirSync(dest);
//     } else {
//       fs.rmdirAsync(dest);
//     }
//   } catch (error) {
//     // err
//   }
// };

const copySync = (src, dest, overwrite) => {

  if (overwrite && fs.existsSync(dest)) {
    try {
      const stat = fs.lstatSync(dest);
      if (stat.isFile()) {
        fs.unlinkSync(dest);
      } else if (stat.isDirectory()) {
        fs.rmdirAsync(dest);
      }
    } catch (error) {
      // err
    }
  }

  if (fs.existsSync(dest)) {
    try {
      const stat = fs.lstatSync(dest);
      if (stat.isFile()) {
        const data = fs.readFileSync(src);
        fs.writeFileSync(dest, data);
      } else if (stat.isDirectory()) {
        fs.copy(src, dest);
      }
    } catch (error) {
      // err
    }
  } else {
    try {
      const data = fs.readFileSync(src);
      fs.writeFileSync(dest, data);
    } catch (error) {
      // err
    }
  }
};

const rmdirAsync = (pathB, callback) => {
  fs.readdir(pathB, (err, files) => {
    if (err) {
      // Pass the error on to callback
      callback(err, []);
      return;
    }
    const wait = files.length;
    let count = 0;
    const folderDone = (error?: any) => {
      count++;
      // If we cleaned out all the files, continue
      if (count >= wait || error) {
        fs.rmdir(pathB, callback);
      }
    };
    // Empty directory to bail early
    if (!wait) {
      folderDone();
      return;
    }

    // Remove one or more trailing slash to keep from doubling up
    pathB = pathB.replace(/\/+$/, '');
    files.forEach(file => {
      const curPath = path + '/' + file;
      fs.lstat(curPath, (error, stats) => {
        if (error) {
          callback(error, []);
          return;
        }
        if (stats.isDirectory()) {
          rmdirAsync(curPath, folderDone);
        } else {
          fs.unlink(curPath, folderDone);
        }
      });
    });
  });
};
