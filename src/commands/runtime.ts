import { commands, window, workspace } from "vscode";
import * as fs from 'fs';

export function runtimeSelect() {
  return commands.registerCommand('gmbuilder.selectRuntime', async () => {
    const path = workspace.getConfiguration('gmbuilder').get('runtimePath') as fs.PathLike;
    
    if (!fs.existsSync(path)) {
      window.showErrorMessage('GMBuilder runtime path is not set, or is set incorrectly!');
      commands.executeCommand('workbench.action.openGlobalSettings');
      return;
    }

    // const runtimes = fs.readdirSync();
  });
}

export function betaRuntimeSelect() {
  return commands.registerCommand('gmbuilder.selectBetaRuntime', async () => {
    const path = workspace.getConfiguration('gmbuilder').get('betaRuntimePath') as fs.PathLike;
    
    if (!fs.existsSync(path)) {
      window.showErrorMessage('GMBuilder runtime path is not set, or is set incorrectly!');
      commands.executeCommand('workbench.action.openGlobalSettings');
      return;
    }
  });
}