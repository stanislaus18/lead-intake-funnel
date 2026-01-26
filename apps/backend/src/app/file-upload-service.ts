// src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { GridFSBucket, ObjectId, Db, MongoClient } from 'mongodb';
import { Readable } from 'stream';
import * as Express from 'express';

@Injectable()
export class FilesService {
  private gridFSBucket: GridFSBucket;
  private db: Db;
  private mongoClient: MongoClient;

  async onModuleInit() {
    try {
      const mongoUrl =
        'mongodb://root:root@localhost:27017/lead_intake_funnel?authSource=admin';
      const dbName = 'lead_intake_funnel';

      this.mongoClient = new MongoClient(mongoUrl);
      await this.mongoClient.connect();

      this.db = this.mongoClient.db(dbName);

      this.gridFSBucket = new GridFSBucket(this.db, {
        bucketName: 'uploads',
      });
    } catch (error) {
      console.error('[FilesService] Initialization failed:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.mongoClient) {
      await this.mongoClient.close();
    }
  }

  async uploadFile(file: Express.Multer.File, id: string) {
    return new Promise((resolve, reject) => {
      try {
        const readable = new Readable();
        readable.push(file.buffer);
        readable.push(null);

        const uploadStream = this.gridFSBucket.openUploadStream(
          file.originalname,
          {
            metadata: {
              contentType: file.mimetype,
              fileId: id,
            },
          },
        );

        readable
          .pipe(uploadStream)
          .on('error', (err) => {
            reject(err);
          })
          .on('finish', () => {
            resolve({
              id: uploadStream.id,
              filename: file.originalname,
              fileId: id,
            });
          });
      } catch (error) {
        console.error('[FilesService] Upload error:', error);
        reject(error);
      }
    });
  }

  async getFile(id: string) {
    try {
      const stream = this.gridFSBucket.openDownloadStream(new ObjectId(id));
      stream.on('error', (error) => {
        console.error('[FilesService] Download failed:', error);
      });
      return stream;
    } catch (error) {
      console.error('[FilesService] Download error:', error);
      throw error;
    }
  }
}
