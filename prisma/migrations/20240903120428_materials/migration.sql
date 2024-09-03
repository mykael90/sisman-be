-- CreateTable
CREATE TABLE `materials` (
    `id` BIGINT UNSIGNED NOT NULL,
    `name` TINYTEXT NOT NULL,
    `specification` VARCHAR(1022) NOT NULL,
    `unit` VARCHAR(31) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
