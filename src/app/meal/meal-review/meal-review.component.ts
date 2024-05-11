import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, input } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MealReviewGet$Params } from 'src/app/api/fn/meal-review/meal-review-get';
import { MealReviewGetMealReviewGet$Params } from 'src/app/api/fn/meal-review/meal-review-get-meal-review-get';
import { GetMealReviewsRequest } from 'src/app/api/models';
import { MealReviewService } from 'src/app/api/services';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-meal-review',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbRatingModule],
  templateUrl: './meal-review.component.html',
  styleUrl: './meal-review.component.css'
})
export class MealReviewComponent implements OnInit {
  @Input() mealID: string | null = ''
  mealRating : number = 0
  reviews: GetMealReviewsRequest = {

  };
  constructor(private mealReview: MealReviewService) {
  }
  ngOnInit(): void {
    if(this.mealID != null){
      const request: MealReviewGetMealReviewGet$Params = { MealID:this.mealID}
      this.mealReview.mealReviewGetMealReviewGet(request).subscribe({
        next: (response) => {
          this.reviews = response;
          this.reviews.rating = this.calculateAverageRating(this.reviews);
          console.log(response)
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }

  calculateAverageRating(ratings: GetMealReviewsRequest): number {
    let totalRating = 0;
    let totalCount = 0;
  
    // Sum up the total rating based on the count of each star rating
    if (ratings.fiveStarCount !== undefined) {
      totalRating += 5 * ratings.fiveStarCount;
      totalCount += ratings.fiveStarCount;
    }
    if (ratings.fourStarCount !== undefined) {
      totalRating += 4 * ratings.fourStarCount;
      totalCount += ratings.fourStarCount;
    }
    if (ratings.threeStarCount !== undefined) {
      totalRating += 3 * ratings.threeStarCount;
      totalCount += ratings.threeStarCount;
    }
    if (ratings.twoStarCount !== undefined) {
      totalRating += 2 * ratings.twoStarCount;
      totalCount += ratings.twoStarCount;
    }
    if (ratings.oneStarCount !== undefined) {
      totalRating += 1 * ratings.oneStarCount;
      totalCount += ratings.oneStarCount;
    }
  
    // Calculate the average rating
    const averageRating = totalCount === 0 ? 0 : totalRating / totalCount;
    return averageRating;
  }

}
