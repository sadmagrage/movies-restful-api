import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class RedisRepository {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async getData(key: string): Promise<string> {
        const data: string = await this.cacheManager.get(key);

        return data;
    }

    async saveData(key: string, value: any) {
        await this.cacheManager.set(key, value);
    }
}