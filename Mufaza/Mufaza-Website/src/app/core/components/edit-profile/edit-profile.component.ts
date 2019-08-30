import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor( public authService: AuthService
    ) { }

  ngOnInit() {
  }

}
