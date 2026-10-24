import type { Article } from "@/lib/types";

// Original editorial content — generic guidance, not Kemps-specific claims
// or statistics. Safe to publish as-is; update author/photo once confirmed.
export const articles: Article[] = [
  {
    _id: "article-choosing-a-course",
    slug: "how-to-choose-an-aesthetics-cosmetology-course",
    title: "How to Choose the Right Aesthetics & Cosmetology Course",
    summary:
      "A practical checklist for evaluating eligibility, trainer qualifications, and hands-on training structure before you enrol.",
    coverImage: { url: "/images/indian/indian-skin-training.png", alt: "How to choose a course — illustrative treatment photograph" },
    author: "Kemps Faculty",
    publishedAt: "2026-08-12",
    tags: ["admissions", "course-selection"],
    body: [
      "Choosing a clinical aesthetics or cosmetology programme is a long-term investment, not just in money but in time and career direction. Before you enrol anywhere, it helps to check a few things first.",
      "Start with eligibility. Many hands-on procedural courses are restricted to qualified doctors because they involve patient-facing clinical work. Make sure you meet the stated eligibility before you get attached to a particular programme.",
      "Next, look closely at how practical training is structured. Ask specifically: will you observe, assist, or independently perform procedures, and under what supervision? A programme that's vague about this is a programme you should ask harder questions of.",
      "Finally, check who is actually teaching. A trainer's verified qualifications and clinical experience matter more than a glossy brochure. Ask for specifics, not general claims.",
    ],
  },
  {
    _id: "article-theory-vs-practical",
    slug: "theory-vs-practical-what-to-expect-in-hands-on-training",
    title: "Theory vs. Practical: What to Expect in Hands-On Training",
    summary:
      "Understanding the difference between observing, assisting, and independently performing a procedure — and why it matters for your training.",
    coverImage: { url: "/images/indian/indian-skin-training.png", alt: "Theory vs practical training — illustrative treatment photograph" },
    author: "Kemps Faculty",
    publishedAt: "2026-09-02",
    tags: ["practical-training", "learning-pathway"],
    body: [
      "Most well-run clinical training follows a simple progression: theory first, then demonstration, then supervised practice. Understanding where you are in that sequence — and where a specific course will take you — matters.",
      "Observing is exactly that: watching a trainer perform a procedure and understanding the clinical reasoning behind each step. Assisting means you're hands-on, but under direct supervision, performing parts of a procedure while a trainer guides and corrects you in real time.",
      "Independently performing a procedure is a different stage entirely, and reputable training programmes are explicit about whether — and when — a learner reaches that stage, if at all, within the course.",
      "When comparing programmes, ask directly which of these stages the course covers. A clear answer is a good sign.",
    ],
  },
  {
    _id: "article-trainer-qualifications",
    slug: "why-your-trainers-qualifications-matter",
    title: "Why Your Trainer's Qualifications Matter",
    summary:
      "What to check before trusting a trainer with your clinical education — qualifications, registration, and relevant experience.",
    coverImage: { url: "/images/indian/indian-clinical-training.jpg", alt: "Trainer qualifications — illustrative treatment photograph" },
    author: "Kemps Faculty",
    publishedAt: "2026-09-20",
    tags: ["trainers", "course-selection"],
    body: [
      "In clinical and cosmetic training, the trainer is the curriculum. Two programmes can have an identical syllabus on paper and produce very different outcomes depending on who is actually teaching.",
      "Before enrolling, check your trainer's formal qualifications (degree, specialisation, registration) and ask how long they've been practising in the specific area the course covers.",
      "It's reasonable to ask a training academy to confirm a trainer's credentials directly rather than relying on marketing copy alone — a credible academy will not mind the question.",
    ],
  },
];
