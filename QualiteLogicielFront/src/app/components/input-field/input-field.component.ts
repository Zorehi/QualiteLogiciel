import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

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
export class InputFieldComponent {
  @ViewChild("input") input: ElementRef<HTMLInputElement>;
  @ViewChild("icon") icon: MatIcon;

  @Input("type") type: string = "";

  public disabled: boolean = false;

  onChangeValue(event: Event) {
    this.markAsTouched();
    this.onChange((event.target as HTMLInputElement)?.value);
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

  //Compatible with template driven forms and reactive forms
  onChange = (event: any) => {};
  onTouched = () => {};
  touched = false;
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  writeValue(obj: any): void {
    if (this.input) {
      if (obj) {
        this.input.nativeElement.value = obj;
      } else {
        this.input.nativeElement.value = "";
      }
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
