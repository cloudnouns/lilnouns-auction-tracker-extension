<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import CurrentAuction from '$lib/components/CurrentAuction.svelte';
	import AuctionTable from '$lib/components/AuctionTable.svelte';
	import Foot from '$lib/components/Foot.svelte';
</script>

<Navbar />

<div class="flex flex-col">
	<CurrentAuction />
	<Timer />
	<AuctionTable />

	<div class="flex items-center justify-center mt-8 mb-6">
		<a
			href="https://cloudnouns.com"
			target="_blank"
			class="transition opacity-40 hover:opacity-100"
		>
			<img src="/logo.svg" alt="cloudnouns.com" class="h-6" />
		</a>
	</div>

	<!-- <Foot /> -->
</div>
