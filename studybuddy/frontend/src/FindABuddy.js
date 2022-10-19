import React from "react";
  
const FindABuddy = () => {
    const post = new Post("Bob", "Illini Union", "CS222");
  return (
    <div>
      <h1>
        Find A Buddy
      </h1>
      {
         <div>
         <p>Name: {post.getName()}</p>
         <p>Location: {post.getLocation()}</p>
         <p>Working On: {post.getWorkOn()}</p>
         </div>
        } 
    </div>
  )
};
  
export default FindABuddy;

class FindABuddyClass
{
    #posts = null;
    makePost(name, location, work_on) {
        const p = new Post(name, location, work_on);
        this.#posts.add(p);
    }
    deletePost(post){
        this.#posts.remove(post);
    }
    
}
class Post
{
    #name = "";
    #location = "";
    #workOn = Course;

    constructor(n, l, w)
    {
        this.#name = n;
        this.#location = l;
        const c = new Course();
        c.setName(w);
        this.#workOn = c;
    }
    getName() {
        return this.#name;
    }
    getLocation(){
        return this.#location;
    }
    getWorkOn(){
        return this.#workOn.getName();
    }
    viewPost(){
       
        return "Name: " + this.#name + " Location: " + this.#location +  " Working on: " + this.#workOn.getName();
        
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

