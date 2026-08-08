import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { PatientService } from '../../../../core/services/patient.service';

@Component({
  selector: 'app-patient-detail',
  imports: [CommonModule, RouterLink, TabsModule],
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.css',
})
export default class PatientDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  protected patientService = inject(PatientService);

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.patientService.getPatientDetail(patientId).subscribe();
    }
  }
}