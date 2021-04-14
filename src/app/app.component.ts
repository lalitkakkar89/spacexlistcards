import { Component, Inject, PLATFORM_ID, OnInit } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { SpacesXService } from "./services/spaces-x.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  programs : any;
  year: string = "";
  launches: any;
  years = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
  launchStatus: any;
  recordCount: any;
  landingStatus: any;
  developerName: "Lalit Kakkar";
  constructor( @Inject(PLATFORM_ID) private platformId: object,private SpaceService:SpacesXService,private router: Router) { 
    if (isPlatformBrowser(this.platformId)) {
      this.getSpacexPrograms();
    }
  }
  

  ngOnInit(): void {
    
  }

  getSpacexPrograms()
  {
    this.SpaceService.getProgmasList().subscribe(currentPrograms => {
      this.programs = currentPrograms;
      this.recordCount = this.programs.length;
      
    },
    error => {
     
    });

  }

  filterYear(year) {
    this.year = year;
    this.router.navigate([""], {
      queryParams: { limit: 100, year: this.year },
    });
    this.SpaceService.getYear(this.year).subscribe((data) => {
      this.programs = data;
      this.recordCount = data.length;
    });
  }

  launchFilter(event) {
    this.launchStatus = event.target.textContent.toLowerCase();
    this.router.navigate([""], {
      queryParams: { limit: 100, launch_status: this.launchStatus },
    });
    this.SpaceService.getLaunches(this.launchStatus).subscribe((data) => {
      this.programs = data;
      this.recordCount = data.length;
    });
  }

  landFilter(event) {
    this.landingStatus = event.target.textContent.toLowerCase();

    if (this.launchStatus != "" && this.landingStatus != "" && this.year == "") {
      this.SpaceService
        .getLaunchandLand(this.launchStatus, this.landingStatus)
        .subscribe((data) => {
          this.programs = data;
          this.recordCount = data.length;
          this.router.navigate([""], {
            queryParams: {
              limit: 100,
              launch_status: this.launchStatus,
              land_status: this.landingStatus,
            },
          });
        });
    } else if (this.launchStatus != "" && this.landingStatus != "" && this.year != "") {
     
      this.SpaceService
        .getAllPrograms(this.year, this.launchStatus, this.landingStatus)
        .subscribe((data) => {
          this.programs = data;
          this.recordCount = data.length;
          this.router.navigate([""], {
            queryParams: {
              limit: 100,
              launch_status: this.launchStatus,
              land_status: this.landingStatus,
              launch_year: this.year,
            },
          });
          return;
        });
    } else {
      this.SpaceService
        .getLandingOnly(this.landingStatus).subscribe((data) => {
          this.programs = data;
          this.recordCount = data.length;
          return;
        });
    }
  }
}
