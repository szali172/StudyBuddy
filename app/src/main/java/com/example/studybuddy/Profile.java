package com.example.studybuddy;

public class MyProfile {
    private String username_;
    private String email_;
    private Course[] favorites_;
    private Course[] added_;

    public void SetUsername(String name) {
            username_ = name;
        }
    public void SetEmail(String email) {
            email_ = email;
        }
    public String GetName() {
            return username_;
        }
    public String GetEmail(){
            return email_;
        }
    public void MakeFavorite(Course c){
            Course[] favorites_copy = new Course[favorites_.length + 1];
            for (int i = 0; i < favorites_.length; i++) {
                favorites_copy[i] = favorites_[i];
            }
            favorites_copy[favorites_copy.length - 1] = c;
            favorites_ = favorites_copy;
        }
    public void RemoveFavorite(Course c) {
            int index = 0;
            for (Course course: favorites_) {
                if (course == c) {
                    break;
                }
                index++;
            }
            for (int i = index; i < favorites_.length - 1; i++) {
                favorites_[i] = favorites_[i + 1];
            }
        }
}
