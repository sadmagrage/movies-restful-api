import { Genre } from "src/genre/genre.entity";
import { User } from "src/user/user.entity";
export declare class Movie {
    id: string;
    name: string;
    genres: Genre[];
    image: string;
    synopsis?: string;
    duration: string;
    release?: string;
    rating: number;
    postAuthor: User;
}
