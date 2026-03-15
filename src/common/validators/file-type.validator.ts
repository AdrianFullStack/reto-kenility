import { FileValidator } from '@nestjs/common';
import { Multer } from 'multer';

export class CustomFileTypeValidator extends FileValidator {
    constructor() {
        super({}); // Pasamos un objeto vacío como opciones
    }

    // Esta es la función que valida el archivo
    isValid(file: Multer.File): boolean {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        return allowedMimeTypes.includes(file.mimetype);
    }

    // Aquí es donde definimos el mensaje de error personalizado
    buildErrorMessage(): string {
        return 'Archivo inválido. Solo se permiten imágenes JPEG, JPG y PNG.';
    }
}