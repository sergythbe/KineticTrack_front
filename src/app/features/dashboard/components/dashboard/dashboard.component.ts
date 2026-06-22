import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent implements OnInit {
  protected dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.dashboardService.loadSummary().subscribe();
    this.dashboardService.loadActiveEpisodes().subscribe();
  }
}