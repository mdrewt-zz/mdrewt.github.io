require "net/http"
require "uri"

uri = URI.parse('http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_%28Generation_I%29')

# Shortcut
response = Net::HTTP.get_response(uri)
table = response.body.gsub("\n", "").match(/(<table.+?>.+?<[\/]?table>)/).to_s
# headers = table.match(/<th.+<\/th>/)

p table#.scan(/\/table/)

# # Will print response.body
# Net::HTTP.get_print(uri)

# # Full
# http = Net::HTTP.new(uri.host, uri.port)
# response = http.request(Net::HTTP::Get.new(uri.request_uri))