import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnDestroy, Output, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileHandle } from './file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [ CommonModule, SharedModule ,FormsModule ,ReactiveFormsModule ],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css'
})
export class FileInputComponent {
  isDragover = false;
  //file: Blob | null = null;
  // inSubmission = false;
  // percentage = 0;
  // showPercentage = false;
  @Input() imagePath: FormControl = new FormControl()
  @Input() placeholder = ''
  @Input() label = ''
  @Input() format = ''
  @Input() icon = ''
  @Input() style = ''
  @Input() class = ''
  @Input() control: FormControl = new FormControl()
  //@Input() file: Blob | null = null
  @Input() inSubmission = false;
  @Input() percentage = 0;
  @Input() showPercentage = false;
  @Input() showDragAndDrop = true;
  @Input() fileHandle!: FileHandle;

  // storeFile($event: Event) {
  //   this.isDragover = false;

  //   this.file = ($event as DragEvent).dataTransfer
  //     ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
  //     : ($event.target as HTMLInputElement).files?.item(0) ?? null;
  //     console.log(this.control)

  //   this.control.setValue(this.file)

  //   if (!this.file || this.file.type !== 'image/jpeg') {
  //     this.control.reset();
  //     console.log('hi')
  //   }
  //   else {
  //     const reader = new FileReader();
  //     console.log('hi1')
  //     reader.onload = (e: any) => {
  //       this.imagePath = e.target.result; // set control value to data URL
  //     };
  
  //     reader.readAsDataURL(this.file); // read file as data URL
  //     console.log(true)
  //   }
  // }
  constructor(private sanitizer: DomSanitizer){}

  storeFile($event: Event) {
    this.isDragover = false;
  
    const file = ($event as DragEvent).dataTransfer
      ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
      : ($event.target as HTMLInputElement).files?.item(0) ?? null;
      // console.log($event,file)
    if (!file || file.type !== 'image/jpeg') {
      this.control.reset();
    } else {
      const reader = new FileReader();
      const fileHandle: FileHandle = {
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      };

      reader.onload = () => {
        // this.control.setValue(reader.result); // This will log the base64 string
        this.fileHandle.file = reader.result as string; // Store the base64 string in the fileHandle object
        this.control.setValue(fileHandle); // Set the control's value to the base64 string
        console.log(fileHandle.file, this.control);
      };

      reader.readAsDataURL(file);

    //   const reader = new FileReader();
    // reader.onload = () => {
    //   console.log(reader.result); // This will log the base64 string
    // };
    // reader.readAsDataURL(file);

    //   // const reader = new FileReader();
    //   // // reader.readAsArrayBuffer(file);
    //   // // console.log(file)
    //   // reader.onloadend = () => {
    //   //   // if (reader.readyState === FileReader.DONE) {
    //   //   //   const fileString = reader.result as string
    //   //   //   reader.readAsDataURL(fileString)
    //   //   //   console.log(fileString)
    //   //   //   const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
    //   //   //   this.control.setValue(blob)
    //   //   //   // console.log(this.control.value,blob)
    //   //   //   // Process the blob data here, e.g., display filename, upload to server
    //   //   // }
    //   //   reader.readAsDataURL(file);
    //   //   reader.onload = () => {
    //   //       console.log(reader.result);
    //   //   };
    //   // };
    //   // console.log(true)
    //   const fileHandle: FileHandle = {
    //     file: file,
    //     url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
    //   }
      // console.log(fileHandle)


      // const reader = new FileReader();
      // reader.onload = (e: any) => {
      //   this.imagePath.setValue(e.target.result); // set imagePath to data URL
      //   resolve(this.imagePath);
      // };
      // reader.readAsDataURL(file); // read file as data URL
      //this.control.setValue(fileHandle)
    }
    //console.log(this.file, this.control)
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log('hello')
    this.isDragover = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    console.log('welcome')
    this.isDragover = false;
  }

  // @HostListener('drop', ['$event'])
  // onDrop(event: DragEvent) {
  //   event.preventDefault();
  //   this.isDragover = false;
  //   const files = event.dataTransfer?.files;
  //   if (files && files.length > 0) {
  //     this.control.setValue(files[0]);
  //     console.log(true,files[0])
  //   }
  // }

  /*async uploadFile() {
    //this.uploadForm.disable();

    this.control.disable();
    // this.showAlert = true;
    // this.alertColor = 'blue';
    // this.alertMsg = 'Please wait! Your clip is being uploaded.';
    this.inSubmission = true;
    this.showPercentage = true;

    this.task = this.storage.upload(clipPath, this.file);

    combineLatest([
      this.task.percentageChanges(),
    ]).subscribe((progress) => {
      const [clipProgress] = progress;

      if (!clipProgress) {
        return;
      }

      const total = clipProgress ;

      this.percentage = (total as number) / 100;
    });
  }*/


}
