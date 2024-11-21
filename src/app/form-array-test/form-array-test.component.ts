// app.component.ts
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-array-test',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './form-array-test.component.html',
  styleUrl: './form-array-test.component.css'
})
export class FormArrayTestComponent {

  // Main form group with nested FormArrays
  companyForm: FormGroup = this.fb.group({
    departments: this.fb.array([])
  });;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Initialize the form with a nested structure


    // Add initial department
    this.addDepartment();
  }

  // Getter for departments FormArray
  get departments(): FormArray {
    return this.companyForm.get('departments') as FormArray;
  }

  // Create a department form group with nested employees FormArray
  createDepartmentGroup(numberOfEmployees:number = 1): FormGroup {
    return this.fb.group({
      departmentName: ['', Validators.required],
      employees: this.fb.array(
        Array(numberOfEmployees).fill(this.createEmployeeGroup())
      )
    });
  }

  // Create an employee form group
  createEmployeeGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Get employees FormArray for a specific department
  getEmployees(departmentIndex: number): FormArray {
    return this.departments.at(departmentIndex).get('employees') as FormArray;
  }

  // Add a new department
  addDepartment(value?:any) {
    const dep = this.createDepartmentGroup(value?.employees?.length);
    dep.patchValue(value);
    this.departments.push(dep);
  }

  // Remove a department
  removeDepartment(departmentIndex: number) {
    this.departments.removeAt(departmentIndex);
  }

  // Add an employee to a specific department
  addEmployee(departmentIndex: number,data?: any) {
    const emp = this.createEmployeeGroup();
    emp.patchValue(data);
    this.getEmployees(departmentIndex).push(emp);
    return emp;
  }

  // Remove an employee from a specific department
  removeEmployee(departmentIndex: number, employeeIndex: number) {
    this.getEmployees(departmentIndex).removeAt(employeeIndex);
  }

  // Submit form method
  onSubmit() {
    if (this.companyForm.valid) {
      console.log(this.companyForm.value);
    }
  }

  moveUp(i: number,j: number) {
     console.log(i,j);
     const data=  this.getEmployees(i).value;
     const current = data[j];
     data[j] = data[j-1]
     data[j-1] = current;
     console.log(data);
     
     this.getEmployees(i).clear();
     for(const emp of data){
       this.addEmployee(i,emp)
      //  emp.patchValue(emp);
     }
      
     console.log(this.getEmployees(i).value);
     
    }

    moveUpDepartment(i: number) {

          const employees=  this.getEmployees(i).value;

          const data=  this.departments.value;
          console.log(data);
          
          const current = data[i];
          data[i] = data[i-1]
          data[i-1] = current;
          console.log(data);

          this.departments.clear();
          for(const dep of data){
            this.addDepartment(dep)
          }
           
          // console.log(this.getEmployees(i).value);
      }
      
}
