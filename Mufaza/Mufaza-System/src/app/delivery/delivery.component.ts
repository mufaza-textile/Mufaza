import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { OrderTypesService } from '../shared/order-types.service';
import { NotifcationService } from '../shared/notifcation.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  constructor(private service: ProductService, private ordType : OrderTypesService, private notificationService : NotifcationService) { }

  listData: MatTableDataSource<any>;
  
  displayedColumns: string[] =[`#`,`riderName`,`riderAddress`,`riderMobile`,`riderEmail`,`bikenumber`,'actions'];
  
      @ViewChild(MatSort,{static: true}) sort: MatSort;
      @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.service.getProducts().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
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