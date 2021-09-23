---
path: '/part-4/5-print-statement-formatting'
title: Print statement formatting
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know how to use arguments to format the result of the `print` command
- You will be able to use f-strings to format printouts

</text-box>

So far we have learnt three methods for formulating the argument given to the `print` command.

The first is the `+` operator for strings. It allows simple concatenation of string segments:

```python
name = "Mark"
age = 37
print("Hi " + name + " your age is " + str(age) + " years" )
```

This method will not work if any of the segments are not strings. In the example above, the variable `age` has been converted into a string with the `str` function, since it is an integer and cannot be concatenated as is.

The second method is considering each segment of the argument as a separate argument, and splitting them up with commas:

```python
print("Hi", name, "your age is", age, "years" )
```

This code produces the exact same result as the previous version. The `print` command normally adds a space character between each argument.The advantage here is that the segments can be of different types, so there is no need to convert anything into a string.

If you want to remove the automatically added spaces, you can add a special named argument `sep`:

```python
print("Hi", name, "your age is", age, "years", sep="")
```

This prints out

<sample-output>

HiMarkyour age is37years

</sample-output>


The argument `sep=""` is a _keyword argument_, and its name is short for _separator_. It specifies that the other arguments should now be separated by an empty string. You can set the separator to any string you like. For example, if you wanted each argument on a separate line, you could set the separator to `"\n"`, which is the newline character:

```python
print("Hi", name, "your age is", age, "years", sep="\n")
```

<sample-output>

Hi
Mark
your age is
37
years

</sample-output>

By default, the print command always ends in a newline character, but you can change this as well. The keyword argument `end` specifies what is put at the end of a line. Setting `end` to an empty string means that there is no newline character at the end of the printout:

```python
print("Hi ", end="")
print("there!")
```

<sample-output>

Hi there!

</sample-output>

## f-strings

The third method to prepare strings is f-strings. The previous example with the name and the age would look like this formulated with f-strings:

```python
name = "Erkki"
age = 39
print(f"Hi {name} your age is {age} years")
```

Thus far we have only used very simple f-strings, but they can be very versatile in formatting string type content. One very common use case is setting the number of decimals that are printed out with a floating point number. By default the number is quite high:

```python
number = 1/3
print(f"The number is {number}")
```

<sample-output>

The number is 0.333333333333333

</sample-output>

The specific format we want the number to be displayed in can be set within the curly brackets of the variable expression. Let's add a colon character and a _format specifier_ after the variable name:

```python
number = 1/3
print(f"The number is {number:.2f}")
```

```python
The number is 0.33
```

The format specifier `.2f` states that we want to display 2 decimals. The letter _f_ at the end means that we want the variable to be displayed as a `float`, i.e. a floating point number.

Here's another example, where we specify the amount of whitespace reserved for the variable in the printout. Both times the variable `name` is included in the resulting string, it has a space of 15 characters reserved. First the names are justified to the left, and then they are justified to the right:

```python
names =  [ "Steve", "Jean", "Katherine", "Paul" ]
for name in names:
  print(f"{name:15} centre {name:>15}")
```

```python
Steve           centre           Steve
Jean            centre            Jean
Katherine       centre       Katherine
Paul            centre            Paul
```

The uses of f-strings are not restricted to `print` commands. They can be assigned to variables and combined with other strings:

```python
name = "Larry"
age = 48
city = "Palo Alto"
greeting = f"Hi {name}, you are {age} years of age"
print(greeting + f", and you live in {city}")
```

<sample-output>

Hi Larry, you are 48 years of age, and you live in Palo Alto

</sample-output>

You can think of an f-string as a sort of function, which creates a normal string based on the "arguments" within the curly brackets.

<programming-exercise name='Integers to strings' tmcname='part04-32_integers_to_strings'>

Please write a function named `formatted`, which takes a list of floating point numbers as its argument. The function returns a new list, which contains each element of the original list in string format, rounded to two decimal points. The order of the items in the list should remain unchanged.

_Hint: use f-strings to format the floating point numbers into suitable strings._

An example of expected beahviour:

```python
my_list = [1.234, 0.3333, 0.11111, 3.446]
new_list = formatted(my_list)
print(new_list)
```

<sample-output>

['1.23', '0.33', '0.11', '3.45']

</sample-output>

</programming-exercise>

<!---
A quiz to review the contents of this section:

<quiz id="90d650f3-fde1-5132-ade9-73f3b4bf6189"></quiz>
-->
