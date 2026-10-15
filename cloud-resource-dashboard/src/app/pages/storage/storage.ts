import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CloudResourceService } from '../../core/services/cloud-resource';
import { StorageBucket } from '../../core/models/cloud-resource.model';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [FormsModule, DatePipe, DecimalPipe],
  templateUrl: './storage.html',
  styleUrl: './storage.css'
})
export class Storage implements OnInit {
  private readonly cloudService = inject(CloudResourceService);

  buckets: StorageBucket[] = [];
  loading = true;
  errorMessage = '';
  searchTerm = '';
  selectedRegion = 'All';

  ngOnInit(): void {
    this.loadStorage();
  }

  loadStorage(): void {
    this.loading = true;
    this.errorMessage = '';

    this.cloudService.getStorage().subscribe({
      next: data => {
        this.buckets = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load storage resources.';
        this.loading = false;
      }
    });
  }

  get regions(): string[] {
    return [...new Set(this.buckets.map(b => b.region))].sort();
  }

  get filteredBuckets(): StorageBucket[] {
    const query = this.searchTerm.trim().toLowerCase();

    return this.buckets.filter(bucket => {
      const matchesName =
        bucket.bucketName.toLowerCase().includes(query);

      const matchesRegion =
        this.selectedRegion === 'All' ||
        bucket.region === this.selectedRegion;

      return matchesName && matchesRegion;
    });
  }

  get totalSizeGB(): number {
    return this.buckets.reduce(
      (total, bucket) => total + bucket.sizeGB,
      0
    );
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedRegion = 'All';
  }
}
