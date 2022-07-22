<script>
	import { onDestroy } from 'svelte';
	import { Auction } from '$lib/store';
	import { getTimeLeftInSeconds, getRelativeTimeFromAuctionEnd } from '$lib/utils';

	let now, totalAuctionTime, timeLeftInSeconds, status, progress, interval;

	$: if ($Auction) updateTimer($Auction);
	$: if (timeLeftInSeconds && timeLeftInSeconds > 0) {
		progress = totalAuctionTime - timeLeftInSeconds;
		status = getRelativeTimeFromAuctionEnd(timeLeftInSeconds).formatted;
	}

	const startTimerInterval = () => {
		return setInterval(() => {
			if (timeLeftInSeconds <= 0) {
				status = 'Awaiting Settlement';
				interval = clearInterval(interval);
				return;
			}
			timeLeftInSeconds = timeLeftInSeconds - 1;
		}, 1000);
	};

	const updateTimer = (auction) => {
		const { isActive, startTime, endTime } = auction;
		totalAuctionTime = endTime.diff(startTime, 's');

		if (isActive) {
			timeLeftInSeconds = getTimeLeftInSeconds(endTime);
			if (!interval) interval = startTimerInterval();
		} else {
			timeLeftInSeconds = 0;
			status = 'Awaiting Settlement';
			progress = totalAuctionTime;
			interval = clearInterval(interval);
		}
	};

	onDestroy(() => (interval = clearInterval(interval)));
</script>

<div class="px-3">
	<label for="timer" class="flex items-center justify-between">
		<p>#{$Auction?.id}</p>
		<p>{status}</p>
	</label>

	<progress
		id="timer"
		value={progress || 0}
		max={totalAuctionTime || 1}
		class="h-3 w-full rounded-full border-2 border-black"
	/>
</div>
