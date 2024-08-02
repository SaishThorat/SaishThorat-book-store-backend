-- CreateTable
CREATE TABLE `book` (
    `ISBN` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `yearOfPublication` INTEGER NOT NULL,
    `userId` INTEGER NULL,
    `price` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`ISBN`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderType` ENUM('ONLINE', 'OFFLINE') NOT NULL,
    `userId` INTEGER NULL,
    `bookId` VARCHAR(191) NULL,
    `newBookID` VARCHAR(255) NULL,
    `status` ENUM('ADDTOCART', 'PENDING', 'COMPLETE') NOT NULL,
    `unit` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `Id` VARCHAR(255) NOT NULL,
    `Title` VARCHAR(255) NULL,
    `Price` INTEGER NULL,
    `User_id` VARCHAR(255) NULL,
    `review_summary` VARCHAR(255) NULL,
    `review_text` VARCHAR(255) NULL,
    `descriptions` VARCHAR(255) NULL,
    `authors` VARCHAR(255) NULL,
    `Image` VARCHAR(255) NULL,
    `publisher` VARCHAR(255) NULL,
    `categories` VARCHAR(255) NULL,
    `ratingsCount` INTEGER NULL,
    `sentiment_label` INTEGER NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rolename` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `token` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_roleId_fkey`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_newBookID_fkey` FOREIGN KEY (`newBookID`) REFERENCES `books`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
