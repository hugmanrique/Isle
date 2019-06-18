import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const isProd = process.env.NODE_ENV === 'production';

export default function(pkg) {
  return {
    input: 'src/index.js',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: isProd
    },
    external: ['fs', 'path'],
    plugins: [
      // Externalize deps and peerDeps
      external({
        includeDependencies: true
      }),
      // Use node resolve algorithm
      resolve({
        preferBuiltins: true
      }),
      // Transpile sources using babel preset (.babelrc)
      babel({
        exclude: /node_modules/
      }),
      // Convert CJS modules to ES6
      commonjs({
        include: /node_modules/
      }),
      // Minify in production
      isProd && terser()
    ].filter(Boolean)
  };
}
