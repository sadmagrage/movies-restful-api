import { Cache } from "@nestjs/cache-manager";
export declare class RedisRepository {
    private cacheManager;
    constructor(cacheManager: Cache);
    getData(key: string): Promise<string>;
    saveData(key: string, value: any): Promise<void>;
}
