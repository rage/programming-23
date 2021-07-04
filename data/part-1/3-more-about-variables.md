---
path: "/part-1/3-more-about-variables"
title: "More about variables"
hidden: false
---

<text-box variant='learningObjectives' name='Learning objectives'>

After this section

- You will be able to use variables in different contexts
- You will know what kind of data can be stored in variables
- You will understand the difference between strings, integers and floating point numbers

</text-box>

Please fill in this questionnaire before getting started with this section. You will get one exercise point for answering.

<quiz id="e230c6dd-820f-5517-b51d-c3ca58c126ac"></quiz>



Variables are needed for various purposes in programming. You can use variables to store any information that will be needed later in the program's execution. 

In Python programming variables are created like so:

`variable_name = ...`

Here `...` means the value stored in the variable.

For example, when you used the `input` command to read a string from the user, you stored the string in a variable and then used the variable later in your program:

```python
name = input("What is your name? ")
print("Hi, " + name)
```

<sample-output>

What is your name? **Ghosty**
Hi, Ghosty

</sample-output>

The values stored in a variable can also contain other variables: 

```python
given_name = "Paul"
family_name = "Python"

name = given_name + " " + family_name

print(name)
```

<sample-output>

Paul Python

</sample-output>

Here the values stored in the three variables are not obtained from user input. They remain the same every time the program is executed.

## Changing the value of a variable

The value stored in a variable can change, as the word _variable_ implies. In the previous section we noticed that the new value replaces the old one.

In the following program the variable `word` has three different values:

```python
word = input("Please give me a word: ")
print(word)

word = input("And another word: ")
print(word)

word = "third"
print(word)
```

<sample-output>

Please give me a word: **first**
first
And another word: **second**
second
third

</sample-output>

The value stored in the variable changes each time the variable is assigned a new value.

The new value of a variable can be derived from its old value. In the following example the variable `word` is first assigned a value based on user input. Then it is assigned a new value, which is the old value with three exclamation marks added to the end.

```python
word = input("Please give a word: ")
print(word)

word = word + "!!!"
print(word)
```

<sample-output>

Please give a word: **test**
test
test!!!

</sample-output>

<text-box variant="hint" name="Lisää muuttujan nimen valinnasta">

* It is often useful to name variables according to what they are used for. For example, if the variable contains a word, the name `word` is a better choice than, say, `a`. 
  
* There is no set limit to the length of a variable name in Python, but there are some other limitations. A variable name should begin with a letter, and it can only contains letters, numbers and underscores &#95;.

* Lower and upper case letters are different characters. The variables `name`, `Name` and `NAME` are all different variables.

* It is a common programming practice in Python to use only lower case characters in variable names. If the variable name consists of multiple words, use an underscore between the words.

</text-box>

## Integers

Thus far we have only stored strings in variables, but there are also many other types of information we will want to store in variables. Let's have a look at integers first.

The following program creates the variable `age`, which contains an integer value.

```python
age = 24
print(age)
```

The program prints out just this:

<sample-output>

24

</sample-output>

Notice the lack of quotation marks here. In fact, if we were to add quotation marks around the number, this would mean our variable would no longer be an integer, but a string instead - a string can contain numbers, but it is processed differently.

So, why does it matter that variables have a type, when the following program still prints out the same thing twice? 

```python
number1 = 100
number2 = "100"

print(number1)
print(numbers2)
```

<sample-output>

100
100

</sample-output>

Variable types matter because different operations affect different types of variables in different ways. Let's have a look at an example:

```python
number1 = 100
number2 = "100"

print(number1 + number1)
print(number2 + number2)
```

This prints out the following:

<sample-output>

200
100100

</sample-output>

For integer values the `+` operator means addition, but for string values it means concatenation.

## Combining values when printing

The following program will not work, because `"The result is "` and `result` are of two different types:

```python
result = 10 * 25
# the following line produces an error
print("The result is " + result)
```

The program does not print out anything, but instead throws an error:

<sample-output>

TypeError: unsupported operand type(s) for +: 'str' and 'int'

</sample-output>

Here, Python tells us that combining two different types of values will not work. In this case, `"The result is "` is of type string, while the value stored in `result` is of type integer.

If we do want to print out a string and an integer in a single command, the integer can be cast as a string with the `str` function, and the two strings can then be combined normally. For example this would work:

```python
result = 10 * 25
print("The result is " + str(result))
```

<sample-output>

The result is 250

</sample-output>

The `print` command also has built-in functionalities that support combining differnt types of values. The simplest way is to add a comma between the values. All the values will be printed out reagardless of their type:

```python
result = 10 * 25
print("The result is", result)
```

<sample-output>

The result is 250

</sample-output>

Notice that there is an automatically added whitespace character between the values separated by a comma here.

## Printing with f-strings

What if we want to have more flexibility and control over what we print out? So called _f-strings_ are another way of formatting printouts in Python. The syntax can initially look a bit confusing, but in the end f-strings are often the simplest way of formatting text.

With f-strings the previous example would look like this:

```python
result = 10 * 25
print(f"The result is {result}")
```

Let's break this apart. In the very beginning of the string we are printing out there is the character _f_. This tells Python that what follows is an f-string. Within the string, enclosed in curly brackets, is the variable `result`. The value it contains becomes a part of the printed string. The printout is exactly the same as in the previous examples:

<sample-output>

The result is 250

</sample-output>

A single f-string can contain multiple variables. For example this code

```python
name = "Mark"
age = 37
city = "Palo Alto"
print(f"Hi {name}, you are {age} years old. You live in {city}.")
```

prints out this:

<sample-output>

Hi Mark, you are 37 years old. You live in Palo Alto.

</sample-output>

It is impossible to create a printout exactly like this using the comma notation in the `print` command. For example, this program

```python
name = "Mark"
age = 37
city = "Palo Alto"
print("Hi", name, ", you are", age, "years old. You live in", city, ".")
```

prints out the following:

<sample-output>

Hi Mark , you are 37 years old. You live in Palo Alto .

</sample-output>

Notice the automatically inserted whitespace between each comma-separated part of the printout. In a couple of places these spaces are problematic.

In its simplicity the comma notation of the `print` command can often be useful, but it does sometimes cause more trouble than it's worth. F-strings are usually a more reliable option. In part 4 you will learn more about the handy features of f-strings when it comes to formatting printouts.

<in-browser-programming-exercise name="Extra space" tmcname="part01-10b_extra_space" height=400px>

Your friend is working on an app for jobseekers. She sends you this bit of code:

```python
name = "Tim Tester"
age = 20
skill1 = "python"
level1 = "beginner"
skill2 = "java"
level2 = "veteran"
skill3 = "programming"
level3 = "semiprofessional"
lower = 2000
upper = 3000

print("my name is ", name, " , I am ", age, "years old")
print("my skills are")
print("- ", skill1, " (", level1, ")")
print("- ", skill2, " (", level2, ")")
print("- ", skill3, " (", level3, " )")
print("I am looking for a job with a salary of", lower, "-", upper, "euros per month")
```

The program should print out _exactly_ the following:

<sample-output>

<pre>
My name is Tim Tester, I am 20 years old

my skills are
 - python (beginner)
 - java (veteran)
 - programming (semiprofessional)

I am looking for a job with a salary of 2000-3000 euros per month
</pre>

</sample-output>

The code works almost correctly, but not quite. This exercise has very strict tests, which check the output for every single bit of whitespace.

Please fix the code so that the printout looks right. Notice especially how the comma notation in the `print` command automatically inserts a space around the different comma-separated parts.

The easiest way to transform the code so that it meets requirements is to use f-strings. 

Hint: you can print an empty line by adding an empty `print` command, or by adding the newline character `\n` into your string.

Do remember to be extra careful when formatting printouts also in the future on this course. Some of the exercises have tests that require your output to be exactly as specified in the examples given.

</in-browser-programming-exercise>

## Floating point numbers

`FLoating point number` or _float_ is a term you will come across often in programming. It refers to numbers with a decimal point. They can be used much in the same way as integer values. 

This program calculates the mean of three floating point numbers:

```python
number1 = 2.5
number2 = -1.25
number3 = 3.62

mean = (number1 + number2 + number3) / 3
print(f"Mean: {mean}")
```

<sample-output>

Mean: 1.6233333333333333

</sample-output>

<in-browser-programming-exercise name="Arithmetics" tmcname="part01-11_arithmetics">

This program already contains two integer variables, `x` and `y`:

```python
x = 27
y = 15
```

Please complete the program so that it also prints out the following:

<sample-output>

27 + 15 = 42
27 - 15 = 12
27 * 15 = 405
27 / 15 = 1.8

</sample-output>

The program should work correctly even if the values of the variables are changed. That is, if the first two lines are 

```python
x = 4
y = 9
```

instead, the program should print out this:

<sample-output>

4 + 9 = 13
4 - 9 = -5
4 * 9 = 36
4 / 9 = 0.4444444444444444

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Fix the code: Print a single line" tmcname="part01-12_print_a_single_line">

Each `print` command usually prints out a line of its own, complete with a change of line at the end. However, if the `print` command is given an additional parameter `end = ""`, it will not print a line change.

For example:

```python
print("Hi ", end="")
print("there!")
```

<sample-output>

Hi there!

</sample-output>

Please fix this program so that the entire calculation, with result, is printed out on a single line. Do not change the number of `print` commands used. 

```python

print(5)
print(" + ")
print(8)
print(" - ")
print(4)
print(" = ")
print(5 + 8 - 4)
```

</in-browser-programming-exercise>

A quiz to review the contents of this section:

<quiz id="49bf296e-41d1-5982-89a9-c784b630eaee"></quiz>
