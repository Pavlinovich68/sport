-- CreateTable
CREATE TABLE "Sport" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportTag" (
    "sportId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "SportTag_pkey" PRIMARY KEY ("sportId","tagId")
);

-- CreateTable
CREATE TABLE "SportObject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "workingHours" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaidService" (
    "id" TEXT NOT NULL,
    "sportObjectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaidService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportObjectSport" (
    "sportId" TEXT NOT NULL,
    "sportObjectId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "SportObjectSport_pkey" PRIMARY KEY ("sportId","sportObjectId")
);

-- CreateTable
CREATE TABLE "SportSection" (
    "id" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    "sportObjectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "schedule" TEXT NOT NULL,
    "ageRestrictions" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "monthlyPrice" DECIMAL(10,2) NOT NULL,
    "trialPrice" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coach" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "achievements" TEXT NOT NULL,
    "experienceYears" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportSectionCoach" (
    "sportSectionId" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "SportSectionCoach_pkey" PRIMARY KEY ("sportSectionId","coachId")
);

-- CreateTable
CREATE TABLE "HomeSection" (
    "key" TEXT NOT NULL,
    "kicker" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeSection_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "HomeTile" (
    "sortOrder" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeTile_pkey" PRIMARY KEY ("sortOrder")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sport_sortOrder_key" ON "Sport"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SportObject_slug_key" ON "SportObject"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PaidService_sportObjectId_sortOrder_key" ON "PaidService"("sportObjectId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "SportSection_slug_key" ON "SportSection"("slug");

-- CreateIndex
CREATE INDEX "SportSection_sportId_idx" ON "SportSection"("sportId");

-- CreateIndex
CREATE INDEX "SportSection_sportObjectId_idx" ON "SportSection"("sportObjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_slug_key" ON "Coach"("slug");

-- AddForeignKey
ALTER TABLE "SportTag" ADD CONSTRAINT "SportTag_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportTag" ADD CONSTRAINT "SportTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidService" ADD CONSTRAINT "PaidService_sportObjectId_fkey" FOREIGN KEY ("sportObjectId") REFERENCES "SportObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportObjectSport" ADD CONSTRAINT "SportObjectSport_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportObjectSport" ADD CONSTRAINT "SportObjectSport_sportObjectId_fkey" FOREIGN KEY ("sportObjectId") REFERENCES "SportObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportSection" ADD CONSTRAINT "SportSection_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportSection" ADD CONSTRAINT "SportSection_sportObjectId_fkey" FOREIGN KEY ("sportObjectId") REFERENCES "SportObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportSectionCoach" ADD CONSTRAINT "SportSectionCoach_sportSectionId_fkey" FOREIGN KEY ("sportSectionId") REFERENCES "SportSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportSectionCoach" ADD CONSTRAINT "SportSectionCoach_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;
