import type { StructureResolver } from "sanity/structure";

export const enquiryStructure: StructureResolver = (S) =>
  S.list()
    .title("Admissions dashboard")
    .items([
      S.documentTypeListItem("admissionEnquiry").title("Enquiries and follow-ups"),
      S.documentTypeListItem("appointmentRequest").title("Appointment requests"),
    ]);
