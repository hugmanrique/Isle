/**
 * npm likes to close perfectly valid issues. This is a bruteforce hack
 * that installs transitive dependencies of local dependencies.
 *
 * This fix will waste disk space (duplicate deps),
 * feel free to contribute a better fix :)
 *
 * https://npm.community/t/npm-install-does-not-install-transitive-dependencies-of-local-dependency/2264
 * https://github.com/npm/npm/issues/13734
 * https://github.com/npm/npm/issues/20835
 */

const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

const exampleAppDir = path.resolve(__dirname, 'example');
const modules = fs.readdirSync('packages');
const npmOptions = { cwd: exampleAppDir };

const packageDirs = {};
const appDependencies = [];

const addDependencies = (deps = {}) =>
  appDependencies.push(...Object.keys(deps));

function parseDependencies() {
  modules.forEach(dirName => {
    const packageJsonPath = path.join('packages', dirName, 'package.json');

    const {
      name,
      dependencies,
      peerDependencies
    } = require(`./${packageJsonPath}`);

    packageDirs[name] = dirName;

    // Install everything just to be safe
    addDependencies(dependencies);
    addDependencies(peerDependencies);
  });
}

const logHandler = data => console.log(data.toString());

function fixLocalDeps() {
  for (let i = 0; i < appDependencies.length; i++) {
    const depName = appDependencies[i];

    if (!depName.startsWith('@isle')) {
      continue;
    }

    const dirName = packageDirs[depName];

    if (!dirName) {
      throw new Error(`Cannot find local package ${depName} in "packages/"`);
    }

    if (depName.contains('plugin')) {
      appDependencies.splice(i, 1);
      console.log(
        `Found plugin trans dep ${depName}. You will need to install this dep manually
        Use "npm i --no-package-lock --no-save ../packages/${dirName}"`
      );
    }

    appDependencies[i] = `../packages/${dirName}`;
  }
}

function attachLogger(child) {
  child.stdout.on('data', logHandler);
  child.stderr.on('data', logHandler);
  child.on('error', console.error);
}

const runGlobal = process.env.SKIP_GLOBAL === undefined;
const command = runGlobal ? 'npm i' : 'echo "Skipping global install"';

// Run initial install
const globalInstall = exec(command, npmOptions, err => {
  if (err) {
    throw err;
  }

  parseDependencies();

  fixLocalDeps();

  console.log(`Installing ${appDependencies.length} (direct) transitive deps`);

  const fixArgs = ['install', '--no-save'].concat(appDependencies);

  const transInstall = spawn('npm', fixArgs, npmOptions);

  attachLogger(transInstall);
});

attachLogger(globalInstall);
