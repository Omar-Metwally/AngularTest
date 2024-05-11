import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MealReviewService } from '../api/services';
import { MealReviewPost$Params } from '../api/fn/meal-review/meal-review-post';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared/shared.service';

interface ReviewData{
  mealID: string;
}

@Component({
  selector: 'app-review-meal',
  standalone: true,
  imports: [CommonModule, SharedModule, MatIconModule, NgbRatingModule, MatIconButton, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './review-meal.component.html',
  styleUrl: './review-meal.component.css'
})
export class ReviewMealComponent {
rating: number = 0;
text: string = '';
mealID: string = '';

  constructor(public dialogRef: MatDialogRef<ReviewMealComponent>,
    private mealReviewService: MealReviewService,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) private data: ReviewData
    ) {
      console.log(data)
      this.mealID = data.mealID
  }

  submitReview(){
    const request: MealReviewPost$Params = {
      body: {
        MealID: this.mealID,
        Text: this.text,
        Rating: this.rating
      }
    }
    console.log(request)
    this.mealReviewService.mealReviewPost(request).subscribe({
      next: (response) => {
        
        this.sharedService.showPopUp('success','Review Submitted')
        this.close();
        
      },
      error: (error) => {
        
        this.sharedService.showPopUp('danger','Error, please refresh your page')
        this.close();
        
      }
    });
  }

  close(){
    this.dialogRef.close()
  }
}
