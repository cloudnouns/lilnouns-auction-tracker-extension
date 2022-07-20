<script>
	import { Auction } from '$lib/store';
	import dayjs from 'dayjs';

	let now, totalAuctionTime, timeRemaining, progress;

	$: if ($Auction?.startTime && $Auction?.endTime) {
		totalAuctionTime = $Auction?.endTime.diff($Auction.startTime, 's') || 0;
		updateProgressBar();
	}

	const updateProgressBar = () => {
		now = dayjs();

		// if auction is over, set status & progress bar
		if (now.isAfter($Auction.endTime)) {
			console.log('auction over');
			progress = totalAuctionTime;
			// also check if settled or not
			return;
		}

		timeRemaining = $Auction.endTime.diff(now, 's');
		progress = totalAuctionTime - timeRemaining;
		console.log(timeRemaining + 'seconds left in auction');
	};
</script>

{#if $Auction}
	<div class="px-3">
		<label for="timer" class="flex items-center justify-between">
			<p>#{$Auction.id}</p>
			<p>Awaiting Settlement</p>
		</label>

		<progress
			id="timer"
			value={progress}
			max={totalAuctionTime}
			class="h-3 w-full rounded-full border-2 border-black"
		/>
	</div>
{/if}
