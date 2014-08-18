tbaldw.in-site
==============

This is (most of) the source for my personal website.

Make sure you run `npm install` from the root.

Then, run a local server from the `app` directory: `python -m SimpleHTTPServer 8080`, and point your browser to `localhost:8080`.

If you mess around with any of the javascript or sass, make sure you run `watchify app/js/app.js -o app/js/main.js -v` from the root and `compass watch` from the `app` directory.
