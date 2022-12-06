
# CS 222 Group 92

## Authors:
Divya Sundar (dsundar2) - Frontend development

Khushi Maheshwari (khushim2) - Frontend development

Viven Puthenpurayil (vivencp2) - Backend development

Zuhair Ali (sali200) - Backend development
&nbsp;

## **Summary**
Study Buddy is a web application, created in React JS, that allows students to find other individuals to study or work on assignments with across the University of Illinois at Urbana Champaign campus. It also gives students an opportunity to read reddit posts about classes they are enrolled in or interested in with an easy user interface. We give students the ability to create their profile, make a post about where and what they are studying, browse through other students' posts, and read reddit posts. We hope that this product would help students stay motivated and productive throughout the semester, as we know studying alone can be difficult. 
&nbsp;

## **Technical Architecture**
We divided up the project into two sections, the backend and frontend. In the backend, we worked on creating a database that can store all information and data given. This includes storing course descriptions and any requests the frontend will make. We also created algorithms to collect all the reddit post information and retrieve it when called in the frontend. PRAW, which contained the reddit posts and how to use them, goes into the backend. On the frontend, we aimed to create a better user experience by creating 4 separate pages with different functionalities. We created easy to use buttons, text boxes, and a way to switch between pages. The frontend also consists of algorithms connected with the backend to be able to use the information and display it on the web page.

In order to do this, we imported the Card, Box, Typography, Container, Axios, and UI libraries to implement the frontend, and core python libraries, PRAW, pymongo, flask, and flask_cors libraries in the backend. 
&nbsp;

## **Installation Instructions**

### After cloning the repository and entering the directory for the project install the node modules by doing

``` 
cd studybuddy
cd frontend
npm install 
```

### To install the pip requirements execute these commands in a terminal window

```
cd studybuddy
cd frontend
pip install -r requirements.txt 
```

### To start the website locally execute these commands in a terminal window

``` 
cd studybuddy
cd frontend
npm start
```

### To start the backend execute these commands in a new terminal window
```
cd studybuddy
cd backend
cd app
python3 server.py
```

&nbsp;

## **Versions**
*   Python 3.8.10
*   pip 20.0.2
