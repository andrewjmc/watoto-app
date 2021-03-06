package org.cyberfish.watoto;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        final Intent intent = new Intent(this, MainActivity.class);

        Handler handler = new Handler(); 
        handler.postDelayed(new Runnable() { 
            public void run() {
                startActivity(intent);
                finish();
            } 
        }, 2000); 
    }
}
