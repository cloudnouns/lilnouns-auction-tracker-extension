import type { BigNumberish } from 'ethers';
import type { Dayjs } from 'dayjs';

export interface NounSeed {
	background: string;
	body: string;
	accessory: string;
	head: string;
	glasses: string;
}

interface Bid {
	amount: string;
	blockTimestamp: BigNumberish;
}

export interface RawAuction {
	amount: string;
	bidder: { id: string };
	endTime: BigNumberish;
	id: BigNumberish;
	noun: {
		seed: NounSeed;
	};
	settled: boolean;
	startTime: BigNumberish;
	bids: Bid[];
}

export interface ParsedAuction {
	id: number;
	amount: string;
	startTime: Dayjs;
	endTime: Dayjs;
	bidder: string;
	bidTime: Dayjs;
	settled: boolean;
	seed: NounSeed;
}
