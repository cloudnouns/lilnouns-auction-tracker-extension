<script>
	import { onMount } from 'svelte';
	import { Auction } from '$lib/store';
	import { truncateAddress, resolveEnsName, createNoun, getRelativeTimeFromNow } from '$lib/utils';

	let amount, noun, address, ens, relativeTime;

	$: image = noun ? noun.images.svg : '/loading.gif';
	$: walletLabel = ens || truncateAddress(address);
	$: bidLabel = $Auction?.isActive ? 'Current Bid' : 'Winning Bid';
	$: bidderLabel = $Auction?.isActive ? 'Bidder' : 'Won By';
	$: if ($Auction) {
		amount = $Auction?.amount;
		address = $Auction?.bidder;
		noun = createNoun($Auction?.seed, 'lil');
		checkForEns(address);

		if ($Auction?.isActive && $Auction?.bidTime) {
			relativeTime = getRelativeTimeFromNow($Auction?.bidTime);
		} else if ($Auction?.isActive) {
			relativeTime = '';
		} else {
			relativeTime = getRelativeTimeFromNow($Auction?.endTime);
		}
	}

	const checkForEns = async (address) => {
		ens = await resolveEnsName(address);
	};
</script>

<div class="grid grid-cols-2 px-3">
	<div class="">
		<div>
			<p>{bidLabel}</p>
			<p>Ξ {amount || '0.00'}</p>
		</div>

		<div class="opacity-0 transition" class:show={walletLabel}>
			<p>{bidderLabel}</p>
			<p>{walletLabel}</p>
			<p class="opacity-0 transition" class:show={walletLabel}>{relativeTime}</p>
		</div>
	</div>

	<div class="bg-white rounded border border-black drop-shadow-[5px_5px_0_rgba(0,0,0,0.8)]">
		<img
			src={image}
			alt="noun"
			class="w-full bg-gradient-to-b from-slate-100/90 via-lime-50 to-slate-300/80"
		/>
	</div>
</div>

<style>
	.show {
		@apply opacity-100;
	}
</style>
