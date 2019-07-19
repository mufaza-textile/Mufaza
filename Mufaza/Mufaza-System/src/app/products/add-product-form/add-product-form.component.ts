import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { NotifcationService } from "../../shared/notifcation.service";


@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  constructor(private service: ProductService, private notificationService : NotifcationService) { }

  ngOnInit() {
    this.service.getProducts();
  }

onClear() {
    let $key = this.service.form.get('$key').value;
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.service.form.patchValue({ $key });
  }

  onSubmit(){
    if(this.service.form.valid){
      this.service.insertProduct(this.service.form.value)
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted Succesfully' );
    }

  }
}
