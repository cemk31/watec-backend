import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
export declare class PhotoService {
    private photoRepository;
    constructor(photoRepository: Repository<Photo>);
    findAll(): Promise<Photo[]>;
    createNewPhoto: any;
}
