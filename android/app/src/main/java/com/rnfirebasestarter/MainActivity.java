package com.rnfirebasestarter;

import com.reactnativenavigation.controllers.SplashActivity;
import com.tkporter.sendsms.SendSMSPackage;
import android.content.Intent;

public class MainActivity extends SplashActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    //@Override
    //protected String getMainComponentName() {
    //    return "RNFirebaseStarter";
    //}

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        SendSMSPackage.getInstance().onActivityResult(requestCode, resultCode, data);
    }
}
