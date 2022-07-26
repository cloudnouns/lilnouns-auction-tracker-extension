<script lang="ts">
	import { onMount } from 'svelte';
	import { Prefs } from '$lib/store';
	import { truncateAddress, resolveEnsName, getNounUrl, createNoun } from '$lib/utils';

	export let auction;
	const address = auction?.bidder;
	let ens = '';

	$: walletLabel = ens || truncateAddress(address);
	$: url = getNounUrl($Prefs?.dao, auction?.id);
	$: image = noun ? noun.images.svg : loadingImg;
	$: loadingImg = $Prefs?.dao === 'lilnouns' ? '/lil-loading.gif' : '/loading.gif';

	$: noun = auction?.seed ? createNoun(auction.seed, $Prefs.dao) : null;
	$: dateLabel = auction?.endTime.format('MMM DD');

	onMount(async () => {
		ens = await resolveEnsName(address);
	});
</script>

<a
	href={url}
	target="_blank"
	class="group grid grid-cols-5 hover:bg-white items-center rounded border border-black transition hover:drop-shadow-[4px_4px_0_rgba(0,0,0,0.8)]"
>
	<div class="flex flex-col justify-between h-full col-span-3 px-2 py-1.5">
		<p class="label text-black/60"><span class="text-[10px]">#</span>{auction?.id}</p>
		<p class="text-base value">Ξ {auction?.amount}</p>
		<p class="font-reg leading-none font-semibold lowercase text-[11px] text-black/60 truncate">
			{walletLabel}
		</p>
	</div>

	<div class="relative col-span-2 border-l border-black">
		<div
			class="absolute flex items-center justify-center w-full h-full text-white transition opacity-0 bg-slate-900/60 backdrop-blur-sm group-hover:opacity-100"
		>
			⌐◧-◧
		</div>
		<img src={image} alt={'noun ' + auction?.id} class="nounBg" />
	</div>
</a>
