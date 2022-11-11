import { commands, ConfigurationTarget, window, workspace } from "vscode";
import * as fs from 'fs';

export function runtimeSelect() {
  return commands.registerCommand('gmbuilder.selectRuntime', async () => {
    const path = workspace.getConfiguration('gmbuilder').get('runtimePath') as fs.PathLike;
    
    if (!fs.existsSync(path)) {
      window.showErrorMessage('GMBuilder runtime path is not set, or is set incorrectly! Set this option in the extensions settings.');
      commands.executeCommand('workbench.action.openSettings');
      return;
    }

    await runtimeQuickPick(false);
  });
}

export function betaRuntimeSelect() {
  return commands.registerCommand('gmbuilder.selectBetaRuntime', async () => {
    const path = workspace.getConfiguration('gmbuilder').get('betaRuntimePath') as fs.PathLike;
    
    if (!fs.existsSync(path)) {
      window.showErrorMessage('GMBuilder beta runtime path is not set, or is set incorrectly! Set this option in the extensions settings.');
      commands.executeCommand('workbench.action.openSettings');
      return;
    }

    await runtimeQuickPick(true);
  });
}

/**
 * Create a QuickPick that allows selecting a runtime dynamically
 * 
 * @param beta Whether this should set the beta or regular runtime
 * @returns 
 */
async function runtimeQuickPick(beta: boolean) {
  const gmBuilder = workspace.getConfiguration('gmbuilder');
  const folder = beta ? gmBuilder.get('betaRuntimePath') : gmBuilder.get('runtimePath');
  const runtimes = fs.readdirSync(folder as fs.PathLike) || ['none'];

  const result = await window.showQuickPick(runtimes, {
    placeHolder: 'Select a runtime'
  });

  // No runtimes were available
  if (result === 'none') {
    return;
  }

  gmBuilder.update(beta ? 'selectedBetaRuntime' : 'selectedRuntime', result, ConfigurationTarget.Global);
}