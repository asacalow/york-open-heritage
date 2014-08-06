## Getting the overall IMD rank data

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

# Getting house price data from the UK Land Registry

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

# Building a bridge between UK Postcode and LSOA

In order to bridge UK house price and government geospatial data we need to match postcode entries with their containing Lower Super Output Areas:

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

# Additional Data

Download Addy Pope's IMD geospatial dataset, which can be found [here](http://www.sharegeo.ac.uk/handle/10672/481) and unzip it.

# Workings

First up, we re-ranked the UK-wide IMD ranks to give a local ranking for the 118 LSOAs in York. We then ran both the rankings and house prices through R using the following process to get the quintiles for the data:

    > d <- read.csv('in.csv')
    > library(dplyr)
    > quantile(d$<COLUMN NAME HERE>, probs=seq(0.2,0.8,0.2))

(The house price data required some dirty hacking to get it into a single-column .csv)

# Workings continued…

  * We use house_price_for_lsoa.rb to combine house price data with the postcode-LSOA map to produce a JSON file containing all house transactions for a given LSOA in the period. This will be used later
  * We use imd_rerank.rb to produce a map of LSOA (GSS) to new IMD rank (1-118), given the UK-wide ranks from the above SPARQL-derived data.
  * Finally, imd_to_geojson.rb pulls together the LSOA shapefile data with our house prices and new IMD ranks to create a set of geojson for use in the front end.
