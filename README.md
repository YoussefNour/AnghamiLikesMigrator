# AnghamiLikesMigrator
## Description
A scrapper script that will scrap all your likes on anghami and in the future migrate your likes to other music platforms built using puppeteer for scrapping and node.js
## Motivation
this project was a challenge for myself I found that services such as spotify don't provide migration from anghami to their platform so I took it upon myself to provide this service or atleast provide a way to have all my music names collected in one place so i can download then later and not forget them since I have a huge collection of like and other music in the past that I lost in the old days when music was only stored on your personal devices not on the cloud 
## why I used Puppeteer
from my experience with selenium puppeteer is much more simplified and It met all of my critireas some people have concerns about performance but I find that it works great for my needs
## What I learned
1. how to use puppeteer 
2. navigate and scrap anghamis site which used angular 
3. manipulating json objects

## Exclusive features
+ scrap your likes list from anghami

## Installation
### you have to create a .env file in the directory of the script with the following    
```bash
email = "your anghami account email"
password = "your passowrd"
```
### to install all the dependencies needed
```bash
npm install
```
### run by entering
```bash
npm start
```
