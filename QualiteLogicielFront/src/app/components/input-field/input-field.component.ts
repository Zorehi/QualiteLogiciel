import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: InputFieldComponent
    }
  ]
})
export class InputFieldComponent implements OnChanges {
  @ViewChild("input") input: ElementRef<HTMLInputElement>;
  @ViewChild("icon") icon: MatIcon;

  @Input() control: AbstractControl = new FormControl();
  @Input() type: string = "";

  formControl: FormControl = new FormControl();

  ngOnChanges(changes: SimpleChanges): void {
    this.formControl = this.control as FormControl;
  }

  getErrorMessage(): string {
    if (this.formControl.hasError('required')) {
      return 'Champ obligatoire';
    }
    if (this.formControl.hasError('pattern')) {
      return 'Format invalide';
    }
    return '';
  }

  toggleVisibility() {
    if (this.input?.nativeElement.type == "password") {
      this.input.nativeElement.type = "text";
      this.icon.fontIcon = "visibility_off";
    } else {
      this.input.nativeElement.type = "password";
      this.icon.fontIcon = "visibility";
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.formControl[isDisabled ? 'disable' : 'enable']();
  }
}
