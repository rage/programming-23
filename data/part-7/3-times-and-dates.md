---
path: '/part-7/3-times-and-dates'
title: 'Times and dates'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know how to handle dates and times in Python code
- You will be able to create and use `datetime` objects
- You will know how to compare and calculate differences between two dates or times

</text-box>

## The datetime object

The Python [datetime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime) module includes the function [now](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.now), which returns a datetime object containing the current date and time. The default printout of a datetime object looks like this:

```python
from datetime import datetime

my_time = datetime.now()
print(my_time)
```

<sample-output>

2021-10-19 08:46:49.311393

</sample-output>

You can also define the object yourself:

```python
from datetime import datetime

my_time = datetime(1952, 12, 24)
print(my_time)
```

<sample-output>

1952-12-24 00:00:00

</sample-output>

By default, the time is set to midnight, as we did not give a time of day in the example above.

Different elements of the datetime object can be accessed in the following manner:

```python
from datetime import datetime

my_time = datetime(1952, 12, 24)
print("Day:", my_time.day)
print("Month:", my_time.month)
print("Year:", my_time.year)
```

<sample-output>

Day: 24
Month: 12
Year: 1952

</sample-output>

A time of day can also be specified. The precision can vary, as you can see below:

```python
from datetime import datetime

pv1 = datetime(2021, 6, 30, 13)     # 30.6.2021 at 1PM
pv2 = datetime(2021, 6, 30, 18, 45) # 30.6.2021 at 6.45PM
```

## Compare times and calculate differences between them

The familiar comparison operators work also on datetime objects:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

if time_now < midsummer:
    print("It is not yet Midsummer")
elif time_now == midsummer:
    print("Happy Midsummer!")
elif time_now > midsummer:
    print("It is past Midsummer")
```

<sample-output>

It is past Midsummer

</sample-output>

The difference between two datetime objects can be calculated simply with the subtraction operator:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

difference = midsummer - time_now
print("Midsummer is", difference.days, "days away")
```

<sample-output>

Midsummer is -116 days away

</sample-output>

NB: the result of the datetime subtraction is a [timedelta](https://docs.python.org/3/library/datetime.html?highlight=datetime#timedelta-objects) object. It is less versatile than the `datetime` object. For instance, you can access the number of days in a `timedelta` object, but not the number of years, as the length of a year varies. A `timedelta` object contains the attributes `days`, `seconds` and `microseconds`. Other measures can be passed as arguments, but they will be converted internally.

Similarly, addition is available between `datetime` and `timedelta` objects. The result will be the `datetime` produced when the specified number of days (or weeks, seconds, etc) is added to a `datetime` object:

```python
from datetime import datetime, timedelta
midsummer = datetime(2021, 6, 26)

one_week = timedelta(days=7)
week_from_date = midsummer + one_week

print("A week after Midsummer it will be", week_from_date)

long_time = timedelta(weeks=32, days=15)

print("32 weeks and 15 days after Midsummer it will be", midsummer + long_time)
```

<sample-output>

A week after Midsummer it will be 2021-07-03 00:00:00
32 weeks and 15 days after Midsummer it will be 2022-02-20 00:00:00

</sample-output>

Let's see how a higher precision works:

```python
time_now = datetime.now()
midnight = datetime(2021, 6, 30)
difference = midnight - time_now
print(f"Midnight is still {difference.seconds} seconds away")
```

<sample-output>

Midnight is still 8188 seconds away

</sample-output>

<programming-exercise name='How old' tmcname='part07-09_how_old'>

Please write a program which asks the user for their date of birth, and then prints out how old the user was on the eve of the new millennium. The program should ask for the day, month and year separately, and print out the age in days. Please have a look at the examples below:

<sample-output>

Day: **10**
Month: **9**
Year: **1979**
You were 7417 days old on the eve of the new millennium.

</sample-output>

<sample-output>

Day: **28**
Month: **3**
Year: **2005**
You weren't born yet on the eve of the new millennium.

</sample-output>

You may assume all day-month-year combinations given as an argument will be valid dates. That is, there will not be a date like February 31st. 

</programming-exercise>

<programming-exercise name='Valid PIC?' tmcname='part07-10_valid_pic'>

In this exercise you will validate Finnish Personal Identity Codes (PIC). 

Please write a function named `is_it_valid(pic: str)`, which returns `True` or `False` based on whether the PIC given as an argument is valid or not. Finnish PICs follow the format `ddmmyyXyyyz`, where `ddmmyy` contains the date of birth, `X` is the marker for century, `yyy` is the personal identifier and `z` is a control character.

The program should check the validity by these three criteria:

* The first half of the code is a valid, existing date in the format `ddmmyy`.
* The century marker is either `+` (1800s), `-` (1900s) or `A` (2000s).
* The control character is valid.

The control character is calculated by taking the nine-digit number created by the date of birth and the personal identifier, dividing this by 31, and selecting the character at the index specified by the remainder from the string `0123456789ABCDEFHJKLMNPRSTUVWXY`. For example, if the remainder was 12, the control character would be `C`.

More examples and explanations of the uses of the PIC are available at the [Digital and Population Data Services Agency](https://dvv.fi/en/personal-identity-code).

**NB!** Please make sure you do not share your own PIC, for example in the code you use for testing or through the course support channels.

Here are some valid PICs you can use for testing:

* 230827-906F
* 120488+246L
* 310823A9877

</programming-exercise>

## Formatting times and dates

The `datetime` module contains a handy method [strftime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.date.strftime) for formatting the string representation of a datetime object. For example, the following code will print the current date in the format `dd.mm.yyyy`, and then the date and time in a different format:

```python
from datetime import datetime

my_time = datetime.now()
print(my_time.strftime("%d.%m.%Y"))
print(my_time.strftime("%d/%m/%Y %H:%M"))
```

<sample-output>

19.10.2021
19/10/2021 09:31

</sample-output>

Time formatting uses specific characters to signify specific formats. The following is a list of a few of them (please see the Python [documentation](https://docs.python.org/3/library/time.html#time.strftime) for a complete list):

Notation | Significance
:--------|:--------
`%d` | day (01–31)
`%m` | month (01–12)
`%Y` | year in 4 digit format
`%H` | hours in 24 hour format
`%M` | minutes (00–59)
`%S` | seconds (00–59)

You can also specify the delimiter between the different elements, as seen in the examples above.

Datetime formatting works in the reverse direction as well, in case you need to parse a datetime object from a string given by the user. The method [strptime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.strptime) will do just that:

```python
from datetime import datetime

birthday = input("Please type in your birthday in the format dd.mm.yyyy: ")
my_time = datetime.strptime(birthday, "%d.%m.%Y")

if my_time < datetime(2000, 1, 1):
    print("You were born in the previous millennium")
else:
    print("You were born during this millennium")
```

<sample-output>

Please type in your birthday in the format dd.mm.yyyy: **5.11.1986**
You were born in the previous millennium

</sample-output>

<programming-exercise name='Screen time' tmcname='part07-11_screen_time'>

Please write a program for recording the amount of time the user has spent in front of a television, computer or mobile device screen over a specific period of time. 

The program should work as follows:

<sample-output>

Filename: **late_june.txt**
Starting date: **24.6.2020**
How many days: **5**
Please type in screen time in minutes on each day (TV computer mobile):
Screen time 24.06.2020: **60 120 0**
Screen time 25.06.2020: **0 0 0**
Screen time 26.06.2020: **180 0 0**
Screen time 27.06.2020: **25 240 15**
Screen time 28.06.2020: **45 90 5**
Data stored in file late_june.txt

</sample-output>

The user will input each day on a separate line, and the entries will contain three numbers separated by spaces, representing minutes.

With the above input, the program should store the data in a file named `late_june.txt`. The contents should look like this:

<sample-data>

Time period: 24.06.2020-28.06.2020
Total minutes: 780
Average minutes: 156.0
24.06.2020: 60/120/0
25.06.2020: 0/0/0
26.06.2020: 180/0/0
27.06.2020: 25/240/15
28.06.2020: 45/90/5

</sample-data>

</programming-exercise>

<!---
<quiz id="6fff0633-2f18-5e2b-9eab-6c8950c8378b"></quiz>
-->
