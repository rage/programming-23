---
path: '/part-7/2-randomness'
title: 'Randomness'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be familiar with some of the functions in the module `random` 
- You will be able to make use of random numbers in your programs

</text-box>

This section concentrates on the module [random](https://docs.python.org/3/library/random.html?highlight=random#module-random) from the Python standard library. It contains tools for generating random numbers and other randomized functionality.

The sections in this part of the material contain many links to the [documentation](https://docs.python.org/3/library/) of the Python standard library. We recommend following the links to familiarize yourself with how the documentation works.

## Generating a random number

The function [randint(a, b)](https://docs.python.org/3/library/random.html?highlight=random#random.randint) returns a random integer value between `a` and `b`, inclusive. For example, the following program works like a generic die:

```python
from random import randint

print("The result of the throw:", randint(1, 6))
```

Executing this could print out:

<sample-output>

The result of the throw: 4

</sample-output>

The following program throws the die ten times:

```python
from random import randint

for i in range(10):
    print("The result of the throw:", randint(1, 6))
```

Running the above could print out

<sample-output>

The result of the throw: 5
The result of the throw: 4
The result of the throw: 3
The result of the throw: 2
The result of the throw: 3
The result of the throw: 4
The result of the throw: 6
The result of the throw: 4
The result of the throw: 4
The result of the throw: 3

</sample-output>

NB: it is worth remembering that the function `randint` works a bit differently when compared to, for example, slices, or the function `range`, which we've come across previously. The function call `randint(1, 6)` results in a number between 1 and 6 inclusive, but the function call `range(1, 6)` results in a range of numbers from 1 to 5.

## More randomizing functions

The function [shuffle](https://docs.python.org/3/library/random.html?highlight=random#random.shuffle) will shuffle any data structure passed as an argument, in place. For example, the following program shuffles a list of words:

```python
from random import shuffle

words = ["atlas", "banana", "carrot"]
shuffle(words)
print(words)
```

<sample-output>

['banana', 'atlas', 'carrot']

</sample-output>

The function `choice` returns a randomly picked item from a data structure:

```python
from random import choice

words = ["atlas", "banana", "carrot"]
print(choice(words))
```

<sample-output>

'carrot'

</sample-output>

## Lottery numbers

A common example for studying randomness is the case of lottery numbers. Let's try and draw some lottery numbers. In Finland the national lottery consists of a pool of 40 numbers, 7 of which are chosen for each week's draw.

A first attempt at drawing a set of numbers could look like this:

```python
from random import randint

for i in range(7):
    print(randint(1, 40))
```

This would not work in the long run, however, as the same number may appear twice in a single weekly draw of seven numbers. We need a way to make sure the numbers drawn are all unique.

One possibility is to store the drawn numbers in a list, and only add a number if it is not already on the list. This can be repeated until the length of the list is seven:

```python
from random import randint

weekly_draw = []
while len(weekly_draw) < 7:
    new_rnd = randint(1, 40)
    if new_rnd not in weekly_draw:
        weekly_draw.append(new_rnd)

print(weekly_draw)
```

A more compact approach would be to use the `shuffle` function:

```python
from random import shuffle

number_pool = list(range(1, 41))
shuffle(number_pool)
weekly_draw = number_pool[0:7]
print(weekly_draw)
```

Here the idea is that we first create a list containing the available numbers 1 to 40, rather like the balls in a lottery machine. The pool of numbers is then shuffled, and the first seven numbers chosen for the weekly draw. This saves us the trouble of writing a loop.

In fact, the `random` module contains an even easier way to select lottery numbers: the [sample](https://docs.python.org/3/library/random.html?highlight=random#random.sample) function. It returns a random selection of a specified size from a given data structure:

```python
from random import sample

number_pool = list(range(1, 41))
weekly_draw = sample(number_pool, 7)
print(weekly_draw)
```

<programming-exercise name='Lottery numbers' tmcname='part07-04_lottery_numbers'>

Please write a function named `lottery_numbers(amount: int, lower: int, upper: int)`, which generates as many random numbers as specified by the first argument. All numbers should fall within the bounds `lower` to `upper`. The numbers should be stored in a list and returned. The numbers should be in ascending order in the returned list.

As these are lottery numbers, no number should appear twice in the list.

An example of how the function should work:

```python
for number in lottery_numbers(7, 1, 40):
    print(number)
```

<sample-output>

4
7
11
16
22
29
38

</sample-output>

</programming-exercise>

## Where do these random numbers come from?

The features of the module [random](https://docs.python.org/3/library/random.html) are based on an algorithm which produces random numbers based on a specific initialization value and some arithmetic operations. The initialization value is often called a _seed value_.

The seed value can be supplied by the user with the [seed](https://docs.python.org/3/library/random.html?highlight=random#random.seed) function:

```python
from random import randint, seed

seed(1337)
# this will always produce the same "random" number
print(randint(1, 100))
```

If we have functions which rely on randomization, and we set seed value, the function will produce the same result each time it is executed. The result may be different with different Python versions, but in essence randomness is lost by setting a seed value. This can be a useful feature when testing a program, for example.

<text-box variant="info" name="True randomness">

To be specific, the numbers provided by the `random` module are not truly random. Instead, they are _pseudorandom_. Computers are, in essence, deterministic machines. In an ideal situation, it should be possible to foretell the way they function down to the last bit. Therefore it is very difficult to create truly random numbers with a computer. For many applications, however, pseudorandom numbers are good enough. When true random numbers are required, the seed value is usually generated by some source outside the computer, for example background radiation, noise levels, or [lava lamps](https://blog.cloudflare.com/randomness-101-lavarand-in-production/).

For more information about randomness, please see <a href="https://www.random.org/randomness/">random.org</a>.

</text-box>

<programming-exercise name='Password generator, part 1' tmcname='part07-05_password_generator_part_1'>

Please write a function which creates passwords of a desired length, consisting of lowercase characters a to z.

An example of how the function should work:

```python
for i in range(10):
    print(generate_password(8))
```

<sample-output>

lttehepy
olsxttjl
cbjncrzo
dwxqjdgu
gpfdcecs
jabyvgar
xnbbonbl
ktmsjyww
ejhprmel
rjkoacib

</sample-output>

</programming-exercise>

<programming-exercise name='Password generator, part 2' tmcname='part07-06_password_generator_part_2'>

Please write an improved version of your password generator. The function now takes three arguments:

* If the second argument is `True`, the generated password should also contain one or more numbers.
* If the third argument is `True`, the generated password should also contain one or more of these special characters: `!?=+-()#`.

Despite these two additional arguments, the password should always contain at least one lowercase alphabet. You may assume the function will only be called with combinations of arguments that are possible to formulate into passwords following these rules. That is, the arguments will not specify e.g. a password of length 2 which contains both a number and a special characters, for then there would not be space for the mandatory lowercase letter.

An example of how the function should work:

```python
for i in range(10):
    print(generate_strong_password(8, True, True))
```

<sample-output>

2?0n+u31
u=m4nl94
n#=i6r#(
da9?zvm?
7h)!)g?!
a=59x2n5
(jr6n3b5
9n(4i+2!
32+qba#=
n?b0a7ey

</sample-output>

</programming-exercise>

<programming-exercise name='Dice roller' tmcname='part07-07_dice_roller'>

In this exercise you will write some functions which can be used in games that involve dice.

Instead of normal dice this exercise specifies _non-transitive dice_. You can read up on these [here](https://singingbanana.com/dice/article.htm) or [watch this video](https://www.youtube.com/watch?v=LrIp6CKUlH8).

You will use three dice:

- Die A has the sides 3, 3, 3, 3, 3, 6
- Die B has the sides 2, 2, 2, 5, 5, 5
- Die C has the sides 1, 4, 4, 4, 4, 4

</pre>

Please write a function named `roll(die: str)`, which rolls the die specified by the argument. An example of how this should work:

```python
for i in range(20):
    print(roll("A"), " ", end="")
print()
for i in range(20):
    print(roll("B"), " ", end="")
print()
for i in range(20):
    print(roll("C"), " ", end="")
```

<sample-output>

3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  6  3  6  3
2  2  5  2  2  5  5  2  2  5  2  5  5  5  2  5  2  2  2  2
4  4  4  4  4  1  1  4  4  4  1  4  4  4  4  4  4  4  4  4

</sample-output>

Also write a function named  `play(die1: str, die2: str, times: int)`, which throws both dice as many times as specified by the third argument. The function should return a tuple. The first item should be the number of times die 1 won, the second the number of times die 2 won, and the third item should be the number of ties.

```python
result = play("A", "C", 1000)
print(result)
result = play("B", "B", 1000)
print(result)
```

<sample-output>

(292, 708, 0)
(249, 273, 478)

</sample-output>

</programming-exercise>

<programming-exercise name='Random words' tmcname='part07-08_random_words'>

The exercise template contains the file `words.txt`, which contains some English language words, one on each line.

Please write a function named `words(n: int, beginning: str)`, which returns a list containing `n` random words from the `words.txt` file. All words should begin with the string specified by the second argument. 

The same word should not appear twice in the list. If there are not enough words beginning with the specified string, the function should raise a `ValueError` exception.

An example of the function in action:

```python
word_list = words(3, "ca")
for word in word_list:
    print(word)
```

<sample-output>

cat
car
carbon

</sample-output>

</programming-exercise>

<!---
<quiz id="d53a6898-f390-55ef-b266-95694bcbe704"></quiz>
-->
