package com.example.studybuddy;
import java.util.ArrayList;
public class Profile {
    private String username;
    private String email;
    private ArrayList<Course> favorites;
    private ArrayList<Course> added;

    public void setUsername(String name) {
        username = name;
        }
    public void setEmail(String email) {
        email = email;
        }
    public String getName() {
            return username;
        }
    public String getEmail(){
            return email;
        }
    public void makeFavorite(Course c){
        favorites.add(c);
    }
    public void removeFavorite(Course c) {
        favorites.remove(c);
    }
}
