import { get } from 'svelte/store';
import type { RawAuction, ParsedAuction } from './global';
import { ethers, BigNumber } from 'ethers';
import { provider } from '$lib/store';
import dayjs from 'dayjs';

export const resolveEnsName = async (address: string): Promise<string | null> => {
	if (!address) return null;
	return await get(provider).lookupAddress(address);
};

export const parseAuctionData = (data: RawAuction): ParsedAuction => {
	const { id, amount, startTime, endTime, bids, bidder, settled, noun } = data;

	return {
		id: BigNumber.from(id).toNumber(),
		amount: Number(ethers.utils.formatEther(amount)).toFixed(2),
		startTime: dayjs.unix(BigNumber.from(startTime).toNumber()),
		endTime: dayjs.unix(BigNumber.from(endTime).toNumber()),
		bidTime: dayjs.unix(BigNumber.from(bids[0].blockTimestamp).toNumber()),
		bidder: bidder?.id,
		settled,
		seed: noun?.seed
	};
};

export const truncateAddress = (address: string) => {
	if (!address) return null;
	return address.substring(0, 6) + '...' + address.substring(address.length - 4);
};
