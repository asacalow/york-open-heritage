# Workings

## Overview

This describes the workings used to combine our three datasets – English Heritage Listed Buildings; "Index of Multiple Deprivation" (IMD) ranks from the Office for National Statistics; House Price data from the UK Land Registry – into geojson which can be visualised in the browser.

The Listed Buildings data from English Heritage is provided as a Shapefile, and conversion is therefore straightforward.

The IMD data provided by the Office for National Statistics (ONS) is organised by LSOA area. This is a measure used by the ONS for geographical data, where each area is selected to represent a roughly similar population size.

The ONS provides a number of datasets which can be used when comparing the relative prosperity (health, economic etc.) of the UK. The most important of these are the combined IMD Score and IMD Rank datasets. While the IMD Score dataset sounds like it would be the most accurate representation it in fact is not – the scores do not scale linearly, and are only used in calculating the IMD Ranks ([more on this here](http://opendatacommunities.org/data/societal-wellbeing/deprivation/imd-rank-2010)). We have therefore used the UK-wide IMD Rank data, then re-ranked this locally to give us a rank from 1-118 where 118 represents the least deprived LSOA in York and 1 the most deprived.

House price data is based on all sales in York since August 2012 (~8k sales), which are then matched against LSOA by postcode. We then take the median house sale price for each LSOA.

## Method

  1. Convert the English Heritage designation shapefile into geojson, using eh_to_geojson.rb
  2. Re-rank the IMD data locally, using imd_rerank.rb
  3. Combine house price data with the postcode-LSOA bridging data to produce a JSON file containing all house transactions for a given LSOA in the period, using house_prices_for_lsoa.rb
  4. Wrangle the house price data into a single-column .csv, then create quintiles for the data using R:
```
> d <- read.csv('in.csv')
> library(dplyr)
> quantile(d$<COLUMN NAME HERE>, probs=seq(0.2,0.8,0.2))
```
  5. Convert the IMD shapefile into geojson and combine it with the generated house price JSON data and new IMD ranks, using imd_to_geojson.rb

## Obtaining the relevant data

### IMD rank data

Run the following query in the Opendatacommunities [SPARQL console](http://opendatacommunities.org/sparql):

    select ?rank ?gss where {
      graph <http://opendatacommunities.org/graph/societal-wellbeing/deprivation/imd-rank-2010> {
        ?s <http://opendatacommunities.org/def/ontology/societal-wellbeing/deprivation/imdRank> ?rank .
        ?s <http://opendatacommunities.org/def/ontology/geography/refArea> ?lsoa .
      }
      graph <http://opendatacommunities.org/graph/lower-layer-super-output-areas> {
        ?lsoa <http://www.w3.org/2004/02/skos/core#notation> ?gss .
        ?lsoa <http://www.w3.org/2000/01/rdf-schema#label> ?l .

        FILTER (strstarts(?l, "York"))
      }
    }

And download the results in .csv (spreadsheet) format.

### House price data from the UK Land Registry

Run the following query in the UK Land Registry's [Linked Open Data Console](http://landregistry.data.gov.uk/app/hpi/qonsole):

    prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    prefix owl: <http://www.w3.org/2002/07/owl#>
    prefix xsd: <http://www.w3.org/2001/XMLSchema#>
    prefix sr: <http://data.ordnancesurvey.co.uk/ontology/spatialrelations/>
    prefix lrhpi: <http://landregistry.data.gov.uk/def/hpi/>
    prefix lrppi: <http://landregistry.data.gov.uk/def/ppi/>
    prefix skos: <http://www.w3.org/2004/02/skos/core#>
    prefix lrcommon: <http://landregistry.data.gov.uk/def/common/>

    SELECT ?paon ?street ?postcode ?amount ?date WHERE {
      ?transx lrppi:pricePaid ?amount ;
              lrppi:transactionDate ?date ;
              lrppi:propertyAddress ?addr.

      ?addr lrcommon:paon ?paon .
      ?addr lrcommon:street ?street .
      ?addr lrcommon:postcode ?postcode .
      ?addr lrcommon:town "YORK"^^xsd:string.

      FILTER (?date > "2012-08-01"^^xsd:date)
    }
    ORDER BY ?amount

And download it in JSON format

### Building a bridge between UK Postcode and LSOA

In order to bridge UK house price and government geospatial data we need to match postcode entries with their containing Lower Super Output Areas. For this we use Opendatacommunities again:

    select ?postcode ?gss where {
      graph <http://opendatacommunities.org/graph/lower-layer-super-output-areas> {
        ?lsoa a <http://opendatacommunities.org/def/geography#LSOA> .
      }
      graph <http://opendatacommunities.org/graph/postcodes> {
        ?s <http://opendatacommunities.org/def/geography#lsoa> ?lsoa .
        ?s a <http://data.ordnancesurvey.co.uk/ontology/postcode/PostcodeUnit> .
        ?s <http://www.w3.org/2004/02/skos/core#notation> ?postcode .
        ?lsoa <http://www.w3.org/2004/02/skos/core#notation> ?gss .
        ?lsoa <http://www.w3.org/2000/01/rdf-schema#label> ?l .

        FILTER (strstarts(?l, "YORK"))
      }
    }

Download this in .csv format

### Additional Data

 - Addy Pope's IMD geospatial dataset, which can be found [here](http://www.sharegeo.ac.uk/handle/10672/481) and unzip it.
 - Designation shapefile data from English Heritage (Now Historic England).
