"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeCarouselSlide } from "@/lib/homeContent";
import SportCard from "./SportCard";
import styles from "./SportsCatalogClient.module.scss";

type SportsCatalogClientProps = {
  sports: HomeCarouselSlide[];
};

export default function SportsCatalogClient({
  sports,
}: SportsCatalogClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [draftTags, setDraftTags] = useState<string[]>([]);
  const dockRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);

  const availableTags: string[] = [];

  for (const sport of sports) {
    for (const tag of sport.tags) {
      if (!availableTags.includes(tag)) {
        availableTags.push(tag);
      }
    }
  }

  const filteredSports =
    selectedTags.length === 0
      ? sports
      : sports.filter((sport) =>
          selectedTags.every((tag) => sport.tags.includes(tag)),
        );

  const draftFilteredSports =
    draftTags.length === 0
      ? sports
      : sports.filter((sport) =>
          draftTags.every((tag) => sport.tags.includes(tag)),
        );

  function toggleTag(tag: string) {
    setDraftTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  }

  function resetTags() {
    setDraftTags([]);
    setSelectedTags([]);
    setIsOpen(false);
  }

  function openFilters() {
    setDraftTags(selectedTags);
    setIsOpen(true);
  }

  function closeFilters() {
    setDraftTags(selectedTags);
    setIsOpen(false);
  }

  function applyFilters() {
    setSelectedTags(draftTags);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function dismissFilters() {
      setDraftTags(selectedTags);
      setIsOpen(false);
    }

    function handlePointerDown(event: PointerEvent) {
      if (!dockRef.current?.contains(event.target as Node)) {
        dismissFilters();
      }
    }

    function handleFocusIn(event: FocusEvent) {
      if (!dockRef.current?.contains(event.target as Node)) {
        dismissFilters();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        dismissFilters();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("keydown", handleKeyDown);

    panelRef.current?.focus();

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, selectedTags]);

  return (
    <div className={styles.catalogLayout}>
      <div ref={dockRef} className={styles.filterDock}>
        {isOpen ? (
          <section
            ref={panelRef}
            className={styles.filterPanel}
            tabIndex={-1}
          >
            <div className={styles.filterHeader}>
              <div>
                <h2 className={styles.filterTitle}>Подобрать вид спорта</h2>
                <p className={styles.filterDescription}>
                  Выбери одну или несколько целей, и мы покажем только те
                  направления, которые соответствуют всем выбранным тегам.
                </p>
              </div>
            </div>

            <div className={styles.tags}>
              {availableTags.map((tag) => {
                const isActive = draftTags.includes(tag);

                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`${styles.tagButton} ${isActive ? styles.tagButtonActive : ""}`}
                    aria-pressed={isActive}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            <div className={styles.resultBar}>
              <p className={styles.resultText}>
                После применения: {draftFilteredSports.length} видов спорта
              </p>

              {draftTags.length > 0 ? (
                <div className={styles.activeTags}>
                  {draftTags.map((tag) => (
                    <span key={tag} className={styles.activeTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                onClick={resetTags}
                className={styles.resetButton}
                disabled={draftTags.length === 0}
              >
                Сбросить
              </button>
              <button
                type="button"
                onClick={closeFilters}
                className={styles.secondaryAction}
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className={styles.primaryAction}
              >
                Применить
              </button>
            </div>
          </section>
        ) : (
          <button
            type="button"
            onClick={openFilters}
            className={`${styles.filterToggleButton} ${selectedTags.length > 0 ? styles.filterToggleButtonActive : ""}`}
            aria-label={
              selectedTags.length > 0
                ? `Открыть фильтры. Активно фильтров: ${selectedTags.length}`
                : "Открыть фильтры"
            }
            aria-haspopup="dialog"
            aria-expanded={isOpen}
          >
            <span className={styles.filterIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            {selectedTags.length > 0 ? (
              <span className={styles.filterBadge}>{selectedTags.length}</span>
            ) : null}
          </button>
        )}
      </div>

      {filteredSports.length > 0 ? (
        <div className={styles.grid}>
          {filteredSports.map((sport) => (
            <SportCard key={sport.id} sport={sport} />
          ))}
        </div>
      ) : (
        <section className={styles.emptyState}>
          <h2>Совпадений пока нет</h2>
          <p>
            Попробуй снять часть фильтров или выбрать другие теги, чтобы
            расширить подборку.
          </p>
        </section>
      )}
    </div>
  );
}
