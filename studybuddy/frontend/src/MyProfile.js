import React from "react";
  
const MyProfile = () => {
    const profile = new Profile("bob_smith", "bob_smith@gmail.com");
    console.log(profile.getName());
  return (
    <div>
      <h1>
        My Profile
      </h1> 
      {
        <div>
        <p>Name: {profile.getName()}</p>
        <p>Email: {profile.getEmail()}</p>
        </div>
        } 
    </div>
  )
}
  
export default MyProfile;


class Profile
{
    #username = null;
    #email = null;
    #favorites = null;
    #added = null;

    constructor(n, l)
    {
        this.#username = n;
        this.#email = l;
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

