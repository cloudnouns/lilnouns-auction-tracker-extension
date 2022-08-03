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

<div class="px-3 mb-5">
	<label for="timer" class="flex items-center justify-between px-1">
		<p class="text-base text-black/80 label"><span class="text-xs">#</span>{$Auction?.id}</p>
		<p class="text-base value">{status}</p>
	</label>

	<div class="-mt-1">
		<progress
			id="timer"
			value={progress || 0}
			max={totalAuctionTime || 1}
			class="w-full h-3 border-2 border-black rounded-full"
		/>
	</div>
</div>
