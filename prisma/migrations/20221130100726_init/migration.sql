-- CreateTable
CREATE TABLE "borrowings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "booksData" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'ON_PROGRESS',
    CONSTRAINT "borrowings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "borrowings_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
