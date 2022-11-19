-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "accountId" INTEGER NOT NULL
);
INSERT INTO "new_User" ("accountId", "id", "password", "username") SELECT "accountId", "id", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_accountId_key" ON "User"("accountId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
