import * as vscode from 'vscode';
import { runtimeSelect, betaRuntimeSelect } from './commands/runtime';
import { firstTimeSetup, registerRuntimeChangeEventHandler } from './common/setup';

export function activate(context: vscode.ExtensionContext) {
	// Settings are by-workspace
	if (!vscode.workspace.workspaceFolders) {
		return;
	}
	
	// This will run some stuff if none of the config options are set
	firstTimeSetup();

	// This sets the runtime when a runtime path is first added
	registerRuntimeChangeEventHandler();

	context.subscriptions.push(runtimeSelect());
	context.subscriptions.push(betaRuntimeSelect());
}

export function deactivate() {}
