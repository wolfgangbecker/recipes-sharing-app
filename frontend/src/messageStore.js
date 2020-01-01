import { writable } from 'svelte/store';

function createMessageStore() {
	const { subscribe, set, update } = writable(null);
	let currentTimeout = null;

	return {
		subscribe,
		show: ({type, title, text}) => {
			set({type, title, text});
			currentTimeout = setTimeout(() => {
				set(null);
			}, 6000);
		},
		hide: () => {
			clearTimeout(currentTimeout);
			set(null);
		}
	};
}

export default createMessageStore();
