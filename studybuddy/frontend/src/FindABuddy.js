import React, { useState }from "react";

const FindABuddy = () => {
    const [postname, setName] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")

    const NameHandleChange = e => {
        setName(e.target.value)
      }
    const LocationHandleChange = e => {
        setLocation(e.target.value)
    }
    const DescriptionHandleChange = e => {
        setDescription(e.target.value)
    }
    const post = new Post("Bob", "Illini Union", "CS222");
    const buddyButton = new FindABuddyClass();
    // buddyButton.makePost("CS225" , "UMH" , "WHEE");
  return (
    <div>
        <style>{'body { background-color: #6ba0cf; }'}</style>
      <h1>
        Find A Buddy
      </h1>
      {
         <div>
         {/* <p>Name: {post.getName()}</p>
         <p>Location: {post.getLocation()}</p>
         <p>Working On: {post.getWorkOn()}</p> */}
            <h2>
            {/* Posts */}
            </h2>
            <form>
                <label>
                    Name:
                    <input
                        id={'Name'}
                        type={'text'}
                        placeholder={'Name'}
                        value={postname}
                        onChange={NameHandleChange}
                    />
                </label>

                

                <label>
                    Location:
                    <input
                        id={'location'}
                        type={'text'}
                        placeholder={'Location'}
                        value={location}
                        onChange={LocationHandleChange}
                    />
                </label>

                

                <label>
                    Description:
                    <input
                        id={'description'}
                        type={'text'}
                        placeholder={'Description'}
                        value={description}
                        onChange={DescriptionHandleChange}
                    />
                </label>

                <h5>Name: {postname}</h5>
                <h5>Location: {location}</h5>
                <h5>Description: {description}</h5>

                <button onClick={buddyButton.makePost({postname}, {location}, {description})}>Submit</button> 
                
            </form>

            

         <p> {buddyButton.getAllPosts()}</p>
         </div>
        } 
    </div>
  )
};
  
export default FindABuddy;

class FindABuddyClass
{
    #posts = [];
    makePost(post) {
        this.#posts.push(post);
    }
    makePost(name, location, work_on) {
        const p = new Post(name, location, work_on);
        this.#posts.push(p);
    }
    makePost({name}, {location}, {work_on}) {
        const p = new Post(name, location, work_on);
        this.#posts.push(p);
    }
    getAllPosts() {
        var ret = "";
        for (var i = 0; i < this.#posts.length; i++) {
            ret +=  "Post: " +  this.#posts[i].getName();
        }
        return ret;
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

