york-open-heritage
==================

Data visualisation produced as part of an AHRC funded investigation into heritage with Leeds University, York Civic Trust, MadLab and others. It can be found in the wild at http://york.asacalow.me.

We have combined house price data from the UK Land Registry, and multiple deprivation index ranks from the UK Office of National Statistics' "English Indices of Deprivation 2010" dataset, alongside markers for listed buildings in York from the English Heritage's geospatial "Designation Data". For full workings, see (here)[WORKINGS.md]

## About the data

The IMD ranks for England represent the most reliable indicator of household deprivation (income, health /wellbeing etc.) in a given area. You can read more on how the IMD ranks are calculated [here](https://www.gov.uk/government/publications/english-indices-of-deprivation-2010).

## Running the visualisation locally

First up, you'll need to install Ruby and Bundler, plus Node, Npm and Grunt. You can then do the following:

    $ npm install
    $ bundle
    $ grunt watch

Mapping is provided via Mapbox's API.

## Acknowledgements

Many thanks to Addy Pope from Edinburgh University (and [sharegeo.ac.uk](http://www.sharegeo.ac.uk/)) for publishing IMD data in a geospatial format for use by others, and English Heritage for their designation data. IMD and House Price Open Data were provided by the Office of National Statistics and UK Land Registry respectively, under an [Open Government Licence](http://www.nationalarchives.gov.uk/doc/open-government-licence/).
