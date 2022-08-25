---
path: '/part-1/2-information-from-the-user'
title: 'Information from the user'
hidden: false
---

<text-box variant='learningObjectives' name='Learning objectives'>

After this section

- You will know how to write a program which uses input from the user
- You will know how to use variables to store input and print it out
- You will be able to combine strings

</text-box>

_Input_ refers to any information a user gives to the program. Specifically, the Python command `input` reads in a line of input typed in by the user. It may also be used to display a message to the user, to prompt for specific input.

The following program reads in the name of the user with the `input` command. It then prints it out with the `print` command:

```python
name = input("What is your name? ")
print("Hi there, " + name)
```

The execution of this program could look like this (input from the user in red):

<sample-output>

What is your name? **Paul Python**
Hi there, Paul Python

</sample-output>

What this program prints out is partially dependent on input from the user. That means the execution of the program could also look like this:

<sample-output>

What is your name? **Paula Programmer**
Hi there, Paula Programmer

</sample-output>

The word `name` in this program is a _variable_. In the context of programming, a variable is a location for storing some _value_, such as a string or a number. This value can be used later, and it can also be changed.

<text-box variant="hint" name="Naming variables">

In principle, variables can be named quite freely, within certain limits specified in the Python language.

It is a common international programming practice to name variables in English, but you may come across code where variables are named in other languages, such as the native language of the programmer. The name of the variable has no direct effect on its content, so the name, in that sense, does not matter. However, it can often be helpful in understanding how code functions if variables are named logically and in English.

</text-box>

<in-browser-programming-exercise name="Name twice" tmcname="part01-06_name_twice">

Please write a program which asks for the user's name and then prints it twice, on two consecutive lines.

An example of the how the program should function:

<sample-output>

What is your name? **Paul**
Paul
Paul

</sample-output>

</in-browser-programming-exercise>

## Referencing a variable

A single variable can be referred to many times in a program:

```python
name = input("What is your name? ")

print("Hi, " + name + "!")
print(name + " is quite a nice name.")
```

If the user gives the name `Paul Python`, this program prints out the following:

<sample-output>

What is your name? **Paul Python**
Hi, Paul Python!
Paul Python is quite a nice name.

</sample-output>

Let's have a closer look at the way the `print` command is used above. Within the brackets of the command there is both text in quotation marks as well as variable names which refer to input from the user. These have been combined with a `+` operator, which _concatenates_ two strings into a single string.

Strings and variables can be combined quite freely:

```python
name = input("What is your name? ")

print("Hi " + name + "! Let me make sure: your name is " + name + "?")
```

If the user gives the name `Ellen Example` this prints out

<sample-output>

What is your name? **Ellen Example**
Hi Ellen Example! Let me make sure: your name is Ellen Example?

</sample-output>

<in-browser-programming-exercise name="Name and exclamation marks" tmcname="part01-07_name_and_exclamation_marks">

Please write a program which asks for the user's name and then prints it out twice on a single line so that there is an exclamation mark at the beginning of the line, another between the two names and a third one at the end of the line.

The program should function as follows:

<sample-output>

What is your name? **Paul**
!Paul!Paul!

</sample-output>

</in-browser-programming-exercise>

## More than one input

A program can ask for more than one input. Notice how below each `input` command stores the received value in a different variable.

```python
name = input("What is your name? ")
email = input("What is your email address? ")
nickname = input("What is your nickname? ")

print("Let's make sure we got this right")
print("Your name: " + name)
print("Your email address: " + email)
print("Your nickname: " + nickname)
```

The program could print out this, for example:

<sample-output>

What is your name? **Frances Fictitious**
What is your email address? **frances99@example.com**
What is your nickname? **Fran**
Let's make sure we got this right
Your name: Frances Fictitious
Your email address: frances99@example.com
Your nickname: Fran

</sample-output>

If the same variable is used to store more than one input, each new value will replace the previous one. For example:

```python
address = input("What is your address? ")
print("So you live at address " + address)

address = input("Please type in a new address: ")
print("Your address is now " + address)
```

An example execution of the program:

<sample-output>

What is your address? **Python Path 101, Flat 3D**
So you live at address Python Path 101, Flat 3D
Please type in a new address: **New Road 999**
Your address is now New Road 999

</sample-output>

This means that if the same variable is used to store two inputs in succession, there is no way to access the first input value after it has been replaced by the second:

```python
address = input("What is your address? ")
address = input("Please type in a new address: ")

print("Your address is now " + address)
```

An example of how the program's output might look like:

<sample-output>

What is your address? **Python Path 10**
Please type in a new address: **Programmer's Walk 23**
Your address is now Programmer's Walk 23

</sample-output>

<in-browser-programming-exercise name="Name and address" tmcname="part01-08_name_and_address">

Please write a program which asks for the user's name and address. The program should also print out the given information, as follows:

<sample-output>

Given name: **Steve**
Family name: **Sanders**
Street address: **91 Station Road**
City and postal code: **London EC05 6AW**
Steve Sanders
91 Station Road
London EC05 6AW

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Fix the code: Utterances" tmcname="part01-09_utterances">

Here is a program which should ask for three utterances and print them out, like so:

<sample-output>

The 1st part: **hickory**
The 2nd part: **dickory**
The 3rd part: **dock**
hickory-dickory-dock!

</sample-output>

However, there is something wrong with the code below. Please fix it.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Story" tmcname="part01-10_story">

Please write a program which prints out the following story. The user gives a name and a year, which should be inserted into the printout.

<sample-output>

Please type in a name: **Mary**
Please type in a year: **1572**

Mary is a valiant knight, born in the year 1572. One morning Mary woke up to an awful racket: a dragon was approaching the village. Only Mary could save the village's residents.

</sample-output>

The story should change according to the input given by the user.


</in-browser-programming-exercise>

<!--

A quiz to review the contents of this section:

<quiz id="10cb3510-d8a6-5e9b-b372-c85c4c7eb957"></quiz>

-->
