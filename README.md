# PET Fit

A one-tap bookmark that makes the Productivity Entry Tool (a Power Apps canvas app) usable in a phone browser.

**Setup page:** https://mircix.github.io/pet-fit/

## The problem

On a phone, the app lays itself out to the phone's narrow width. Headings, buttons and columns overlap,
and the "Please Select Working Location" box ends up off the right edge, so the list never loads.

## Option 1: automatic on iPhone (`pet-fit.user.js`)

A userscript for the open-source **Userscripts** Safari extension
(https://apps.apple.com/app/userscripts/id1463298887). It runs on `https://apps.powerapps.com/*`. On
`/mobile/redirect` it taps "Continue in browser" once per visit, and on `/play/` pages it applies the same
viewport change as the bookmark. You sign in to PET normally in Safari (first-party), so no third-party
cookies are needed. Install it by opening https://mircix.github.io/pet-fit/pet-fit.user.js in Safari and
choosing Install from the Userscripts extension menu.

## Option 2: the bookmark

Tapped while the app is open, the bookmark changes the page's viewport to 1280 px wide (laptop width) and
sets the zoom so that width fits the screen. The app then lays itself out as it does on a laptop, and the
phone shows it shrunk to fit. Pinch-zoom stays available. Reloading the page undoes it.

It only edits the page's `<meta name="viewport">` tag in your own browser. It doesn't read, store or send
anything, and it does nothing on other sites. Run anywhere else, it shows a message saying to open PET first.

## Option 3: one link (`open.html`), not for iPhone

https://mircix.github.io/pet-fit/open.html loads PET inside the page, using Microsoft's documented way of
embedding canvas apps (`source=iframe`). It's laid out at 1280 px wide and CSS-scaled to the phone's width,
so the app lays itself out as on a laptop with no script running inside it. You sign in through Microsoft's own
"Sign in required" prompt in the frame, which opens a Microsoft sign-in popup.

The PET link is never stored in this repo. It comes from the address after `#` (`open.html#u=<encoded link>`),
which browsers don't send to the server, or from a one-time paste saved in the phone's localStorage. The ⋯ button
has Reload, Open PET normally, and Change PET link.

On iPhone it can't sign in: inside the frame PET's prompt says "Please make sure third party cookies are allowed
in your browser settings", and iOS browsers block them by default ("Prevent Cross-Site Tracking"). The page
shows a note pointing iPhone users to Options 1 and 2.

## Files

- `pet-fit.user.js`: the userscript (Option 1).
- `open.html`: the one-link page (Option 3).
- `index.html`: the setup page. The bookmark's source is in the `<script type="text/plain" id="pet-fit-src">`
  block, and the page turns it into the `javascript:` link and the Copy button.

## Tested

- `open.html` in desktop Chrome with the real PET: Microsoft's sign-in prompt appeared in the frame, sign-in
  went through the popup, and PET loaded inside the page without the Power Apps header.
- `open.html` scaling at 375 px (phone emulation) with the stand-in page: the frame gets 1280 px, scale 0.293.
- `open.html` in the iPhone simulator's Safari: PET's prompt asks for third-party cookies (iPhone limitation).
- `pet-fit.user.js`: on the real Power Apps phone screen (mobile emulation), it found and tapped "Continue in
  browser", and Power Apps moved on to sign-in. The viewport part is the bookmark's code, tested below.
- Not yet tested: the Userscripts extension itself on a real iPhone.
- Bookmark: real iPhone Safari engine (iOS 27 simulator, iPhone 18 Pro) on a stand-in page that lays itself out the
  way PET does. Before: 402 px wide, overlapping. After: 1280 px wide, zoomed to 0.31, nothing overlapping,
  location box on screen.
