import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class NotifcationService {

  constructor(private snackBar : MatSnackBar) { }

config: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition : 'right',
  verticalPosition: 'top'

}



success(msg){
  this.config['panelClass']  = ['notifcation', 'success'];
  this.snackBar.open(msg,'',this.config);
}


  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}
