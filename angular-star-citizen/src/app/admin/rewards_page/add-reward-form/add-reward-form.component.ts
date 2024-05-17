import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { LocalizeService } from '../../../services/localize.service';
@Component({
  selector: 'app-add-reward-form',
  templateUrl: './add-reward-form.component.html',
  styleUrls: ['./add-reward-form.component.css']
})
export class AddRewardFormComponent {
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  rewardForm: FormGroup;
  image: File | null = null;
  error: any | null = null;
  errorField: any | null = null;
  
  constructor(private fb: FormBuilder, private apiService: ApiService, private localizeService: LocalizeService) {
  
    this.rewardForm = this.fb.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      image: [null]
    });
  }

  handleImageChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  handleClose(): void {
    this.onCancel.emit();
  }

  async handleSubmit(): Promise<void> {
    if (this.rewardForm.invalid || this.image === null) {
      this.error = 'Заповніть всі поля';
      return;
    }
    const formData = new FormData();
    formData.append('name', this.rewardForm.value.name);
    formData.append('cost', this.rewardForm.value.cost);
    if (this.image) {
      formData.append('image', this.image);
    }
    this.apiService.request('admin/rewards/', 'POST', formData).subscribe(
      response => {
        this.onSuccess.emit();
      },
      error => {
        if (error instanceof ProgressEvent && error.type === 'error') {
          this.error = 'Помилка з`єднання з сервером, спробуйте пізніше';
          return;
        }
        this.error = Object.values(error)[0];
        if (this.error === 'Given token not valid for any token type') {
          this.error = 'Помилка з`єднання з сервером, спробуйте пізніше';
          return;
        }
        this.errorField = Object.keys(error)[0];
        this.error = this.error[0];
        if (this.error.includes('no more than')) {
          let max_chars = this.error.match(/\d+/);
          max_chars = parseInt(max_chars[0], 10);
          this.error = this.localizeService.maxCharsError(max_chars);
        }
      }
    );
  }
}
