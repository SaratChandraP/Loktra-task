# Python URI task

import URLparser

# uri = 'file:/dir1/dir2?hgt'
# uri = 'http://www.google.com'
# uri = 'http://sarat:passwrd@example.com:8080/example/example.html'
# uri = 'http://sarat:passwrd@example.com:8080?first=example&scnd=123'
uri = 'http://sarat:passwrd@example.com:8080?first=example'

parsed_url = URLparser.url_path_to_dict(uri)
print parsed_url

print URLparser.get_scheme(uri)
print URLparser.get_domain(uri)
print URLparser.get_queries(uri)
