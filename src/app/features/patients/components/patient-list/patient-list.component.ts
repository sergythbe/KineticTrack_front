// features/patients/components/patient-list/patient-list.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../../../../core/services/appointment.service';

@Component({
  selector: 'app-patient-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export default class PatientListComponent implements OnInit {
  protected appointmentService = inject(AppointmentService);

  ngOnInit(): void {
    this.appointmentService.loadTodayAppointments().subscribe();
  }
}