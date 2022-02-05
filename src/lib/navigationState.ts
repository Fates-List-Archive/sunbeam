// stores/navigationState.ts

import { writable } from 'svelte/store';

type NavigationState = "loading" | "loaded" | null;

export default writable<NavigationState>(null);
