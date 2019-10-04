import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
//import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'; 
import * as firebase from 'firebase'; 
import { Injectable, NgZone } from '@angular/core';
import { User } from "../models/user";
import { auth } from 'firebase/app';
import {Customer} from "../models/customer";
//import { AngularFireAuth } from "@angular/fire/auth";
//import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { from } from 'rxjs/observable/from';
//import {AngularFireDatabase} from '@angular/fire/database'


@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  duser : FirebaseListObservable<any>


  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    public db:AngularFireDatabase,  // Inject Firestore service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
    ) { 
    this.user$ = afAuth.authState;    
    /* Saving user data in localstorage when 
     logged in and setting up null when logged out */
     this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // login() {
  //   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  //   localStorage.setItem('returnUrl', returnUrl);
    
  //   this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  // }

  // logout() { 
  //   this.afAuth.auth.signOut();
  // }

  get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (this.isLoggedIn) return this.userService.get(user.uid);

        return Observable.of(null);
      });    
  }

  
   //customerList : AngularFireList<any> = this.db.list('customers/${user.uid}');
   userData: any; // Save logged in user data

   // Sign in with email/password
   SignIn(email, password) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((result) => {
         this.ngZone.run(() => {
           this.router.navigate(['/']);
         });
        this.SetUserData(result.user);
       }).catch((error) => {
         window.alert(error.message)
       })
   }
 
   // Sign up with email/password
   SignUp(email, password) {
     return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
       .then((result) => {
         /* Call the SendVerificaitonMail() function when new user sign 
         up and returns promise */
         this.SendVerificationMail();
         this.SetUserData(result.user);
       }).catch((error) => {
         window.alert(error.message)
       })
   }
 
   // Send email verfificaiton when new user sign up
   SendVerificationMail() {
     return this.afAuth.auth.currentUser.sendEmailVerification()
     .then(() => {
       this.router.navigate(['verifyemail']);
     })
   }
 
   // Reset Forggot password
   ForgotPassword(passwordResetEmail) {
     return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
     .then(() => {
       window.alert('Password reset email sent, check your inbox.');
     }).catch((error) => {
       window.alert(error)
     })
   }

  //  ChangePassword(passwordResetEmail) {
  //   return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
  //   .then(() => {
  //     window.alert('Password reset email sent, check your inbox.');
  //     this.SignOut();
  //    this.router.navigate(['signin']);
  //   }).catch((error) => {
  //     window.alert(error)
  //   })
  // }
 
   // Returns true when user is looged in and email is verified
   get isLoggedIn(): boolean {
    
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
   }
 
   // Sign in with Google
   GoogleAuth() {
     return this.AuthLogin(new auth.GoogleAuthProvider());
   }
 
   // Auth logic to run auth providers
   AuthLogin(provider) {
     return this.afAuth.auth.signInWithPopup(provider)
     .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
         })
       this.SetUserData(result.user);
     }).catch((error) => {
       window.alert(error)
     })
   }
 
   
 
   SetUserData(user) {
 
    this.db.object('/customers/'+ user.uid).update({
     uid: user.uid,
     email: user.email,
     displayName: user.displayName,
     photoURL: user.photoURL,
     emailVerified: user.emailVerified,
     
    })
      
      
   } 
 


   // Sign out 
   SignOut() {
     return this.afAuth.auth.signOut().then(() => {
       localStorage.removeItem('user');
       this.router.navigate(['/']);
     })
   }

   DeleteAccount(){
    firebase.auth().currentUser.delete().then(() => {
      //window.alert("Successfully deleted your account")
      window.alert("Successfully deleted the account")
      this.db.object('/customers/' + this.userData.uid).remove();
      this.SignOut().catch((error) => {
        window.alert(error)
      })

    }).catch((error)=>{
      window.alert(error)
    });
   }

  

  UpdatePassword(newPassword){
    firebase.auth().currentUser.updatePassword(newPassword).then(()=>{
      window.alert("Successfully updated password")
    }).catch((error)=>{
      window.alert(error)
    });
  }
 
  Updatename(name){
    firebase.auth().currentUser.updateProfile({
      displayName:name,
      photoURL:this.userData.photoURL
    }).then(()=>{
      window.alert("Successfully updated")
      this.SetUserData(this.userData);
    }).catch((error)=>{
      window.alert(error)
    });
  }
   
  
   
}


// @Injectable({
//   providedIn: 'root'
// })

