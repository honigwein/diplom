import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';

interface AddButtonProps {
  data: any;
  endpoint: string;
  text?: string;
}

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements AddButtonProps {
  @Input() text: string = 'Додати';
  @Input() data: any;
  @Input() endpoint: string = '';
  @Input() disabled: boolean = false;
  @Output() add = new EventEmitter<void>(); // Output event for successful addition
  @Output() fail = new EventEmitter<void>(); // Output event for failed addition

  constructor(private apiService: ApiService) {} // Inject your data service

  async handleAdd(): Promise<void> {
    try {
      const response = await this.apiService.request(this.endpoint, 'POST', this.data).toPromise();
      this.add.emit();
    } catch (error) {
      this.fail.emit();
    }
  }

}
