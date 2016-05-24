# Converted given pseudo code to python function
def given_hash(test_string):
    h = 7
    letters = "acdegilmnoprstuw"
    for i in range(len(test_string)):
        # Breakdown for verification and analysis purposes
        val = h * 37
        index = letters.index(test_string[i])
        print h, val, index
        h = (h * 37 + letters.index(test_string[i]))
    return h


def reverse_hash(test_number):
    h = 7
    letters = "acdegilmnoprstuw"
    result = ''
    # Work backwards with the test_number to get the input string
    while test_number > 0:
        index = test_number % 37    # Gives index of letter in 'letters' string
        result += letters[index]    # Get that letter and append to result
        print test_number, index    # For verification purposes
        test_number = (test_number - index)/37
    return result

print given_hash("leepadg")  # Given example: leepadg => 680131659347

# Reverse of 930846109532517 = ?
print reverse_hash(680131659347)    # Should get leepadg
