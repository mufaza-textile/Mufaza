import { Component, OnInit } from '@angular/core';
import { SuppliesService } from '../../../../shared/supplies.service';
@Component({
  selector: 'app-upload',
  template: `
    <img [src] = "imageUrl"/>
  `,
})
export class UploadComponent implements OnInit {
  constructor(private service : SuppliesService) { }
  imageUrl = this.service.imageUrl;

  ngOnInit() {
    
  }




}
