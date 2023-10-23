---
path: '/part-12/1-functions-as-arguments'
title: 'Functions as arguments'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be able to sort lists according to different criteria
- You will know what a lambda expression is
- You will be able to use lambda expression with other Python functions
- You will know how a function is passed as an argument to another function

</text-box>

We are already familiar with the method `sort` and the function `sorted`, which are used to sort lists into their natural order. For numbers and strings this usually works just fine. For anything more complicated than that, however, what Python deems to be the natural order of items is not always what was intended by us as programmers.

For example, a list of tuples is, by default, sorted based on the first item of each tuple:

```python
products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

products.sort()

for product in products:
    print(product)
```

<sample-output>

('apple', 3.95)
('banana', 5.95)
('orange', 4.5)
('watermelon', 4.95)

</sample-output>

But what if we wanted to sort the list based on the price?

## Functions as arguments

A sorting method or function usually accepts an optional second argument which allows you to bypass the default sorting criteria. This second argument is a function which defines how the value of each item on the list is determined. As the list is sorted, Python calls this function when it compares the items to each other.

Let's take a look at an example:

```python
def order_by_price(item: tuple):
    # Return the price, which is the second item within the tuple
    return item[1]

if __name__ == "__main__":
    products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

    # Use the function order_by_price for sorting
    products.sort(key=order_by_price)

    for product in products:
        print(product)
```

<sample-output>

('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)

</sample-output>

Now the list is sorted based on the prices of the items, but what really happens in the program?

The function `order_by_price` is actually pretty simple. It takes one item as its argument and returns a value for that item. More specifically, it returns the second item in the tuple, which represents the price. But then we have this line of code, where the `sort` method is called:

`products.sort(key=order_by_price)`

Here the `sort` method is called with a function as its argument. This is not a reference to the return value of the function, but a reference to _the function itself_. The `sort` method calls this function multiple times, using each item on the list as the argument in turn.

If we include an extra print statement in the function definition of `order_by_price`, we can verify that the function does indeed get called once per each item on the list:

```python
def order_by_price(item: tuple):
    # Print the item
    print(f"Function call: order_by_price({item})")

    # Return the price, which is the second item within the tuple
    return item[1]


products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

# Use the function order_by_price for sorting
products.sort(key=order_by_price)

for product in products:
    print(product)
```

<sample-output>

Function call: order_by_price(('banana', 5.95))
Function call: order_by_price(('apple', 3.95))
Function call: order_by_price(('orange', 4.5))
Function call: order_by_price(('watermelon', 4.95))
('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)

</sample-output>

The order can be _reversed_ with another keyword argument; `reverse`, which is available with both the `sort` method and the `sorted` function:

```python
products.sort(key=order_by_price, reverse=True)

t2 = sorted(products, key=order_by_price, reverse=True)
```

## A function definition within a function definition

We could also include a named function for this new price-based sort functionality we created. Let's add a function named `sort_by_price`:

```python
def order_by_price(item: tuple):
    return item[1]

def sort_by_price(items: list):
    # use the order_by_price function here
    return sorted(items, key=order_by_price)

products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

for product in sort_by_price(products):
    print(product)
```

If we know that the helper function `order_by_price` is not used anywhere outside the `sort_by_price` function, we can place the former function definition within the latter function definition:

```python
def sort_by_price(items: list):
    # helper function defined within the function
    def order_by_price(item: tuple):
        return item[1]

    return sorted(items, key=order_by_price)
```

<programming-exercise name='Sort by remaining stock' tmcname='part12-01_remaining_stock'>

Please write a function named `sort_by_remaining_stock(items: list)`. The function takes a list of tuples as its argument. The tuples consist of the name, price and remaining stock of a product. The function should return a new list, where the items are sorted according to the stock remaining, lowest value first. The original list should not be changed.

The function should work as follows:

```python
products = [("banana", 5.95, 12), ("apple", 3.95, 3), ("orange", 4.50, 2), ("watermelon", 4.95, 22)]

for product in sort_by_remaining_stock(products):
    print(f"{product[0]} {product[2]} pcs")
```

<sample-output>
orange 2 pcs
apple 3 pcs
banana 12 pcs
watermelon 22 pcs
</sample-output>

</programming-exercise>

<programming-exercise name='Sort by number of seasons' tmcname='part12-02_seasons'>

Please write a function named `sort_by_seasons(items: list)` which takes a list of dictionaries as its argument. Each dictionary contains the information of a single TV show. The function should sort this list by the number of seasons each show has, in ascending order. The function should not change the original list, but return a new list instead.

The function should work as follows:

```python
shows = [{ "name": "Dexter", "rating" : 8.6, "seasons":9 }, { "name": "Friends", "rating" : 8.9, "seasons":10 },  { "name": "Simpsons", "rating" : 8.7, "seasons":32 }  ]

for show in sort_by_seasons(shows):
    print(f"{show['name']} {show['seasons']} seasons")
```

<sample-output>
Dexter 9 seasons
Friends 10 seasons
Simpsons 32 seasons
</sample-output>

</programming-exercise>

<programming-exercise name='Sort by ratings' tmcname='part12-03_ratings'>

Please write a function named `sort_by_ratings(items: list)` which takes a list of dictionaries as its argument. The structure of the dictionaries is identical to the previous exercise. This function should sort the dictionaries in _descending order based on the shows' ratings_. The function should not change the original list, but return a new list instead.

```python
shows = [{ "name": "Dexter", "rating" : 8.6, "seasons":9 }, { "name": "Friends", "rating" : 8.9, "seasons":10 },  { "name": "Simpsons", "rating" : 8.7, "seasons":32 }  ]

print("Rating according to IMDB")
for show in sort_by_ratings(shows):
    print(f"{show['name']}  {show['rating']}")
```

<sample-output>

Rating according to IMDB
Friends 8.9
Simpsons 8.7
Dexter 8.6

</sample-output>

</programming-exercise>

## Sorting collections of your own objects

Using the same principle, let's write a program which sorts a list of objects from our own `Student` class in two different ways:

```python
class Student:
    """ The class models a single student """
    def __init__(self, name: str, id: str, credits: int):
        self.name = name
        self.id = id
        self.credits = credits

    def __str__(self):
        return f"{self.name} ({self.id}), {self.credits} cr."


def by_id(item: Student):
    return item.id

def by_credits(item: Student):
    return item.credits


if __name__ == "__main__":
    o1 = Student("Archie", "a123", 220)
    o2 = Student("Marvin", "m321", 210)
    o3 = Student("Anna", "a999", 131)

    students = [o1, o2, o3]

    print("Sort by id:")
    for student in sorted(students, key=by_id):
        print(student)

    print()

    print("Sort by credits:")
    for student in sorted(students, key=by_credits):
        print(student)
```

<sample-output>

Sort by id:
Archie (a123), 220 cr.
Anna (a999), 131 cr.
Marvin (m321), 210 cr.

Sort by credits:
Anna (a999), 131 cr.
Marvin (m321), 210 cr.
Archie (a123), 220 cr.

</sample-output>

As you can see above, sorting by different criteria works exactly as intended. If the functions `by_id` and `by_credits` are not needed elsewhere, there are ways of making the implementation simpler. We will return to this topic after these exercises.

<programming-exercise name='ClimbingRoute' tmcname='part12-04_climbing_route'>

The exercise template contains the class definition for a `ClimbingRoute`. It works as follows:

```python
route1 = ClimbingRoute("Edge", 38, "6A+")
route2 = ClimbingRoute("Smooth operator", 11, "7A")
route3 = ClimbingRoute("Synchro", 14, "8C+")


print(route1)
print(route2)
print(route3.name, route3.length, route3.grade)
```

<sample-output>

Edge, length 38 metres, grade 6A+
Smooth operator, length 11 metres, grade 7A
Synchro 14 8C+

</sample-output>

## Sort by length

Please write a function named `sort_by_length(routes: list)` which returns a new list of routes, sorted by length from longest to shortest.

The function should work as follows:

```python
r1 = ClimbingRoute("Edge", 38, "6A+")
r2 = ClimbingRoute("Smooth operator", 11, "7A")
r3 = ClimbingRoute("Synchro", 14, "8C+")
r4 = ClimbingRoute("Small steps", 12, "6A+")

routes = [r1, r2, r3, r4]

for route in sort_by_length(routes):
    print(route)
```

<sample-output>

Edge, length 38 metres, grade 6A+
Synchro, length 14 metres, grade 8C+
Small steps, length 12 metres, grade 6A+
Smooth operator, length 11 metres, grade 7A

</sample-output>

## Sort by difficulty

Please write a function named `sort_by_difficulty(routes: list)` which returns a new list of routes, sorted by difficulty, i.e. grade, from hardest to easiest. For routes with the same grade, the longer one is more difficult. The scale of climbing route grades is _4, 4+, 5, 5+, 6A, 6A+, ..._, which in practice works out as the alphabetical order for strings.

The function should work as follows:

```python
r1 = ClimbingRoute("Edge", 38, "6A+")
r2 = ClimbingRoute("Smooth operator", 11, "7A")
r3 = ClimbingRoute("Synchro", 14, "8C+")
r4 = ClimbingRoute("Small steps", 12, "6A+")

routes = [r1, r2, r3, r4]
for route in sort_by_difficulty(routes):
    print(route)
```

<sample-output>

Synchro, length 14 metres, grade 8C+
Smooth operator, length 11 metres, grade 7A
Edge, length 38 metres, grade 6A+
Small steps, length 12 metres, grade 6A+

</sample-output>

**Hint:** if the order is based on a list or a tuple, by default Python sorts the items first based on the first item, next based on the second item, and so forth:

```python
my_list = [("a", 4),("a", 2),("b", 30), ("b", 0) ]
print(sorted(my_list))
```

<sample-output>

[('a', 2), ('a', 4), ('b', 0), ('b', 30)]

</sample-output>

</programming-exercise>

<programming-exercise name='Climbing areas' tmcname='part12-05_climbing_areas'>

In addition to the `ClimbingRoute` from the previous exercise, the exercise template contains the class definition for a `ClimbingArea`.

```python
ca1 = ClimbingArea("Olhava")
ca1.add_route(ClimbingRoute("Edge", 38, "6A+"))
ca1.add_route(ClimbingRoute("Great cut", 36, "6B"))
ca1.add_route(ClimbingRoute("Swedish route", 42, "5+"))

ca2 = ClimbingArea("Nummi")
ca2.add_route(ClimbingRoute("Synchro", 14, "8C+"))

ca3 = ClimbingArea("Nalkkila slab")
ca3.add_route(ClimbingRoute("Small steps", 12, "6A+"))
ca3.add_route(ClimbingRoute("Smooth operator", 11, "7A"))
ca3.add_route(ClimbingRoute("Piggy not likey", 12 , "6B+"))
ca3.add_route(ClimbingRoute("Orchard", 8, "6A"))

print(ca1)
print(ca3.name, ca3.routes())
print(ca3.hardest_route())
```

<sample-output>

Olhava, 3 routes, hardest 6B
Nalkkila slab 4
Smooth operator, length 9 metres, grade 7A

</sample-output>

## Sort by number of routes

Please write a function named `sort_by_number_of_routes` which sorts climbing areas in ascending order based on the number of routes they each have.

```python
# ca1, ca2 and ca3 declared as above
areas = [ca1, ca2, ca3]
for area in sort_by_number_of_routes(areas):
    print(area)

```

<sample-output>

Nummi, 1 routes, hardest 8C+
Olhava, 3 routes, hardest 6B
Nalkkila slab, 4 routes, hardest 7A

</sample-output>

## Sort by the most difficult route

Please write a function named `sort_by_most_difficult` which sorts climbing areas in _descending_ order based on the most difficult route in each area.

```python
# ca1, ca2 and ca3 declared as above
areas = [ca1, ca2, ca3]
for area in sort_by_most_difficult(areas):
    print(area)
```

<sample-output>

Nummi, 1 routes, hardest 8C+
Nalkkila slab, 4 routes, hardest 7A
Olhava, 3 routes, hardest 6B

</sample-output>

</programming-exercise>

## Lambda expressions

We have mostly worked with functions from the viewpoint of modularity. It is true that functions play an important role in managing the complexity of your programs and avoiding code repetition. Functions are usually written so that they can be used many times.

But sometimes you need something resembling a function that you will use just once. Lambda expressions allow you to create small, anonymous functions which are created (and discarded) as they are needed in the code. The general syntax is as follows:

`lambda <parameters> : <expression>`

Sorting a list of tuples by the second item in each tuple would look like this implemented with a lambda expression:

```python
products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

# Function is created "on the fly" with a lambda expression:
products.sort(key=lambda item: item[1])

for product in products:
    print(product)
```

<sample-output>

('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)

</sample-output>

The expression

`lambda item: item[1]`

is equivalent to the function definition

```python
def price(item):
    return item[1]
```

except for the fact that a lambda function doesn't have a name. This is why lambda functions are called anonymous functions.

In every other respect a lambda function is no different from any other function, and they can be used in all the same contexts as any equivalent named function. For example, the following program sorts a list of strings alphabetically by the _last_ character in each string:

```python
strings = ["Mickey", "Mack", "Marvin", "Minnie", "Merl"]

for word in sorted(strings, key=lambda word: word[-1]):
    print(word)
```

<sample-output>

Minnie
Mack
Merl
Marvin
Mickey

</sample-output>

We can also combine list comprehensions, the `join` method and lambda expressions. For example, we could sort strings based on just the vowels in them, ignoring all other characters:

```python
strings = ["Mickey", "Mack", "Marvin", "Minnie", "Merl"]

for word in sorted(strings, key=lambda word: "".join([c for c in word if c in "aeiou"])):
    print(word)
```

<sample-output>

Mack
Marvin
Merl
Mickey
Minnie

</sample-output>

Anonymous functions can also be used with other built in Python functions, not just those used for sorting. For example, the `min` and `max` functions also take a keyword argument named `key`. It is used as the criteria for comparing the items when selecting the minimum or maximum value.

In the following example we are dealing with audio recordings. First we select the oldest recording, and then the longest:

```python

class Recording:
    """ The class models a single audio recording """
    def __init__(self, name: str, performer: str, year: int, runtime: int):
        self.name = name
        self.performer = performer
        self.year = year
        self.runtime = runtime


    def __str__(self):
        return f"{self.name} ({self.performer}), {self.year}. {self.runtime} min."

if __name__ == "__main__":
    r1 = Recording("Nevermind", "Nirvana", 1991, 43)
    r2 = Recording("Let It Be", "Beatles", 1969, 35)
    r3 = Recording("Joshua Tree", "U2", 1986, 50)

    recordings = [r1, r2, r3]


    print("The oldest recording:")
    print(min(recordings, key=lambda rec: rec.year))

    print("The longest recording:")
    print(max(recordings, key=lambda rec: rec.runtime))
```

<sample-output>

The oldest recording:
Let It Be (Beatles), 1969. 35 min.
The longest recording:
U2 (Joshua Tree), 1986. 50 min.

</sample-output>

<programming-exercise name='BallPlayers' tmcname='part12-06_ballplayers'>

The exercise template contains the definition for a class named `BallPlayer`. It has the following public attributes:

* name
* shirt number `number`
* scored goals `goals`
* assists completed `assists`
* minutes played `minutes`

Please implement the following functions. NB: each function has a different type of return value.

## Most goals

Please write a function named `most_goals` which takes a list of ball players as its argument.

The function should return the name of the player who scored the most goals, in string format.

## Most points

Please write a function named `most_points`, which takes a list of ball players as its argument.

The function should return a tuple containing the name and shirt number of the player who has scored the most points. The total number of points is the number of goals and the number of assists combined.

## Least minutes

Please write a function named `least_minutes`, which takes a list of ball players as its argument.

The function should return the `BallPlayer` object which has the smallest value of minutes played.

You can test your functions with the following program:

```python
if __name__ == "__main__":
    player1 = BallPlayer("Archie Bonkers", 13, 5, 12, 46)
    player2 = BallPlayer("Speedy Tickets", 7, 2, 26, 55)
    player3 = BallPlayer("Cruella De Hill", 9, 1, 32, 26)
    player4 = BallPlayer("Devilled Tasmanian", 12, 1, 11, 41)
    player5 = BallPlayer("Donald Quack", 4, 3, 9, 12)
    
    team = [player1, player2, player3, player4, player5]
    print(most_goals(team))
    print(most_points(team))
    print(least_minutes(team))
```

This should print out:

<sample-output>

Archie Bonkers
('Cruella De Hill', 9)
BallPlayer(name=Donald Quack, number=4, goals=3, assists=9, minutes=12)

</sample-output>

</programming-exercise>

## Functions as arguments within your own functions

We established above that it is possible to pass a reference to a function as an argument to another function. To wrap this section up, let's write our very own function which takes a function as its argument.

```python
# the type hint "callable" refers to a function
def perform_operation(operation: callable):
    # Call the function which was passed as an argument
    return operation(10, 5)

def my_sum(a: int, b: int):
    return a + b

def my_product(a: int, b: int):
    return a * b


if __name__ == "__main__":
    print(perform_operation(my_sum))
    print(perform_operation(my_product))
    print(perform_operation(lambda x,y: x - y))

```

<sample-output>

15
50
5

</sample-output>

The value returned by the function `perform_operation` depends on which function was passed as an argument. Any function which accepts two arguments would do, no matter whether it is anonymous or named.

Passing references to functions as arguments to other functions might not be something you will end up doing on a daily basis in your programming career, but it can be a useful technique. This following program selects some lines from one file and writes them to another file. The way the lines are selected is determined by a function which returns `True` only if the lines should be copied:

```python
def copy_lines(source_file: str, target_file: str, criterion= lambda x: True):
    with open(source_file) as source, open(target_file, "w") as target:
        for line in source:
            # Remove any whitespace from beginning and end of line
            line = line.strip()

            if criterion(line):
                target.write(line + "\n")

# Some examples
if __name__ == "__main__":
    # If the third parameter is not given, copy all lines
    copy_lines("first.txt", "second.txt")

    # Copy all non-empty lines
    copy_lines("first.txt", "second.txt", lambda line: len(line) > 0)

    # Copy all lines which contain the word "Python"
    copy_lines("first.txt", "second.txt", lambda line: "Python" in line)

    # Copy all lines which do not end in a full stop
    copy_lines("first.txt", "second.txt", lambda line: line[-1] != ".")
```

The function definition contains a default value for the keyword parameter `criterion`: `lambda x: True`. This anonymous function always returns `True` regardless of the input. So, the default behaviour is to copy all lines. As usual, if a value is given for a parameter with a default value, the new value replaces the default value.

<programming-exercise name='Product search' tmcname='part12-07_product_search'>

This exercise deals with products which are stored in tuples. The examples all assume a variable named `products`, which is assigned the following value:

```python
products = [("banana", 5.95, 12), ("apple", 3.95, 3), ("orange", 4.50, 2), ("watermelon", 4.95, 22), ("kale", 0.99, 1)]
```

Each tuple contains three items: name, price and amount.

Please write a function named `search(products: list, criterion: callable)`. The second argument to the function is a function itself, and it should be able to process a tuple as defined above, and return a Boolean value. The search function should return a new list containing those tuples from the original which fulfil the criterion.

If we wanted to include only products whose price was under 4 euros, we could use the following criterion function:

```python
def price_under_4_euros(product):
    return product[1] < 4
```

The function returns `True` if the second item in the tuple is less than four in value.

An example of the `search` function in use:

```python
for product in search(products, price_under_4_euros):
    print(product)
```

<sample-output>

('apple', 3.95, 3)
('kale', 0.99, 1)

</sample-output>

The criterion function can also be a lambda function. If we wanted to search for only those products whose amount was at least 11, we could write the following:

```python
for product in search(products, lambda t: t[2]>10):
    print(product)
```

<sample-output>

('banana', 5.95, 12)
('watermelon', 4.95, 22)

</sample-output>

</programming-exercise>
