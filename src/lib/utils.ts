import { get } from 'svelte/store';
import type {
	RawAuction,
	ParsedAuction,
	UnconvertedNounSeed,
	NounStyle,
	RelativeTime,
	Pref_DAO
} from './global';
import { ethers, BigNumber } from 'ethers';
import { Noun } from '@cloudnouns/kit';
import { provider, getAuctionData } from '$lib/store';
import dayjs, { type Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const resolveEnsName = async (address: string): Promise<string | null> => {
	if (!address) return null;
	return await get(provider).lookupAddress(address);
};

export const parseAuctionData = (data: RawAuction): ParsedAuction => {
	const { id, amount, startTime, endTime, bids, bidder, settled, noun } = data;
	let bidTime;

	if (bids.length) {
		bidTime = dayjs.unix(BigNumber.from(bids[0].blockTimestamp).toNumber());
	}

	const auction: ParsedAuction = {
		id: BigNumber.from(id).toNumber(),
		amount: Number(ethers.utils.formatEther(amount)).toFixed(2),
		startTime: dayjs.unix(BigNumber.from(startTime).toNumber()),
		endTime: dayjs.unix(BigNumber.from(endTime).toNumber()),
		bidTime,
		bidder: bidder?.id,
		settled,
		seed: noun?.seed
	};

	auction.isActive = getAuctionStatus(auction.endTime);
	return auction;
};

export const truncateAddress = (address: string) => {
	if (!address) return null;
	return address.substring(0, 6) + '...' + address.substring(address.length - 4);
};

export const getAuctionStatus = (endTime: Dayjs): boolean => {
	const now = dayjs();
	return endTime.diff(now, 's') > 0 ? true : false;
};

export const createNoun = (seed: UnconvertedNounSeed, style: NounStyle = 'classic') => {
	const seedArary: number[] = Object.values(seed).map((t) => Number(t));
	seedArary[0] = 9000;
	return new Noun({ traits: seedArary, style });
};

export const getRelativeTimeFromNow = (time: Dayjs) => {
	return time.fromNow();
};

export const getTimeLeftInSeconds = (endTime: Dayjs): number => {
	const now = dayjs();
	return endTime.diff(now, 's');
};

export const getRelativeTimeFromAuctionEnd = (seconds: number): RelativeTime => {
	let formatted = '';

	const hoursRemaining = seconds / 60 / 60;
	const minutesRemaining = (hoursRemaining % 1) * 60;
	const secondsRemaining = (minutesRemaining % 1) * 60;

	const relative = {
		hours: Math.floor(hoursRemaining),
		minutes: Math.floor(minutesRemaining),
		seconds: Math.floor(secondsRemaining)
	};

	if (relative.hours) formatted += relative.hours.toString() + 'h ';

	// todo: remove m when no hours present.
	// ex. 59s instead of 00m 59s
	if (relative.hours && relative.minutes) {
		formatted += relative.minutes.toString().padStart(2, '0') + 'm ';
	} else if (relative.minutes) {
		formatted += relative.minutes.toString() + 'm ';
	} else {
		formatted += '00m ';
	}

	if (relative.seconds) {
		formatted += relative.seconds.toString().padStart(2, '0') + 's';
	} else {
		formatted += '00s';
	}

	return {
		relative,
		formatted
	};
};

export const getAuctionDataOnDelay = (delayInSeconds: number) => {
	setTimeout(() => {
		getAuctionData();
	}, delayInSeconds * 1000);
};

export const getNounUrl = (dao: Pref_DAO, id: number): string => {
	const domain = dao === 'lilnouns' ? 'lilnouns.wtf/lilnoun/' : 'nouns.wtf/noun/';
	return 'https://' + domain + id;
};
