/*
  Warnings:

  - You are about to drop the column `call_btn_url` on the `Footer` table. All the data in the column will be lost.
  - You are about to drop the column `call_image` on the `Footer` table. All the data in the column will be lost.
  - You are about to drop the column `call_text` on the `Footer` table. All the data in the column will be lost.
  - You are about to drop the column `facebook_url` on the `Footer` table. All the data in the column will be lost.
  - You are about to drop the column `instagram_url` on the `Footer` table. All the data in the column will be lost.
  - You are about to drop the column `vk_url` on the `Footer` table. All the data in the column will be lost.
  - You are about to drop the column `youtube_url` on the `Footer` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Footer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_image` to the `Footer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Footer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "youtube_icon" TEXT NOT NULL,
    "vk_icon" TEXT NOT NULL,
    "instagram_icon" TEXT NOT NULL,
    "facebook_icon" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_image" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO "new_Footer" ("address", "facebook_icon", "id", "instagram_icon", "vk_icon", "youtube_icon") SELECT "address", "facebook_icon", "id", "instagram_icon", "vk_icon", "youtube_icon" FROM "Footer";
DROP TABLE "Footer";
ALTER TABLE "new_Footer" RENAME TO "Footer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
