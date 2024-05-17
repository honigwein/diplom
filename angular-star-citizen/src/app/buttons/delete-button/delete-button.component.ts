import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';

interface DeleteButtonProps {
  id: string;
  endpoint: string;
}

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent implements DeleteButtonProps {
  @Input() id: string = '';
  @Input() endpoint: string = '';

  @Output() delete = new EventEmitter<void>(); // Output event for successful deletion
  @Output() fail = new EventEmitter<void>(); // Output event for failed deletion

  constructor(private apiService: ApiService) {} // Inject your data service

  handleDelete(): void {
  this.apiService.request(this.endpoint, 'DELETE', { "id": this.id })
    .subscribe({
      next: () => {
        this.delete.emit();
      },
      error: () => {
        this.fail.emit();
      }
    });
}
}
