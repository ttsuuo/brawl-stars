import { Component, inject } from '@angular/core';
import { interval, Subscription, timer, shareReplay, take } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  imports: [],
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.css',
})
export class Stopwatch {
  isRunning = false;
  timer?: Subscription;
  count = 0;
  private cdr = inject(ChangeDetectorRef);
  private lastClickTime = 0;
  

  get buttonText(): string {
    return this.isRunning ? 'STOP' : 'START';
  }

  startTimer() {
    this.timer = interval(1000).subscribe(() => {
      this.count++
      this.cdr.detectChanges();
    })
    this.isRunning = true;
  }


  stopTimer() {
    this.count = 0;
    this.timer?.unsubscribe();
    this.isRunning = false;
  }

  waitTimer() {
    const currentTime = Date.now();
    const diff = currentTime - this.lastClickTime;

    if (diff <= 300) {
      console.log(this.count)
    }

    this.lastClickTime = currentTime;
  }

  resetTimer() {
    this.count = 0;
    if (this.isRunning) {
      this.timer?.unsubscribe();
      this.startTimer();
    } else {
      this.timer?.unsubscribe();
      this.startTimer()
    }
  }
  
  buttonCLicked() {
    if (this.isRunning) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }
}
