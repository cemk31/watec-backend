import { DataSource } from 'typeorm';
import { Photo } from './photo.entity';
export declare const photoProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Photo>;
    inject: string[];
}[];
