import { writable } from 'svelte/store';
import type { AlertType, AlertInputType } from './enums/enums';

interface AlertInputInterface {
	label: string;
	placeholder: string;
	multiline: boolean;
	required?: boolean;
	type?: AlertInputType;
}

interface Alert {
	title: string;
	type?: AlertType;
	message: string;
	id: string;
	show: boolean;
	close?: () => void;
	submit?: (value) => void;
	validate?: (value) => string;
	inputs?: AlertInputInterface[];
}

type AlertStore = Alert;

export default writable<AlertStore>(null);
