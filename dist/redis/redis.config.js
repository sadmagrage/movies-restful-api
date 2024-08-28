"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConfig = void 0;
const config_1 = require("@nestjs/config");
const cache_manager_redis_store_1 = require("cache-manager-redis-store");
exports.RedisConfig = {
    isGlobal: true,
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => {
        const redisClient = (0, cache_manager_redis_store_1.redisStore)({
            socket: {
                host: configService.get('REDIS_HOST'),
                port: parseInt(configService.get('REDIS_PORT')),
            },
            password: configService.get('REDIS_PASSWORD'),
            ttl: 30
        });
        return {
            store: () => redisClient,
        };
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=redis.config.js.map