# PET Fit

A one-tap bookmark that makes the Productivity Entry Tool (a Power Apps canvas app) usable in a phone browser.

**Setup page:** https://mircix.github.io/pet-fit/

## The problem

On a phone, the app lays itself out to the phone's narrow width. Headings, buttons and columns overlap,
and the "Please Select Working Location" box ends up off the right edge, so the list never loads.

## Option 1: one link (`open.html`)

https://mircix.github.io/pet-fit/open.html loads PET inside the page, using Microsoft's documented way of
embedding canvas apps (`source=iframe`). It's laid out at 1280 px wide and CSS-scaled to the phone's width,
so the app lays itself out as on a laptop with no script running inside it. You sign in through Microsoft's own
"Sign in required" prompt in the frame, which opens a Microsoft sign-in popup.

The PET link is never stored in this repo. It comes from the address after `#` (`open.html#u=<encoded link>`),
which browsers don't send to the server, or from a one-time paste saved in the phone's localStorage. The ⋯ button
has Reload, Open PET normally, and Change PET link.

## Option 2: the bookmark

Tapped while the app is open, the bookmark changes the page's viewport to 1280 px wide (laptop width) and
sets the zoom so that width fits the screen. The app then lays itself out as it does on a laptop, and the
phone shows it shrunk to fit. Pinch-zoom stays available. Reloading the page undoes it.

It only edits the page's `<meta name="viewport">` tag in your own browser. It doesn't read, store or send
anything, and it does nothing on other sites. Run anywhere else, it shows a message saying to open PET first.

## Files

- `open.html`: the one-link page (Option 1).
- `index.html`: the setup page. The bookmark's source is in the `<script type="text/plain" id="pet-fit-src">`
  block, and the page turns it into the `javascript:` link and the Copy button.

## Tested

- `open.html` in desktop Chrome with the real PET: Microsoft's sign-in prompt appeared in the frame, sign-in
  went through the popup, and PET loaded inside the page without the Power Apps header.
- `open.html` scaling at 375 px (phone emulation) with the stand-in page: the frame gets 1280 px, scale 0.293.
- Not yet tested: signing in inside the frame on a real iPhone.
- Bookmark: real iPhone Safari engine (iOS 27 simulator, iPhone 18 Pro) on a stand-in page that lays itself out the
  way PET does. Before: 402 px wide, overlapping. After: 1280 px wide, zoomed to 0.31, nothing overlapping,
  location box on screen.
