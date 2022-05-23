import { Component, OnInit } from '@angular/core';
import { ReservationDTO } from 'src/app/Models/reservation.dto';
import { FlightService } from 'src/app/shared/Services/flight.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NoticeComponent } from 'src/app/shared/Components/notice/notice.component';


@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.css']
})
export class ExtrasComponent implements OnInit {
  reservation!: ReservationDTO;
  suitcase: number;
  pickup: number;
  activities: number;
  constructor(public flightService: FlightService, private _snackBar: MatSnackBar) { 
    this.suitcase = 50;
    this.activities = 25;
    this.pickup = 20;
  }

  ngOnInit(): void {
    this.reservation = this.flightService.getDataReservation();
    console.log(this.reservation)
  }
  buyPickup() {
    this.reservation.price = this.reservation.price + this.pickup;
    console.log(this.reservation);
    this.openSnackBar()
  }
  buyActivities() {
    this.reservation.price = this.reservation.price + this.activities;
    console.log(this.reservation);
    this.openSnackBar()
  }
  buySuitcase() {
    this.reservation.price = this.reservation.price + this.suitcase;
    console.log(this.reservation);
    this.openSnackBar()
  }
  openSnackBar() {
    this._snackBar.openFromComponent(NoticeComponent, {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }
  continue() {
    this.flightService.updateReservation(this.reservation, this.reservation.id)
    .subscribe(); 
  }
}
