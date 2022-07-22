<script>
	import { Prefs, getAuctionData } from '$lib/store';

	const toggleDaoPref = () => {
		const { dao } = $Prefs;
		$Prefs.dao = dao === 'nouns' ? 'lilnouns' : 'nouns';
		getAuctionData();
	};
</script>

<div class="mt-24">
	<button on:click={toggleDaoPref}>Toggle DAO</button>
	<p>current dao: {$Prefs.dao}</p>
</div>
