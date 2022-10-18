import React from "react";
  
const BrowseCourses = () => {
  return (
    <div>
      <h1>
        Browse courses page
      </h1>
    </div>
  );
};
  
export default BrowseCourses;


class FilterSeach
{
    #displayedCourses = null

    filterByAlpha() {
        this.#displayedCourses.sort();
    }
    filterByPrefix(prefix) {
        for (var i = 0; i < this.#displayedCourses.length; i++) {
            //Do something
            if (this.#displayedCourses[i].includes(prefix)) {
                <div>
                this.#displayedCourses[i]
                </div>
            }
        }
    }
    filterByName(name) {
        for (var i = 0; i < this.#displayedCourses.length; i++) {
            //Do something
            if (this.#displayedCourses[i] === name) {
                <div>
                this.#displayedCourses[i]
                </div>
            }
        }
    }
}

class RedditPost 
{
    setPost(post) {}
    fetchPosts() {}
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

