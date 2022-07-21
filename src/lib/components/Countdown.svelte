<script>
	import { onMount, onDestroy } from 'svelte';
	import { formatRelativeTime, getAuctionDataOnDelay } from '$lib/utils';

	export let seconds;
	let value = '';
	let interval;

	onMount(() => {
		interval = setInterval(() => {
			if (seconds <= 0) {
				value = 'Awaiting Settlement';
				// getAuctionDataOnDelay(5);
				clearInterval(interval);
				return;
			}

			value = formatRelativeTime(seconds).formatted;
			seconds = seconds - 1;
		}, 1000);
	});
	onDestroy(() => clearInterval(interval));
</script>

<p>{value}</p>
