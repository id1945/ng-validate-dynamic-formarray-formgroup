import { Component, ViewChild, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;

  ngOnInit() {
    this.validate();
  }

  /********BUILD FORM-GROUP START*******/
  public validate(): void {
    this.formGroup = new FormGroup({
      formArray1: new FormArray([
        this.initX()
      ])
    });
    // this.formGroup.valueChanges.subscribe(data => console.log(data));
  }

  get f() { return this.formGroup.controls; }

  public initX(): FormGroup {
    return new FormGroup({
      X: new FormControl('X', [Validators.required, Validators.pattern('[0-9]{3}')]),
      formArray2: new FormArray([
        this.initY()
      ])
    });
  }

  public initY(): FormGroup {
    return new FormGroup({
      Y1: new FormControl('Y1', [Validators.required, Validators.pattern('[0-9]{3}')]),
      Y2: new FormControl('Y2', [Validators.required, Validators.pattern('[0-9]{3}')]),
      formArray3: new FormArray([
        this.initZ()
      ])
    });
  }

  public initZ(): FormGroup {
    return new FormGroup({
      Z: new FormControl('Z', [Validators.required, Validators.pattern('[0-9]{3}')]),
    });
  }
  /********BUILD FORM-GROUP END*******/

  /********EVENT CLICKZ START*******/
  public addX(): void {
    const control = <FormArray>this.f.formArray1;
    control.push(this.initX());
  }

  public addY(ix): void {
    const control = (<FormArray>this.f.formArray1).at(ix).get('formArray2') as FormArray;
    control.push(this.initY());
  }

  public addZ(ix, iy): void {
    const control = ((<FormArray>this.f.formArray1).at(ix).get('formArray2') as FormArray).at(iy).get('formArray3') as FormArray;
    control.push(this.initZ());
  }

  public onSubmit(e): void {
    if (this.formGroup.valid) {
      alert('Result: success!');
      console.log(e.value);
    }
  }
  /********EVENT CLICKZ END*******/

  constructor() { }

}
