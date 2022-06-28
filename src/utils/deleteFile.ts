import fs from 'fs';
import { resolve } from 'path';

export async function deleteFile(filename: string) {
  const pathFile = resolve(__dirname, '..', 'tmp', filename);

  try {
    await fs.promises.stat(pathFile);
  } catch {
    return;
  }

  await fs.promises.unlink(pathFile);
}
