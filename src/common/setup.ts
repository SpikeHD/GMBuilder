import { commands, window, workspace } from "vscode";
import * as os from 'os';
import * as fs from 'fs';

const userdir = os.homedir();
const isWin = process.platform === 'win32';

export function firstTimeSetup() {
  const slash = !isWin ? '/' : '\\';
  const gmConfig = workspace.getConfiguration('gmbuilder')
  let runtimePath = gmConfig.get('runtimePath') as string;
  let betaRuntimePath = gmConfig.get('betaRuntimePath') as string;

  if (runtimePath?.length <= 0 && betaRuntimePath?.length <= 0) {
    runtimePath = `${userdir}${['GameMakerStudio2', 'Cache', 'runtimes'].join(slash)}`;
    betaRuntimePath = `${userdir}${['GameMakerStudio2-Beya', 'Cache', 'runtimes'].join(slash)}`

    // Autofill settings with user dir
    gmConfig.update('runtimePath', runtimePath);
    gmConfig.update('betaRuntimePath', betaRuntimePath);
  }

  // Now that we definitely have runtime paths, check them and set the first runtime listed, if there are any
  let runtimeSelected = gmConfig.get('selectedRuntime') as string;
  let betaRuntimeSelected = gmConfig.get('selectedBetaRuntime') as string;

  if (runtimeSelected?.length <= 0 && betaRuntimeSelected?.length <= 0) {
    if (fs.existsSync(runtimePath)) {
      const runtimes = fs.readdirSync(runtimePath);
      const first = runtimes[0];

      gmConfig.update('selectedRuntime', first);
    }

    if (fs.existsSync(betaRuntimePath)) {
      const betaRuntimes = fs.readdirSync(betaRuntimePath);
      const first = betaRuntimes[0];

      gmConfig.update('selectedBetaRuntime', first);
    }
  }
}