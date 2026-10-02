import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudioMembershipModel } from '../store/types/studio-membership.module';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudioMembershipService {
  constructor(private http: HttpClient) {}

  requestMembership(studioId: number): Observable<StudioMembershipModel> {
    return this.http.post<StudioMembershipModel>(
      `${environment.apiUrl}/studio-membership/${studioId}/request`,
      {},
      { withCredentials: true }
    );
  }

  getRequestsForStudio(studioId: number): Observable<StudioMembershipModel[]> {
    return this.http.get<StudioMembershipModel[]>(
      `${environment.apiUrl}/studio-membership/${studioId}/requests`,
      { withCredentials: true }
    );
  }

  approveRequest(requestId: number): Observable<StudioMembershipModel> {
    return this.http.post<StudioMembershipModel>(
      `${environment.apiUrl}/studio-membership/requests/${requestId}/approve`,
      {},
      { withCredentials: true }
    );
  }

  rejectRequest(requestId: number): Observable<StudioMembershipModel> {
    return this.http.post<StudioMembershipModel>(
      `${environment.apiUrl}/studio-membership/requests/${requestId}/reject`,
      {},
      { withCredentials: true }
    );
  }
}
