import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CloudResourceService } from '../../core/services/cloud-resource';
import { CloudFunction } from '../../core/models/cloud-resource.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-functions',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './functions.html',
  styleUrl: './functions.css'
})
export class Functions implements OnInit {
  private readonly cloudService = inject(CloudResourceService);

  functions: CloudFunction[] = [];
  loading = true;
  errorMessage = '';
  searchTerm = '';
  selectedRegion = 'All';

  ngOnInit(): void {
    this.loadFunctions();
  }

  loadFunctions(): void {
    this.loading = true;
    this.errorMessage = '';

    this.cloudService.getFunctions().subscribe({
      next: data => {
        this.functions = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load function resources.';
        this.loading = false;
      }
    });
  }

  get regions(): string[] {
    return [...new Set(this.functions.map(f => f.region))].sort();
  }

  get filteredFunctions(): CloudFunction[] {
    const query = this.searchTerm.trim().toLowerCase();

    return this.functions.filter(fn => {
      const matchesName = fn.name.toLowerCase().includes(query);

      const matchesRegion =
        this.selectedRegion === 'All' ||
        fn.region === this.selectedRegion;

      return matchesName && matchesRegion;
    });
  }

  get totalMemoryMB(): number {
    return this.functions.reduce(
      (total, fn) => total + fn.memoryMB,
      0
    );
  }

  get runtimeCount(): number {
  return new Set(
    this.functions.map(fn => fn.runtime)
  ).size;
}

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedRegion = 'All';
  }
}
