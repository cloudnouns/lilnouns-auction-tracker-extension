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
	$: dao = $Prefs.dao === 'nouns' ? 'classic' : 'lil';
	$: if ($Auction) {
		amount = $Auction?.amount;
		address = $Auction?.bidder;
		noun = createNoun($Auction?.seed, dao);
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

<div class="grid grid-cols-2 px-4 py-6">
	<div class="flex flex-col justify-around">
		<div>
			<p class="label">{bidLabel}</p>
			<div class="flex items-center gap-1.5">
				<p class="text-xl font-bold leading-none mt-0.5">Ξ</p>
				<p class="value">{amount || '0.00'}</p>
			</div>
		</div>

		<div class="opacity-0 transition" class:show={walletLabel}>
			<p class="label">{bidderLabel}</p>
			<a href={'https://etherscan.io/address/' + address} alt="view on etherscan" target="_blank"
				>{walletLabel}</a
			>
			<p class="opacity-0 transition" class:show={walletLabel}>{relativeTime}</p>
		</div>
	</div>

	<div class="bg-white rounded border border-black drop-shadow-[5px_5px_0_rgba(0,0,0,0.8)]">
		<a href={url} alt="open noun page" target="_blank" class="">
			<img
				src={image}
				alt="noun"
				class="w-full bg-gradient-to-b from-slate-100/90 via-lime-50 to-slate-300/80"
			/>
		</a>
	</div>
</div>

<style>
	.show {
		@apply opacity-100;
	}

	.value {
		@apply text-4xl font-bold leading-none text-black/80;
	}
</style>
