import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BroadcastCard from "@/components/BroadcastCard";
import CoachCard from "@/components/CoachCard";
import SportObjectCard from "@/components/SportObjectCard";
import { getSportById, getSports } from "@/lib/homeContent";
import styles from "../../index.module.scss";
import SportSectionCard from "@/components/SportSectionCard";

type SportPageProps = {
  params: Promise<{
    sportId: string;
  }>;
};

const coachImages = [
  "/images/coaches/coach-1.png",
  "/images/coaches/coach-2.png",
  "/images/coaches/coach-3.png",
  "/images/coaches/coach-4.png",
];

const coachRanks = [
  "Заслуженный тренер России",
  "Тренер высшей квалификационной категории",
  "Мастер спорта России, тренер высшей категории",
  "Отличник физической культуры и спорта",
];

const coachAvailability = [
  "Пн-Пт 17:00 - 19:00",
  "Вт, Чт 18:00 - 20:00",
  "Ср, Пт 16:30 - 18:30",
  "Сб 11:00 - 14:00",
];

const coachDisplayNames: Record<string, string> = {
  "Воробьев Михаил Сергеевич": "Воробьева Мария Сергеевна",
  "Соколов Алексей Андреевич": "Соколова Алина Андреевна",
};

function getBroadcastTitles(sportTitle: string) {
  const titles: Record<string, string[]> = {
    Баскетбол: [
      "Матч «Орбита» : «Старт», 17 мая 2026",
      "Финал турнира 3x3 среди городских команд, 24 мая 2026",
      "Игра «Юность» : «Сокол», 31 мая 2026",
    ],
    Биатлон: [
      "Спринтерская гонка юниоров, 17 мая 2026",
      "Эстафета смешанных команд, 24 мая 2026",
      "Финал кубка по биатлону, 31 мая 2026",
    ],
    Бокс: [
      "Финальные поединки турнира Золотые перчатки, 17 мая 2026",
      "Матчевая встреча «Север» : «Урал», 24 мая 2026",
      "Открытый боксерский вечер, 31 мая 2026",
    ],
    Велоспорт: [
      "Городская велогонка на кольцевой трассе, 17 мая 2026",
      "Критериум среди любительских команд, 24 мая 2026",
      "Заезд Велодень на выносливость, 31 мая 2026",
    ],
    Волейбол: [
      "Матч «Импульс» : «Высота», 17 мая 2026",
      "Финал кубка по волейболу, 24 мая 2026",
      "Турнир смешанных команд, 31 мая 2026",
    ],
    Гандбол: [
      "Матч «Южный Урал» : «Молния», 17 мая 2026",
      "Финал кубка юношеских команд, 24 мая 2026",
      "Игра школьных сборных за третье место, 31 мая 2026",
    ],
    Дзюдо: [
      "Финальные схватки турнира Путь чемпиона, 17 мая 2026",
      "Открытое первенство в весовых категориях, 24 мая 2026",
      "Командная встреча «Восток» : «Олимп», 31 мая 2026",
    ],
    "Легкая атлетика": [
      "Финальные забеги на короткие дистанции, 17 мая 2026",
      "Городской забег Золотая дорожка, 24 мая 2026",
      "Открытое первенство по прыжкам, 31 мая 2026",
    ],
    "Лёгкая атлетика": [
      "Финальные забеги на короткие дистанции, 17 мая 2026",
      "Городской забег Золотая дорожка, 24 мая 2026",
      "Открытое первенство по прыжкам, 31 мая 2026",
    ],
    "Лыжные гонки": [
      "Лыжная гонка классическим стилем, 17 мая 2026",
      "Командная эстафета Северная петля, 24 мая 2026",
      "Финал зимнего марафона, 31 мая 2026",
    ],
    Плавание: [
      "Заплыв на короткой воде, 17 мая 2026",
      "Финал кубка бассейна вольным стилем, 24 мая 2026",
      "Спринтерские старты юных спортсменов, 31 мая 2026",
    ],
    Регби: [
      "Матч «Сталь» : «Уралец», 17 мая 2026",
      "Финал турнира по регби-7, 24 мая 2026",
      "Открытая игра на кубок района, 31 мая 2026",
    ],
    Скалолазание: [
      "Финал соревнований на скорость, 17 мая 2026",
      "Боулдеринг-турнир Вертикаль, 24 мая 2026",
      "Кубок по трудности на искусственном рельефе, 31 мая 2026",
    ],
    Сноуборд: [
      "Сноуборд-контест по фристайлу, 17 мая 2026",
      "Финал стартов по сноуборд-кроссу, 24 мая 2026",
      "Зимний фестиваль трюков, 31 мая 2026",
    ],
    Теннис: [
      "Открытый теннисный матч одиночного разряда, 17 мая 2026",
      "Финал турнира Большая подача, 24 мая 2026",
      "Кубок любительской теннисной лиги, 31 мая 2026",
    ],
    "Настольный теннис": [
      "Турнир Быстрая ракетка, 17 мая 2026",
      "Матчевая встреча «Спин» : «Топс», 24 мая 2026",
      "Открытое первенство по настольному теннису, 31 мая 2026",
    ],
    Футбол: [
      "Матч «Спартак» : «Динамо», 17 мая 2026",
      "Товарищеская игра «Металист» : «Динамо», 24 мая 2026",
      "Финал турнира по мини-футболу, 31 мая 2026",
    ],
    "Фигурное катание": [
      "Показательные прокаты Ледовая симфония, 17 мая 2026",
      "Финал фестиваля программ, 24 мая 2026",
      "Кубок начинающих фигуристов, 31 мая 2026",
    ],
    Хоккей: [
      "Хоккейный матч «Трактор» : «Спутник», 17 мая 2026",
      "Кубковая встреча «Север» : «Молот», 24 мая 2026",
      "Финал юношеского турнира по хоккею, 31 мая 2026",
    ],
    Шахматы: [
      "Финал турнира Быстрая партия, 17 мая 2026",
      "Первенство по рапиду среди школьников, 24 мая 2026",
      "Матчевая встреча «Дебют» : «Эндшпиль», 31 мая 2026",
    ],
  };

  return titles[sportTitle] ?? [
    `Открытая трансляция соревнований по виду спорта ${sportTitle}, 17 мая 2026`,
    `Финал городского турнира по виду спорта ${sportTitle}, 24 мая 2026`,
    `Кубковая встреча по виду спорта ${sportTitle}, 31 мая 2026`,
  ];
}

export async function generateStaticParams() {
  const sports = await getSports();

  return sports.map((sport) => ({
    sportId: sport.id,
  }));
}

export default async function SportPage({ params }: SportPageProps) {
  const { sportId } = await params;
  const sport = await getSportById(sportId);

  if (!sport) {
    notFound();
  }

  const coaches = sport.sportSections
    .flatMap((section) =>
      section.coaches.map((coach) => ({
        address: section.sportObjectAddress,
        coach,
      })),
    )
    .slice(0, 4);
  const sections = sport.sportSections.slice(0,4);
  const broadcastTitles = getBroadcastTitles(sport.title);
  const broadcastImages = [
    sport.image,
    ...sport.sportObjects.map((sportObject) => sportObject.image),
    ...sport.sportSections.map((section) => section.image),
  ];
  const broadcasts = Array.from({ length: 3 }, (_, index) => ({
    id: `${sport.id}-broadcast-${index + 1}`,
    image: broadcastImages[index % broadcastImages.length],
    title: broadcastTitles[index % broadcastTitles.length],
  }));

  return (
    <section className={styles.sportDetailSection}>
      <article className={styles.sportDetailHero}>
        <Image
          src={sport.image}
          alt={sport.title}
          fill
          priority
          sizes="100vw"
          className={styles.sportDetailImage}
        />
        <div className={styles.sportDetailOverlay} />
        <div className={styles.shell}>
          <div className={styles.sportDetailContent}>
            <h1>{sport.title}</h1>
          </div>
        </div>
      </article>

      <div className={styles.shell}>
        <div className={styles.sportDetailBody}>
          <aside className={styles.sportDetailSidebar}>
            <div className={styles.sportDetailPanel}>
              <p className={styles.sectionKicker}>Ключевые направления</p>
              <div className={styles.sportDetailTags}>
                {sport.tags.map((tag) => (
                  <span key={tag} className={styles.sportDetailTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div className={styles.sportDetailMain}>
            <div className={styles.sportDetailPanel}>
              <p className={styles.sectionKicker}>Описание</p>

              <div className={styles.sportDetailDescription}>
                <Image
                  src={sport.image}
                  alt={sport.title}
                  width={350}
                  height={400}
                  className={styles.image}
                />

                {sport.fullDescription.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {sport.sportObjects.length > 0 ? (
          <section className={styles.sportObjectsSection}>
            <div className={styles.sectionHeadingRow}>
              <div className={styles.sectionHeading}>
                <h2>Спортивные мероприятия</h2>
              </div>
              <Link href="/sports" className={styles.catalogButton}>
                Все мероприятия
              </Link>
            </div>

            <div className={styles.sportObjectsGrid}>
              {sport.sportObjects.map((sportObject, index) => (
                <SportObjectCard
                  key={sportObject.id}
                  eventIndex={index}
                  sportObject={sportObject}
                  sportTitle={sport.title}
                />
              ))}
            </div>
          </section>
        ) : null}

        {
          sections.length > 0 ? (
            <section className={styles.sportObjectsSection}>
              <div className={styles.sectionHeadingRow}>
              <div className={styles.sectionHeading}>
                <h2>Спортивные школы</h2>
              </div>
              <Link href="/sports" className={styles.catalogButton}>
                Все спортивные школы
              </Link>
            </div>  

              <div className={styles.sportObjectsGrid}>
                {
                  sections.map((item, index) => (
                    <SportSectionCard key={item.id} sportSection={item} eventIndex={index}/>
                  ))
                }
              </div>
            </section>
          ) : null
        }

        {coaches.length > 0 ? (
          <section className={styles.coachesSection}>
            <div className={styles.sectionHeading}>
              <h2>Тренера</h2>
            </div>

            <div className={styles.coachesGrid}>
              {coaches.map((item, index) => (
                <CoachCard
                  key={item.coach.id}
                  address={item.address}
                  availability={coachAvailability[index % coachAvailability.length]}
                  fullName={
                    coachDisplayNames[item.coach.fullName] ?? item.coach.fullName
                  }
                  image={coachImages[index % coachImages.length]}
                  rank={coachRanks[index % coachRanks.length]}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className={styles.broadcastsSection}>
          <div className={styles.sectionHeading}>
            <h2>Трансляции</h2>
          </div>

          <div className={styles.broadcastsGrid}>
            {broadcasts.map((broadcast) => (
              <BroadcastCard
                key={broadcast.id}
                image={broadcast.image}
                title={broadcast.title}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
