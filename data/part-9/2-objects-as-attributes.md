---
path: '/part-9/2-objects-as-attributes'
title: 'Objects as attributes'
hidden: False
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know how to use objects as attributes in other objects
- You will be familiar with the keyword `None`

</text-box>

We have already seen examples of classes which have lists as attributes. As there is thus nothing stopping us from including mutable objects as attributes in our classes, we might as well use instances of our own classes as attributes in other classes we've defined ourselves. In the following examples we will define the classes `Course`, `Student` and `CompletedCourse`. A completed course makes use of the first two classes. The class definitions are very short and simple in order to better concentrate on the technique of using instances of our own classes as attributes.

We will assume each class is defined in a separate file.

First we define the class `Course` in a file named `course.py`:

```python
class Course:
    def __init__(self, name: str, code: str, credits: int):
        self.name = name
        self.code = code
        self.credits = credits
```

Next, the class `Student` in a file named `student.py`:

```python
class Student:
    def __init__(self, name: str, student_number: str, credits: int):
        self.name = name
        self.student_number = student_number
        self.credits = credits
```

Finally, the class `CompletedCourse` is defined in a file named `completedcourse.py`. As it uses the other two classes, they have to be imported before they can be used:

```python
from course import Course
from student import Student

class CompletedCourse:
    def __init__(self, student: Student, course: Course, grade: int):
        self.student = student
        self.course = course
        self.grade = grade
```

Here is an example of a main function which adds some completed courses to a list:

```python
from completedcourse import CompletedCourse
from course import Course
from student import Student

# Create a list of students
students = []
students.append(Student("Ollie", "1234", 10))
students.append(Student("Peter", "3210", 23))
students.append(Student("Lena", "9999", 43))
students.append(Student("Tina", "3333", 8))

# Create a course named Introduction to Programming
itp = Course("Introduction to Programming", "itp1", 5)

# Add completed courses for each student, with grade 3 for all
completed = []
for student in students:
    completed.append(CompletedCourse(student, itp, 3))

# Print out the name of the student for each completed course
for course in completed:
    print(course.student.name)
```

<sample-output>

Ollie
Peter
Lena
Tina

</sample-output>

What exactly is happening with all the dots on the line `print(course.student.name)`?

* `course` is an instance of the class `CompletedCourse`
* `student` refers to an attribute of the `CompletedCourse` object, which is an object of type `Student`
* the attribute `name` in the `Student` object contains the name of the student

## When is an import necessary?

In the examples above an `import` statement appeared quite a few times:

```python
from completedcourse import CompletedCourse
from course import Course
from student import Student

# rest of the main function
```

An `import` statement is only necessary when using code which is defined somewhere outside the current file (or Python interpreter session). This includes situations where we want to use something defined in the Python standard library. For example, the `math` module contains some mathematical operations:

```python
import math

x = 10
print(f"the square root of {x} is {math.sqrt(x)}")
```

In the example above we assumed the three classes were each defined in a separate file, and the main function was run from yet another file. This is why the `import` statements were necessary.

If all program code is written in the same file, as most of the exercises on this course advise you to do, **you will not need** `import` statements to use the classes you have defined.

If you find yourself writing something along the lines of 

```python
from person import Person

# more code goes here
```

it is likely you have gotten something wrong. If you need a refresher, the `import` statement was first introduced in [part 7](/part-7/1-modules) of this course material.

<programming-exercise name='Pets' tmcname='part09-06_pets'>

The exercise template contains the outlines of two classes: `Person` and `Pet`. Each person has one pet. Please change the `__str__` method in the class `Person` so that it also prints out information about the person's pet as shown in the example below.

The string returned by the method _must follow the format specified below exactly_.

```python
hulda = Pet("Hulda", "mixed-breed dog")
levi = Person("Levi", hulda)

print(levi)
```

<sample-output>

Levi, whose pal is Hulda, a mixed-breed dog

</sample-output>

**NB:** all class definitions are in the same text file. You should not need to `import` anything.

</programming-exercise>

## A list of objects as an attribute of an object

In the examples above we used single instances of other classes as attributes: a Person has a single Pet as an attribute, and a CompletedCourse has one Student and one Course as its attributes.

In object oriented programming it is often the case that we want to have a _collection_ of objects as an attribute. For example, the relationship between a sports team and its players follows this pattern:

```python
class Player:
    def __init__(self, name: str, goals: int):
        self.name = name
        self.goals = goals

    def __str__(self):
        return f"{self.name} ({self.goals} goals)"

class Team:
    def __init__(self, name: str):
        self.name = name
        self.players = []

    def add_player(self, player: Player):
        self.players.append(player)

    def summary(self):
        goals = []
        for player in self.players:
            goals.append(player.goals)
        print("Team:", self.name)
        print("Players:", len(self.players))
        print("Goals scored by each player:", goals)
```

An example of our class in action:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))
ca.add_player(Player("Emily", 22))
ca.add_player(Player("Andy", 1))
ca.summary()
```

<sample-output>

Team: Campus Allstars
Players: 3
Goals scored by each player: [10, 22, 1]

</sample-output>

<programming-exercise name='A box of presents' tmcname='part09-07_box_of_presents'>

In this exercise you will practice wrapping presents. You will write two classes: `Present` and `Box`. A present has a name and a weight, and a box contains presents.

## The Present class

Please define the class `Present` which can be used to represent different kinds of presents. The class definition should contain attributes for the name and the weight (in kg) of the present. Instances of the class should work as follows:

```python
book = Present("ABC Book", 2)

print("The name of the present:", book.name)
print("The weight of the present:", book.weight)
print("Present:", book)
```

This should print out

<sample-output>

The name of the present: ABC Book
The weight of the present: 2
Present: ABC Book (2 kg)

</sample-output>

## The Box class

Please define the class `Box`. You should be able to add presents to the box, and the box should keep track of the combined weight of the presents within. The class definition should contain these methods:

- `add_present(self, present: Present)` which adds the present given as an argument to the box. The method has no return value.
- `total_weight(self)` which returns the combined weight of the presents in the box.

You may use the following code to test your class:

```python
book = Present("ABC Book", 2)

box = Box()
box.add_present(book)
print(box.total_weight())

cd = Present("Pink Floyd: Dark Side of the Moon", 1)
box.add_present(cd)
print(box.total_weight())
```

<sample-output>

2
3

</sample-output>

</programming-exercise>

## None: a reference to nothing

In Python programming all initialised variables refer to an object. There are, however, inevitably situations where we need to refer to something which does not exist, without causing errors. The keyword `None` represents exactly such an "empty" object.

Continuing from the Team and Player example above, let's assume we want to add a method for searching for players on the team by the name of the player. If no such player is found, it might make sense to return `None`:

```python
class Player:
    def __init__(self, name: str, goals: int):
        self.name = name
        self.goals = goals

    def __str__(self):
        return f"{self.name} ({self.goals} goals)"

class Team:
    def __init__(self, name: str):
        self.name = name
        self.players = []

    def add_player(self, player: Player):
        self.players.append(player)

    def find_player(self, name: str):
        for player in self.players:
            if player.name == name:
                return player
        return None
```

Let's test our function:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))
ca.add_player(Player("Amily", 22))
ca.add_player(Player("Andy", 1))

player1 = ca.find_player("Andy")
print(player1)
player2 = ca.find_player("Charlie")
print(player2)
```

<sample-output>

Andy (1 goals)
None

</sample-output>

Be careful with `None`, though. It can sometimes cause more trouble than it solves. It is a common programming error to try to access a method or an attribute through a reference which evaluates to `None`:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))

player = ca.find_player("Charlie")
print(f"Goals by Charlie: {player.goals}")
```

Executing the above would cause an error:

<sample-output>

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'NoneType' object has no attribute 'goals'

</sample-output>

It is a good idea to check for `None` before trying to access any attributes or methods of return values:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))

player = ca.find_player("Charlie")
if player is not None:
    print(f"Goals by Charlie: {player.goals}")
else:
    print(f"Charlie doesn't play in Campus Allstars :(")
```

<sample-output>

Charlie doesn't play in Campus Allstars :(

</sample-output>

<programming-exercise name='The shortest person in the room' tmcname='part09-08_shortest_in_room'>

The exercise template contains the class `Person`. A person has a name and a height. In this exercise you will implement the class `Room`. You may add any number of persons to a room, and you may also search for and remove the shortest person in the room.

## Room

Please define the class `Room`. It should have a list of persons as an attribute, and also contain the following methods:

- `add(person: Person)` adds the person given as an argument to the room.
- `is_empty()` returns `True` or `False` depending on whether the room is empty.
- `print_contents()` prints out the contents of the list of persons in the room.

Please have a look at the following usage example:

```python
room = Room()
print("Is the room empty?", room.is_empty())
room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Ally", 166))
room.add(Person("Nina", 162))
room.add(Person("Dorothy", 155))
print("Is the room empty?", room.is_empty())
room.print_contents()
```

<sample-output>

Is the room empty? True
Is the room empty? False
There are 5 persons in the room, and their combined height is 838 cm
Lea (183 cm)
Kenya (172 cm)
Ally (166 cm)
Nina (162 cm)
Dorothy (155 cm)

</sample-output>

## The shortest person

Please define the method `shortest()` within the `Room` class definition. The method should return the shortest person in the room it is called on. If the room is empty, the method should return `None`. The method should _not_ remove the person fron the room.

```python
room = Room()

print("Is the room empty?", room.is_empty())
print("Shortest:", room.shortest())

room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Nina", 162))
room.add(Person("Ally", 166))

print()

print("Is the room empty?", room.is_empty())
print("Shortest:", room.shortest())

print()

room.print_contents()
```

<sample-output>

Is the room empty? True
Shortest: None

Is the room empty? False
Shortest: Nina

There are 4 persons in the room, and their combined height is 683 cm
Lea (183 cm)
Kenya (172 cm)
Nina (162 cm)
Ally (166 cm)

</sample-output>

## Removing a person from the room

Please define the method `remove_shortest()` within the `Room` class definition. The method should remove the shortest `Person` object from the room and return the reference to the object. If the room is empty, the method should return `None`.

```python
room = Room()

room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Nina", 162))
room.add(Person("Ally", 166))
room.print_contents()

print()

removed = room.remove_shortest()
print(f"Removed from room: {removed.name}")

print()

room.print_contents()
```

<sample-output>

There are 4 persons in the room, and their combined height is 683 cm
Lea (183 cm)
Kenya (172 cm)
Nina (162 cm)
Ally (166 cm)

Removed from room: Nina

There are 3 persons in the room, and their combined height is 521 cm
Lea (183 cm)
Kenya (172 cm)
Ally (166 cm)

</sample-output>

**Hint**: in [part 4](/part-4/3-lists#removing-items-from-a-list) you will find instructions for removing items from a list.

**Hint2**: it is always possible to call another method of the same class from within a method. The following should work just fine:

```python
class Room:
    # ...
    def shortest(self):
        # your code goes here

    def remove_shortest(self):
        shortest_person = self.shortest()
        # ...
```

</programming-exercise>

