# Nerava

Nerava is being delivered as two connected mobile apps sharing Supabase, plus an admin web workspace:

- **Nerava** — the native iPhone and Android app for guests. Source: `apps/customer`.
- **Nerava Host** — the native iPhone and Android app for hosts. Source: `apps/host`.
- **Admin web workspace** — role-protected tools for platform moderation and analytics. Source: `admin.html`.

## Open locally

Serve this folder using any static web server, then open [index.html](index.html). The customer search app is at [listings.html](listings.html); the host and admin workspaces are [host.html](host.html) and [admin.html](admin.html).

## Current delivery

- Native customer and host apps have separate Android application IDs and iOS bundle IDs, authentication, Supabase-ready data access, and store build configuration. See `apps/STORE_RELEASE.md` for the release path.
- Customer search has location, type, guest, price, and amenity filters; sorting; saved stays; and a responsive bottom navigation.
- The customer experience is installable as a PWA through `app.webmanifest` and has a small offline app shell.
- Property detail, enquiry, review, booking history, profile, host onboarding, and the admin dashboard remain connected to the existing Supabase setup.
- Demo cards appear only while the site runs locally and only when there are no approved listings. Production users see real approved listings or an empty state.

## Build path

1. Finish the Supabase schema and RLS policies described in the product documents, then provision the image-storage buckets.
2. Create customer, host, and admin test accounts and test the full approval chain: host verification → property approval → customer booking → host confirmation → completed stay → review.
3. Add mobile-money payments, notifications, maps, and real-time messages after that core loop is stable.
4. Deploy the customer app and admin workspace separately, with production environment values and monitoring enabled.

The product documents remain the source of truth for the expanded data model, future payments, travel services, and regional rollout.
