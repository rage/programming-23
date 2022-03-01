---
path: '/part-11/2-more-comprehensions'
title: 'More comprehensions'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be able to use comprehensions with strings
- You will know how to use comprehensions with your own classes
- You will be able to create dictionary comprehensions

</text-box>

Lists are perhaps the most common target for comprehensions, but comprehensions work on any series of items, including strings. Just like in the list examples in the previous section, if a list comprehension is performed on a string, the items (i.e. the characters) in the string are plucked one by one, processed according to the expression given, and stored in a list.

```python
name = "Peter Python"

uppercased = [character.upper() for character in name]
print(uppercased)
```

<sample-output>

['P', 'E', 'T', 'E', 'R', ' ', 'P', 'Y', 'T', 'H', 'O', 'N']

</sample-output>

The result is indeed a list, as dictated by the bracket notation around the comprehension statement. If we wanted a string instead, we could use the string method `join` to parse the list into a string. Remember, the method is called on the string we want to use as the "glue" between the characters. Let's take a look at some examples:

```python
name = "Peter"
char_list = list(name)
print(char_list)

print("".join(char_list))
print(" ".join(char_list))
print(",".join(char_list))
print(" and ".join(char_list))
```

<sample-output>

['P', 'e', 't', 'e', 'r']
Peter
P e t e r
P,e,t,e,r
P and e and t and e and r

</sample-output>

List comprehensions and the `join` method make it easy to create new strings based on other strings. We could, for example, make a string which contains only the vowels from another string:

```python
test_string = "Hello there, this is a test!"

vowels = [character for character in test_string if character in "aeiou"]
new_string = "".join(vowels)

print(new_string)
```

<sample-output>

eoeeiiae

</sample-output>

In the example above the list comprehension and the `join` method are on separate lines, but they could be combined into a single expression:

```python
test_string = "Hello there, this is a test!"

vowel_string = "".join([character for character in test_string if character in "aeiou"])

print(vowel_string)
```

Many Python programmers swear by these oneliners, so it is well worth your while to learn to read them. We could even add the `split` method to the mix, so that we can process entire sentences efficiently with a single statement. In the example below the first character from each word in a sentence is removed:

```python
sentence = "Sheila keeps on selling seashells on the seashore"

sentence_no_initials = " ".join([word[1:] for word in sentence.split()])
print(sentence_no_initials)
```

<sample-output>

heila eeps n elling eashells n he eashore

</sample-output>

Let's go through this step by step:

- `word[1:]` extracts a substring from the second character (at index 1) onwards 
- `sentence.split()` splits the sentence into sections at the given character. In this case there is no argument given to the method, so the sentence is split at space characters by default
- `" ".join()` combines the items in the list into a new string using a space character between the items

A more traditional iterative approach could look like this

```python
sentence = "Sheila keeps on selling seashells on the seashore"

word_list = []
words = sentence.split()
for word in words:
    word_no_initials = word[1:]
    word_list.append(word_no_initials)

sentence_no_initials = " ".join(word_list)

print(sentence_no_initials)
```

<programming-exercise name='Filter forbidden' tmcname='part11-08_filter_forbidden'>

Please write a function named `filter_forbidden(string: str, forbidden: str)` which takes two strings as its arguments. The function should return a new version of the first string. It should not contain any characters from the second string.

The function should be implemented using list comprehensions. The maximum length of the function is three lines of code, including the header line beginning with the `def` keyword.

Please have a look at the example below.

```python
sentence = "Once! upon, a time: there was a python!??!?!"
filtered = filter_forbidden(sentence, "!?:,.")
print(filtered)
```

<sample-output>

Once upon a time there was a python

</sample-output>

</programming-exercise>

## Own classes and comprehensions

Comprehensions can be a useful tool for processing or formulating instances of your own classes, as we'll see in the following examples.

First, let's have a look at the class `Country` which is a simple model for a single country, with attributes for the name and the population. In the main function below we first create some Country objects, and then use a list comprehension to select only those whose population is greater than five million.

```python
class Country:
    """ This class models a single country with population """
    def __init__(self, name: str, population: int):
        self.name = name
        self.population = population

if __name__ == "__main__":
    finland = Country("Finland", 6000000)
    malta = Country("Malta", 500000)
    sweden = Country("Sweden", 10000000)
    iceland = Country("Iceland", 350000)

    countries = [finland, malta, sweden, iceland]

    bigger_countries = [country.name for country in countries if country.population > 5000000]
    for country in bigger_countries:
        print(country)

```

<sample-output>

Finland
Sweden

</sample-output>

In the list comprehension above we selected only the name attribute from the Country objects, so the contents of the list could be printed directly. We could also create a new list of the countries themselves and access the name attribute in the `for` loop. This would be useful if the same list of countries was used also later in the program, or if we needed the population attribute in the `for` loop as well:

```python
if __name__ == "__main__":
    finland = Country("Finland", 6000000)
    malta = Country("Malta", 500000)
    sweden = Country("Sweden", 10000000)
    iceland = Country("Iceland", 350000)

    countries = [finland, malta, sweden, iceland]

    bigger_countries = [country for country in countries if country.population > 5000000]
    for country in bigger_countries:
        print(country.name, country.population)
```

In the next example we have a class named `RunningEvent` which models a single foot race event with attributes for the length and the name of the race. We will use list comprehensions to create `RunningEvent` objects based on a list of race lengths.

The parameter `name` has a default value in the constructor of the `RunningEvent` class, whIch is why we do not need to pass the name as an argument.

```python
class RunningEvent:
    """ The class models a foot race event of a length of n metres  """
    def __init__(self, length: int, name: str = "no name"):
        self.length = length
        self.name = name

    def __repr__(self):
        return f"{self.length} m. ({self.name})"

if __name__ == "__main__":
    lengths = [100, 200, 1500, 3000, 42195]
    events = [RunningEvent(length) for length in lengths]

    # Print out all events
    print(events)

    # Pick one from the list and give it a name
    marathon = events[-1] # the last item in the list
    marathon.name = "Marathon"

    # Print out everything again, including the new name
    print(events)
```

<sample-output>

[100 m. (no name), 200 m. (no name), 1500 m. (no name), 3000 m. (no name), 42195 m. (no name)]
[100 m. (no name), 200 m. (no name), 1500 m. (no name), 3000 m. (no name), 42195 m. (Marathon)]

</sample-output>

Now, let's find out what makes a series of items "comprehendible". In the previous part we learnt how to make our own classes iterable. It is exactly this same feature which also allows for list comprehensions. If your own class is iterable, it can be used as the basis of a list comprehension statement. The following class definitions are copied directly from [part 10](/part-10/3-oo-programming-techniques#iterators):

```python
class Book:
    def __init__(self, name: str, author: str, page_count: int):
        self.name = name
        self.author = author
        self.page_count = page_count

class Bookshelf:
    def __init__(self):
        self._books = []

    def add_book(self, book: Book):
        self._books.append(book)

    # This is the iterator initialization method
    # The iteration variable(s) should be initialized here
    def __iter__(self):
        self.n = 0
        # the method returns a reference to the object itself as 
        # the iterator is implemented within the same class definition
        return self

    # This method returns the next item within the object
    # If all items have been traversed, the StopIteration event is raised
    def __next__(self):
        if self.n < len(self._books):
            # Select the current item from the list within the object
            book = self._books[self.n]
            # increase the counter (i.e. iteration variable) by one
            self.n += 1
            # return the current item
            return book
        else:
            # All books have been traversed
            raise StopIteration

# Test your classes
if __name__ == "__main__":
    b1 = Book("The Life of Python", "Montague Python", 123)
    b2 = Book("The Old Man and the C", "Ernest Hemingjavay", 204)
    b3 = Book("A Good Cup of Java", "Caffee Coder", 997)

    shelf = Bookshelf()
    shelf.add_book(b1)
    shelf.add_book(b2)
    shelf.add_book(b3)

    # Create a list containing the names of all books
    book_names = [book.name for book in shelf]
    print(book_names)

```

<programming-exercise name='Products in shopping list' tmcname='part11-09_products_in_shopping_list'>

In part 10 you created an [iterable shopping list](/part-10/3-oo-programming-techniques#programming-exercise-an-iterable-shopping-list), and we just learnt that an object created from an iterable class can be used with list comprehensions. The exercise template contains a stripped down version of the `ShoppingList` with just enough functionality to fulfil the requirements of this exercise.

Please write a function named `products_in_shopping_list(shopping_list, amount: int)` which takes a ShoppingList object and an integer value as its arguments. The function returns a list of product names. The list should include only the products with at least the number of items specified by the `amount` parameter.

The function should be implemented using list comprehensions. The maximum length of the function is two lines of code, including the header line beginning with the `def` keyword. The `ShoppingList` class definition should _not_ be modified.

The function should work as follows:

```python
my_list = ShoppingList()
my_list.add("bananas", 10)
my_list.add("apples", 5)
my_list.add("alcohol free beer", 24)
my_list.add("pineapple", 1)

print("the shopping list contains at least 8 of the following items:")
for product in products_in_shopping_list(my_list, 8):
    print(product)
```

<sample-output>

the shopping list contains at least 8 of the following items:
bananas
alcohol free beer

</sample-output>

</programming-exercise>

<programming-exercise name='Price difference of cheaper properties' tmcname='part11-10_cheaper_properties'>

This exercise is a slightly modified version of the exercise [Comparing properties](/part-9/1-objects-and-references#programming-exercise-comparing-properties) from part 9.

Please write a function named `cheaper_properties(properties: list, reference: RealProperty)` which takes a list of properties and a single RealProperty object as its arguments. The function should return a list containing only those properties in the original list which are cheaper than the reference property, along with the price difference. The items in the returned list should be tuples, where the first item is the property itself and the second is the difference in price.

The function should be implemented using list comprehensions. The maximum length of the function is two lines of code, including the header line beginning with the `def` keyword.

The code for the `RealProperty` class is included in the exercise template and should not be changed.

An example of the function in action:

```python
a1 = RealProperty(1, 16, 5500, "Central studio")
a2 = RealProperty(2, 38, 4200, "Two bedrooms downtown")
a3 = RealProperty(3, 78, 2500, "Three bedrooms in the suburbs")
a4 = RealProperty(6, 215, 500, "Farm in the middle of nowhere")
a5 = RealProperty(4, 105, 1700, "Loft in a small town")
a6 = RealProperty(25, 1200, 2500, "Countryside mansion")

properties = [a1, a2, a3, a4, a5, a6]

print(f"cheaper options when compared to {a3.description}:")
for item in cheaper_properties(properties, a3):
    print(f"{item[0].description:35} price difference {item[1]} euros")
```

<sample-output>

cheaper options when compared to Three bedrooms in the suburbs:
Central studio                                    price difference 107000 euros
Two bedrooms downtown               price difference 35400 euros
Farm in the middle of nowhere       price difference 87500 euros
Loft in a small town                           price difference 16500 euros

</sample-output>

</programming-exercise>

## Comprehensions and dictionaries

There is nothing intrinsically "listey" about comprehensions. The result is a list because the comprehension statement is encased in square brackets, which indicate a Python list. Comprehensions work just as well with Python dictionaries if you use curly brackets instead. Remember, though, that dictionaries require key-value pairs. Both must be specified when a dictionary is created, also with comprehensions.

The basis of a comprehension can be any iterable series, be it a list, a string, a tuple, a dictionary, any of your own iterable classes, and so forth.

In the following example we use a string as the basis of a dictionary. The dictionary contains all the unique characters in the string, along with the number of times they occurred:

```python
sentence = "hello there"

char_counts = {character : sentence.count(character) for character in sentence}
print(char_counts)
```

<sample-output>

{'h': 2, 'e': 3, 'l': 2, 'o': 1, ' ': 1, 't': 1, 'r': 1}

</sample-output>

The principle of the comprehension statement is exactly the same as with lists, but instead of a single value, the expression now consists of a key and a value. The general syntax looks like this:

`{<key expression> : <value expression> for <item> in <series>}`

To finish off this section, lets take a look at factorials again. This time we store the results in a dictionary. The number itself is the key, while the value is the result of the factorial from our function:

```python
def factorial(n: int):
    """ The function calculates the factorial n! for integers above zero """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    numbers = [-2, 3, 2, 1, 4, -10, 5, 1, 6]
    factorials = {number : factorial(number) for number in numbers if number > 0}
    print(factorials)
```

<sample-output>

{3: 6, 2: 2, 1: 1, 4: 24, 5: 120, 6: 720}

</sample-output>

<programming-exercise name='Lengths of strings' tmcname='part11-11_lengths_of_strings'>

Please write a function named `lengths(strings: list)` which takes a list of strings as its argument. The function should return a _dictionary_ with the strings in the list as the keys and their lengths as the values.

The function should be implemented with a dictionary comprehension. The maximum length of the function is two lines of code, including the header line beginning with the `def` keyword.

The function should work as follows:

```python
word_list = ["once", "upon" , "a", "time", "in"]

word_lengths = lengths(word_list)
print(word_lengths)
```

<sample-output>

{'once': 4, 'upon': 4, 'a': 1, 'time': 4, 'in': 2}

</sample-output>


</programming-exercise>

<programming-exercise name='Most common words' tmcname='part11-12_most_common_words'>

Please write a function named `most_common_words(filename: str, lower_limit: int)` which takes a filename and an integer value for a lower limit as its arguments. The function should return a dictionary containing the occurrences of the words which appear at least the number of times specified in the `lower_limit` parameter.

For example, say the function was used to process a file named _comprehensions.txt_ with the following contents:

```txt
List comprehension is an elegant way to define and create lists based on existing lists.
List comprehension is generally more compact and faster than normal functions and loops for creating list.
However, we should avoid writing very long list comprehensions in one line to ensure that code is user-friendly.
Remember, every list comprehension can be rewritten in for loop, but every for loop can’t be rewritten in the form of list comprehension.
```

When the function is called with the arguments `most_common_words("comprehensions.txt", 3)` it should return

<sample-output>

{'comprehension': 4, 'is': 3, 'and': 3, 'for': 3, 'list': 4, 'in': 3}

</sample-output>

NB: the case of letters affects the results, and all inflected forms are unique words in this exercise. That is, the words `List`, `lists` and `list` are each separate words here, and only `list` has enough occurrences to make it to the returned list. All punctutation should be removed before counting up the occurrences.

It is up to you to decide how to implement this. The easiest way would likely be to make use of list and dictionary comprehensions.

</programming-exercise>
