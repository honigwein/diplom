import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { LocalizeService } from '../../../services/localize.service';
interface Role {
  id: string;
  name: string;
}
interface EventRole {
  role_id: string;
  max_users: number;
}
@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent implements OnInit {
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  eventForm: FormGroup;
  image: File | null = null;
  roles: Role[] = [];
  selectedRoles: EventRole[] = [];
  error: any | null = null;
  errorField: any | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, private localizeService: LocalizeService) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      datetime: ['', Validators.required],
      description: ['', Validators.required],
      image: [null],
      link: ['']
    });
   }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    this.apiService.request('admin/roles/', 'GET').subscribe((response: Role[]) => {
      this.roles = response;
    });
  }

  handleImageChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  handleRoleChange(roleId: string, maxUsers: number): void {
    const existingIndex = this.selectedRoles.findIndex(role => role.role_id === roleId);
    if (existingIndex !== -1 && maxUsers !== 0) {
      this.selectedRoles[existingIndex].max_users = maxUsers;
    } else {
      this.selectedRoles.push({ role_id: roleId, max_users: maxUsers });
    }
  }
  getEventValue(event:any): number {
    return (parseInt (event.target.value));
  }
  getMaxUsers(roleId: string): number {
    const selectedRole = this.selectedRoles.find(selectedRole => selectedRole.role_id === roleId);
    return selectedRole ? selectedRole.max_users : 0;
  }
  handleClose(): void {
    this.onCancel.emit();
  }

  async handleSubmit(): Promise<void> {
    if (this.eventForm.invalid || this.image === null) {
      this.error = 'Заповніть всі поля';
      return;
    }
    const formData = new FormData();
    formData.append('name', this.eventForm.value.name);
    formData.append('datetime', this.eventForm.value.datetime);
    formData.append('description', this.eventForm.value.description);
    if (this.image) {
      formData.append('image', this.image);
    }
    formData.append('link', this.eventForm.value.link);
    formData.append('roles', JSON.stringify(this.selectedRoles));

    this.apiService.request('admin/events/', 'POST', formData).subscribe(
      responce => {
        this.eventForm.reset();
        this.selectedRoles = [];
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
        if (this.error.includes('valid URL')) {
          this.error = this.localizeService.noValidLinkError();
        }
      }
    );
  }
}
