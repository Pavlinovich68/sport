import homeContent from "@/data/home-content.json";
import { prisma } from "@/lib/prisma";

export type HomeCarouselSlide = {
  id: string;
  title: string;
  description: string;
  summary: string;
  fullDescription: string;
  tags: string[];
  image: string;
};

export type HomeTile = {
  title: string;
  badge: string;
  description: string;
};

export type HomeContent = {
  carousel: {
    kicker: string;
    title: string;
    slides: HomeCarouselSlide[];
  };
  tiles: {
    kicker: string;
    title: string;
    items: HomeTile[];
  };
};

function getHomeContentSync(): HomeContent {
  return homeContent;
}

function mapSportRecord(sport: {
  id: string;
  title: string;
  description: string;
  summary: string;
  fullDescription: string;
  image: string;
  tags: Array<{
    sortOrder: number;
    tag: {
      name: string;
    };
  }>;
}): HomeCarouselSlide {
  return {
    id: sport.id,
    title: sport.title,
    description: sport.description,
    summary: sport.summary,
    fullDescription: sport.fullDescription,
    image: sport.image,
    tags: sport.tags
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((item) => item.tag.name),
  };
}

export async function getSports(): Promise<HomeCarouselSlide[]> {
  try {
    const sports = await prisma.sport.findMany({
      orderBy: {
        sortOrder: "asc",
      },
      include: {
        tags: {
          orderBy: {
            sortOrder: "asc",
          },
          include: {
            tag: true,
          },
        },
      },
    });

    if (sports.length === 0) {
      return getHomeContentSync().carousel.slides;
    }

    return sports.map(mapSportRecord);
  } catch {
    return getHomeContentSync().carousel.slides;
  }
}

export async function getSportById(
  sportId: string,
): Promise<HomeCarouselSlide | null> {
  try {
    const sport = await prisma.sport.findUnique({
      where: {
        id: sportId,
      },
      include: {
        tags: {
          orderBy: {
            sortOrder: "asc",
          },
          include: {
            tag: true,
          },
        },
      },
    });

    if (!sport) {
      return (
        getHomeContentSync().carousel.slides.find((item) => item.id === sportId) ??
        null
      );
    }

    return mapSportRecord(sport);
  } catch {
    return (
      getHomeContentSync().carousel.slides.find((item) => item.id === sportId) ??
      null
    );
  }
}

export async function getHomeContent(): Promise<HomeContent> {
  try {
    const [sports, sections, tiles] = await Promise.all([
      prisma.sport.findMany({
        orderBy: {
          sortOrder: "asc",
        },
        include: {
          tags: {
            orderBy: {
              sortOrder: "asc",
            },
            include: {
              tag: true,
            },
          },
        },
      }),
      prisma.homeSection.findMany(),
      prisma.homeTile.findMany({
        orderBy: {
          sortOrder: "asc",
        },
      }),
    ]);

    if (sports.length === 0 || sections.length === 0 || tiles.length === 0) {
      return getHomeContentSync();
    }

    const sectionMap = new Map(sections.map((section) => [section.key, section]));
    const fallback = getHomeContentSync();

    return {
      carousel: {
        kicker:
          sectionMap.get("carousel")?.kicker ?? fallback.carousel.kicker,
        title: sectionMap.get("carousel")?.title ?? fallback.carousel.title,
        slides: sports.map(mapSportRecord),
      },
      tiles: {
        kicker: sectionMap.get("tiles")?.kicker ?? fallback.tiles.kicker,
        title: sectionMap.get("tiles")?.title ?? fallback.tiles.title,
        items: tiles.map((tile) => ({
          title: tile.title,
          badge: tile.badge,
          description: tile.description,
        })),
      },
    };
  } catch {
    return getHomeContentSync();
  }
}
