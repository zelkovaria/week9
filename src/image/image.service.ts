import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import * as AWS from 'aws-sdk';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly iamgesRepository: Repository<Image>,
  ) {}

  findAll() {
    return `This action returns all image`;
  }

  async uploadFile(file: Express.Multer.File) {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const upload = new AWS.S3();
    const params = {
      Bucket: 'mju-likelion-bucket',
      Key: file.originalname,
      Body: file.buffer,
    };
    try {
      const response = await upload.upload(params).promise();
      return response;
    } catch (e) {
      throw new Error('Failed to upload file');
    }
  }
}
