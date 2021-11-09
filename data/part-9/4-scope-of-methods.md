---
path: '/part-9/4-scope-of-methods'
title: 'Scope of methods'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know how you can limit the visibility of a method in Python
- You will be able to write private methods

</text-box>

The methods defined within a class can be hidden in exactly the same way the attributes were in the previous section. If the method begins with two underscores `__`, it is not directly accessible by the client.

So, the technique is the same for both methods and attributes, but the use cases are usually a little different. Private attributes often come paired with getter and setter methods for controlling access to them. Private methods, on the other hand, are usually intended for internal use only, as helper methods for processes which the client does not need to know about.

A private method can be used within the class just like any other method, of course remembering to include the `self` prefix. The following is a simple class representing the recipient of email letters. It includes a private helper method for checking the email address is in a valid format:

```python
class Recipient:
    def __init__(self, name: str, email_address: str):
        self.__name = name
        if self.__check_email_address(email_address):
            self.__email_address = email_address
        else:
            raise ValueError("The email address is not valid")

    def __check_email_address(self, email_address: str):
        # A simple check: the address must be over 5 characters long and contain a dot and an @ character
        return len(email_address) > 5 and "." in email_address and "@" in email_address
```

Attemtping to call the private method directly causes an error:

```python
peter = Recipient("Peter Emailer", "peter@example.com")
peter.__check_email_address("someone@example.com")
```

<sample-output>

AttributeError: 'Recipient' object has no attribute '__check_email_address'

</sample-output>

Within the class the method can be accessed normally, and it makes sense to use it also for setting a new value for the address. Let's add getter and setter methods for the email address:

```python
class Recipient:
    def __init__(self, name: str, email_address: str):
        self.__name = name
        if self.__check_email_address(email_address):
            self.__email_address = email_address
        else:
            raise ValueError("The email address is not valid")

    def __check_email_address(self, email_address: str):
        # A simple check: the address must be over 5 characters long and contain a dot and an @ character
        return len(email_address) > 5 and "." in email_address and "@" in email_address

    @property
    def email_address(self):
        return self.__email_address

    @email_address.setter
    def email_address(self, email_address: str):
        if self.__check_email_address(email_address):
            self.__email_address = email_address
        else:
            raise ValueError("The email address is not valid")
```

In the following example the class `DeckOfCards` is a model for a deck of 52 cards. It contains the helper method `__reset_deck`, which creates a new shuffled deck of cards. The private method is at the moment only called in the constructor method, so the implementation could arguably be placed directly in the constructor. However, using a separate method makes the code easier to read and also makes it possible to access the functionality later in other methods if necessary.

```python
from random import shuffle

class DeckOfCards:
    def __init__(self):
        self.__reset_deck()

    def __reset_deck(self):
        self.__deck = []
        # Add all 52 cards to the deck
        suits = ["spades", "hearts", "clubs", "diamonds"]
        for suit in suits:
            for number in range(1, 14):
                self.__deck.append((suit, number))
        # Shuffle the deck
        shuffle(self.__deck)

    def deal(self, number_of_cards: int):
        hand = []
        # Move the top cards in the deck to the hand
        for i in range(number_of_cards):
            hand.append(self.__deck.pop())
        return hand
```

Let's test the class:

```python
deck = DeckOfCards()
hand1 = deck.deal(5)
print(hand1)
hand2 = deck.deal(5)
print(hand2)
```

As the hands are randomly generated, the following is only an example of what could be printed out:

<sample-output>

[('spades', 7), ('spades', 11), ('hearts', 7), ('diamonds', 3), ('spades', 4)]
[('clubs', 8), ('spades', 12), ('diamonds', 13), ('clubs', 11), ('spades', 10)]

</sample-output>

Private methods are generally less common than private attributes. As a rule of thumb, a method should be hidden whenever the client has no need to directly access it. This is especially the case when it is possible that the client could adversely affect the integrity of the object by calling the method.

<programming-exercise name='Service charge' tmcname='part09-12_service_charge'>

Please create a class named `BankAccount` which models a bank account. The class should contain 

* a constructor which takes the name of the owner (str), account number (str) and balance (float) as arguments
* a method `deposit(amount: float)` for depositing money to the account
* a method `withdraw(amount: float)` for withdrawing money from the account
* a getter method `balance` which returns the balance of the account

The class should also contain the private method

* `__service_charge()`, which decrease the balance of the account by one percent. Whenever either of the methods `deposit` or `withdraw` is called, this method should also be called. The service charge is calculated and subtracted only after the actual operation is completed (that is, after the amount specified has been added to or subtracted from the balance).

All data attributes within the class definition should be private.

You may use the following code for testing your class:

```python
account = BankAccount("Randy Riches", "12345-6789", 1000)
account.withdraw(100)
print(account.balance)
account.deposit(100)
print(account.balance)

```

<sample-output>

891.0
981.09

</sample-output>


</programming-exercise>

