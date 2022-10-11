package com.example.studybuddy;
import java.util.ArrayList;
public class Course {

    private String name;
    private double avgGpa;
    private ArrayList<RedditPost> redditPosts;
    private boolean favorite;
    private boolean added;

    public void setName(String n) {
        name = n;
    }
    public String getName() {
            return name;
    }
    public void setGPA(double gpa) {
        avgGpa = gpa;
    }
    public double getGPA() {
            return avgGpa;
    }
    public ArrayList<RedditPost> getRedditPost() {
            return redditPosts;
    }
    public void setFavorite(boolean fav) {
        favorite = fav;
    }
    public boolean isFavorite() {
            return favorite;
    }
    public boolean isAdded() {
            return added;
    }
}


