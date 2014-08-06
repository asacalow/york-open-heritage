require 'csv'

rank_data = CSV.read('imd-ranks.csv')

rank_data.shift # remove the headers

rank_data.sort { |a,b| a.first.to_i <=> b.first.to_i }

rank_data.map! do |d|
  rank = d[0]
  gss = d[1]
  new_rank = rank_data.index(d) + 1

  [gss, new_rank]
end

puts ["gss", "rank"].to_csv
rank_data.each do |d|
  puts d.to_csv
end
