import { writable } from 'svelte/store';

interface Alert {
    title: string,
    message: string,
    id: string,   
    show: boolean,
}

type AlertStore = Alert;

export default writable<AlertStore>(null);