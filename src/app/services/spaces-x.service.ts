import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SpacesXService {
  Url = "https://api.spacexdata.com/v3/launches?";
  constructor(readonly http: HttpClient) { }

  getProgmasList()
  {
    return this.http.get('https://api.spacexdata.com/v3/launches?limit=100');
  }

  getYear(param): Observable<any> {
    return this.http.get(this.Url + "launch_year=" + param);
  }

  getLaunches(param): Observable<any> {
    return this.http.get(this.Url + "launch_success=" + param);
  }

  getLaunchandLand(launchSuccessvalue, landSuccessValue): Observable<any> {
    return this.http.get(this.Url +"limit=100" +"&launch_success=" +launchSuccessvalue +"&land_success=" +landSuccessValue);
  }

  getAllPrograms(launchYear, launchSuccess, landSuccess): Observable<any> {
    return this.http.get(this.Url +"launch_year=" +launchYear +"&launch_success=" +launchSuccess +"&land_success=" +landSuccess
    );
  }

  getLandingOnly(param): Observable<any> {
    return this.http.get(this.Url + "land_success=" + param);
  }
}
