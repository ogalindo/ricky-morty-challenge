import { Component, OnInit } from '@angular/core';
import { RmServiceService } from 'src/app/services/rm-service.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { window } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  characters: any[] = [];
  originalArray: any[] = [];
  title: string = 'RICK AND MORTY'
  heightOutput = document.querySelector("#height");
  widthOutput = document.querySelector("#width");
  character = {
    name: 'Oswaldo',
    age: 32
  }
  
  charactersForm = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  })
  constructor(private rmService: RmServiceService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.rmService.getRMInfo().subscribe(
      data => {
        this.characters = data.results
        this.originalArray = data.results
        console.log(this.characters, 'data');
      }
    );
  }

  searchCharacter(){
    if (this.charactersForm.valid) {
      const value = this.charactersForm.value;
      if (value.length >= 3) {
        this.characters = this.originalArray.filter( element => element.name.includes(value));
      }
      
    }
  }

}
