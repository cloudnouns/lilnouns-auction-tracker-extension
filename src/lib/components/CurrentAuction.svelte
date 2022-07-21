<script>
	import { onMount } from 'svelte';
	import { Auction } from '$lib/store';
	import { Noun } from '@cloudnouns/kit';
	import { truncateAddress, resolveEnsName } from '$lib/utils';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);

	let amount, noun, address, ens, bidTimeDiff;

	$: image = noun ? noun.images.svg : '/loading.gif';
	$: walletLabel = ens || truncateAddress(address);
	$: if ($Auction) {
		amount = $Auction?.amount || '0.00';
		address = $Auction?.bidder;
		noun = createNoun($Auction?.seed);
		checkForEns(address);
		getRelativeBidTime();
	}

	const createNoun = (seed) => {
		seed = Object.values(seed).map((t) => Number(t));
		seed[0] = 9000;
		return new Noun({ traits: seed, style: 'lil' });
	};

	const checkForEns = async (address) => {
		ens = await resolveEnsName(address);
	};

	const getRelativeBidTime = () => {
		bidTimeDiff = $Auction.bidTime.fromNow();
	};
</script>

<div class="grid grid-cols-2 px-3">
	<div class="">
		<div>
			<p>Current Bid</p>
			<p>Ξ {amount}</p>
			<p class="opacity-0 transition" class:show={walletLabel}>{bidTimeDiff}</p>
		</div>

		<div class="opacity-0 transition" class:show={walletLabel}>
			<p>Bidder</p>
			<p>{walletLabel}</p>
		</div>
	</div>

	<div class="bg-white rounded border border-black drop-shadow-[2.5px_2.5px_0_rgba(0,0,0,0.8)]">
		<img src={image} alt="noun" class="w-full" />
	</div>
</div>

<style>
	.show {
		@apply opacity-100;
	}
</style>
