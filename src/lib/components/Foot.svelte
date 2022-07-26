<script>
	import { Prefs, getAuctionData } from '$lib/store';

	const toggleDaoPref = () => {
		const { dao } = $Prefs;
		$Prefs.dao = dao === 'nouns' ? 'lilnouns' : 'nouns';
		getAuctionData();
	};
</script>

<div class="sticky bottom-0 text-white bg-black">
	<div class="flex items-center justify-center gap-5">
		<button on:click={toggleDaoPref}>toggle dao</button>
	</div>
</div>

<style>
	button {
		@apply text-base bg-slate-100/90 text-black px-2 py-1 my-px;
	}
</style>
