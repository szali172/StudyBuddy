package com.example.studybuddy;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.databinding.DataBindingUtil;

import java.util.ArrayList;
import java.util.*;
public class FilterSearch extends Profile {

    private ArrayList<Course> displayedCourses;

    public void filterByAlpha() {
        Collections.sort(
                displayedCourses,
                (d1, d2) -> d1.getName().compareTo(d2.getName()));
    }
    public void filterByPrefix(String prefix) {
        if (prefix == null) {
            throw new IllegalArgumentException();
        }
        String newSearch = "";
        newSearch = prefix.toLowerCase().trim();
        if (prefix.length() == 0 || prefix.equals("  ")) {
            //display all
        }
        for (Course a : displayedCourses) {
            if (a.getName().equals(newSearch)) {
                //display a
            }
        }
        if (displayedCourses.size() == 0) {
            for (Course b : displayedCourses) {
                if (b.getName().toLowerCase().contains(newSearch)) {
                    //display b
                }
            }
        }
    }
    public void filterByName(String search) {
        if (search == null) {
            throw new IllegalArgumentException();
        }
        String newSearch = "";
        newSearch = search.toLowerCase().trim();
        if (search.length() == 0 || search.equals("  ")) {
            //display all
        }
        for (Course a : displayedCourses) {
            if (a.getName().equals(newSearch)) {
                //display a
            }
        }
        if (displayedCourses.size() == 0) {
            for (Course b : displayedCourses) {
                if (b.getName().toLowerCase().contains(newSearch)) {
                   //display b
                }
            }
        }
    }
}
