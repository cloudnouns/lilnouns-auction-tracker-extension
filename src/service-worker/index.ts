import { ethers } from 'ethers';

chrome.notifications.create('', {
	title: 'Just wanted to notify you',
	message: 'How great it is!',
	iconUrl: '/icons/icon-48.png',
	type: 'basic'
});
