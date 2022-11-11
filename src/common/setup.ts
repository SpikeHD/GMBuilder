import { commands, ConfigurationTarget, window, workspace } from "vscode";
import * as os from 'os';
import * as fs from 'fs';

const userdir = os.homedir();
const isWin = process.platform === 'win32';

/**
 * Do some scaffolding of settings and such
 */
export function firstTimeSetup() {
  const slash = !isWin ? '/' : '\\';
  const gmConfig = workspace.getConfiguration('gmbuilder');
  let runtimePath = gmConfig.get('runtimePath') as string;
  let betaRuntimePath = gmConfig.get('betaRuntimePath') as string;

  if (runtimePath?.length <= 0 && betaRuntimePath?.length <= 0) {
    runtimePath = `${userdir}${['GameMakerStudio2', 'Cache', 'runtimes'].join(slash)}`;
    betaRuntimePath = `${userdir}${['GameMakerStudio2-Beya', 'Cache', 'runtimes'].join(slash)}`

    // Autofill settings with user dir
    gmConfig.update('runtimePath', runtimePath, ConfigurationTarget.Global);
    gmConfig.update('betaRuntimePath', betaRuntimePath, ConfigurationTarget.Global);
  }

  // Now that we definitely have runtime paths, check them and set the first runtime listed, if there are any
  let runtimeSelected = gmConfig.get('selectedRuntime') as string;
  let betaRuntimeSelected = gmConfig.get('selectedBetaRuntime') as string;

  if (runtimeSelected?.length <= 0 && betaRuntimeSelected?.length <= 0) {
    setFirstRuntime();
    setFirstBetaRuntime();
  }
}

/**
 * Select the first runtime found in the folder when a runtime folder is selected
 */
export function registerRuntimeChangeEventHandler() {
  workspace.onDidChangeConfiguration(e => {
    let affectsRuntime = e.affectsConfiguration('gmbuilder.runtimePath');
    let affectsBetaRuntime = e.affectsConfiguration('gmbuilder.betaRuntimePath');

    if (affectsRuntime)  {
      setFirstRuntime();
    }

    if (affectsBetaRuntime) {
      setFirstBetaRuntime();
    }
  });
}

/**
 * Set the runtime to the very first one
 */
export function setFirstRuntime() {
  const gmConfig = workspace.getConfiguration('gmbuilder');
  let runtimePath = gmConfig.get('runtimePath') as string;

  if (fs.existsSync(runtimePath)) {
    const runtimes = fs.readdirSync(runtimePath);
    const first = runtimes[0];

    gmConfig.update('selectedRuntime', first, ConfigurationTarget.Global);
  }
}

/**
 * Set the beta runtime to the very first one
 */
export function setFirstBetaRuntime() {
  const gmConfig = workspace.getConfiguration('gmbuilder');
  let runtimePath = gmConfig.get('betaRuntimePath') as string;
  
  if (fs.existsSync(runtimePath)) {
    const runtimes = fs.readdirSync(runtimePath);
    const first = runtimes[0];

    gmConfig.update('selectedBetaRuntime', first, ConfigurationTarget.Global);
  }
}