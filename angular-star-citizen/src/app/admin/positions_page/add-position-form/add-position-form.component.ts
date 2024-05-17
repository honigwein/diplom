import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { LocalizeService } from '../../../services/localize.service';
@Component({
  selector: 'app-add-position-form',
  templateUrl: './add-position-form.component.html',
  styleUrls: ['./add-position-form.component.css']
})
export class AddPositionFormComponent {
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  positionForm: FormGroup;
  error: any | null = null;
  errorField: any | null = null;
  isEmojiMartOpen: boolean = false;
  constructor(private fb: FormBuilder, private apiService: ApiService, private localizeService: LocalizeService) {
    this.positionForm = this.fb.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      color: ['#000000'],
      emoji: ['🌟', Validators.required]
    });
  }
  
  handleClose(): void {
    this.onCancel.emit();
  }
  toggleEmojiMart(): void {
    this.isEmojiMartOpen = !this.isEmojiMartOpen;
  }
  handleEmojiSelect(emojiObj: any): void {
    this.positionForm.get('emoji')?.setValue(emojiObj.emoji.native);
    this.isEmojiMartOpen = false;
  }
  async handleSubmit(): Promise<void> {
    console.log(this.positionForm.value);
    if (this.positionForm.invalid) {
      this.error = 'Заповніть всі поля';
      return;
    }
    const formData = new FormData();
    formData.append('name', this.positionForm.value.name);
    formData.append('cost', this.positionForm.value.cost);
    formData.append('color', this.positionForm.value.color);
    formData.append('emoji', this.positionForm.value.emoji);

    this.apiService.request('admin/title/', 'POST', formData).subscribe(
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
        console.log(this.error);
        console.log(this.errorField);
        if (this.error.includes('no more than')) {
          let max_chars = this.error.match(/\d+/);
          max_chars = parseInt(max_chars[0], 10);
          this.error = this.localizeService.maxCharsError(max_chars);
        }
      }
    );
  }
}
