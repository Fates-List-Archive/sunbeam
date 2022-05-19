// Logging helper
const log = (...args) => {
	console[args[0]](
		`%c[${Date.now()}]%c[${args[1]}]%c`,
		'color:red;font-weight:bold;',
		'color:purple;font-weight:bold;',
		'',
		...args.slice(2)
	);
};

export function info(...args) {
	log('info', ...args);
}

export function debug(...args) {
	log('debug', ...args);
}

export function warn(...args) {
	log('warn', ...args);
}

export function error(...args) {
	log('error', ...args);
}
