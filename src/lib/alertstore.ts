import { writable } from 'svelte/store';
import type { enums } from './enums/enums';

interface Alert {
	title: string;
	type?: typeof enums.AlertType;
	message: string;
	id: string;
	show: boolean;
	close?: () => void;
	input?: () => void;
}

type AlertStore = Alert;

export default writable<AlertStore>(null);
