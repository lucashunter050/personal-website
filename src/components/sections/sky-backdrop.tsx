/**
 * Fixed sky plate behind the dashboard sections — bright cloudscape (light),
 * night clouds (dark), softened by a background-color wash so cards stay legible.
 */
export function SkyBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <img
        src="/backgrounds/sky-day.jpg"
        alt=""
        className="absolute inset-0 hidden size-full object-cover md:block dark:md:hidden"
      />
      <img
        src="/backgrounds/sky-day-portrait.jpg"
        alt=""
        className="absolute inset-0 block size-full object-cover md:hidden dark:hidden"
      />
      <img
        src="/backgrounds/sky-night-portrait.jpg"
        alt=""
        className="absolute inset-0 hidden size-full object-cover dark:block"
      />
      <div className="absolute inset-0 bg-background/60" />
    </div>
  );
}
