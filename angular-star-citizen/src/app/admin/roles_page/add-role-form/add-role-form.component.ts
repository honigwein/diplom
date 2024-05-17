import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { LocalizeService } from '../../../services/localize.service';
@Component({
  selector: 'app-add-role-form',
  templateUrl: './add-role-form.component.html',
  styleUrls: ['./add-role-form.component.css']
})
export class AddRoleFormComponent {
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  roleForm: FormGroup;
  error: any | null = null;
  errorField: any | null = null;
  constructor(private fb: FormBuilder, private apiService: ApiService, private localizeService: LocalizeService) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  handleClose(): void {
    this.onCancel.emit();
  }

  async handleSubmit(): Promise<void> {
    if (this.roleForm.invalid) {
      this.error = 'Заповніть всі поля';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.roleForm.value.name);

    this.apiService.request('admin/roles/', 'POST', formData).subscribe(
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
