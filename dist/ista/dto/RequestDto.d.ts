import { BodyDto } from './BodyDto';
import { CancelledDto } from './CancelledDto';
import { NotPossibleDto } from './NotPossibleDto';
import { PlannedDto } from './PlannedDto';
import { PostponedDto } from './PostponedDto';
import { received } from './ReceivedDto';
import { RejectedDto } from './RejectedDto';
export declare class RequestDto {
    id: number;
    body?: BodyDto;
    environment: string;
    language: string;
    consumer: string;
    rejected?: RejectedDto;
    notPossible?: NotPossibleDto;
    postponed?: PostponedDto;
    cancelled?: CancelledDto;
    planned?: PlannedDto;
    received?: received;
}
