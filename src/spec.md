# Specification

## Summary
**Goal:** Make the existing web app publishable and installable as a Progressive Web App (PWA) on Android and desktop, as an alternative to a Google Play Store upload.

**Planned changes:**
- Add and serve a valid web app manifest (name, short_name, start_url, display=standalone, theme/background colors, and icon references).
- Register a service worker to enable basic offline support, including a friendly offline fallback page when the network is unavailable.
- Add required static PWA icon assets (including 192x192 and 512x512 PNGs) under a public static path and reference them from the manifest.
- Add a README section explaining how to share the deployed app URL and how to install the app on Android via “Install app” / “Add to Home screen”, noting that Play Store upload requires a separate Android build outside this project.

**User-visible outcome:** Users can install the web app to their Android home screen or desktop as a standalone app, and it will show an offline-friendly page when no network is available.
