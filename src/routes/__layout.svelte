<script>
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	import { getAuctionData } from '$lib/store';

	let interval;

	onMount(async () => {
		getAuctionData();

		interval = setInterval(() => {
			getAuctionData();
		}, 10 * 1000);
	});

	onDestroy(() => (interval = clearInterval(interval)));
</script>

<div
	class="h-[600px] max-h-[600px] w-full max-w-[375px] overflow-x-hidden bg-gradient-to-b from-lime-100 to-cloudnoun-green"
>
	<slot />
</div>
