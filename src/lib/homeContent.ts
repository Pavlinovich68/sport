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

export type PaidServiceContent = {
  name: string;
  description: string;
  price: string;
};

export type CoachContent = {
  id: string;
  slug: string;
  fullName: string;
  role: string;
  bio: string;
  achievements: string;
  experienceYears: number;
  phone: string;
};

export type SportSectionContent = {
  id: string;
  slug: string;
  title: string;
  image: string;
  schedule: string;
  ageRestrictions: string;
  description: string;
  level: string;
  capacity: number;
  contactPhone: string;
  monthlyPrice: string;
  trialPrice: string;
  sportObjectSlug: string;
  coaches: CoachContent[];
};

export type SportObjectContent = {
  id: string;
  name: string;
  slug: string;
  image: string;
  address: string;
  description: string;
  workingHours: string;
  features: string;
  paidServices: PaidServiceContent[];
};

export type SportContent = HomeCarouselSlide & {
  sportObjects: SportObjectContent[];
  sportSections: SportSectionContent[];
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

function getFallbackSport(sportId: string): SportContent | null {
  const fallback = getHomeContentSync().carousel.slides.find(
    (item) => item.id === sportId,
  );

  return fallback ? { ...fallback, sportObjects: [], sportSections: [] } : null;
}

function getFallbackSports(): SportContent[] {
  return getHomeContentSync().carousel.slides.map((sport) => ({
    ...sport,
    sportObjects: [],
    sportSections: [],
  }));
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
  sportObjects: Array<{
    sortOrder: number;
    sportObject: {
      id: string;
      name: string;
      slug: string;
      image: string;
      address: string;
      description: string;
      workingHours: string;
      features: string;
      paidServices: Array<{
        sortOrder: number;
        name: string;
        description: string;
        price: {
          toString(): string;
        };
      }>;
    };
  }>;
  sportSections: Array<{
    id: string;
    slug: string;
    title: string;
    image: string;
    schedule: string;
    ageRestrictions: string;
    description: string;
    level: string;
    capacity: number;
    contactPhone: string;
    monthlyPrice: {
      toString(): string;
    };
    trialPrice: {
      toString(): string;
    };
    sportObject: {
      slug: string;
    };
    coaches: Array<{
      sortOrder: number;
      coach: {
        id: string;
        slug: string;
        fullName: string;
        role: string;
        bio: string;
        achievements: string;
        experienceYears: number;
        phone: string;
      };
    }>;
  }>;
}): SportContent {
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
    sportObjects: sport.sportObjects
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((item) => ({
        id: item.sportObject.id,
        name: item.sportObject.name,
        slug: item.sportObject.slug,
        image: item.sportObject.image,
        address: item.sportObject.address,
        description: item.sportObject.description,
        workingHours: item.sportObject.workingHours,
        features: item.sportObject.features,
        paidServices: item.sportObject.paidServices
          .sort((left, right) => left.sortOrder - right.sortOrder)
          .map((service) => ({
            name: service.name,
            description: service.description,
            price: service.price.toString(),
          })),
      })),
    sportSections: sport.sportSections.map((section) => ({
      id: section.id,
      slug: section.slug,
      title: section.title,
      image: section.image,
      schedule: section.schedule,
      ageRestrictions: section.ageRestrictions,
      description: section.description,
      level: section.level,
      capacity: section.capacity,
      contactPhone: section.contactPhone,
      monthlyPrice: section.monthlyPrice.toString(),
      trialPrice: section.trialPrice.toString(),
      sportObjectSlug: section.sportObject.slug,
      coaches: section.coaches
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map((item) => ({
          id: item.coach.id,
          slug: item.coach.slug,
          fullName: item.coach.fullName,
          role: item.coach.role,
          bio: item.coach.bio,
          achievements: item.coach.achievements,
          experienceYears: item.coach.experienceYears,
          phone: item.coach.phone,
        })),
    })),
  };
}

const sportInclude = {
  tags: {
    orderBy: {
      sortOrder: "asc" as const,
    },
    include: {
      tag: true,
    },
  },
  sportObjects: {
    orderBy: {
      sortOrder: "asc" as const,
    },
    include: {
      sportObject: {
        include: {
          paidServices: {
            orderBy: {
              sortOrder: "asc" as const,
            },
          },
        },
      },
    },
  },
  sportSections: {
    include: {
      sportObject: {
        select: {
          slug: true,
        },
      },
      coaches: {
        orderBy: {
          sortOrder: "asc" as const,
        },
        include: {
          coach: true,
        },
      },
    },
  },
};

export async function getSports(): Promise<SportContent[]> {
  try {
    const sports = await prisma.sport.findMany({
      orderBy: {
        sortOrder: "asc",
      },
      include: sportInclude,
    });

    if (sports.length === 0) {
      return getFallbackSports();
    }

    return sports.map(mapSportRecord);
  } catch {
    return getFallbackSports();
  }
}

export async function getSportById(
  sportId: string,
): Promise<SportContent | null> {
  try {
    const sport = await prisma.sport.findUnique({
      where: {
        id: sportId,
      },
      include: sportInclude,
    });

    if (!sport) {
      return getFallbackSport(sportId);
    }

    return mapSportRecord(sport);
  } catch {
    return getFallbackSport(sportId);
  }
}

export async function getHomeContent(): Promise<HomeContent> {
  try {
    const [sports, sections, tiles] = await Promise.all([
      prisma.sport.findMany({
        orderBy: {
          sortOrder: "asc",
        },
        include: sportInclude,
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
        kicker: sectionMap.get("carousel")?.kicker ?? fallback.carousel.kicker,
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
