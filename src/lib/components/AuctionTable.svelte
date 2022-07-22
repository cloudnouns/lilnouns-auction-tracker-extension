<script>
	import { PastAuctions } from '$lib/store';
	import TableItem from '$lib/components/TableItem.svelte';
</script>

{#if $PastAuctions}
	<div class="px-3">
		{#each $PastAuctions as auction (auction.id)}
			<TableItem {auction} />
		{/each}
	</div>
{/if}
