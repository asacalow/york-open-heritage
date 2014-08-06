require 'rubygems'
require 'bundler'
Bundler.require
require 'json'
require 'csv'

house_prices = JSON.parse(File.read('./house_prices_for_lsoa.json'))
new_imd_ranks = CSV.read('./new-imd-ranks.csv')

RGeo::Shapefile::Reader.open('./Indices of Deprivation England and Wales 2010/EW_dep2010.shp') do |file|
  # puts "File contains #{file.num_records} records."
  count = 0
  features = []
  # factory = RGeo::Cartesian.simple_factory
  file.each do |record|
    # puts record.inspect
    if record.attributes['LSOA01NM'].include?('York ')
      geometry = record.geometry
      factory = geometry.factory

      count += 1
      polygons = []
      geometry.each do |g|
        points = g.boundary.points.map do |point|
          easting, northing = point.x, point.y
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
          factory.point(longitude, latitude)
        end
        ls = factory.line_string(points)
        polygons << factory.polygon(ls)
      end
      multi_polygon = factory.multi_polygon(polygons)

      # merge in house price data
      sales = house_prices[record.attributes['LSOACODE']]
      avg_sale = 0
      unless sales.empty?
        sales = sales.map{|s|s['amount'].to_f}.sort
        len = sales.length
        avg_sale = (sales[(len - 1) / 2] + sales[len / 2]) / 2.0
      end
      record.attributes['AVGSALE'] = avg_sale

      # merge in new IMD ranks
      rank = new_imd_ranks.find{|r| r[0] == record.attributes['LSOACODE']}
      rank = rank[1].to_i
      record.attributes['IMDRANK'] = rank

      features << RGeo::GeoJSON::Feature.new(multi_polygon, nil, record.attributes)
    end
  end
  file.rewind
  # puts "York LSOAs: #{count}"
  # puts "---"
  puts RGeo::GeoJSON.encode(RGeo::GeoJSON::FeatureCollection.new(features)).to_json
end
