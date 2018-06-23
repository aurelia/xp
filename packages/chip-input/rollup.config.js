import typescript from 'rollup-plugin-typescript2';
import * as fse from 'fs-extra';
import html from 'rollup-plugin-html';

export default ([
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/es2015/index.js',
      format: 'es'
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            target: 'es2015',
          }
        },
        cacheRoot: '.rollupcache'
      }),
      copy({
        verbose: true,
        files: [
          { from: 'src/ux-chip-input.css', to: 'dist/es2015/ux-chip-input.css' },
          { from: 'src/ux-tag.css', to: 'dist/es2015/ux-tag.css' },
          { from: 'src/ux-chip.css', to: 'dist/es2015/ux-chip.css' }
        ]
      }),
      html({
        include: '**/*.html',
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
        }
      })
    ]
  }
].concat(process.env.NODE_ENV !== 'production'
  ? []
  : [{
    input: 'src/index.ts',
    output: [
      { file: 'dist/commonjs/index.js', format: 'cjs' },
      { file: 'dist/amd/index.js', format: 'amd', amd: { id: '@aurelia-ux/chip-input' } },
      { file: 'dist/native-modules/index.js', format: 'es' }
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            declarationDir: null
          }
        },
        cacheRoot: '.rollupcache',
      }),
      copy({
        verbose: true,
        files: [
          { from: 'src/ux-chip-input.css', to: 'dist/amd/ux-chip-input.css' },
          { from: 'src/ux-tag.css', to: 'dist/amd/ux-tag.css' },
          { from: 'src/ux-chip.css', to: 'dist/amd/ux-chip.css' },
          { from: 'src/ux-chip-input.css', to: 'dist/commonjs/ux-chip-input.css' },
          { from: 'src/ux-tag.css', to: 'dist/commonjs/ux-tag.css' },
          { from: 'src/ux-chip.css', to: 'dist/commonjs/ux-chip.css' },
          { from: 'src/ux-chip-input.css', to: 'dist/native-modules/ux-chip-input.css' },
          { from: 'src/ux-tag.css', to: 'dist/native-modules/ux-tag.css' },
          { from: 'src/ux-chip.css', to: 'dist/native-modules/ux-chip.css' }
        ]
      }),
      html({
        include: '**/*.html',
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
        }
      })
    ]
  }]
));

function success (name, src, dest) {
  console.log('(' + name + ") '" + src.green + "' -> '" + dest.green + "' (" + '\u2714'.green + ')');
}

function fatal (name, src, dest, err) {
  console.error('(' + name + ") '" + src.red + "' -> '" + dest.red + "' (" + '\u2718'.red + ')');
  console.error();
  console.error('    ' + err);
  process.exit(err.errno);
}

var copyTimer;

/**
 * @param {{ verbose: boolean, files: { from: string, to: string }[] }} options
 */
function copy (options = {}) {
  const { verbose = false, files = [] } = options;
  const name = 'rollup-plugin-copy-fork-aurelia';

  return {
    name: name,
    onwrite: function (object) {
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        for (const { from, to } of files) {
          fse.copy(from, to).then(() => {
            if (verbose) {
              success(name, from, to);
            }
          }).catch(ex => {
            fatal(name, from, to, ex);
          });
        }
      }, 1000);
    }
  };
}
