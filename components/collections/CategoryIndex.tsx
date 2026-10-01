"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { categoryGroups, type CategoryItem } from "@/lib/collectionsData";

export function CategoryIndex() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Flatten all items with group info and overall index
  const allItems = useMemo(() => {
    const items: (CategoryItem & { globalIndex: number })[] = [];
    let count = 0;
    categoryGroups.forEach((group) => {
      group.items.forEach((item) => {
        items.push({ ...item, globalIndex: count });
        count += 1;
      });
    });
    return items;
  }, []);

  const activeItem = allItems[activeIndex] || allItems[0];
  const formattedNumeral = String(activeIndex + 1).padStart(2, "0");

  let globalIndexCounter = 0;

  return (
    <section
      id="categories"
      className="cat-index"
      aria-labelledby="cat-index-title"
      style={{
        ["--tone" as string]: activeItem.tone,
      }}
    >
      <Container>
        <header className="cat-index__head">
          <div>
            <div className="cat-index__eyebrow">
              <span aria-hidden="true" />
              Twelve Categories
            </div>
            <h2 id="cat-index-title" className="cat-index__title">
              Collection Categories
            </h2>
          </div>
          <p className="cat-index__lead">
            The collection includes 12 categories, spanning textiles, utensils, household objects, trade-related materials, religious objects, manuscripts, photographs, tools and other material associated with the social and cultural history of the region.
          </p>
        </header>

        <div className="cat-index__body">
          <div className="cat-index__index">
            {categoryGroups.map((group) => (
              <div key={group.name} className="cat-index__group">
                <p className="cat-index__group-label">{group.name}</p>
                <ul className="cat-index__list">
                  {group.items.map((item) => {
                    const currentIndex = globalIndexCounter;
                    globalIndexCounter += 1;
                    const isActive = activeIndex === currentIndex;
                    const num = String(currentIndex + 1).padStart(2, "0");

                    return (
                      <li
                        key={item.name}
                        className={`cat-index__row ${isActive ? "is-active" : ""}`}
                        tabIndex={0}
                        onMouseEnter={() => setActiveIndex(currentIndex)}
                        onFocus={() => setActiveIndex(currentIndex)}
                      >
                        <span className="cat-index__num">{num}</span>
                        <span className="cat-index__name">{item.name}</span>
                        <img
                          className="cat-index__thumb"
                          src={item.image}
                          alt=""
                          loading="lazy"
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="cat-index__stage" aria-hidden="true">
            <span className="cat-index__numeral">{formattedNumeral}</span>
            {allItems.map((item) => {
              const isActive = activeIndex === item.globalIndex;
              return (
                <figure
                  key={item.name}
                  className={`cat-index__object ${isActive ? "is-active" : ""}`}
                >
                  <img src={item.image} alt="" />
                  <figcaption>
                    <span>{item.name}</span>
                    {item.object}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
