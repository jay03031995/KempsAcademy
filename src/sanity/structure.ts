import type { StructureResolver } from "sanity/structure";

const SINGLETONS = [
  { id: "siteSettings", title: "Site Settings" },
  { id: "navigation", title: "Navigation" },
  { id: "homepage", title: "Homepage" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Kemps Content")
    .items([
      ...SINGLETONS.map(({ id, title }) =>
        S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id))
      ),
      S.divider(),
      S.documentTypeListItem("course").title("Courses"),
      S.documentTypeListItem("workshop").title("Workshops"),
      S.documentTypeListItem("programmeCategory").title("Programme Categories"),
      S.documentTypeListItem("batch").title("Batches"),
      S.divider(),
      S.documentTypeListItem("trainer").title("Trainers"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("galleryItem").title("Gallery"),
      S.divider(),
      S.documentTypeListItem("article").title("Insights / Articles"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("page").title("General Pages"),
      S.documentTypeListItem("brochure").title("Brochures"),
      S.divider(),
      S.documentTypeListItem("redirect").title("Redirects"),
    ]);
