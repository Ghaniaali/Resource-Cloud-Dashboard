
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CloudResourceService } from '../../core/services/cloud-resource';
import { CloudServer } from '../../core/models/cloud-resource.model';

@Component({
  selector: 'app-servers',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './servers.html',
  styleUrl: './servers.css'
})
export class Servers implements OnInit {
  private readonly cloudService = inject(CloudResourceService);

  servers: CloudServer[] = [];
  loading = true;
  errorMessage = '';

  searchTerm = '';
  selectedRegion = 'All';

  ngOnInit(): void {
    this.loadServers();
  }

  loadServers(): void {
    this.loading = true;
    this.errorMessage = '';

      this.cloudService.getServers().subscribe({
        next: (data: unknown) => {
          this.servers = Array.isArray(data) ? data as CloudServer[] : [];
        this.loading = false;
      },
      error: () => {
        this.errorMessage =
          'Unable to load servers. Check that the mock API is running.';
        this.loading = false;
      }
    });
  }

  get regions(): string[] {
    return [
      ...new Set(this.servers.map(server => server.region))
    ].sort();
  }

  get filteredServers(): CloudServer[] {
    const query = this.searchTerm.trim().toLowerCase();

    return this.servers.filter(server => {
      const matchesName = server.name.toLowerCase().includes(query);

      const matchesRegion =
        this.selectedRegion === 'All' ||
        server.region === this.selectedRegion;

      return matchesName && matchesRegion;
    });
  }

  get runningCount(): number {
    return this.servers.filter(
      server => server.status === 'Running'
    ).length;
  }

  get stoppedCount(): number {
    return this.servers.filter(
      server => server.status === 'Stopped'
    ).length;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedRegion = 'All';
  }

  trackById(_index: number, server: CloudServer): string {
    return server.id;
  }
}
