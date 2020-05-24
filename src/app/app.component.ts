import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userReactiveForm: FormGroup;

  userNameCtrl: FormControl;
  birthDateCtrl: FormControl;

  passwordForm: FormGroup;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;

  constructor(formBuilder: FormBuilder) {
    this.userNameCtrl = formBuilder.control('', [Validators.required, Validators.minLength(3)]);
    this.birthDateCtrl = formBuilder.control('', [Validators.required]);

    this.passwordCtrl = formBuilder.control('', [Validators.required]);
    this.confirmPasswordCtrl = formBuilder.control('', [Validators.required]);

    this.passwordForm = formBuilder.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    }, { validator: this.checkPasswords });

    this.userReactiveForm = formBuilder.group({
      userName: this.userNameCtrl,
      birthDate: this.birthDateCtrl,
      passwordForm: this.passwordForm,
    });
  }

  checkPasswords(group: FormGroup): { isNotConfirmed: boolean } | undefined {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { isNotConfirmed: true };
  }

  registerReactiveForm() {
    console.log(this.userReactiveForm);
  }

  resetReactiveForm() {
    this.userReactiveForm.reset({
      userName: '',
      userEmail: '',
    });
    this.passwordForm.reset({
      password: '',
      confirmPassword: '',
    });
  }
}
