import * as vscode from 'vscode';
import { runtimeSelect, betaRuntimeSelect } from './commands/runtime';
import { firstTimeSetup, registerRuntimeChangeEventHandler } from './common/setup';

// This sets the runtime when a runtime path is first added
registerRuntimeChangeEventHandler();
	
// This will run some stuff if none of the config options are set
firstTimeSetup();

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(runtimeSelect());
	context.subscriptions.push(betaRuntimeSelect());
}

export function deactivate() {}
