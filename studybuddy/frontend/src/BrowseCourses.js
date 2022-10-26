import React from "react";
  
const BrowseCourses = () => {
    const course = new Course("CS222", "4.0");

  return (
    <div>
        <style>{'body { background-color: #e8c3d9; }'}</style>
      <h1>
        Browse Courses
      </h1>
      {
        <div>
        <p>Course Name: {course.getName()}</p>
        <p>Average GPA: {course.getGPA()}</p>
        </div>
        } 
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
            if (this.#displayedCourses[i].includes(prefix)) {
                <div>
                this.#displayedCourses[i]
                </div>
            }
        }
    }
    filterByName(name) {
        for (var i = 0; i < this.#displayedCourses.length; i++) {
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
    #redditPosts = [];RedditPost;
    #favorite = false;
    #added = false;

    constructor(n, gpa)
    {
        this.#name = n;
        this.#avgGpa = gpa;
        this.#favorite = false;
        this.#added = true;
    }

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

