import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trips';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

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
}