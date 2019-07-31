const path = require('path')
const buble = require('rollup-plugin-buble')
const alias = require('rollup-plugin-alias')
const cjs = require('rollup-plugin-commonjs')
// const replace = require('rollup-plugin-replace')
const node = require('rollup-plugin-node-resolve')
const copy = require('rollup-plugin-copy');

// postcss
const postcss = require('rollup-plugin-postcss');
const simplevars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');
const clear = require('rollup-plugin-clear');

const version = process.env.VERSION || require('../package.json').version

const banner =
  '/*!\n' +
  ` * Jmp.js v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} Navy An\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const aliases = require('./alias')

const resolve = p => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}

const builds = {
  'web-full-dev': {
    entry: resolve('jmp/index.js'),
    dest: resolve(`dist-v${version}/jmp.js`),
    format: 'umd',
    env: 'development',
    alias: {
      he: './entity-decoder'
    },
    banner,
    plugins: [
      copy({
        targets: [{
            src: 'node_modules/codemirror/lib',
            dest: `dist-v${version}/lib/codemirror`
          },
          {
            src: 'node_modules/codemirror/mode',
            dest: `dist-v${version}/lib/codemirror`
          },
          {
            src: 'node_modules/codemirror/theme',
            dest: `dist-v${version}/lib/codemirror`
          },
          {
            src: 'src/lib/highlight/highlight.min.js',
            dest: `dist-v${version}/lib/highlight`
          },
          {
            src: 'src/lib/highlight/languages/javascript.min.js',
            dest: `dist-v${version}/lib/highlight/languages`
          },
          {
            src: 'src/lib/highlight/agate.min.css',
            dest: `dist-v${version}/lib/highlight`
          },
          {
            src: 'node_modules/lodash/lodash.js',
            dest: `dist-v${version}/lib/lodash`
          },
          {
            src: 'src/lib/mdjs/mdjs.js',
            dest: `dist-v${version}/lib/mdjs`
          },
          {
            src: 'src/font',
            dest: `dist-v${version}`
          }
        ]
      })
    ]
  },
  // Runtime+compiler production build  (Browser)
  'web-full-prod': {
    entry: resolve('jmp/index.js'),
    dest: resolve(`dist-v${version}/jmp.min.js`),
    format: 'umd',
    env: 'production',
    alias: {
      he: './entity-decoder'
    },
    banner
  }
}

function genConfig(name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: ['lodash', 'CodeMirror', 'highlight'],
    plugins: [
      postcss({
        plugins: [
          simplevars(),
          nested(),
          cssnext({
            warnForDuplicates: false,
          }),
          cssnano(),
        ],
        extensions: ['.css'],
      }),
      alias(Object.assign({}, aliases, opts.alias)),
      node(), cjs()
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Jmp'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    },
    cache: true
  }

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}