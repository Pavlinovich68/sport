import { Client, BucketItem } from "minio";

export interface MinIOConfig {
  endpoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
  bucket: string;
}

export interface UploadResult {
  etag: string;
  objectName: string;
}

class MinIOClient {
  private client: Client;
  private bucket: string;
  private initialized = false;

  constructor() {
    this.client = new Client({
      endPoint: process.env.MINIO_ENDPOINT || "localhost",
      port: parseInt(process.env.MINIO_PORT || "9000"),
      useSSL: process.env.MINIO_URL?.startsWith("https") || false,
      accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
      secretKey: process.env.MINIO_SECRET_KEY || "minioadmin123",
    });
    this.bucket = process.env.MINIO_BUCKET || "sport";
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const exists = await this.client.bucketExists(this.bucket);
      if (!exists) {
        await this.client.makeBucket(this.bucket);
        console.log(`Bucket "${this.bucket}" created`);
      }
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize MinIO:", error);
      throw error;
    }
  }

  async uploadFile(
    file: Buffer,
    fileName: string,
    contentType: string,
  ): Promise<UploadResult> {
    await this.initialize();

    const objectName = `${Date.now()}-${fileName}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const etag: any = await this.client.putObject(
      this.bucket,
      objectName,
      file,
    );

    return { etag, objectName };
  }

  async getFileUrl(objectName: string): Promise<string> {
    await this.initialize();
    return this.client.presignedGetObject(this.bucket, objectName);
  }

  async getPresignedUrl(objectName: string, expires = 3600): Promise<string> {
    await this.initialize();
    return this.client.presignedGetObject(this.bucket, objectName, expires);
  }

  async deleteFile(objectName: string): Promise<void> {
    await this.initialize();
    await this.client.removeObject(this.bucket, objectName);
  }

  async listFiles(prefix = ""): Promise<any[]> {
    await this.initialize();

    return new Promise((resolve, reject) => {
      const objects: any[] = [];
      const stream = this.client.listObjects(this.bucket, prefix, true);

      stream.on("data", (obj) => objects.push(obj));
      stream.on("end", () => resolve(objects));
      stream.on("error", reject);
    });
  }

  getBucket(): string {
    return this.bucket;
  }
}

export const minioClient = new MinIOClient();
export default minioClient;
