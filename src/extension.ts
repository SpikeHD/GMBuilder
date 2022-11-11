import * as vscode from 'vscode';
import { runtimeSelect, betaRuntimeSelect } from './commands/runtime';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(runtimeSelect());
	context.subscriptions.push(betaRuntimeSelect());
}

export function deactivate() {}
