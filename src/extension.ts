import * as vscode from 'vscode';
import { runtimeSelect, betaRuntimeSelect } from './commands/runtime';
import { firstTimeSetup } from './common/setup';

export function activate(context: vscode.ExtensionContext) {
	// This will run some stuff if none of the config options are set
	firstTimeSetup();

	context.subscriptions.push(runtimeSelect());
	context.subscriptions.push(betaRuntimeSelect());
}

export function deactivate() {}
