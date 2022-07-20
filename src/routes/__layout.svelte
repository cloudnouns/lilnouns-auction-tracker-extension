<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { getAuctionData } from '$lib/store';

	onMount(async () => {
		getAuctionData();
	});
</script>

<div
	class="h-[600px] max-h-[600px] w-full max-w-[375px] overflow-x-hidden bg-gradient-to-b from-lime-100 to-cloudnoun-green"
>
	<slot />
</div>
