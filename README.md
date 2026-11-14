# PET Fit

A one-tap bookmark that makes the Productivity Entry Tool (a Power Apps canvas app) usable in a phone browser.

**Setup page:** https://mircix.github.io/pet-fit/

## The problem

On a phone, the app lays itself out to the phone's narrow width. Headings, buttons and columns overlap,
and the "Please Select Working Location" box ends up off the right edge, so the list never loads.

## What PET Fit does

Tapped while the app is open, the bookmark changes the page's viewport to 1280 px wide (laptop width) and
sets the zoom so that width fits the screen. The app then lays itself out as it does on a laptop, and the
phone shows it shrunk to fit. Pinch-zoom stays available. Reloading the page undoes it.

It only edits the page's `<meta name="viewport">` tag in your own browser. It doesn't read, store or send
anything, and it does nothing on other sites. Run anywhere else, it shows a message saying to open PET first.

## Files

- `index.html`: the setup page. The bookmark's source is in the `<script type="text/plain" id="pet-fit-src">`
  block, and the page turns it into the `javascript:` link and the Copy button.

## Tested

- Real iPhone Safari engine (iOS 27 simulator, iPhone 18 Pro) on a stand-in page that lays itself out the
  way PET does. Before: 402 px wide, overlapping. After: 1280 px wide, zoomed to 0.31, nothing overlapping,
  location box on screen.
