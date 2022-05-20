import { writable } from 'svelte/store';
import type { enums } from './enums/enums';

interface AlertInputInterface {
	label: string;
	placeholder: string;
	multiline: boolean;
	function: () => void;
}

interface Alert {
	title: string;
	type?: typeof enums.AlertType;
	message: string;
	id: string;
	show: boolean;
	close?: () => void;
	input?: AlertInputInterface;
}

type AlertStore = Alert;

export default writable<AlertStore>(null);
