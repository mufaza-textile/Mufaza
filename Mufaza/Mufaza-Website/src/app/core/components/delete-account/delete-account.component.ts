import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  constructor(public authService: AuthService,
    public router: Router,
    public ngZone: NgZone) { }

  ngOnInit() {
  }

}
