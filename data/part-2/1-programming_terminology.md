---
path: '/part-2/1-programming-terminology'
title: 'Programming terminology'
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be familiar with some essential terminology in programming
- You will know the difference between a statement and an expression
- You will be able to find out the data type of an evaluated expression
- You will have learnt to use debugging methods to find mistakes in your code

</text-box>

In the first part of this course we didn't pay much attention to terminology, so let's have a look at some central concepts in programming.

## Statement

A _statement_ is a part of the program which executes something. It often, but not always, refers to a single command.

For example, `print("Hi!")` is a statement which prints out a line of text. Likewise, `number = 2` is a statement which assigns a value to a variable.

A statement can also be more complicated. It can, for instance, contain other statements. The following statement spans three lines:

```python
if name == "Anna":
    print("Hi!")
    number = 2
```

In the above case there are two statements (a print statement and an assignment statement) within a conditional statement.

## Block

A _block_ is a group of consecutive statements that are at the same level in the structure of the program. For example, the block of a conditional statement contains those statements which are executed only if the condition is true.

```python
if age > 17:
    # beginning of the conditional block
    print("You are of age!")
    age = age + 1
    print("You are now one year older...")
    # end of the conditional block

print("This here belongs to another block")
```

In Python blocks are expressed by indenting all code in the block by the same amount of whitespace.

NB: the main block of a Python program must always be at the leftmost edge of the file, without indentation:

```python
# this program will not work because it is not written at the leftmost egde of the file
  print("hello world")
  print("this program is not very good...")
```

## Expression

An _expression_ is a bit of code that results in a determined data type. When the program is executed, the expression is evaluated so that it has a value that can then be used in the program.

Here are a few examples of expressions:

| Expression | Value  | Type    | Python data type |
|------------|--------|---------|------------------|
|`2 + 4 + 3` | `9`    | integer | `int` |
|`"abc" + "de"` | `"abcde"` | string | `str`|
|`11 / 2`    | `5.5`  | floating point number | `float` |
|`2 * 5 > 9` | `True` | Boolean value | `bool`|

Because all expressions have a type, they can be assigned to variables:

```python
# the variable x is assigned the value of the expression 1 + 2
x = 1 + 2
```

Simple expressions can be assembled together to form more complicated expressions, for example with arithmetic operations:

```python
# the variable y is assigned the value of the expression '3 times x plus x squared'
y = 3 * x + x**2
```

## Function

A _function_ executes some functionality. Functions can also take one or more _arguments_, which are data that can be fed to and processed by the function. Arguments are sometimes also referred to as _parameters_. There is a technical distinction between an argument and a parameter, but the words are often used interchangeably. For now it should suffice to remember that both terms refer to the idea of some data passed to the function.

A function is executed when it is _called_. That is, when the function (and its arguments, if any) is mentioned in the code. The following statement calls the `print` function with the argument `"this is an argument"`:

```python
print("this is an argument")
```

Another function you've already used often is the `input` function, which asks the user for input. The argument of this function is the message that is shown to the user:

```python
name = input("Please type in your name: ")
```

In this case the function also _returns_ a value. After the function has been executed, the section of code where it was called is replaced by the value it returns; it is another expression that has now been evaluated. The function `input` returns a string value containing whatever the user typed in at the prompt. The value a function returns is often stored in a variable so that it can be used in the program later on.

## Data type

_Data type_ refers to the characteristics of any value present in the program. In the following bit of code the data type of the variable `name` is string or `str`, and the data type of the variable `result` is integer or `int`:

```python
name = "Anna"
result = 100
```

You can use the function `type` to find out the data type of any expression. An example of its use:

```python
print(type("Anna"))
print(type(100))
```

<sample-output>

<class 'str'>
<class 'int'>

</sample-output>

## Syntax

Similarly to natural languages, the _syntax_ of a programming language determines how the code of a program should be written. Each programming language has its own specific syntax.

The syntax of Python specifies, among other things, that the first line of an `if` statement should end in a colon character, and the block of the statement should be indented:

```python
if name == "Anna":
    print("Hi!")
```

If the syntactic rules of the programming language are not followed, there will be an error:

```python
if name == "Anna"
    print("Hi!")
```

<sample-output>

<pre>
  File "test.py", line 1
    if name == "Anna"
                    ^
SyntaxError: invalid syntax
</pre>


</sample-output>

## Debugging

If the syntax of the program is correct but the program still doesn't function as intended, there is a _bug_ in the program.

Bugs manifest in different ways. Some bugs cause an error during execution. For example, the following program

```python
x = 10
y = 0
result = x / y

print(f"{x} divided by {y} is {result}")
```

causes this error:

<sample-output>

<pre>
ZeroDivisionError: integer division or modulo by zero on line 3
</pre>

</sample-output>

The problem here is mathematical in nature: division by zero is not allowed, and this halts the execution of the program.

Errors during execution are usually rather easy to fix, because the error message states the line of code causing the error. Of course the actual reason for the bug might be somewhere quite different than the line of code causing the error.

Sometimes a bug in the program is revealed because the result the code produces is wrong. Discovering and locating this type of bug can be challenging. In the programming exercises on this course the tests are usually intended to reveal bugs of this type. Before a bug can be fixed, its cause must first be located.

Programming jargon refers to discovering the causes of bugs as _debugging_. It is an extremely important skill in any programmer's toolbox. Professional programmers often spend more time debugging than writing fresh code.

A simple yet effective way of debugging a program is adding debugging print statements to your code. Verifying the results of your code with `print` commands gives a quick confirmation the code does what you want it to do.

The following is an attempt to solve one of the exercises from the [previous section](/part-1/5-conditional-statements):

```python
hourly_wage = float(input("Hourly wage: "))
hours = int(input("Hours worked: "))
day = input("Day of the week: ")

daily_wages = hourly_wage * hours
if day == "sunday":
    daily_wages * 2

print(f"Daily wages: {daily_wages} euros")
```

The program doesn't work quite right. Executing the tests prints out the following:

<sample-output>

<pre>
FAIL: PythonEditorTest: test_sunday_1

With input 20.0,6,Sunday correct wage 240.0 is not found in output Daily wages: 120.0 euros
</pre>

</sample-output>

When debugging the exercises on this course, the first step is often checking how the program behaves with the input specified in the test that failed. Indeed the result isn't what was expected:

<sample-output>

Daily wages: 120.0 euros

</sample-output>

Debugging usually means running the program multiple times. It can come in handy to temporarily "hard-code" the problematic input, instead of asking the user for input each time. In this case hard-coding could look like this:

```python
# hourly_wage = float(input("Hourly wage: "))
# hours = int(input("Hours worked: "))
# day = input("Day of the week: ")
hourly_wage = 20.0
hours = 6
day = "Sunday"

daily_wages = hourly_wage * hours
if day == "sunday":
    daily_wages * 2

print(f"Daily wages: {daily_wages} euros")
```

The next step could be adding _debugging print statements_. The problematic part of the code is in the section dealing with Sundays, so let's add `print` commands before and after the line that should double the daily wages on Sundays:

```python
# ...

daily_wages = hourly_wage * hours
if day == "sunday":
    print("wages before:", daily_wages)
    daily_wages * 2
    print("wages after doubling:", daily_wages)

print(f"Daily wages: {daily_wages} euros")
```

Running the code now reveals nothing - the debugging print statements aren't printed at all. It seems that the contents of the `if` block are never executed, so there must be a problem with the conditional statement. Let's try printing out the value of the Boolean expression:

```python
# ...

daily_wages = hourly_wage * hours
print("condition:", day == "sunday")
if day == "sunday":
    print("wages before:", daily_wages)
    daily_wages * 2
    print("wages after doubling:", daily_wages)

print(f"Daily wages: {daily_wages} euros")
```

Indeed, the value is `False`, so the contents of the if block are never executed:

<sample-output>

condition:  False
Daily wages: 120.0 euros

</sample-output>

The issue must then lie within the condition of the `if` statement. As in so many situations in programming, the case of letters matters also in comparisons. Notice how the "sunday" in the Boolean expression has not been capitalized, but in the input it was. Let's fix this (in both the `print` command and the `if` statement):

```python
# ...

daily_wages = hourly_wage * hours
print("condition:", day == "Sunday")
if day == "Sunday":
    print("wages before:", daily_wages)
    daily_wages * 2
    print("wages after doubling:", daily_wages)

print(f"Daily wages: {daily_wages} euros")
```

Running this prints out the following:

<sample-output>

condition: True
wages before: 120
wages after doubling: 120
Daily wages: 120.0 euros

</sample-output>

It seems the value stored in `daily_wages` is correct at first: `hourly_wage = 20.0` and `hours = 6`, and 20.0 * 6 = 120.0. The command which is supposed to double the figure doesn't do so, however, so there must be a problem with the command. And indeed the command

```python
daily_wages * 2
```

does double the value, but it doesn't store the new value anywhere. Let's change it so it also stores the new value:

```python
daily_wages *= 2
```

Running the program again reveals that the printout at the end is now also correct:

<sample-output>

condition: True
wages before: 120
wages after doubling: 240
Daily wages: 240.0 euros

</sample-output>

When the program has been fixed, remember to remove all debugging print statements and other code added for debugging purposes.

This example was quite simple, and in such a short program one could probably figure out the bugs just by reading the code carefully. However, using debugging print statements is often a quick way to get a feeling for where the problem might lie. Print statements can be used to figure out which parts of the program seem to work correctly, so bug tracking efforts can be concentrated on the sections of code which are the most likely culprits.

Debugging print statements are only one tool for debugging programs. We will come back to this subject later on during this course. You should now get into the habit of using debugging print statements to look for mistakes in your code. Programming professionals cannot get by without using them, so it is a very useful tool for beginners as well.

<in-browser-programming-exercise name="Fix the syntax" tmcname="part02-01_fix_syntax" height="400px">

The following program contains several _syntactic errors_. Please fix the program so that the syntax is in order and the program works as specified by the examples below.

```python
  number = input("Please type in a number: ")
  if number>100
    print("The number was greater than one hundred")
    number - 100
    print("Now its value has decreased by one hundred)
     print("Its value is now"+ number)
 print(number + " must be my lucky number!")
 print("Have a nice day!)
```

<sample-output>

Please type in a number: **13**
13 must be my lucky number!
Have a nice day!

</sample-output>

<sample-output>

Please type in a number: **101**
The number was greater than one hundred
Now its value has decreased by one hundred
Its value is now 1
1 must be my lucky number!
Have a nice day!

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Number of characters" tmcname="part02-02_number_of_characters">

The function `len` can be used to find out the length of a string, among other things. The function returns the number of characters in a string.

Some examples of how this works:

```python
word = "abcd"
print(len(word))

print(len("hi there"))

word2 = "howdydoody"
length = len(word2)
print(length)

empty_string = ""
length = len(empty_string)
print(length)
```

<sample-output>

4
8
10
0

</sample-output>

Please write a program which asks the user for a word and then prints out the number of characters, if there was more than one typed in.

Examples of expected behaviour:

<sample-output>

Please type in a word: **hey**
There are 3 letters in the word hey
Thank you!

</sample-output>

<sample-output>

Please type in a word: **banana**
There are 6 letters in the word banana
Thank you!

</sample-output>

<sample-output>

Please type in a word: **b**
Thank you!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Typecasting" tmcname="part02-03_typecasting">

When programming in Python, often we need to change the data type of a value. For example, a floating point number can be converted into an integer with the function `int`:

```python

temperature = float(input("Please type in a temperature: "))

print("The temperature is", temperature)

print("...and rounded down it is", int(temperature))

```

<sample-output>

Please type in a temperature: **5.15**
The temperature is 5.15
...and rounded down it is 5

</sample-output>

Notice the function always rounds down, and not according to the rounding rules in mathematics. This is an example of a _floor function_.

<sample-output>

Please type in a temperature: **8.99**
The temperature is 8.99
...and rounded down it is 8

</sample-output>

Please write a program which asks the user for a floating point number and then prints out the integer part and the decimal part separately. Use the Python `int` function.

You can assume the number given by the user is always greater than zero.

An example of expected behaviour:

<sample-output>

Please type in a number: **1.34**
Integer part: 1
Decimal part: 0.34

</sample-output>

</in-browser-programming-exercise>

<!--

A quiz to review the contents of this section:

<quiz id="eb4b41d3-b83b-5815-a1d5-ae9b377aa274"></quiz>


-->
