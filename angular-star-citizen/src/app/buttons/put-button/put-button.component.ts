import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';

interface PutButtonProps {
  data: any;
  endpoint: string;
}

@Component({
  selector: 'app-put-button',
  templateUrl: './put-button.component.html',
  styleUrls: ['./put-button.component.css']
})
export class PutButtonComponent implements PutButtonProps {
  @Input() data: any;
  @Input() endpoint: string = '';

  @Output() put = new EventEmitter<void>(); // Output event for successful update
  @Output() fail = new EventEmitter<void>(); // Output event for failed update

  constructor(private apiService: ApiService) {} // Inject your data service

  handlePut(): void {
  this.apiService.request(this.endpoint, 'PUT', this.data)
    .subscribe({
      next: () => {
        this.put.emit();
      },
      error: () => {
        this.fail.emit();
      }
    });
}
}
