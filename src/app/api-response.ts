import { CharacterInfo } from "./character";

export interface ApiResponse {
    info: {
        count: number;
        next: string | null;
        pages: number;
        prev: string | null;
    };
    results: CharacterInfo[];
}