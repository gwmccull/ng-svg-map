# Dynamically Labeled Markers on a Google Map

This was an example project written for a 
[blog post](http://mcculloughwebservices.com/2015/09/26/dynamically-labeled-markers-on-a-google-map/)

In it, I describe how you can use SVG images to build markers with numbered labels for a Google Map.

The code in this repo is written in ES2015.  To run it, you'll probably need to compile it to ES5.  You may use the
compiler of your choice or here are directions
on how to set up the [Babel plugin in Webstorm](http://mcculloughwebservices.com/2015/06/14/webstorm-babel-plugin/).

Additionally, you'll need to create a Google Maps API key and put it in a `google.js` file in a `key` directory at the
root of the project (see `index.html`).  Your `google.js` file should contain something like this:  
`var api_key = '1234';`
