import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { currentExhibitionData, type CurrentExhibition } from "@/lib/exhibitionData";

interface CurrentExhibitionSectionProps {
  exhibition?: CurrentExhibition;
}

export function CurrentExhibitionSection({
  exhibition = currentExhibitionData,
}: CurrentExhibitionSectionProps) {
  if (!exhibition) return null;

  return (
    <section
      id="exhibition"
      className="exhibit relative overflow-hidden border-b border-border-subtle bg-bg py-20 sm:py-24 md:py-28 lg:py-32"
      aria-labelledby="exhibit-title"
    >
      <Container className="relative z-10">
        <div className="exhibit__head">
          <div className="mb-3.5 inline-flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-6 bg-primary" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary md:text-[12px]">
              {exhibition.eyebrow}
            </p>
          </div>
          <span className="exhibit__status">
            <i aria-hidden="true" />
            {exhibition.status}
          </span>
        </div>

        <figure className="exhibit__hero">
          <img
            className="exhibit__photo"
            src={exhibition.image}
            alt={exhibition.alt}
            loading="lazy"
          />
          <div className="exhibit__shade" aria-hidden="true" />
          <img
            className="floor-mark exhibit__mark"
            src={`/images/logo/level-${exhibition.level}-dark.webp`}
            width={64}
            height={64}
            alt={`Level ${exhibition.level} of 4`}
            loading="lazy"
          />
          <figcaption className="exhibit__plate">
            <h2 id="exhibit-title" className="exhibit__title">
              {exhibition.title}
            </h2>
            <p className="exhibit__subtitle">{exhibition.subtitle}</p>
          </figcaption>
        </figure>

        <div className="exhibit__body">
          <div className="exhibit__story">
            {exhibition.paragraphs.map((para, idx) => (
              <p key={idx} className={idx === 0 ? "exhibit__lead" : undefined}>
                {para}
              </p>
            ))}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {exhibition.buttons.map((b) => (
                <Button
                  key={b.href}
                  href={b.href}
                  variant={b.style}
                  icon={b.style === "primary" ? "arrow-right" : undefined}
                >
                  {b.label}
                </Button>
              ))}
            </div>
          </div>
          <dl className="exhibit__details">
            {exhibition.details.map((d) => (
              <div key={d.label} className="exhibit__row">
                <dt>
                  <Icon name={d.icon} size={16} />
                  <span>{d.label}</span>
                </dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
