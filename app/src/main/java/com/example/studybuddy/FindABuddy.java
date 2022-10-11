package com.example.studybuddy;
import java.util.ArrayList;
public class FindABuddy{
    private ArrayList<Post> posts;
    public void makePost(String name, String location, String work_on) {
        Post p = new Post(name, location, work_on);
        posts.add(p);

    }
    public void deletePost(Post post){
        posts.remove(post);
    }
}
