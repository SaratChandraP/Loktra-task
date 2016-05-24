# Python URI task

import URLparser
import unittest


class testURL(unittest.TestCase):

    def setUp(self):
        test_name = self.shortDescription()
        if test_name == "Testing get_scheme":
            print "setting up for test_get_scheme"

        elif test_name == "Testing get_domain":
            print "setting up for test_get_domain"

        elif test_name == "Testing get_queries":
            print "setting up for test_get_queries"

    def test_get_scheme(self):
        """Testing get_scheme"""
        url = 'http://sarat:passwrd@example.com:8080?first=example'
        self.assertEqual("http", URLparser.get_scheme(url))

    def test_get_domain(self):
        """Testing get_domain"""
        url = 'http://sarat:passwrd@example.com:8080?first=example'
        self.assertEqual("example.com", URLparser.get_domain(url))

    def test_get_queries(self):
        """Testing get_queries"""
        url = 'http://sarat:passwrd@example.com:8080?first=example&second=example2'
        dict_queries = {'first': 'example','second': 'example2'}
        self.assertEqual(dict_queries, URLparser.get_queries(url))

    def tearDown(self):
        test_name = self.shortDescription()
        if test_name == "Testing get_scheme":
            print "cleaning up for test_get_scheme"

        elif test_name == "Testing get_domain":
            print "cleaning up for test_get_domain"

        elif test_name == "Testing get_queries":
            print "cleaning up for test_get_queries"

if __name__ == '__main__':
    unittest.main()
