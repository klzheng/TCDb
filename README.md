

<br />

<!-- TITLE -->
<div  align="center">
    <h1  align="center">TCDb - The Cinema Database</h1>
</div>




<p align="center">
  <img src="https://github.com/klzheng/TCDb/blob/main/frontend/public/project-demo.gif" alt="Project Demo" width="100%"  />
</p>


<!-- TABLE OF CONTENTS -->
<details>
    <ol>
        <li><a  href="#tcdb">TCDb</a></li>
        <li><a  href="#demo">Demo</a></li>
        <li><a  href="#built-with">Built With</a></li>
        <li><a  href="#features">Features</a></li>
        <li><a  href="#run-locally">Run Locally</a></li>
        <li><a  href="#environment-variables">.ENV variables</a></li>
        <li><a  href="#optimizations">Optimizations</a></li>
    </ol>
</details>

<br />

## TCDb

Movie tracking websites like IMDb and Letterboxd already exist. However, everyone has their preferences and there were still things that I didn't like that ultimately drove me to create my own web application:

- **Track, rate, and see films all in one place for personal use**  &ndash;   While a community is important in many places, most days I just want the simple functionality of seeing what shows I've watched and what shows I bookmarked.  

- **Letterboxd doesn't include TV shows in their database** &ndash;  This can be frustrating for some users if they want to keep all their favorite TV shows and movies in one place.

- **Both IMDb and Letterboxd only allow user ratings in half integer (star) increments** &ndash;  I personally found this to be very limiting as it paints a very black and white picture that isn't quite accurate in my opinion. 

Also, building a fullstack CRUD app like TCDb is a great way to learn, practice, and demonstrate my skills 😊 

<br />

## Demo
Try it out here using this [link](https://thecinemadb.netlify.app/) or this one: [https://thecinemadb.netlify.app/](https://thecinemadb.netlify.app/). Please do create an account (or use the provided login details) and try out the app for yourself!

Email: test@test.com
Password: testing123


<br />



## Built With

* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)



<br /> 

<p align="right">(<a href="#tcdb" style="text-decoration:none;">↑</a>)</p>

## Features

- ❤️ All in one place to track, log, and rate both movies and shows 
- ⭐ Bookmark movies to watch later 
- 📱 Responsive design for both mobile and desktop
- 💻 Simple, functional, and modern UI
- 😲 Ability to provide ratings to 1 decimal place (crazy, I know!)



<br />



## Run Locally 

1. Install npm

```bash
  npm install npm@latest -g
```

2. Clone the repo

```bash
  git clone https://github.com/klzheng/TCDb.git
```

3. Navigate inside the frontend directory and install dependencies 

```bash
  cd frontend/
  npm install
```
4. Start the server
```bash
  npm run start
```

5. Navigate to the backend, install dependencies, and run server locally
```bash
  cd .. 
  cd backend/
  npm install
  npm run start
```

6. Make sure all environment variables are accounted for!





<br />



## Environment Variables

1. Create a MongoDb Atlas account, and place credentials in .env  file (Refer to next section)  

2. Create TMDb account store API key in .env file 

3. Create Google Cloud Platform Account and connect it to nodemailer
- Refer to this useful [guide](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/) from freeCodeCamp.

<br />

To run this project, you will need to add the following environment variables to your .env file:

1. Backend
`MONGO_URI` `JWT_SECRET` `PORT` `TCDB_MAIL_USER` `TCDB_MAIL_PASS` `OAUTH_CLIENTID` `OAUTH_CLIENT_SECRET` `OAUTH_REFRESH_TOKEN`


2. Frontend
`REACT_APP_TMDB_API_KEY` `REACT_APP_BASE_URL`

<br />

## Optimizations

- Adding transitions/animation to movie cards (filtering/sorting)
- Add light mode 
  
  
<p align="right">(<a href="#tcdb" style="text-decoration:none;">↑</a>)</p>