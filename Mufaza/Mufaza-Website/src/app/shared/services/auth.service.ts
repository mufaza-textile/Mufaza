import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
//import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'; 
import * as firebase from 'firebase'; 

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

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

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() { 
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid);

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
           this.router.navigate(['dashboard']);
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
       this.router.navigate(['verify-email-address']);
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
           this.router.navigate(['dashboard']);
         })
       this.SetUserData(result.user);
     }).catch((error) => {
       window.alert(error)
     })
   }
 
   /* Setting up user data when sign in with username/password, 
   sign up with username/password and sign in with social auth  
   provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
   // SetUserData(user) {
   //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
   //   const userData: User = {
   //     uid: user.uid,
   //     email: user.email,
   //     displayName: user.displayName,
   //     photoURL: user.photoURL,
   //     emailVerified: user.emailVerified
   //   }
   //   return userRef.set(userData, {
   //     merge: true
   //   })
   // }
 
   SetUserData(user) {
    //const customerList : AngularFireList<any> = this.db.list('customers/${user.uid}');
 
    this.db.object('/customers/'+ user.uid).update({
     uid: user.uid,
     email: user.email,
     displayName: user.displayName,
     photoURL: user.photoURL,
     emailVerified: user.emailVerified,
     
    })
      
      
   } 
 
   UpdateUserData(details){
    this.db.object('/customers/'+ this.userData.uid).update({
     address:details.address,
     phoneNo:details.phone,
     displayName:details.name
    })
   }

   // Sign out 
   SignOut() {
     return this.afAuth.auth.signOut().then(() => {
       localStorage.removeItem('user');
       this.router.navigate(['/']);
     })
   }
 
   // getCustomers(user){
   //  return this.db.object('/customers/'+ user.uid);
   // }
  
}

import { Injectable, NgZone } from '@angular/core';
import { User } from "../models/user";
import { auth } from 'firebase/app';
//import { AngularFireAuth } from "@angular/fire/auth";
//import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import {AngularFireDatabase, } from 'angularfire2/database';
//import {AngularFireDatabase} from '@angular/fire/database'

// @Injectable({
//   providedIn: 'root'
// })

