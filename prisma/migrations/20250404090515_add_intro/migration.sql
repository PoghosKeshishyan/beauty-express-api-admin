/*
  Warnings:

  - You are about to drop the column `userId` on the `Intro` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Logo` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Navbar` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Intro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "btn_url" TEXT NOT NULL
);
INSERT INTO "new_Intro" ("btn_text", "btn_url", "descr", "id", "image", "title") SELECT "btn_text", "btn_url", "descr", "id", "image", "title" FROM "Intro";
DROP TABLE "Intro";
ALTER TABLE "new_Intro" RENAME TO "Intro";
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Item" ("description", "id", "title") SELECT "description", "id", "title" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Logo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL
);
INSERT INTO "new_Logo" ("id", "image", "title") SELECT "id", "image", "title" FROM "Logo";
DROP TABLE "Logo";
ALTER TABLE "new_Logo" RENAME TO "Logo";
CREATE TABLE "new_Navbar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Navbar" ("id", "title", "url") SELECT "id", "title", "url" FROM "Navbar";
DROP TABLE "Navbar";
ALTER TABLE "new_Navbar" RENAME TO "Navbar";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
