package com.example.studybuddy;

import androidx.appcompat.app.AppCompatActivity;
import androidx.databinding.DataBindingUtil;
import android.content.Intent;
import android.widget.SearchView;


import android.os.Bundle;
import android.util.Log;

public final class MainActivity extends AppCompatActivity
        implements SearchView.OnQueryTextListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    public boolean onQueryTextSubmit(String s) {
        return false;
    }

    @Override
    public boolean onQueryTextChange(String s) {
//        listAdapter.edit().replaceAll(FilterSearch.filterByName(query)).commit();
//        Log.i(TAG, "onQueryTextChange " + query);
        return true;
    }


}
