# KaribuStay

KaribuStay is being delivered as two connected products sharing Supabase:

- **Customer app** — an installable, mobile-first web app for discovering stays, filtering, saving favourites, authenticating, and managing bookings.
- **Host and admin web workspace** — role-protected tools for host onboarding, listing management, booking and revenue visibility, plus platform moderation and analytics.

## Open locally

Serve this folder using any static web server, then open [index.html](index.html). The customer search app is at [listings.html](listings.html); the host and admin workspaces are [host.html](host.html) and [admin.html](admin.html).

## Current delivery

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
