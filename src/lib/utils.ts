import type { RawAuction, ParsedAuction } from './global';
import { ethers, BigNumber } from 'ethers';
import dayjs from 'dayjs';

export const parseAuctionData = (data: RawAuction): ParsedAuction => {
	const { id, amount, startTime, endTime, bidder, settled, noun } = data;

	return {
		id: BigNumber.from(id).toNumber(),
		amount: Number(ethers.utils.formatEther(amount)).toFixed(2),
		startTime: dayjs.unix(BigNumber.from(startTime).toNumber()),
		endTime: dayjs.unix(BigNumber.from(endTime).toNumber()),
		bidder: bidder?.id,
		settled,
		seed: noun?.seed
	};
};
