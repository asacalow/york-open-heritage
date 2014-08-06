require 'rubygems'
require 'bundler'
Bundler.require
require 'json'

RGeo::Shapefile::Reader.open('/Users/asacalow/Mudpit/shyp-tryout2.shp') do |file|
  count = 0
  features = []
  file.each do |record|
    if record.attributes['LSOA11NM'].include?('York ')
      count += 1
      easting, northing = record.geometry.x, record.geometry.y
      location = GlobalConvert::Location.new(
        input: {
          projection: :osgb36,
          lon: easting,
          lat: northing
        },
        output: {
          projection: :wgs84
        }
      )
      latitude = location.lat * (180/Math::PI)
      longitude = location.lon * (180/Math::PI)
      factory = record.geometry.factory
      point = factory.point(longitude, latitude)
      feature = RGeo::GeoJSON::Feature.new(point, nil, record.attributes)
      features << feature
    end
  end
  file.rewind
  # puts "York LSOAs: #{count}"
  # puts "---"
  puts RGeo::GeoJSON.encode(RGeo::GeoJSON::FeatureCollection.new(features)).to_json
end
