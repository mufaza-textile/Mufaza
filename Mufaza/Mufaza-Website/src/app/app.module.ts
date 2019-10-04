import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule} from "@angular/forms"

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
import { ChangePasswordComponent } from './core/components/change-password/change-password.component';
import { DeleteAccountComponent } from './core/components/delete-account/delete-account.component';
import { SecureInnerPagesGuard } from 'shared/services/secure-inner-pages.guard';
import { AuthGuard} from 'shared/services/auth-guard.service'


@NgModule({
  declarations: [
    AppComponent ,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SignInComponent,
    SignUpComponent,
    MyProfileComponent, 
  ],
  imports: [
    BrowserModule,
    SharedModule,
    //AdminModule,
    ShoppingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'dashboard', component: MyProfileComponent, canActivate: [AuthGuard] },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      { path: 'verifyemail', component: VerifyEmailComponent },
      { path: 'changepassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'deleteaccount', component: DeleteAccountComponent, canActivate: [AuthGuard]},

    ])    
  ],
  providers: [
   // AdminAuthGuard,
   AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
