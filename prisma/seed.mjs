import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

const pool = new Pool({
  connectionString,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  const contentPath = path.join(
    __dirname,
    "..",
    "src",
    "data",
    "home-content.json",
  );
  const sportObjectsPath = path.join(
    __dirname,
    "..",
    "src",
    "data",
    "sport-objects.json",
  );
  const raw = await readFile(contentPath, "utf8");
  const rawSportObjects = await readFile(sportObjectsPath, "utf8");
  const content = JSON.parse(raw);
  const sportObjectsContent = JSON.parse(rawSportObjects);

  await prisma.homeSection.upsert({
    where: { key: "carousel" },
    update: {
      kicker: content.carousel.kicker,
      title: content.carousel.title,
    },
    create: {
      key: "carousel",
      kicker: content.carousel.kicker,
      title: content.carousel.title,
    },
  });

  await prisma.homeSection.upsert({
    where: { key: "tiles" },
    update: {
      kicker: content.tiles.kicker,
      title: content.tiles.title,
    },
    create: {
      key: "tiles",
      kicker: content.tiles.kicker,
      title: content.tiles.title,
    },
  });

  for (const [index, tile] of content.tiles.items.entries()) {
    await prisma.homeTile.upsert({
      where: {
        sortOrder: index,
      },
      update: {
        title: tile.title,
        badge: tile.badge,
        description: tile.description,
      },
      create: {
        sortOrder: index,
        title: tile.title,
        badge: tile.badge,
        description: tile.description,
      },
    });
  }

  await prisma.homeTile.deleteMany({
    where: {
      sortOrder: {
        gte: content.tiles.items.length,
      },
    },
  });

  const allTagNames = new Set();

  for (const sport of content.carousel.slides) {
    for (const tag of sport.tags) {
      allTagNames.add(tag);
    }
  }

  for (const tagName of allTagNames) {
    await prisma.tag.upsert({
      where: {
        name: tagName,
      },
      update: {},
      create: {
        name: tagName,
      },
    });
  }

  for (const [index, sport] of content.carousel.slides.entries()) {
    await prisma.sport.upsert({
      where: {
        id: sport.id,
      },
      update: {
        title: sport.title,
        description: sport.description,
        summary: sport.summary,
        fullDescription: sport.fullDescription,
        image: sport.image,
        sortOrder: index,
      },
      create: {
        id: sport.id,
        title: sport.title,
        description: sport.description,
        summary: sport.summary,
        fullDescription: sport.fullDescription,
        image: sport.image,
        sortOrder: index,
      },
    });

    await prisma.sportTag.deleteMany({
      where: {
        sportId: sport.id,
      },
    });

    for (const [tagIndex, tagName] of sport.tags.entries()) {
      const tag = await prisma.tag.findUniqueOrThrow({
        where: {
          name: tagName,
        },
      });

      await prisma.sportTag.create({
        data: {
          sportId: sport.id,
          tagId: tag.id,
          sortOrder: tagIndex,
        },
      });
    }
  }

  await prisma.sport.deleteMany({
    where: {
      id: {
        notIn: content.carousel.slides.map((sport) => sport.id),
      },
    },
  });

  await prisma.tag.deleteMany({
    where: {
      sports: {
        none: {},
      },
    },
  });

  for (const sportObject of sportObjectsContent.sportObjects) {
    await prisma.sportObject.upsert({
      where: {
        slug: sportObject.slug,
      },
      update: {
        name: sportObject.name,
        image: sportObject.image,
        address: sportObject.address,
        description: sportObject.description,
        workingHours: sportObject.workingHours,
        features: sportObject.features,
      },
      create: {
        id: sportObject.id,
        name: sportObject.name,
        slug: sportObject.slug,
        image: sportObject.image,
        address: sportObject.address,
        description: sportObject.description,
        workingHours: sportObject.workingHours,
        features: sportObject.features,
      },
    });

    const currentObject = await prisma.sportObject.findUniqueOrThrow({
      where: {
        slug: sportObject.slug,
      },
    });

    await prisma.paidService.deleteMany({
      where: {
        sportObjectId: currentObject.id,
      },
    });

    for (const [serviceIndex, service] of sportObject.paidServices.entries()) {
      await prisma.paidService.create({
        data: {
          sportObjectId: currentObject.id,
          name: service.name,
          description: service.description,
          price: service.price,
          sortOrder: serviceIndex,
        },
      });
    }

    await prisma.sportObjectSport.deleteMany({
      where: {
        sportObjectId: currentObject.id,
      },
    });

    for (const [sportIndex, sportId] of sportObject.sportIds.entries()) {
      await prisma.sportObjectSport.create({
        data: {
          sportId,
          sportObjectId: currentObject.id,
          sortOrder: sportIndex,
        },
      });
    }
  }

  await prisma.sportObject.deleteMany({
    where: {
      slug: {
        notIn: sportObjectsContent.sportObjects.map((sportObject) => sportObject.slug),
      },
    },
  });

}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
