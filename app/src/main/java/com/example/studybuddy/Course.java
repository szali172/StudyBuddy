package com.example.studybuddy;

public class Course {

    private String name_;
    private double avg_gpa_;
    private RedditPost[] reddit_posts_;
    private boolean favorited_;
    private boolean added_;

    public void SetName(String name) {
            name_ = name;
    }
    public String GetName() {
            return name_;
    }
    public void SetGPA(double gpa) {
            avg_gpa_ = gpa;
    }
    public double GetGPA() {
            return avg_gpa_;
    }
    public RedditPost[] GetRedditPost() {
            return reddit_posts_;
    }
    public boolean IsFavorite() {
            return favorited_;
    }
    public boolean IsAdded() {
            return added_;
    }
}


