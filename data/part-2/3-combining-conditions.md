---
path: '/part-2/3-combining-conditions'
title: 'Combining conditions'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know how to use the operators `and`, `or` and `not` in conditions
- You will be able to write nested conditionals

</text-box>

## Logical operators

You can combine conditions with the logical operators `and` and `or`. The operator `and` specifies that all the given conditions must be true at the same time. The operator `or` specifies that at least one of the given conditions must be true.

For example, the condition `number >= 5 and number <= 8` determines that `number` must simultaneously be at least 5 and at most 8. That is, it must be between 5 and 8.

```python
number = int(input("Please type in a number: "))
if number >= 5 and number <= 8:
    print("The number is between 5 and 8")
```

Meanwhile, the condition `number < 5 or number > 8` determines that `number` must be either less than 5 or greater than 8. That is, it must not be within the range of 5 to 8.

```python
number = int(input("Please type in a number: "))
if number < 5 or number > 8:
    print("The number is not within the range of 5 to 8")
```

The following truth table contains the behaviour of these operators in different situations:

a     | b     | a and b | a or b |
:----:|:-----:|:-------:|:------:|
False | False | False   | False  |
True  | False | False   | True   |
False | True  | False   | True   |
True  | True  | True    | True   |

Sometimes it is necessary to know if something is _not_ true. The operator `not` negates a condition:

a     | not a
:----:|:----:
True  | False
False | True

The above example with the range of 5 to 8 _excluded_ could also be programmed like this:

```python
number = int(input("Please type in a number: "))
if not (number >= 5 and number <= 8):
    print("The number is not within the range of 5 to 8")
```

Especially in programming, logical operators are often called _Boolean operators_.

<text-box variant='hint' name="Simplified combined conditions">

The condition `x >= a and x <= b` is a very common way of checking whether the number `x` falls within the range of `a` to `b`. An expression with this structure works the same way in most programming languages.

Python also allows a simplified notation for combining conditions: `a <= x <= b` achieves the same result as the longer version using `and`. This shorter notation might be more familiar from mathematics, but it is not very widely used in Python programming, possibly because very few other programming languages have a similar shorthand.

</text-box>

## Combining and chaining conditions

The following program asks the user to type in four numbers. It then works out which of the four is the greatest, with the help of some conditions:

```python
n1 = int(input("Number 1: "))
n2 = int(input("Number 2: "))
n3 = int(input("Number 3: "))
n4 = int(input("Number 4: "))

if n1 > n2 and n1 > n3 and n1 > n4:
    greatest = n1
elif n2 > n3 and n2 > n4:
    greatest = n2
elif n3 > n4:
    greatest = n3
else:
    greatest = n4

print(f" {greatest} is the greatest of the numbers.")
```

<sample-output>

Number 1: **2**
Number 2: **4**
Number 3: **1**
Number 4: **1**
4 is the greatest of the numbers.

</sample-output>

In the above example the first condition `n1 > n2 and n1 > n3 and n1 > n4` is true only if all three conditions within are true.

<in-browser-programming-exercise name="Age check" tmcname="part02-08_age_check">

Please write a program which asks for the user's age. If the age is not plausible, that is, it is under 5 or something that can't be an actual human age, the program should print out a comment.

Have a look at the examples of expected behaviour below to figure out which comment is applicable in each case.

<sample-output>

What is your age? **13**
Ok, you're 13 years old

</sample-output>

<sample-output>

What is your age? **2**
I suspect you can't write quite yet...

</sample-output>

<sample-output>

What is your age? **-4**
That must be a mistake

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Nephews" tmcname="part02-09_nephews">

Please write a program which asks for the user's name. If the name is Huey, Dewey or Louie, the program should recognise the user as one of Donald Duck's nephews.

In a similar fashion, if the name is Morty or Ferdie, the program should recognise the user as one of Mickey Mouse's nephews.

Some examples:

<sample-output>

Please type in your name: **Morty**
I think you might be one of Mickey Mouse's nephews.

</sample-output>

<sample-output>

Please type in your name: **Huey**
I think you might be one of Donald Duck's nephews.

</sample-output>

<sample-output>

Please type in your name: **Ken**
You're not a nephew of any character I know of.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Grades and points" tmcname="part02-10_grades_and_points">

The table below outlines the grade boundaries on a certain university course. Please write a program which asks for the amount of points received and then prints out the grade attained according to the table.

points   | grade
:--:|:----:
< 0 |  impossible!
0-49 | fail
50-59 | 1
60-69 | 2
70-79 | 3
80-89| 4
90-100 | 5
\> 100 |  impossible!

Some examples:

<sample-output>

How many points [0-100]: **37**
Grade: fail

</sample-output>

<sample-output>

How many points [0-100]: **76**
Grade: 3

</sample-output>

<sample-output>

How many points [0-100]: **-3**
Grade: impossible!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="FizzBuzz" tmcname="part02-11_fizzbuzz">

Please write a program which asks the user for an integer number. If the number is divisible by three, the program should print out Fizz. If the number is divisible by five, the program should print out Buzz. If the number is divisible by both three and five, the program should print out FizzBuzz.

Some examples of expected behaviour:

<sample-output>

Number: **9**
Fizz

</sample-output>

<sample-output>

Number: **7**

</sample-output>

<sample-output>

Number: **20**
Buzz

</sample-output>

<sample-output>

Number: **45**
FizzBuzz

</sample-output>

</in-browser-programming-exercise>

## Nested conditionals

Conditional statements can also be nested within other conditional statements. For example, the following program checks whether a number is above zero, and then whether it is odd or even:

```python
number = int(input("Please type in a number: "))

if number > 0:
    if number % 2 == 0:
        print("The number is even")
    else:
        print("The number is odd")
else:
    print("The number is negative or zero")
```

Some examples of how this program behaves:

<sample-output>

Please type in a number: **3**
The number is odd

Please type in a number: **18**
The number is even

Please type in a number: **-4**
The number is negative or zero

</sample-output>

With nested conditional statements it is crucial to get the indentations right. Indentations determine which branches are linked together. For example, an `if` branch and an `else` branch with the same amount of whitespace are determined to be branches of the same conditional statement.

The same result can often be achieved using either nested conditional statements or conditions combined with logical operators. The example below is functionally no different from the example above, in the sense that it will print out the exactly same things with the same inputs:

```python
number = int(input("Please type in a number: "))

if number > 0 and number % 2 == 0:
    print("The number is even")
elif number > 0 and number % 2 != 0:
    print("The number is odd")
else:
    print("The number is negative or zero")
```

Neither approach is intrinsically better than the other, but in different situations one or the other may seem more logical. In this particular example most people tend to find the first version with nesting to be more intuitive.

<in-browser-programming-exercise name="Leap year" tmcname="part02-12_leap_year">

Generally, any year that is divisible by four is a leap year. However, if the year is additionally divisible by 100, it is a leap year only if it also divisible by 400.

Please write a program which asks the user for a year, and then prints out whether that year is a leap year or not.

Some examples:

<sample-output>

Please type in a year: **2011**
That year is not a leap year.

</sample-output>

<sample-output>

Please type in a year: **2020**
That year is a leap year.

</sample-output>

<sample-output>

Please type in a year: **1800**
That year is not a leap year.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Alphabetically in the middle" tmcname="part02-13_alphabetically_in_the_middle">

Please write a program which asks the user for three letters. The program should then print out whichever of the three letters would be in the middle if the letters were in alphabetical order.

You may assume the letters will be either all uppercase, or all lowercase.

Some examples of expected behaviour:

<sample-output>

1st letter: x
2nd letter: c
3rd letter: p
The letter in the middle is p

</sample-output>

<sample-output>

1st letter: C
2nd letter: B
3rd letter: A
The letter in the middle is B

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Gift tax calculator" tmcname="part02-14_gift_tax_calculator"  height="500px">

Some say paying taxes makes Finns happy, so let's see if the secret of happiness lies in one of the taxes set out in Finnish tax code. 

[According to the Finnish Tax Administration](https://www.vero.fi/en/individuals/property/gifts/), a gift is a transfer of property to another person against no compensation or payment. If the total value of the gifts you receive from the same donor in the course of 3 years is €5,000 or more, you must pay gift tax.

When the gift is received from a close relative or a family member, the amount of tax to be paid is determined by the following table, which is also available on [this website](https://www.vero.fi/en/individuals/property/gifts/gift-tax-calculator/):

Value of gift | Tax at the lower limit | Tax rate for the exceeding part (%)
:------------:|:----------------------:|:-----------------------------------:
5 000 — 25 000 |        100     |       8
25 000 — 55 000	|       1 700   |	10
55 000 — 200 000 |      4 700	|       12
200 000 — 1 000 000 |   22 100  |	15
1 000 000 —	|       142 100 |	17

So, for a gift of 6 000 euros the recipient pays a tax of 180 euros (100 + (6 000 - 5 000) * 0.08). Similarly, for a gift of 75 000 euros the recipient pays a tax of 7 100 euros (4 700 + (75 000 - 55 000) * 0.12).

Please write a program which calculates the correct amount of tax for a gift from a close relative. Have a look at the examples below to see what is expected. Notice the lack of thousands separators in the input values - you may assume there will be no spaces or other thousands separators in the numbers in the input, as we haven't yet covered dealing with these.

<sample-output>

Value of gift: **3500**
No tax!

</sample-output>

<sample-output>

Value of gift: **5000**
Amount of tax: 100.0 euros

</sample-output>

<sample-output>

Value of gift: **27500**
Amount of tax: 1950.0 euros

</sample-output>

</in-browser-programming-exercise>

<!--

A quiz to review the contents of this section:

<quiz id="6bfd7e0d-2998-5697-80dc-418703fabbbf"></quiz>

-->
