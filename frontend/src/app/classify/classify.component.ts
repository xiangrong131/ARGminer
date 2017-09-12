import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';



@Component({
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})


export class ClassifyComponent implements OnInit {

  public randomARG: Object;
  public render: Boolean;
  public loading: Boolean = false;
  public drawGenomes: Boolean = false;
  public searchIndex: number = 0;


  constructor(
    private dataService: DataService,
    private router: Router,

  ){
    
    this.dataService.getRandomKnownARG()
      .subscribe(response =>{
        this.randomARG = this.dataService.ARG;
        this.render=true;
        // console.log(this.randomARG)
    });

  }


  ngOnInit() {

  }


  nextGene(){
    this.randomARG['entry']['database'] = '-------------';
    this.randomARG['entry']['gene_id'] = '-------------';
    this.randomARG['entry']['subtype'] = '----------';
    this.randomARG['entry']['type'] = '--------------';
    this.randomARG['entry']['inspected'] = '------';
    this.randomARG['entry']['score'] = '------';
    this.loading = true;
    this.dataService.getRandomKnownARG()
      .subscribe(response =>{
        this.randomARG = this.dataService.ARG
        // console.log(this.randomARG)
        this.loading = false;
    });
  }

  search(argID: string){
    this.randomARG['entry']['database'] = '-------------';
    this.randomARG['entry']['gene_id'] = '-----------';
    this.randomARG['entry']['subtype'] = '-----------';
    this.randomARG['entry']['type'] = '--------------';
    this.randomARG['entry']['inspected'] = '-----';
    this.randomARG['entry']['score'] = '----';
    this.loading = true;

    this.dataService.searchAPI(argID, this.searchIndex.toString())
      .subscribe(response =>{
        // this.loading = false;
        this.dataService.getKnownARGInfo(response['entry']['gene_id'])
          .subscribe(res2=>{
            this.randomARG = this.dataService.ARG
            // console.log(this.randomARG)
            this.loading = false;
          })

    });

    

  }

  tabsEvent($event: any){
    this.drawGenomes = false;
    if($event.index == 2){
      this.drawGenomes = true;
    }
  }

}
