<script>
	import { onMount } from 'svelte';
	import { truncateAddress, resolveEnsName } from '$lib/utils';

	export let auction;
	const address = auction?.bidder;
	let ens = '';

	$: walletLabel = ens || truncateAddress(address);

	onMount(async () => {
		ens = await resolveEnsName(address);
	});
</script>

<div class="grid grid-cols-3">
	<p>#{auction?.id}</p>
	<p>Ξ {auction?.amount}</p>
	<p class="truncate">{walletLabel || 'n/a'}</p>
</div>
