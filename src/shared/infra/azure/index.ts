import { BlobServiceClient } from '@azure/storage-blob';
import { Express } from 'express';
import { singleton } from 'tsyringe';

import { deleteFile } from '../../../utils/deleteFile';

interface IUploadFile {
  nameContainer: string;
  file: Express.Multer.File;
}

interface IDeleteFile {
  nameContainer: string;
  urlFile: string;
}

@singleton()
export class Azure {
  private blobServiceClient: BlobServiceClient;

  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING as string
    );
  }

  async uploadFile({ nameContainer, file }: IUploadFile) {
    const containerClient = this.blobServiceClient.getContainerClient(nameContainer);

    const blockBlobClient = containerClient.getBlockBlobClient(file.filename);

    const response = await blockBlobClient.uploadFile(file.path, {
      blobHTTPHeaders: {
        blobContentType: file.mimetype
      }
    });

    deleteFile(file.filename);

    return {
      url: `https://imagestoredemoday.blob.core.windows.net/${nameContainer}/${file.filename}`,
      name: file.filename,
      etag: response.etag as string
    };
  }

  // Método precisa melhorar: Fazer a verificação se o blob existe, para depois deletar.
  async deleteBlob({ nameContainer, urlFile }: IDeleteFile): Promise<void> {
    const containerClient = this.blobServiceClient.getContainerClient(nameContainer);

    await containerClient.deleteBlob(urlFile);
  }
}
