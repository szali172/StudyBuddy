import React from "react";
  
const MyProfile = () => {
  return (
    <div>
      <h1>
        My profile page
        {/* 
        {profile && <div>
        <p>Name: {profile.getName}</p>
        <p>Email: {profile.email}</p>
        <p>Favorited Courses: {profile.favorites}</p>
        <p>Added Courses: {profile.added}</p>
        </div>
        } */}

      </h1> 
    </div>
  );
};
  
export default MyProfile;


class Profile
{
    #username = null;
    #email = null;
    #favorites = null;
    #added = null;

    constructor(n, l, w, a)
    {
        this.#username = n;
        this.#email = l;
        this.#favorites.push(w);
        this.#added.push(a);
    }

    setUsername(name) {
        this.#username = name;
    }
    setEmail(email) {
        this.#email = email;
        }
    getName() {
        return this.#username;
    }
    getEmail(){
        return this.#email;
    }
    makeFavorite(c){
        this.#favorites.push(c);
    }
    removeFavorite(c) {
        this.#favorites.remove(c);
    }
}


class Course
{
    #name = null;
    #avgGpa = 0.0;
    #redditPosts = null;
    #favorite = false;
    #added = false;
    setName(n)
    {
        this.#name = n;
    }
    getName()
    {
        return this.#name;
    }
    setGPA(gpa)
    {
        this.#avgGpa = gpa;
    }
    getGPA()
    {
        return this.#avgGpa;
    }
    getRedditPost()
    {
        return this.#redditPosts;
    }
    setFavorite(fav)
    {
        this.#favorite = fav;
    }
    isFavorite()
    {
        return this.#favorite;
    }
    isAdded()
    {
        return this.#added;
    }
}

