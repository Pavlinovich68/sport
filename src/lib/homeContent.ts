import homeContent from "@/data/home-content.json";

export type HomeCarouselSlide = {
  id: string;
  title: string;
  description: string;
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

export async function getHomeContent(): Promise<HomeContent> {
  return homeContent;
}

export async function getSports(): Promise<HomeCarouselSlide[]> {
  return homeContent.carousel.slides;
}

export async function getSportById(
  sportId: string,
): Promise<HomeCarouselSlide | null> {
  const sports = await getSports();

  return sports.find((sport) => sport.id === sportId) ?? null;
}
