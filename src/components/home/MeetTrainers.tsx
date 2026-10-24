
import Image from "next/image";
import Link from "next/link";
import { getCmsContent } from "@/lib/cms";

export async function MeetTrainers() {
  const { trainers } = await getCmsContent();
  const trainer = trainers[0];

  if (!trainer) return null;

  const qualifications = trainer.credentials.split(", ");

  return (
    <section
      className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-12"
      aria-labelledby="instructors-heading"
    >
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#96701f]">
          INSTRUCTORS
        </p>

        <h2
          id="instructors-heading"
          className="mt-3 text-3xl font-medium text-neutral-900 sm:text-4xl"
        >
          Learn with <span className="text-[#ad812b]">clinical experience.</span>
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
          Learn from experienced professionals who connect clinical knowledge
          with practical learning and real-world applications.
        </p>
      </div>

      <article className="grid overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[300px] bg-neutral-100 sm:min-h-[380px]">
          <Image
            src={trainer.portrait.url}
            alt={trainer.portrait.alt}
            fill
            sizes="(max-width: 767px) 100vw, 45vw"
            className="object-cover object-center"
          />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#96701f]">
            {trainer.specialtyLabel} · Clinical educator
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {trainer.name}
          </h3>

          <p className="mt-2 text-sm font-medium text-neutral-600 sm:text-base">
            {trainer.credentials}
          </p>

          <p className="mt-5 text-sm leading-7 text-neutral-600 sm:text-base">
            {trainer.experienceSummary}
          </p>

          <p className="mt-3 text-sm leading-7 text-neutral-600 sm:text-base">
            With experience in dermatology, skin health, hair concerns and
            cosmetic treatments, Dr. Manju Keshari brings a clinical
            perspective to aesthetic education, helping learners connect
            foundational knowledge with practical understanding.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {qualifications.map((qualification) => (
              <div
                key={qualification}
                className="rounded-lg bg-[#faf6ed] px-4 py-3"
              >
                <p className="text-sm font-semibold text-neutral-900">
                  {qualification}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-500">
                  Qualification
                </p>
              </div>
            ))}

            {trainer.practicingSince && (
              <div className="rounded-lg bg-[#faf6ed] px-4 py-3">
                <p className="text-sm font-semibold text-neutral-900">
                  {trainer.practicingSince}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-500">
                  Practising since
                </p>
              </div>
            )}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href={`/trainers/${trainer.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-[#96701f]"
            >
              View faculty profile
              <span aria-hidden="true">↗</span>
            </Link>

            <Link
              href="/courses"
              className="rounded-full bg-[#cda449] px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#b58b32]"
            >
              Explore courses
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
