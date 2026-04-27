import homeContent from "@/data/home-content.json";

export type HomeCarouselSlide = {
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
