-- CreateTable
CREATE TABLE "Intro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "btn_url" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Intro_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("description", "id", "title") SELECT "description", "id", "title" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Logo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Logo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Logo" ("id", "image", "title") SELECT "id", "image", "title" FROM "Logo";
DROP TABLE "Logo";
ALTER TABLE "new_Logo" RENAME TO "Logo";
CREATE TABLE "new_Navbar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Navbar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Navbar" ("id", "title", "url") SELECT "id", "title", "url" FROM "Navbar";
DROP TABLE "Navbar";
ALTER TABLE "new_Navbar" RENAME TO "Navbar";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
