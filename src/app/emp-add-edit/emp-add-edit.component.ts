import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';
// import { Dialog, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;



  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];



   constructor(private _fb: FormBuilder, private _empService: EmployeeService, private _dialogRef: MatDialogRef<EmpAddEditComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any , private _coreService: CoreService) {
    
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }



  onFormSubmit(){
    if(this.empForm.valid){

      if(this.data){
        this._empService.updateEmployyee(this.data.id,  this.empForm.value).subscribe({
          next:(val:any) =>{
            // alert('Employee details  updated!');
            this._coreService.openSnackBar('Employee details  updated!');
            
            this._dialogRef.close(true);
            
  
          },
          error: (err) =>{
            console.error(err);
  
          }
          
        });

      }
      else{
        this._empService.addEmployyee(this.empForm.value).subscribe({
          next:(val:any) =>{
            // alert('Employee added successfully');
            this._coreService.openSnackBar('Employee added successfull ');
            this._dialogRef.close(true);
  
          },
          error: (err) =>{
            console.error(err);
  
          }
          
        });

      }
     
    }
  }


  






 

}
