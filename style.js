module.exports.descriptionStyle = `
#description-container>dt {
    font-weight: bold;
    margin-top: 20px;
    padding-left: 5px;
}

#description-container>dd {
    line-height: 26px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-inline-start: 10px;
}

#description-container>dd code:not(.hljs) {
    border-radius: 2px;
    padding: 2px 4px
}

#description-container pre {
    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
}

.vjudge_sample {
    border: 1px solid #222;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%
}

.vjudge_sample td,.vjudge_sample th {
    border: 1px solid #222;
    padding: 5px;
    vertical-align: top
}

.vjudge_sample th span.copier {
    border: 1px solid #b9b9b9;
    cursor: pointer;
    float: right;
    font-family: monospace;
    font-size: .8rem;
    line-height: 1.1rem;
    margin: 1px;
    padding: 3px;
    text-transform: none
}

.vjudge_sample td {
}

.vjudge_sample pre {
    font-family: monospace;
    font-size: .875em;
    line-height: 1.25em;
    margin: 0;
    overflow-y: auto
}

@font-face {
    font-family: Open Sans;
    font-style: normal;
    font-weight: regular;
    src: url(//lib.baomitu.com/fonts/open-sans/open-sans-regular.eot);
    src: local("Open Sans"),local("OpenSans-Normal"),url(//lib.baomitu.com/fonts/open-sans/open-sans-regular.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-regular.woff2) format("woff2"),url(//lib.baomitu.com/fonts/open-sans/open-sans-regular.woff) format("woff"),url(//lib.baomitu.com/fonts/open-sans/open-sans-regular.ttf) format("truetype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-regular.svg#OpenSans) format("svg")
}

@font-face {
    font-family: Open Sans;
    font-style: normal;
    font-weight: 300;
    src: url(//lib.baomitu.com/fonts/open-sans/open-sans-300.eot);
    src: local("Open Sans"),local("OpenSans-Normal"),url(//lib.baomitu.com/fonts/open-sans/open-sans-300.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-300.woff2) format("woff2"),url(//lib.baomitu.com/fonts/open-sans/open-sans-300.woff) format("woff"),url(//lib.baomitu.com/fonts/open-sans/open-sans-300.ttf) format("truetype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-300.svg#OpenSans) format("svg")
}

@font-face {
    font-family: Open Sans;
    font-style: italic;
    font-weight: 300;
    src: url(//lib.baomitu.com/fonts/open-sans/open-sans-300italic.eot);
    src: local("Open Sans"),local("OpenSans-Italic"),url(//lib.baomitu.com/fonts/open-sans/open-sans-300italic.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-300italic.woff2) format("woff2"),url(//lib.baomitu.com/fonts/open-sans/open-sans-300italic.woff) format("woff"),url(//lib.baomitu.com/fonts/open-sans/open-sans-300italic.ttf) format("truetype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-300italic.svg#OpenSans) format("svg")
}

@font-face {
    font-family: Open Sans;
    font-style: italic;
    font-weight: regular;
    src: url(//lib.baomitu.com/fonts/open-sans/open-sans-italic.eot);
    src: local("Open Sans"),local("OpenSans-Italic"),url(//lib.baomitu.com/fonts/open-sans/open-sans-italic.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-italic.woff2) format("woff2"),url(//lib.baomitu.com/fonts/open-sans/open-sans-italic.woff) format("woff"),url(//lib.baomitu.com/fonts/open-sans/open-sans-italic.ttf) format("truetype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-italic.svg#OpenSans) format("svg")
}

@font-face {
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    src: url(//lib.baomitu.com/fonts/open-sans/open-sans-600.eot);
    src: local("Open Sans"),local("OpenSans-Normal"),url(//lib.baomitu.com/fonts/open-sans/open-sans-600.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-600.woff2) format("woff2"),url(//lib.baomitu.com/fonts/open-sans/open-sans-600.woff) format("woff"),url(//lib.baomitu.com/fonts/open-sans/open-sans-600.ttf) format("truetype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-600.svg#OpenSans) format("svg")
}

@font-face {
    font-family: Open Sans;
    font-style: italic;
    font-weight: 600;
    src: url(//lib.baomitu.com/fonts/open-sans/open-sans-600italic.eot);
    src: local("Open Sans"),local("OpenSans-Italic"),url(//lib.baomitu.com/fonts/open-sans/open-sans-600italic.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-600italic.woff2) format("woff2"),url(//lib.baomitu.com/fonts/open-sans/open-sans-600italic.woff) format("woff"),url(//lib.baomitu.com/fonts/open-sans/open-sans-600italic.ttf) format("truetype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-600italic.svg#OpenSans) format("svg")
}

@font-face {
    font-family: Open Sans;
    font-style: normal;
    font-weight: 700;
    src: url(//lib.baomitu.com/fonts/open-sans/open-sans-700.eot);
    src: local("Open Sans"),local("OpenSans-Normal"),url(//lib.baomitu.com/fonts/open-sans/open-sans-700.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-700.woff2) format("woff2"),url(//lib.baomitu.com/fonts/open-sans/open-sans-700.woff) format("woff"),url(//lib.baomitu.com/fonts/open-sans/open-sans-700.ttf) format("truetype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-700.svg#OpenSans) format("svg")
}

@font-face {
    font-family: Open Sans;
    font-style: normal;
    font-weight: 800;
    src: url(//lib.baomitu.com/fonts/open-sans/open-sans-800.eot);
    src: local("Open Sans"),local("OpenSans-Normal"),url(//lib.baomitu.com/fonts/open-sans/open-sans-800.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-800.woff2) format("woff2"),url(//lib.baomitu.com/fonts/open-sans/open-sans-800.woff) format("woff"),url(//lib.baomitu.com/fonts/open-sans/open-sans-800.ttf) format("truetype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-800.svg#OpenSans) format("svg")
}

@font-face {
    font-family: Open Sans;
    font-style: italic;
    font-weight: 700;
    src: url(//lib.baomitu.com/fonts/open-sans/open-sans-700italic.eot);
    src: local("Open Sans"),local("OpenSans-Italic"),url(//lib.baomitu.com/fonts/open-sans/open-sans-700italic.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-700italic.woff2) format("woff2"),url(//lib.baomitu.com/fonts/open-sans/open-sans-700italic.woff) format("woff"),url(//lib.baomitu.com/fonts/open-sans/open-sans-700italic.ttf) format("truetype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-700italic.svg#OpenSans) format("svg")
}

@font-face {
    font-family: Open Sans;
    font-style: italic;
    font-weight: 800;
    src: url(//lib.baomitu.com/fonts/open-sans/open-sans-800italic.eot);
    src: local("Open Sans"),local("OpenSans-Italic"),url(//lib.baomitu.com/fonts/open-sans/open-sans-800italic.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-800italic.woff2) format("woff2"),url(//lib.baomitu.com/fonts/open-sans/open-sans-800italic.woff) format("woff"),url(//lib.baomitu.com/fonts/open-sans/open-sans-800italic.ttf) format("truetype"),url(//lib.baomitu.com/fonts/open-sans/open-sans-800italic.svg#OpenSans) format("svg")
}

@font-face {
    font-family: Merriweather;
    font-style: normal;
    font-weight: regular;
    src: url(//lib.baomitu.com/fonts/merriweather/merriweather-regular.eot);
    src: local("Merriweather"),local("Merriweather-Normal"),url(//lib.baomitu.com/fonts/merriweather/merriweather-regular.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/merriweather/merriweather-regular.woff2) format("woff2"),url(//lib.baomitu.com/fonts/merriweather/merriweather-regular.woff) format("woff"),url(//lib.baomitu.com/fonts/merriweather/merriweather-regular.ttf) format("truetype"),url(//lib.baomitu.com/fonts/merriweather/merriweather-regular.svg#Merriweather) format("svg")
}

@font-face {
    font-family: Merriweather;
    font-style: italic;
    font-weight: regular;
    src: url(//lib.baomitu.com/fonts/merriweather/merriweather-italic.eot);
    src: local("Merriweather"),local("Merriweather-Italic"),url(//lib.baomitu.com/fonts/merriweather/merriweather-italic.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/merriweather/merriweather-italic.woff2) format("woff2"),url(//lib.baomitu.com/fonts/merriweather/merriweather-italic.woff) format("woff"),url(//lib.baomitu.com/fonts/merriweather/merriweather-italic.ttf) format("truetype"),url(//lib.baomitu.com/fonts/merriweather/merriweather-italic.svg#Merriweather) format("svg")
}

@font-face {
    font-family: Merriweather;
    font-style: normal;
    font-weight: 700;
    src: url(//lib.baomitu.com/fonts/merriweather/merriweather-700.eot);
    src: local("Merriweather"),local("Merriweather-Normal"),url(//lib.baomitu.com/fonts/merriweather/merriweather-700.eot?#iefix) format("embedded-opentype"),url(//lib.baomitu.com/fonts/merriweather/merriweather-700.woff2) format("woff2"),url(//lib.baomitu.com/fonts/merriweather/merriweather-700.woff) format("woff"),url(//lib.baomitu.com/fonts/merriweather/merriweather-700.ttf) format("truetype"),url(//lib.baomitu.com/fonts/merriweather/merriweather-700.svg#Merriweather) format("svg")
}
`
