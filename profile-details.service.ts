import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProfileDetailsModel, ProfileUpdateModel } from '../models';
import { isPlatformBrowser } from '@angular/common';
import { Profile_Detail_Subject } from '../../shared';
import { MessageResponseModel } from '../../_models';
const baseUrl = environment.apiUrl + '/api/students/get-student-detail';

@Injectable({
  providedIn: 'root',
})
export class ProfileDetailsService {
  private readonly profileDetailSubject =
    new BehaviorSubject<ProfileDetailsModel>({} as ProfileDetailsModel);
  public profile: Observable<ProfileDetailsModel>;

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedProfileDetaialSubject = sessionStorage.getItem(
        Profile_Detail_Subject
      );
      const parsedAccount = storedProfileDetaialSubject
        ? JSON.parse(storedProfileDetaialSubject)
        : null;
      this.profileDetailSubject.next(parsedAccount);
      this.profile = new BehaviorSubject<ProfileDetailsModel>(parsedAccount);
    }
    this.profile = this.profileDetailSubject.asObservable();
  }
  public get profileValue(): ProfileDetailsModel {
    return this.profileDetailSubject.value;
  }
  getProfileDetail(studentNumber: number): Observable<ProfileDetailsModel> {
    return this.http
      ?.get<ProfileDetailsModel>(`${baseUrl}/${studentNumber}`)
      .pipe(
        map((data) => {
          if (data !== undefined && data !== null) {
            sessionStorage.setItem(
              Profile_Detail_Subject,
              JSON.stringify(data)
            );
            this.profileDetailSubject.next(data);
            // console.log("Get data",`${baseUrl}/${studentNumber}` , "" , data);
            
            return data;
          } else {
            return null!;
          }
        })
      );
  }

  updateStudentProfileAsync(studentNumber: number,profile:ProfileUpdateModel ): Observable<MessageResponseModel> {
    const url= environment.apiUrl+'/api/students/profile-update/'+studentNumber;
    return this.http.put<MessageResponseModel>(url, profile);
  }
  addProfileDetail(studentNumber: number,ProfileDetailsModel: ProfileDetailsModel): Observable<ProfileDetailsModel> {
    console.log("Post data with student number",`${baseUrl}/${studentNumber}`);
    console.log("Post data",`${baseUrl}`);    
    return this.http.post<ProfileDetailsModel>(`${baseUrl}/${studentNumber}`, ProfileDetailsModel);
  }
  getPostData(){
      console.log("Get Post data",`${baseUrl}`);    
      return this.http.get(`${baseUrl}`);
  }
}