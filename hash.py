# Converted given pseudo code to python function
def given_hash(test_string):
    h = 7
    letters = "acdegilmnoprstuw"
    for i in range(len(test_string)):
        h = (h * 37 + letters.index(test_string[i]))
    return h

print given_hash("leepdag")  # Given example: leepadg => 680131659347
