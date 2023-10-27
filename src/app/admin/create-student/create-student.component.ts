import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ParentService } from 'src/app/service/parent.service';
import { StudentService } from 'src/app/service/student.service';
import { StudentstatusService } from 'src/app/service/studentstatus.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent {
  constructor(public studentService: StudentService, public studentStatusService: StudentstatusService, public parentService: ParentService,public spinner:NgxSpinnerService,private toastr:ToastrService) { }
  async ngOnInit() {
    await this.studentStatusService.GellAllStudentStatuses()
    await this.parentService.GetAllParents()
  }

  studentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    birthdate: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    latitude: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    parentid: new FormControl('', [Validators.required]),
    statusid: new FormControl('', [Validators.required]),
    busnotify: new FormControl('Y', [Validators.required]),
    absencenotify: new FormControl('Y', [Validators.required]),
    inhomenotify: new FormControl('Y', [Validators.required]),
    inschoolnotify: new FormControl('Y', [Validators.required]),
    tohomenotify: new FormControl('Y', [Validators.required]),
    toschoolnotify: new FormControl('Y', [Validators.required]),
  })




  error:string=''
  nameError:string=''
  birthdateError:string=''
  sexError:string=''
  longitudeError:string=''
  latitudeError:string=''
  parentError:string=''
  statusError:string=''

  getErrorMessage(formField:FormControl,fieldName:string)
  {
    if((fieldName=='name'||fieldName=='longitude'||fieldName=='latitude')&&(formField.value.length>50)){
      this.error=`${fieldName} length must not exceed 50 character`
    }
    else if(formField.invalid){
      this.error=`${fieldName} is required`
    }
    else this.error=''
    switch(fieldName)
    {
      case 'name':this.nameError=this.error;break;
      case 'sex':this.sexError=this.error;break;
      case 'birthdate':this.birthdateError=this.error;break
      case 'longitude':this.longitudeError=this.error;break
      case 'latitude':this.latitudeError=this.error;break
      case 'parent':this.parentError=this.error;break
      case 'status':this.statusError=this.error;break
    }
  }


  async CreateStudent() {
    if(this.studentForm.valid)
    {
      this.spinner.show()
      await this.studentService.CreateStudent(this.studentForm.value)
      this.spinner.hide()
      if(this.studentService.createdStudentId){
        this.toastr.success('student is registred successfully')
      }
      else{
        this.toastr.error('student registration failed')
      }
    }
      else{
      this.getErrorMessage(this.studentForm.controls['name'],'name')
      this.getErrorMessage(this.studentForm.controls['parentid'],'parent')
      this.getErrorMessage(this.studentForm.controls['birthdate'],'birthdate')
      this.getErrorMessage(this.studentForm.controls['sex'],'sex')
      this.getErrorMessage(this.studentForm.controls['statusid'],'status')
      this.getErrorMessage(this.studentForm.controls['longitude'],'longitude')
      this.getErrorMessage(this.studentForm.controls['latitude'],'latitude')
    }
  }

  async UploadStudentImage(files: any) {
    if (files.length == 0) return;

    let formData = new FormData()
    formData.append('file', files[0])
    await this.studentService.UploadStudentImage(formData)

    let input = document.getElementById("image") as HTMLInputElement
    let button = document.getElementById("remove") as HTMLButtonElement
    let img = document.getElementById("chosenImage") as HTMLImageElement
    if (img) {
      input.style.display = "none"
      button.style.display = "block"
      img.src = "../../../assets/Images/" + this.studentService.studentImage.image
    }
  }

  removeImage() {
    let input = document.getElementById('image') as HTMLInputElement
    let button = document.getElementById('remove') as HTMLButtonElement
    let img = document.getElementById('chosenImage') as HTMLImageElement
    if (img) {
      input.style.display = "block"
      button.style.display = "none"
      img.src = "https://via.placeholder.com/150"
      this.studentService.studentImage = ""
    }
  }
}
