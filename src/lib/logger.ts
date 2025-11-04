import { LOGGER_TOKEN } from '$env/static/private';
import { LogBullLogger } from 'logbull';

// Initialize logger
export const logger = new LogBullLogger({
	host: 'https://logbull.rummage.cc',
	projectId: '73ea41ce-b999-4de9-aa56-4c81963812b2',
	apiKey: LOGGER_TOKEN // optional
});
