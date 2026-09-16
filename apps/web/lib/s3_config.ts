import { S3Client } from "@aws-sdk/client-s3";
import { ENV } from "./env";

export const s3 = new S3Client({
	region: "auto", // Required by AWS SDK, not used by R2
	// Provide your R2 endpoint: https://<ACCOUNT_ID>.r2.cloudflarestorage.com
	endpoint: ENV.S3_API,
	credentials: {
		// Provide your R2 Access Key ID and Secret Access Key
		accessKeyId: ENV.ACCESS_KEY_ID,
		secretAccessKey: ENV.SECRET_ACCESS_KEY,
	},
});
