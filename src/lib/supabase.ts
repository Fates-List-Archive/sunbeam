// i hate my life
import { createClient } from '@supabase/supabase-js';
import enums from `$lib/enums/enums`;
import * as logger from '$lib/logger';

// Seconds to Milliseconds conversion
const convertMilliseconds = (seconds: number) => {
    return seconds * 1000;
};

// Generate a UUID
const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// Options
const options = {
	schema: 'public',
	headers: {
        "client": "sunbeam", 
        "date": Date.now(),
        "expire_in": convertMilliseconds(600),
        "signature": generateUUID(),
    },
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true,
	PUBLIC_KEY:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4cHBpaGxjanhucmdjcWh5Z3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM2NDQ5NjIsImV4cCI6MTk2OTIyMDk2Mn0.MQfD1ea89wyd3skeInCncSddq-apjCRfVDmtoEdDRnU'
};

const supabase = createClient(
	'https://uxppihlcjxnrgcqhygts.supabase.co',
	options.PUBLIC_KEY,
	options
);

class storage {
	constructor(userID: string) {
		this.userID = userID;
	}

	createBucket = async (name, options) => {
		const { data, error } = await supabase.storage.createBucket(name, options);

		if (error) {
			return error;
		} else {
			return data;
		}
	};

	getBucket = async (name) => {
		const { data, error } = await supabase.storage.getBucket(name);

		if (error) {
			return error;
		} else {
			return data;
		}
	};

	getBuckets = async () => {
		const { data, error } = await supabase.storage.listBuckets();

		if (error) {
			return error;
		} else {
			return data;
		}
	};

	updateBucket = async (name, options) => {
		const { data, error } = await supabase.storage.updateBucket(name, options);

		if (error) {
			return error;
		} else {
			return data;
		}
	};

	deleteBucket = async (name) => {
		const { data, error } = await supabase.storage.deleteBucket(name);

		if (error) {
			return error;
		} else {
			return data;
		}
	};

	emptyBucket = async (name) => {
		const { data, error } = await supabase.storage.emptyBucket(name);

		if (error) {
			return error;
		} else {
			return data;
		}
	};

	// big nightmare moment xd

	uploadFile = async (bucket, event) => {
		const file = event.target.files[0];
		const { data, error } = await supabase.storage
			.from(bucket)
			.upload(`files/${file.name}.${file.extension}`, file, {
				cacheControl: '3600',
				upsert: false
			});

        // <selectthegang>: @cheesycod please look up how to get a file name and extension from the file input
	};
}
