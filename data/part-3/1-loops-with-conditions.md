---
path: '/part-3/1-loops-with-conditions'
title: 'Loops with conditions'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know how to create a while loop with a condition
- You will know what roles initialisation, formulating a condition and updating variables perform in a loop
- You will be able to create loops with different kinds of conditions

</text-box>

<!--the same text is in sections 3-1, 5-1 and 6-1, check them all if you're changing this-->
<text-box variant='hint' name="About the exercises on this course">

Becoming a proficient programmer requires a lot of practice, sometimes even quite mechanical practice. It also involves developing problem solving skills and applying intuition. This is why there are a lot of exercises of different kinds on this course. Some of them ask you to quite straightforwardly apply what you have learnt in the material, but some of them are intentionally more challenging and open-ended.

Some of the exercises might at first seem overwhelming, but this is nothing to worry about. None of the exercises is strictly mandatory, and in fact _you need only 25 % of the points from each part to pass the course._ You can find more details about passing the course on the [page on grading](/grading-and-exams).

**The exercises are not in any specific order of difficulty.** Each section usually introduces some new programming concepts, and these are then practised with both simpler and more complicated exercises. **If you come across an exercise that feels too difficult, move on to the next one.** You can always come back to the more difficult exercises if you have time later.

When the going inevitably gets tough, a word of consolation: a task that seems impossibly difficult this week will likely feel rather easy in about four weeks' time.

</text-box>

In the previous section we learnt to use the `while True` loop to repeat sections of code. In that construction the condition of the loop is `True`, so the condition is fulfilled every time. We needed to explicitly break out from the loop each time to avoid an infinite loop. For example: 

```python
# Print numbers until the variable a equals 5
a = 1
while True:
    print(a)
    a += 1
    if a == 5:
        break
```

<sample-output>

1
2
3
4

</sample-output>

Of course, the condition doesn't always have to be `True`, but instead any Boolean expression can be used as the condition. The general structure of the `while` statement is as follows:

```python
while <condition>:
    <block>
```

The idea here is that the execution goes back and forth, checking if the condition is true and executing the code within the block, over and over again. If the condition at any point is false, execution of the program continues from the line after the `while` block.

<img src="3_1_1.png">

In the following loop we have the condition `number < 10`. The block within the loop is executed only if the variable number is less than 10.

```python
number = int(input("Please type in a number: "))

while number < 10:
    print(number)
    number += 1

print("Execution finished.")
```

This could print out:

<sample-output>

Please type in a number: **4**
4
5
6
7
8
9
Execution finished.

</sample-output>

In this structure the condition is always checked before the block within the loop is executed. It may happen that the block never gets executed, like so:

<sample-output>

Please type in a number: **12**
Execution finished.

</sample-output>

12 is not less than 10, so the program doesn't print out a single number.

## Initialisation, condition and update

To create a loop you'll often need to include three distinct steps: initialisation, condition, and updating the iteration variables.

_Initialisation_ refers to setting the initial value(s) of the variable(s) used within the condition of the loop. These are often called the iteration or iterator variables. This is performed before the loop is first entered. The _condition_ defines for how long the loop is to be executed. It is set out at the very beginning of the loop. Finally, within each repetition of the loop the variables involved in the condition are _updated_, so that each iteration brings the loop one step closer to its conclusion. The following image illustrates these steps: 

<!--- this is here in case the following image needs to be updated
```python
# Ask the user for a number
number = int(input("Please type in a number: "))

# Repeat while the number is less than 10
while number < 10:

    # Print out and increment
    print(number)
    number += 1

print("Execution finished.")
```
-->
<img src="3_1_2.png">

If any one of these three components is missing, the loop will likely not function correctly. A typical error is omitting the update step:

```python
number = 1

while number < 10:
    print(number)

print("Execution finished.")
```

Here, the value of the variable `number` never changes. The program is stuck in an infinite loop, and the exact same bit of code is repeated over and over again until the user stops the execution, for example by pressing `Control` + `C`:

<sample-output>

1
1
1
1
1
(continued ad infinitum...)

</sample-output>

<in-browser-programming-exercise name="Print numbers" tmcname="part03-01_print_numbers">

Please write a program which prints out all the even numbers between two and thirty, using a loop. Print each number on a separate line.

The beginning of your output should look like this:

<sample-output>
2
4
6
8
etc...
</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Fix the code: Countdown" tmcname="part03-02_countdown">

The program below has some syntactic issues:

```python
print("Are you ready?")
number = int(input("Please type in a number: "))
while number = 0:
print(number)
print("Now!")
```

Please fix it so that it prints out the following:

<sample-output>

Are you ready?
Please type in a number: **5**
5
4
3
2
1
Now!

</sample-output>

This exercise is similar to the countdown exercise in the last section, but please don't use a `while True` loop this time round!


</in-browser-programming-exercise>

## Writing conditions

Any Boolean expression or combination thereof is a valid condition in a loop. For example, the following program prints out every third number, but only as long as the number is less than 100 and not divisible by 5:

```python
number = int(input("Please type in a number: "))

while number < 100 and number % 5 != 0:
    print(number)
    number += 3
```

Two examples of the program's execution with different inputs:

<sample-output>

Please type in a number: **28**
28
31
34
37

</sample-output>

<sample-output>

Please type in a number: **96**
96
99

</sample-output>

When the input is 28, the loop ends with the number 37, because the next number is 40, which is divisible by 5. When the input is 96, the loop ends with the number 99, because the next number is 102, which is not less than 100.

Whenever you write a loop you should make sure that the execution of the loop will always end at some point. The following program either finishes or doesn't, depending on the input:

```python
number = int(input("Please type in a number: "))

while number != 10:
    print(number)
    number += 2
```

If the input is an even number and equals 10 or less, the loop will terminate:

<sample-output>

Please type in a number: **4**
4
6
8

</sample-output>

In any other case the loop gets executed endlessly, as there is no way the variable could then ever equal 10. For example 3 or 12 are inputs that would end in an infinite loop.

<in-browser-programming-exercise name="Numbers" tmcname="part03-03_numbers">

Please write a program which asks the user for a number. The program then prints out all integer numbers greater than zero but smaller than the input.

<sample-output>

Upper limit: **5**
1
2
3
4

</sample-output>

Please don't use the value `True` as the condition of your `while` loop in this exercise!

</in-browser-programming-exercise>

## Debugging tips

Imagine you are writing some slightly more complicated program, such as the one in the next exercise, _Powers of two_. The first efforts could look like this:

```python
limit = int(input("Upper limit:"))
number = 1
while number == limit:
   # more code
```

Here the program starts with reading the input, and continues with the outline of the loop and some attempt at a condition.

It is likely the code will not work as desired on the first try. It might have to be tested dozens or even hundreds of times before it works correctly.

This bit of code always asks for input from the user, which makes testing it slow and cumbersome. Each time the program is tested, input must be typed in.

One way around this is "hard-coding" the input while testing:

```python
# let's hard-code the input value for testing
limit = 8 # int(input("Upper limit"))
number = 1
while number == limit:
   # more code 
```
When the program works with the one hard-coded input, it is easy to test it with other hard-coded inputs as well. When it seems to work correctly all round, it can be tested with input from the user.

This trick works with many of the tests that the exercises on this course are graded with. If the test tells you that the program works incorrectly when the input is, say, 42, that input can be hard-coded into the program while you look for the source of the bug:

```python
# the test said the program works incorrectly when the input is 42
limit = 42 # int(input("Upper limit"))
number = 1
while number == limit:
   # more code
```

Print statement debugging was mentioned a few times in the [previous part](/part-2) of the course. The programs you are asked to write will become more and more complex as the course advances. The amount of debugging you will have to do will likely increase accordingly. Common causes for bugs lie in the conditions that terminate loops; they may work correctly for some inputs and fail for others, and it is not always obvious why that is.

That is why it is high time you included print statement debugging in your programming practices, if you haven't done so already. You can find debugging instructions in the [first](/part-2/1-programming-terminology) and the [fourth](/part-2/4-simple-loops) section of the previous part.

Besides print statements, there are many other tools that can be used for debugging. One of these is the [visualisation tool](http://www.pythontutor.com/visualize.html#mode=edit) on the [Python Tutor](http://www.pythontutor.com/) website. The tool allows you to execute your code line by line, and also shows you the values stored in variables at each step.

The slightly broken code from the debugging example in the [previous section](/part-2/4-simple-loops) is visualised with Python Tutor in the following image:

<img src="3_1_3.png">

The red arrow points to where the execution of the program is at the moment. The tool displays what has been printed out so far, and also shows the value each variable has at each step. The execution moves forward line by line as you press _Next_.

All you need to do to use the visualisation tool is to copy your code and paste it into the [code window](http://www.pythontutor.com/visualize.html#mode=edit) of the tool. The tool does have some limitations compared to the version of Python used on this course. If you come across any cryptic error messages, it may be better to try some other debugging method. 

More experienced programmers are rarely heavy users of the visualisation tool, but for a beginner it can be a valuable aid. Programming as a discipline has little room for luck or chance. It is essential that a programmer understands what values are created by their code at any given moment in the execution. If the values stored in variables are not as expected, there is most likely a bug in the program.

The visualisation tool and debugging print statements are both great ways for a programmer to see with their own eyes that a program does exactly what was expected of it.

<in-browser-programming-exercise name="Powers of two" tmcname="part03-04_powers_of_two">

Please write a program which asks the user to type in an upper limit. The program then prints out numbers so that each subsequent number is the previous one doubled, starting from the number 1. That is, the program prints out powers of two in order.

The execution of the program finishes when the next number to be printed would be greater than the limit set by the user. No numbers greater than the limit should be printed.

<sample-output>

Upper limit: **8**
1
2
4
8

</sample-output>

<sample-output>

Upper limit: **20**
1
2
4
8
16

</sample-output>

<sample-output>

Upper limit: **100**
1
2
4
8
16
32
64

</sample-output>

Please don't use the value `True` as the condition of your `while` loop in this exercise!

**What are powers of two?** The first power of two is the number 1. The next one is 1 times 2, which is 2. The next is 2 times 2, which is 4. The next is 4 times 2, which is 8, and so forth. Each power in the sequence is multiplied by two to produce the next one.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Powers of base n" tmcname="part03-05_powers_of_base_n">

Please change the program from the previous exercise so that the user gets to input also the base which is multiplied (in the previous program the base was always 2). 

<sample-output>

Upper limit: **27**
Base: **3**
1
3
9
27

</sample-output>

<sample-output>

Upper limit: **1234567**
Base: **10**
1
10
100
1000
10000
100000
1000000

</sample-output>

Please don't use the value `True` as the condition of your `while` loop in this exercise!

</in-browser-programming-exercise>

<in-browser-programming-exercise name="The sum of consecutive numbers, version 1" tmcname="part03-06_consecutive_sum_v1">

Please write a program which asks the user to type in a limit. The program then calculates the sum of consecutive numbers (1 + 2 + 3 + ...) until the sum is at least equal to the limit set by the user. The program should function as follows:

<sample-output>

Limit: **2**
3

</sample-output>

<sample-output>

Limit: **10**
10

</sample-output>

<sample-output>

Limit: **18**
21

</sample-output>

If you have trouble understanding how the desired output is calculated, the sample outputs in the next exercise may help. You may assume the number typed in by the user is always equal to 2 or higher.

</in-browser-programming-exercise>

## Building strings

In the very [first week of the course](/part-1/2-information-from-the-user) we learnt that it is possible to "build" strings out of shorter strings with the `+` operator. For example, this is valid Python code:

```python
words = "pride"
words = words + ", prejudice"
words = words + " and python"

print(words)
```

<sample-output>

pride, prejudice and python

</sample-output>

The `+=` operator allows us to write this a little more compactly:

```python
words = "pride"
words += ", prejudice"
words += " and python"

print(words)
```

This also applies to f-strings, which may come in handy if values stored in variables are needed as parts of the resulting string. For example this would work:

```python
course = "Introduction to Programming"
grade = 4

verdict = "You have received "
verdict += f"the grade {grade} "
verdict += f"from the course {course}"

print(verdict)
```

<sample-output>

You have received the grade 4 from the course Introduction to Programming

</sample-output>

In the previous exercise you calculated the sum of consecutive numbers by always adding a new value inside a loop.

The exact same idea applies to strings as well: you can add new parts to a string within a loop. This technique should be useful in the following exercise.

<in-browser-programming-exercise name="The sum of consecutive numbers, version 2" tmcname="part03-07_consecutive_sum_v2">

Please write a new version of the program in the previous exercise. In addition to the result it should also print out the calculation performed:

<sample-output>

Limit: **2**
The consecutive sum: 1 + 2 = 3

</sample-output>

<sample-output>

Limit: **10**
The consecutive sum: 1 + 2 + 3 + 4 = 10

</sample-output>

<sample-output>

Limit: **18**
The consecutive sum: 1 + 2 + 3 + 4 + 5 + 6 = 21

</sample-output>

You may assume the number typed in by the user is always equal to 2 or higher.

</in-browser-programming-exercise>

<!---
A quiz to review the contents of this section:

<quiz id="900c0293-b14c-5736-b1a3-68d4fa01ac43"></quiz>
-->
