import re


# Function that splits url into corresponding components
def url_path_to_dict(path):
    pattern = (r'^'
               r'((?P<scheme>.+?)://?)?'
               r'((?P<user>.+?)(:(?P<password>.*?))?@)?'
               r'(?P<host>.*?)'
               r'(:(?P<port>\d+?))?'
               r'(?P<path>/.*?)?'
               r'(;(?P<parameters>.*?))?'
               r'(\?(?P<query>.*?))?'
               r'(#(?P<fragment>.*?))?'
               r'$'
               )
    regex = re.compile(pattern)
    matched = regex.match(path)
    dict_url = matched.groupdict() if matched is not None else None
    return dict_url


# Function to get scheme of uri
def get_scheme(path):
    return url_path_to_dict(path)['scheme']


# Function to get domain of uri
def get_domain(path):
    dict_url = url_path_to_dict(path)
    return dict_url['host']


# Function to get queries of uri
def get_queries(path):
    if '?' not in path:
        return "No queries present in the url"
    url_parts = url_path_to_dict(path)
    queries = url_parts['query'].split('&')
    dict_queries = {}
    for q in queries:
        key, value = q.split('=')
        dict_queries[key] = value
    return dict_queries
