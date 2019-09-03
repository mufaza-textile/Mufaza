import { Component, OnInit } from '@angular/core';
import { TailoringService } from '../../shared/tailoring.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-tailoring',
  templateUrl: './tailoring.component.html',
  styleUrls: ['./tailoring.component.css']
})
export class TailoringComponent implements OnInit {

  constructor(private service: TailoringService) { }

  chests =[
    { id: 3, value: "10"},
    { id: 2, value: "12"},
    { id: 3, value: "14"}
  ];

  shoulders =[
    { id: 3, value: "10"},
    { id: 2, value: "12"},
    { id: 3, value: "14"}
  ];

  armss =[
    { id: 3, value: "10"},
    { id: 2, value: "12"},
    { id: 3, value: "14"}
  ];

  frontNecks =[
    { id: 3, value: "10"},
    { id: 2, value: "12"},
    { id: 3, value: "14"}
  ];

  backNecks =[
    { id: 3, value: "10"},
    { id: 2, value: "12"},
    { id: 3, value: "14"}
  ];

  lengths =[
    { id: 3, value: "10"},
    { id: 2, value: "12"},
    { id: 3, value: "14"}
  ];

  ngOnInit() {
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}
