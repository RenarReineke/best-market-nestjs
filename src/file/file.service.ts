import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async create(file: Express.Multer.File | undefined): Promise<string | null> {
    try {
      if (!file) {
        return null;
      }
      // сгенерировать уникальное имя для файла
      const uniqFileName = uuid.v4() + '.jpg';

      //сформировать путь до папки static, если папка не существует - создать
      const filePath = path.resolve(__dirname, '..', 'static');
      console.log('Сформированный путь до файла: ', filePath);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      //записать файл по выбранному пути
      fs.writeFileSync(path.join(filePath, uniqFileName), file.buffer);

      // вернуть имя файла
      return uniqFileName;
    } catch (error) {
      throw new HttpException(
        'Ошибка при сохранении файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
