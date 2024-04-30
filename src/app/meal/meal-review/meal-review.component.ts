import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, input } from '@angular/core';
import { MealReviewGet$Params } from 'src/app/api/fn/meal-review/meal-review-get';
import { MealReviewGetMealReviewGet$Params } from 'src/app/api/fn/meal-review/meal-review-get-meal-review-get';
import { MealReviewService } from 'src/app/api/services';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-meal-review',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './meal-review.component.html',
  styleUrl: './meal-review.component.css'
})
export class MealReviewComponent implements OnInit {
  @Input() mealID: string | null = ''

  constructor(private mealReview: MealReviewService) {
  }
  ngOnInit(): void {
    if(this.mealID != null){
      const request: MealReviewGetMealReviewGet$Params = { MealID:this.mealID}
      this.mealReview.mealReviewGetMealReviewGet(request).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }


}
