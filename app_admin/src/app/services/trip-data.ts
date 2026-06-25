import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trips';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  
  private apiUrl = 'http://localhost:3000/api/trips';
  baseUrl = 'http://localhost:3000/api';

  constructor(
private http: HttpClient,
@Inject(BROWSER_STORAGE) private storage: Storage
) {}

  // Get all trips - takes no arguments
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  // Get a single trip by code - takes one argument
  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}/${tripCode}`);
  }

  addTrip(formData: Trip) : Observable<Trip> {
        return this.http.post<Trip>(this.apiUrl, formData);
    }

  // Update a trip - takes one argument
  updateTrip(trip: Trip): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${trip.code}`, trip, { headers });
  }

  // Call to our /login endpoint, returns JWT
login(user: User, passwd: string) : Observable<AuthResponse> {
// console.log('Inside TripDataService::login');
return this.handleAuthAPICall('login', user, passwd);
}
// Call to our /register endpoint, creates user and returns JWT
register(user: User, passwd: string) : Observable<AuthResponse> {
// console.log('Inside TripDataService::register');
return this.handleAuthAPICall('register', user, passwd);
}
// helper method to process both login and register methods
handleAuthAPICall(endpoint: string, user: User, passwd: string) :
Observable<AuthResponse> {
// console.log('Inside TripDataService::handleAuthAPICall');
let formData = {
name: user.name,
email: user.email,
password: passwd
};
return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint,
formData);
}

}