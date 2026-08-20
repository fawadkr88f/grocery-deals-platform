# Privacy & Data Protection Policy

## 1. Core Privacy Principles

1. **No Location Tracking or Resale**:
   - Addresses and coordinates entered into the extension are processed strictly for calculating distances to nearby stores for the active search.
   - User location history is never sold, traded, or shared with third parties or ad networks.

2. **Client-Side Storage**:
   - Favorite items, recent search queries, and custom shopping lists are stored locally in the browser's `chrome.storage.local`.
   - Users can clear all local storage at any time with a single click in the Settings page.

3. **Minimal Extension Permissions**:
   - `geolocation`: Used exclusively when the user explicitly clicks "Use Current Location".
   - `storage`: Used to remember recent addresses and user preferences.
   - `notifications`: Optional; only used if the user creates a price drop alert.
   - **No broad host permissions** (`<all_urls>` is NOT requested).

4. **Compliance with Web Standards**:
   - Sourced data conforms to standard web scraping ethics and publicly published promotional catalog terms.
