package com.example.studybuddy;

public class FindABuddy{
    private Post[] posts_;
    public void MakePost(String name, String location, String work_on) {
        Post p = new Post(name, location, work_on);
        if (posts_.length == 0) {
            posts_[0] = p;
        } else {
            posts_[posts_.length - 1] = p;
        }
    }
    public void DeletePost(Post post){
        for (int i = 0; i < posts_.length; i++) {
            if (posts_[i] == post) {
                posts_[i] = posts_[i + 1];
            }
        }
    }
}
