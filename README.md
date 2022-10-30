# creative-code

## Exporting to HTML

Use browserify to bundle components together
`browserify topography.js -o bundle.js`

Copy to site components
`cp bundle.js ../../portfolio/assets/js/topography-sketch.js`

Within index.html import script:
<script src="./assets/js/topography-sketch.js"></script>
