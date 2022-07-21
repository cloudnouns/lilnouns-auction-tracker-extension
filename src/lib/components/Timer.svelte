<script>
	import { Auction } from '$lib/store';
	import { getAuctionStatus, getTimeLeft } from '$lib/utils';
	import Countdown from '$lib/components/Countdown.svelte';

	let now, totalAuctionTime, timeRemaining, status, progress;

	$: if ($Auction) updateTimer($Auction);

	const updateTimer = (auction) => {
		const { isActive, startTime, endTime } = auction;
		totalAuctionTime = endTime.diff(startTime, 's');

		if (isActive) {
			timeRemaining = getTimeLeft(endTime);
			console.log(timeRemaining);
			progress = totalAuctionTime - timeRemaining;
		} else {
			timeRemaining = 0;
			status = 'Awaiting Settlement';
			progress = totalAuctionTime;
		}
	};
</script>

<div class="px-3">
	<label for="timer" class="flex items-center justify-between">
		<p>#{$Auction?.id}</p>

		{#if $Auction?.isActive}
			<Countdown seconds={timeRemaining} />
		{:else}
			<p>{status}</p>
		{/if}
	</label>

	<progress
		id="timer"
		value={progress || 0}
		max={totalAuctionTime || 1}
		class="h-3 w-full rounded-full border-2 border-black"
	/>
</div>
