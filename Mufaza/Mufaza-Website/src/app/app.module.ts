import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { ReactiveFormsModule } from "@angular/forms";

import { environment } from './../environments/environment';
// import { AdminModule } from './admin/admin.module';
// import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';
import { SignInComponent } from './core/components/sign-in/sign-in.component';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './core/components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './core/components/forgot-password/forgot-password.component';
import { MyProfileComponent } from './core/components/my-profile/my-profile.component';
import { AuthService } from 'shared/services/auth.service';
import { EditProfileComponent} from './core/components/edit-profile/edit-profile.component'


@NgModule({
  declarations: [
    AppComponent ,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SignInComponent,
    SignUpComponent,
    MyProfileComponent, 
    //EditProfileComponent 
  ],
  imports: [
    BrowserModule,
    SharedModule,
    //AdminModule,
    ShoppingModule,
    CoreModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'dashboard', component: MyProfileComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      { path: 'verifyemail', component: VerifyEmailComponent },
      { path: 'editinfo', component: EditProfileComponent },

    ])    
  ],
  providers: [
   // AdminAuthGuard,
   AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
