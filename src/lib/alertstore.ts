import { writable } from 'svelte/store';
import type { AlertType } from './enums/enums';

interface AlertInputInterface {
	label: string;
	placeholder: string;
	multiline: boolean;
	required: boolean;
	function: (value) => void;
}

interface Alert {
	title: string;
	type?: AlertType;
	message: string;
	id: string;
	show: boolean;
	close?: () => void;
	input?: AlertInputInterface;
}

type AlertStore = Alert;

export default writable<AlertStore>(null);
