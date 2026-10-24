import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="content-container py-24 text-center flex flex-col items-center gap-4">
      <p className="text-sm font-medium text-gold-dark uppercase tracking-wide">404</p>
      <h1 className="text-3xl font-semibold text-plum">Page not found</h1>
      <p className="text-charcoal-muted max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Try one of these instead.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        <ButtonLink href="/courses" variant="primary">Browse Courses</ButtonLink>
        <ButtonLink href="/" variant="secondary">Go Home</ButtonLink>
      </div>
    </div>
  );
}
