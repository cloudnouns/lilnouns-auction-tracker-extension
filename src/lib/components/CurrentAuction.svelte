<script>
	import { onMount } from 'svelte';
	import { Auction, Prefs } from '$lib/store';
	import {
		truncateAddress,
		resolveEnsName,
		createNoun,
		getRelativeTimeFromNow,
		getNounUrl
	} from '$lib/utils';

	let amount, noun, address, ens, relativeTime, url;

	$: image = noun ? noun.images.svg : '/loading.gif';
	$: walletLabel = ens || truncateAddress(address);
	$: bidLabel = $Auction?.isActive ? 'Current Bid' : 'Winning Bid';
	$: bidderLabel = $Auction?.isActive ? 'Bidder' : 'Won By';
	$: if ($Auction) {
		amount = $Auction?.amount;
		address = $Auction?.bidder;
		noun = createNoun($Auction?.seed, $Prefs.dao);
		checkForEns(address);
		url = getNounUrl($Prefs?.dao, $Auction?.id);

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

<div class="grid grid-cols-2 px-4 py-6 gap-3.5">
	<div
		class="bg-white rounded border border-black drop-shadow-[5px_5px_0_rgba(0,0,0,0.8)] relative group"
	>
		<a
			href={url}
			alt="open noun page"
			target="_blank"
			class="absolute flex flex-col items-center justify-center w-full h-full text-white transition opacity-0 bg-slate-900/60 backdrop-blur-sm group-hover:opacity-100"
		>
			<p>⌐◧-◧</p>
			<p class="text-xl font-bold">more info</p>
		</a>

		<img src={image} alt="noun" class="nounBg" />
	</div>

	<div class="flex flex-col justify-around">
		<div>
			<p class="label">{bidLabel}</p>
			<div class="flex items-center gap-1.5">
				{#if $Auction}
					<p class="text-xl font-bold leading-none mt-0.5">Ξ</p>
					<p class="value">{amount || '0.00'}</p>
				{:else}
					<div class="h-8 w-28 placeholder mt-1" />
				{/if}
			</div>
		</div>

		<div class="w-full transition opacity-0" class:show={walletLabel}>
			<p class="label">{bidderLabel}</p>
			<a
				href={'https://etherscan.io/address/' + address}
				alt="view on etherscan"
				target="_blank"
				class="text-base font-semibold break-all hover:text-cloudnoun-peach">{walletLabel}</a
			>
			<p class="transition opacity-0 text-black/50 text-[11px] label" class:show={walletLabel}>
				{relativeTime}
			</p>
		</div>
	</div>
</div>

<style>
	.show {
		@apply opacity-100;
	}
</style>
