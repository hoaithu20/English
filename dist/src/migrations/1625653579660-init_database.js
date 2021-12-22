"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase1625653579660 = void 0;
class initDatabase1625653579660 {
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE `user-wallet`( `id` INT NOT NULL AUTO_INCREMENT, `address` VARCHAR(255) NOT NULL, `private_key` longtext, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
        await queryRunner.query('CREATE TABLE `user-security`( `id` INT NOT NULL AUTO_INCREMENT, `phone_number_verified` INT NOT NULL DEFAULT 0, `email_verified` INT NOT NULL DEFAULT 0, `type_2fa` INT NOT NULL DEFAULT 0, `otp` VARCHAR(20) DEFAULT NULL, `expired_otp` datetime(6) DEFAULT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
        await queryRunner.query('CREATE TABLE `user-profile`( `id` INT NOT NULL AUTO_INCREMENT, `avatar` VARCHAR(500) DEFAULT NULL, `date_of_birth` datetime(6) DEFAULT NULL, `website` VARCHAR(255) DEFAULT NULL, `address` VARCHAR(255) DEFAULT NULL, `city` VARCHAR(255) DEFAULT NULL, `country` VARCHAR(255) DEFAULT NULL, `facebook_site` VARCHAR(255) DEFAULT NULL, `instagram_site` VARCHAR(255) DEFAULT NULL, `twitter_site` VARCHAR(255) DEFAULT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
        await queryRunner.query('CREATE TABLE `user`( `id` INT NOT NULL AUTO_INCREMENT, `username` VARCHAR(50) NOT NULL, `email` VARCHAR(255) NOT NULL, `reference_id` VARCHAR(255) NOT NULL, `phone_number` VARCHAR(50), `promotion_code` VARCHAR(100), `profile_id` INT DEFAULT NULL, `wallet_id` INT NOT NULL , `security_id` INT NOT NULL, `status` INT NOT NULL DEFAULT 0, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`), FOREIGN KEY (`profile_id`) REFERENCES `user-profile`(`id`), FOREIGN KEY (`wallet_id`) REFERENCES `user-wallet`(`id`), FOREIGN KEY (`security_id`) REFERENCES `user-security`(`id`), UNIQUE KEY `username_unique`(`username`), UNIQUE KEY `email_unique`(`email`), UNIQUE KEY `reference_id_unique`(`reference_id`), UNIQUE KEY `phone_number_unique`(`phone_number`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
        await queryRunner.query('CREATE TABLE `category`( `id` INT NOT NULL AUTO_INCREMENT, `name` text NOT NULL, `status` INT NOT NULL DEFAULT 1, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
        await queryRunner.query('CREATE TABLE `user-favorites-category`( `user_id` INT NOT NULL, `category_id` INT NOT NULL, `status` INT NOT NULL DEFAULT 1, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`user_id`, `category_id`), FOREIGN KEY (`user_id`) REFERENCES `user`(`id`), FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE IF EXISTS `user-favorites-category`');
        await queryRunner.query('DROP TABLE IF EXISTS `category`');
        await queryRunner.query('DROP TABLE IF EXISTS `user`');
        await queryRunner.query('DROP TABLE IF EXISTS `user-profile`');
        await queryRunner.query('DROP TABLE IF EXISTS `user-security`');
        await queryRunner.query('DROP TABLE IF EXISTS `user-wallet`');
    }
}
exports.initDatabase1625653579660 = initDatabase1625653579660;
//# sourceMappingURL=1625653579660-init_database.js.map