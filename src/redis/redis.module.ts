import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { RedisConfig } from "./redis.config";
import { RedisRepository } from "./redis.repository";
import { RedisService } from "./redis.service";

@Module({
    imports: [
        CacheModule.registerAsync(RedisConfig)
    ],
    providers: [
        RedisRepository,
        RedisService
    ],
    exports: [
        RedisRepository,
        RedisService
    ]
})
export class RedisModule {}