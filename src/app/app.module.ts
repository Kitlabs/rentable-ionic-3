// import { MbscModule } from '@mobiscroll/angular';
import { MbscModule } from '../lib/mobiscroll/js/mobiscroll.angular.min';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule,AngularFireDatabase } from 'angularfire2/database';
import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook } from '@ionic-native/facebook';
import { allPages } from '../pages/common/declerations';
import { DirectivesModule } from '../directives/directives.module';
import { ValidatorsModule } from '../validators/validators.module';
import { FCM } from "@ionic-native/fcm";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';
import { AppSetting } from '../providers/api_route';
import { PaymentProvider } from '../providers/payment/payment';
import { ProfileProvider } from '../providers/payment/profile';
import { Postitemprovider } from '../providers/items/postitem';
import { ItemsProvider } from '../providers/items/items';
import { ChatProvider } from '../providers/chat/chat';
import { ImageuploadProvider } from '../providers/imageupload/imageupload';
import { NoodlioPay } from '../pages/stripe/pay/noodliopay';
import { PayPal } from '@ionic-native/paypal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Keyboard } from '@ionic-native/keyboard';
import { Base64 } from '@ionic-native/base64';
import { DatePicker } from '@ionic-native/date-picker';
import { CalendarModule } from "ion2-calendar";
import { Stripe } from '@ionic-native/stripe';
// import { MomentModule } from 'angular2-moment';
import { ImageResizer } from '@ionic-native/image-resizer';
import { IonicImageViewerModule } from 'ionic-img-viewer';
//For Tool Tip
import { TooltipsModule } from 'ionic-tooltips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AppRate } from '@ionic-native/app-rate';
import { Badge } from '@ionic-native/badge';
const firebaseConfig = {
  apiKey: "AIzaSyDfySkoXoUcI9Ed39TNJwXnntSg8nKyt10",
  authDomain: "rental-335fb.firebaseapp.com",
  databaseURL: "https://rental-335fb.firebaseio.com",
  projectId: "rental-335fb",
  storageBucket: "rental-335fb.appspot.com",
  messagingSenderId: "637150074544"
};

var APP_Pages = [];
  for(let i in allPages){
    APP_Pages.push(allPages[i]);
  }
@NgModule({
  declarations: [
    MyApp,
    APP_Pages
  ],
  imports: [ 
    //    FormsModule, 
    MbscModule,
    BrowserModule,
    HttpModule,
    DirectivesModule,
    ValidatorsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CalendarModule,
    TooltipsModule,
    BrowserAnimationsModule,
    IonicImageViewerModule,
    // MomentModule,
    IonicStorageModule.forRoot(),
     IonicModule.forRoot(MyApp, {
      backButtonText: '',
      pageTransition: 'ios-transition',
      tabsPlacement: 'bottom',
      platforms:{
        ios:{
          scrollAssist: false,
          autoFocusAssist: false
        }
      }

    }
  )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    APP_Pages
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DirectivesModule,
    NativePageTransitions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticateProvider,
    AppSetting,
    PaymentProvider,
    ProfileProvider,
    Postitemprovider,
    File,
    Camera,
    Device,
    ItemsProvider,
    ImagePicker,
    Crop,
    Geolocation,
    FCM,
    NoodlioPay,
    ChatProvider,    
    ImageuploadProvider,
    Facebook,
    PayPal,
    SocialSharing,Keyboard,
    SocialSharing,
    Keyboard,
    Base64,
    DatePicker,
    ImageResizer,
    Stripe,
    AngularFireDatabase,
   LocalNotifications,
    Badge,
    AppRate
  ]
})
export class AppModule {}
