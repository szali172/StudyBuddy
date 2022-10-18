import React from "react";
  
const FindABuddy = () => {
    // const post = new Post();
    // post.makePost("Bob", "illini union", "CS222");
  return (
    <div>
      <h1>
        Find a buddy page
      </h1>
    </div>
  );
  
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
    #workOn = null;

    constructor(n, l, w)
    {
        this.#name = n;
        this.#location = l;
        this.#workOn = w;
    }
}