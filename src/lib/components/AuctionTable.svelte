<script>
	import { PastAuctions } from '$lib/store';
	import TableItem from '$lib/components/TableItem.svelte';

	const items = new Array(5).fill();
</script>

<div class="grid grid-cols-2 gap-2.5 px-3">
	{#if $PastAuctions}
		{#each $PastAuctions as auction (auction.id)}
			<TableItem {auction} />
		{/each}
	{:else}
		{#each items as item}
			<div class="placeholder w-full h-[68px] bg-black/10" />
		{/each}
	{/if}
</div>
