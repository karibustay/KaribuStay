# KaribuStay launch checklist

## Code complete in this repository

- [x] Customer web experience, account session, profile, password reset page, and legal links
- [x] Customer mobile app with login, signup, secure session storage, password-reset request, listings, saved stays, and booking requests
- [x] Host mobile app with login, signup, password-reset request, host application, listing management, and booking-request management
- [x] Admin web workspace and host web workspace
- [x] Separate Android package IDs and iOS bundle IDs for customer and host apps
- [x] Privacy Policy and Terms pages linked from web and both mobile apps

## Required before the first public build

- [ ] Connect the Vercel project for `karibustay.co.tz` to the `main` branch of this repository and confirm a new deployment.
- [ ] In Supabase, set Site URL to `https://karibustay.co.tz` and add `https://karibustay.co.tz/reset.html` as a Redirect URL.
- [ ] Add a production SMTP provider in Supabase Auth, then test signup and password-reset delivery to a non-team email address.
- [ ] Create at least three real listings through a host account and approve them in `admin.html`. Customers currently see no listings because the database has no `approved` listing.
- [ ] Create customer, host, and admin test accounts; test signup, reset password, host application, approval, listing approval, enquiry, host response, favourites, and sign-out.
- [ ] Review `privacy.html` and `terms.html` with a qualified legal adviser and update business details, cancellation rules, and payment terms before publishing.
- [ ] Add `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` to each app's EAS development, preview, and production environments.

## Store release

- [ ] Create or grant access to the Google Play Console and Apple Developer accounts.
- [ ] In each app folder run `npm run typecheck`, then create Android and iOS preview builds for device testing.
- [ ] Test the preview builds on physical Android and iPhone devices.
- [ ] Prepare store screenshots, app description, support email, content rating, privacy/data-safety declarations, and the public privacy policy URL: `https://karibustay.co.tz/privacy.html`.
- [ ] Build and submit `KaribuStay` and `KaribuStay Host` as two separate store apps.
