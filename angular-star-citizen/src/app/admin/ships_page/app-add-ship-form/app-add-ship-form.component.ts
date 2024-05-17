import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { LocalizeService } from '../../../services/localize.service';
@Component({
  selector: 'app-add-ship-form',
  templateUrl: './app-add-ship-form.component.html',
  styleUrls: ['./app-add-ship-form.component.css']
})
export class AddShipFormComponent {
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  shipForm: FormGroup;
  image: File | null = null;
  error: any | null = null;
  errorField: any | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, private localizeService: LocalizeService) {
    this.shipForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: [null]
    });
  }

  handleImageChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  handleClose() {
    this.onCancel.emit();
  }

  handleSubmit() {
    if (this.shipForm.invalid || this.image === null) {
      this.error = 'Заповніть всі поля';
      return;
    }
    const formData = new FormData();
    formData.append('name', this.shipForm.value.name);
    formData.append('description', this.shipForm.value.description);
    formData.append('price', this.shipForm.value.price);
    if (this.image) {
        formData.append('image', this.image);
    }

    this.apiService.request('admin/ships/', 'POST', formData).subscribe(
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
        console.log(this.errorField);
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
