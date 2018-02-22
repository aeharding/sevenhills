var Metalsmith  = require('metalsmith');
// var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');
var sass  = require('metalsmith-sass');
var canonical  = require('metalsmith-canonical');
var extlinks = require('metalsmith-external-links');
var autoprefixer = require('metalsmith-autoprefixer');
var fingerprint = require('metalsmith-fingerprint')


Metalsmith(__dirname)
  .metadata({
    // sitename: "My Static Site & Blog",
    // siteurl: "http://example.com/",
    // description: "It's about saying »Hello« to the world.",
    // generatorname: "Metalsmith",
    // generatorurl: "http://metalsmith.io/"
    title: "Seven Hills Skydivers of Madison, WI",
    titleShort: "Seven Hills Skydivers",
    description: "Seven Hills is the #1 choice for tandem and solo skydiving in Wisconsin for over 55 years. Not-for-profit, volunteer owned and operated parachute club, offering professional, safety oriented, family friendly skydiving. Located in Madison, WI and close to Milwaukee."
  })
  .source('./src')
  .destination('./docs')
  .clean(true)
  // .use(collections({          // group all blog posts by internally
  //   posts: 'posts/*.md'       // adding key 'collections':'posts'
  // }))                         // use `collections.posts` in layouts
  .use(markdown({
    gfm: true
  }))
  .use(permalinks({
    relative: false,
    "pattern": ":pageTitle",
    date: "YYYY",
    linksets: [{
        match: { "collection": "posts" },
        pattern: "posts//:title"
    }, {
        match: { "collection": "city" },
        pattern: "city/:title"
    }]
  }))
  .use(canonical({
    hostname: "https://sevenhillsskydivers.org",
    omitIndex: true,
    omitTrailingSlashes: false
  }))
  .use(sass({
    outputDir: "css",
    outputStyle: "expanded",
    includePaths: []
  }))
  .use(autoprefixer())
  .use(fingerprint({ pattern: 'css/index.css' }))
  .use(layouts({
    engine: "handlebars",
    partials: "partials"
  }))
  .use(extlinks({
    domain: 'sevenhillsskydivers.org',
    whitelist: [],
    rel: 'noopener',
    target: '_blank'
    // extClass: 'external'
  }))
  .build(function(err) {
    if (err) throw err;
  });

// -{
// -  "metadata": {
// -    "title": "Seven Hills Skydivers of Madison, WI",
// -    "titleShort": "Seven Hills Skydivers",
// -    "description": "Seven Hills is the #1 choice for tandem and solo skydiving in Wisconsin for over 55 years. Not-for-profit, volunteer owned and operated parachute club, offering professional, safety oriented, family friendly skydiving. Located in Madison, WI and close to Milwaukee."
// -  },
// -  "plugins": {
// -    "metalsmith-markdown": {},
// -    "metalsmith-permalinks": {
// -      "pattern": ":pageTitle",
// -      "date": "YYYY",
// -      "linksets": [{
// -          "match": { "collection": "posts" },
// -          "pattern": "posts/:date/:title",
// -          "date": "mmddyy"
// -      }, {
// -          "match": { "collection": "city" },
// -          "pattern": "city/:title",
// -          "date": "mmddyy"
// -      }]
// -    },
// -    "metalsmith-layouts": {
// -      "engine": "handlebars",
// -      "partials": "partials"
// -    },
// -    "metalsmith-sass": {
// -      "outputDir": "css",
// -      "outputStyle": "expanded",
// -      "includePaths": [
// -
// -      ]
// -    }
// -  }
// -}
