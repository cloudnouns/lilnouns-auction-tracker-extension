<script>
	import { Auction } from '$lib/store';

	let totalAuctionTime;

	$: if ($Auction?.startTime && $Auction?.endTime) {
		totalAuctionTime = $Auction?.endTime.diff($Auction.startTime, 's');
	}
</script>

{#if $Auction}
	<div>
		<label for="timer" class="flex items-center justify-between">
			<p>#{$Auction.id}</p>
			<p>Awaiting Settlement</p>
		</label>

		<progress
			id="timer"
			value="65"
			max="100"
			class="h-3 w-full rounded-full border-2 border-black"
		/>
	</div>
{/if}
