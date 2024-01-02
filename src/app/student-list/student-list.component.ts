import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup , Validators } from '@angular/forms';
export interface studentdetail{
  NameOfStudent:string;
  DepartmentName:string
  Grade:string
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {
  @ViewChild('studentList') List: ElementRef | undefined;
  public departmentValue:string=''
  public filteredStudents:studentdetail[]=[]
  public fieldName:string|null=''
  public student:studentdetail[]=[];
  public getDetail:boolean=true
  public type:string=''
  public gradeValue:string=''
  public isInValid:boolean=false
  public color:string="yellow"


  public studentlist= new FormGroup({
    NameOfStudent: new FormControl('', [Validators.required]),
    DepartmentName: new FormControl('', [Validators.required]),
    Grade: new FormControl('', [Validators.required])
  })
  isvalid(str:string):string|any{
    if(!isNaN(parseInt(str))) {
      this.isInValid=true
      alert ("enter valid details")
    }
    else {
      
      return str.toLowerCase()
    }

  }

  Submit(){
    this.getDetail=true
    if (this.studentlist.valid) {
      this.isInValid=false
      let studentDetail: studentdetail = {
        NameOfStudent: this.isvalid(this.studentlist.get('NameOfStudent')?.value ?? ''),
        DepartmentName: this.isvalid(this.studentlist.get('DepartmentName')?.value ?? ''),
        Grade: this.isvalid(this.studentlist.get('Grade')?.value ?? ''),
      };
      if(!this.isInValid)
      this.student.push(studentDetail);
      this.studentlist.reset(); // Clear the form after submission
    }

  }
  Display(){
    this.getDetail=false
    console.log(this.student)
  }
  listAll(){
    this.type="All"
  }
  filter(){
    this.type='filter'
  
  }
  filterByGrade(){
      this.gradeValue=this.isvalid(this.gradeValue)
  
      this.filteredStudents = this.student.filter(std => this.gradeValue === std.Grade);
      if(this.filteredStudents.length===0){
        alert("no grade is found")
      }
  }
filterByDepartment(){
    this.departmentValue=this.isvalid(this.departmentValue)
    this.filteredStudents=this.student.filter(std=> this.departmentValue===std.DepartmentName)
    if(this.filteredStudents.length===0){
      alert("no dept found")
    }
  
  
}
clear(){
  if (this.List) {
    const listElement: HTMLElement = this.List.nativeElement;
    const liElements: HTMLCollectionOf<Element> = listElement.getElementsByTagName('li');
      for(let i=0;i<liElements.length;i++)
      {
        console.log(liElements[i])
        liElements[i].innerHTML = '';
      }
    
  }
  
}
}

