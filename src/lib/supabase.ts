// i hate my life
import { createClient } from '@supabase/supabase-js';
import {
	dhsRetrip
} from '$lib/request';

// Options
const options: object = {
	schema: 'public',
	headers: {
		client: 'sunbeam',
	},
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true
};

class storage {
	constructor(userID: string, token: string) {
		if (!userID) {
			this.supabase = createClient(
				'https://uxppihlcjxnrgcqhygts.supabase.co',
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4cHBpaGxjanhucmdjcWh5Z3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM2NDQ5NjIsImV4cCI6MTk2OTIyMDk2Mn0.MQfD1ea89wyd3skeInCncSddq-apjCRfVDmtoEdDRnU",
				options
			);
		}
		else {
			dhsRetrip(userID, token, "CIA").then((data) => {
				this.supabase = createClient(
					'https://uxppihlcjxnrgcqhygts.supabase.co',
					data,
					options
				)
			}).catch(console.error);
		}
	}

	createBucket = async (name, options) => {
		const { data, error } = await this.supabase.storage.createBucket(name, options);

		if (error) {
			return error;
		} else {
			return data;
		}
	};

	getBucket = async (name) => {
		const { data, error } = await this.supabase.storage.getBucket(name);

		if (error) {
			return error;
		} else {
			return data;
		}
	};

	getBuckets = async () => {
		const { data, error } = await this.supabase.storage.listBuckets();

		if (error) {
			return error;
		} else {
			return data;
		}
	};

	updateBucket = async (name, options) => {
		const { data, error } = await this.supabase.storage.updateBucket(name, options);

		if (error) {
			return error;
		} else {
			return data;
		}
	};

	deleteBucket = async (name) => {
		const { data, error } = await this.supabase.storage.deleteBucket(name);

		if (error) {
			return error;
		} else {
			return data;
		}
	};

	emptyBucket = async (name) => {
		const { data, error } = await this.supabase.storage.emptyBucket(name);

		if (error) {
			return error;
		} else {
			return data;
		}
	};

	uploadFiles = async (bucket, files) => {
		if (files.length < 0) {
			return {
				error: {
					message: 'No files submitted',
					stack: 'User did not submit any files'
				}
			};
		} else {
			// limit to only 4 files
			if (files.length > 4) {
				return {
					error: {
						message: 'Too many files submitted',
						stack: 'User submitted too many files'
					}
				};
			} else {
				files.forEach(async (file) => {
					// Limit file size to only **5MB**
					if (file.size > 5242880) {
						return;
					} else {
						const { data, error } = await this.supabase.storage
							.from(bucket)
							.upload(`files/${file.name}.${file.type.replace(/(.*)\//g, '')}`, file, {
								cacheControl: '3600',
								upsert: false
							});

						if (error) {
							return error;
						} else {
							return data;
						}
					}
				});
			}
		}
	};
}

export { storage };