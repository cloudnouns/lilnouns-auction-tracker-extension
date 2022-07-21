<script>
	import { Auction } from '$lib/store';
	import dayjs from 'dayjs';

	let now, totalAuctionTime, timeRemaining, progress, status;

	$: if ($Auction?.startTime && $Auction?.endTime) {
		totalAuctionTime = $Auction?.endTime.diff($Auction?.startTime, 's');
		updateProgressBar();
	}

	const updateProgressBar = () => {
		now = dayjs();

		// if auction is over, set status & progress bar
		if (now.isAfter($Auction?.endTime)) {
			console.log('auction over');
			progress = totalAuctionTime;
			// also check if settled or not
			if ($Auction.settled) {
				status = '';
			} else {
				status = 'Awaiting settlement';
			}
			return;
		}

		timeRemaining = $Auction?.endTime.diff(now, 's');
		progress = totalAuctionTime - timeRemaining;
		status = 'in progress';
		console.log(timeRemaining + 's left in auction');
	};
</script>

<div class="px-3">
	<label for="timer" class="flex items-center justify-between">
		<p>#{$Auction?.id}</p>
		<p>{status}</p>
	</label>

	<progress
		id="timer"
		value={progress || 0}
		max={totalAuctionTime}
		class="h-3 w-full rounded-full border-2 border-black"
	/>
</div>
