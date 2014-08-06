require 'rubygems'
require 'bundler'
Bundler.require
require 'json'
require 'csv'

csv = CSV.read('./postcodes-to-gss.csv')
puts csv.first.inspect
map = csv.reduce({}) do |memo, arr|
  memo[arr[0]] = arr[1]
  memo
end

out = {}

json = JSON.parse(File.read('./house_sales.json'))
records = json['results']['bindings']
records.each do |record|
  postcode = record['postcode']['value']
  amount = record['amount']['value']
  date = record['date']['value']

  lsoa = map[postcode]

  out[lsoa] ||= []
  out[lsoa] << {amount: amount, date: date}
end

puts out.to_json
