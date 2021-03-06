package com.rnfirebasestarter;

import android.app.Application;

import com.facebook.react.ReactApplication;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.tkporter.sendsms.SendSMSPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.invertase.firebase.RNFirebasePackage;
// optional packages - add/remove as appropriate
import io.invertase.firebase.admob.RNFirebaseAdMobPackage; //Firebase AdMob
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage; // Firebase Analytics
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // Firebase Auth
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage; // Firebase Remote Config
import io.invertase.firebase.crash.RNFirebaseCrashPackage; // Firebase Crash Reporting
import io.invertase.firebase.database.RNFirebaseDatabasePackage; // Firebase Realtime Database
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // Firebase Firestore
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // Firebase Cloud Messaging
import io.invertase.firebase.perf.RNFirebasePerformancePackage; // Firebase Performance
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // Firebase Storage

import com.reactnativenavigation.NavigationApplication;

import co.apptailor.googlesignin.RNGoogleSigninPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNGoogleSigninPackage(),
        new RNFirebasePackage(),
        new RNFirebaseMessagingPackage(),
        new RNFirebaseAdMobPackage(),
        new RNFirebaseAnalyticsPackage(),
        new RNFirebaseAuthPackage(),
        new RNFirebaseRemoteConfigPackage(),
        new RNFirebaseCrashPackage(),
        new RNFirebaseDatabasePackage(),
        new RNFirebaseFirestorePackage(),
        new RNFirebasePerformancePackage(),
        new RNFirebaseStoragePackage(),
        SendSMSPackage.getInstance()
      );
    }
    
    @Override
    protected String getJSMainModuleName() {
      return "app";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  @Override
   public boolean isDebug() {
       // Make sure you are using BuildConfig from your own application
       return BuildConfig.DEBUG;
   }

   protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNFirebasePackage(),
            // add/remove these packages as appropriate
            new RNFirebaseAdMobPackage(),
            new RNFirebaseAnalyticsPackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseRemoteConfigPackage(),
            new RNFirebaseCrashPackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseFirestorePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebasePerformancePackage(),
            new RNFirebaseStoragePackage()
        );
   }

   @Override
   public List<ReactPackage> createAdditionalReactPackages() {
       return getPackages();
   }
}
