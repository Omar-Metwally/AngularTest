import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MealsService } from '../api/services';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule ,NgbCarouselModule , MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('mealCards', { read: ElementRef })
  public mealCards!: ElementRef<any>;

  constructor(private mealsService: MealsService){

  }

  loadMeals(){

  }
  
  // scrollRight(scrollable: CdkScrollable) {
  //   scrollable.scrollTo({ left: (scrollable.measureScrollOffset('left') + scrollable.getElementRef().nativeElement.offsetWidth) });
  // }

  // scrollLeft(scrollable: CdkScrollable) {
  //   scrollable.scrollTo({ left: (scrollable.measureScrollOffset('left') - scrollable.getElementRef().nativeElement.offsetWidth) });
  // }

  public scrollRight(): void {
    this.mealCards.nativeElement.scrollTo({ left: (this.mealCards.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.mealCards.nativeElement.scrollTo({ left: (this.mealCards.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

}
