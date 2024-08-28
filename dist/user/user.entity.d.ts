import { Movie } from "src/movie/movie.entity";
import { Role } from "src/role/role.enum";
export declare class User {
    id: string;
    username: string;
    password: string;
    postedMovies: Movie[];
    role: Role;
}
