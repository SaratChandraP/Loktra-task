# Converted given pseudo code to python function
def given_hash(test_string):
    h = 7
    letters = "acdegilmnoprstuw"
    for i in range(len(test_string)):
        val = h * 37
        index = letters.index(test_string[i])
        print h, val, index
        h = (h * 37 + letters.index(test_string[i]))
    return h


def reverse_hash(test_number):
    return result

print given_hash("leepdag")  # Given example: leepadg => 680131659347

# TODO implement reverse hash
# Task reverse of 930846109532517 = ?
