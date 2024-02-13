import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnDestroy, Output, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileHandle } from './file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [ CommonModule ,FormsModule,ReactiveFormsModule,],
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
      console.log($event,file)
    if (!file || file.type !== 'image/jpeg') {
      this.control.reset();
    } else {
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }

      // const reader = new FileReader();
      // reader.onload = (e: any) => {
      //   this.imagePath.setValue(e.target.result); // set imagePath to data URL
      //   resolve(this.imagePath);
      // };
      // reader.readAsDataURL(file); // read file as data URL
      this.control.setValue(fileHandle)
    }
    //console.log(this.file, this.control)
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragover = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragover = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragover = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.control.setValue(files[0]);
    }
  }

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
