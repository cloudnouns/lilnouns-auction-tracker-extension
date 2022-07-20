<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import CurrentAuction from '$lib/components/CurrentAuction.svelte';
	import AuctionTable from '$lib/components/AuctionTable.svelte';
</script>

<Navbar />

<div class="flex flex-col">
	<Timer />
	<CurrentAuction />
	<AuctionTable />
</div>
