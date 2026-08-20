/**
 * Background Service Worker for Manifest V3 Grocery Deals Extension
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log('🛒 Grocery Deals Extension Installed Successfully.');
  // Set default storage if empty
  chrome.storage.local.get(['userLocation'], (res) => {
    if (!res.userLocation) {
      chrome.storage.local.set({
        userLocation: {
          address: 'DHA Phase 6, Lahore',
          latitude: 31.4697,
          longitude: 74.4107,
          radiusKm: 10
        }
      });
    }
  });
});

// Periodic alarm for deal price notifications (every 6 hours)
chrome.alarms.create('check-deal-alerts', { periodInMinutes: 360 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'check-deal-alerts') {
    console.log('Checking for new promotional deals near saved location...');
  }
});
