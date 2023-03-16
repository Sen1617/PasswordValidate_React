# PasswordValidate_React
Simple Password Validation using React JS and saving data in MongoDB


A Simple frontend using React JS to do the following program 
and save the results in backend using Nodejs and database as MongoDB

program
---------
A password is considered strong if the below conditions are all met:
●	It has at least 6 characters and at most 20 characters.
●	It contains at least one lowercase letter, at least one uppercase letter, and at least one digit.
●	It does not contain three repeating characters in a row (i.e., "Baaabb0" is weak, but "Baaba0" is strong).
Given a string password, return the minimum number of steps required to make password strong. if password is already strong, return 0.
In one step, you can:
●	Insert one character to password,
●	Delete one character from password, or
●	Replace one character of password with another character.
Example 1:
Input: password = "a"
Output: 5

Example 2:
Input: password = "aA1"
Output: 3

Example 3:
Input: password = "1337C0d3"
Output: 0


Database info
---------------
DB name: passlogs
collection name: resultlogs
fields name: passvalue, strength, minsteps.

