import type { ParsedAuction, RawAuction } from './global';
import { writable, type Writable } from 'svelte/store';
import { parseAuctionData } from './utils';
import { ethers } from 'ethers';

const query = `
{
  auctions(orderBy: startTime, orderDirection: desc, first: 6) {
    id
    noun {
      seed {
        background
        body
        accessory
        head
        glasses
      }
    }
    amount
    startTime
    endTime
    bidder {
      id
    }
    bids(orderBy: amount, orderDirection: desc) {
      amount
      blockTimestamp
    }
    settled
  }
}
`;

export const provider = writable(ethers.providers.getDefaultProvider());

export const getAuctionData = async () => {
	const request = await fetch(
		// 'https://api.thegraph.com/subgraphs/name/lilnounsdao/lil-nouns-subgraph',
		'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph',
		{
			method: 'post',
			body: JSON.stringify({ query })
		}
	);

	const response = await request.json();
	const parsedAuctions = response.data.auctions.map((a: RawAuction) => parseAuctionData(a));
	parsedAuctions.sort((a: ParsedAuction, b: ParsedAuction) => b.id - a.id);

	Auction.set(parsedAuctions[0]);
	PastAuctions.set(parsedAuctions.slice(1));
};

export const Auction: Writable<ParsedAuction> = writable();
export const PastAuctions: Writable<ParsedAuction[]> = writable();
