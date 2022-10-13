package com.example.studybuddy;

import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.databinding.DataBindingUtil;
import android.content.Intent;
import android.widget.SearchView;


import org.jetbrains.annotations.NotNull;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import android.os.Bundle;
import android.util.Log;

public final class MainActivity extends AppCompatActivity
        implements SearchView.OnQueryTextListener {

    private TextView pagenameTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        pagenameTextView = findViewById(R.id.homepage);

        // OkHttpClient client created
        OkHttpClient okHttpClient = new OkHttpClient();

        // Get request for John Smith
        Request request = new Request.Builder().url("http://10.0.2.2:5000/buddies/Users/name/John%20Smith").build();

        // asynchronous call
        okHttpClient.newCall(request).enqueue(new Callback() {
            @Override
            // if there is a failure when reaching the server
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(MainActivity.this, "server not available", Toast.LENGTH_SHORT).show();
                        pagenameTextView.setText("error connecting to the server");
                    }
                });
            }

            @Override
            // executed if we get an actual response from the server
            public void onResponse(
                    @NotNull Call call,
                    @NotNull Response response)
                    throws IOException {pagenameTextView.setText(response.body().string());
            }
        });
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
