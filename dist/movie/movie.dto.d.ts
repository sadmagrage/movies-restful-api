import { UUID } from "crypto";
import { DurationDto } from "src/duration/duration.dto";
export declare class MovieDto {
    name: string;
    genres: UUID[];
    image: string;
    synopsis: string;
    duration: DurationDto;
    release: string;
    rating: number;
    isReleaseValid(): boolean;
}
