import { writable } from 'svelte/store';
import type { AlertType, AlertInputType } from './enums/enums';

interface AlertInputInterface {
	label: string;
	placeholder: string;
	multiline: boolean;
	required?: boolean;
	minlength: number;
	maxlength: number;
	type?: AlertInputType;
	description?: string;
	id?: string; // Optional id
	validate?: (value) => string;
}

interface Alert {
	title: string;
	type?: AlertType;
	message: string;
	id: string;
	show: boolean;
	close?: () => void;
	submit?: (value) => void;
	inputs?: AlertInputInterface[];
}

type AlertStore = Alert;

export default writable<AlertStore>(null);

export let errorStore = writable<boolean>(null);