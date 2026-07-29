import { Component, inject } from '@angular/core';
import { interval, Subscription, map } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  imports: [],
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.css',
})
export class Stopwatch {
  isRunning = false;
  count = '00:00:00';
  savedValue = 0;

  timer?: Subscription;
  private cdr = inject(ChangeDetectorRef);
  private lastClickTime = 0;

  get buttonText(): string {
    return this.isRunning ? 'STOP' : 'START';
  }

  createIntervalFrom(savedValue: number) {
    return interval(1000).pipe(
      map(tick => savedValue + tick + 1)
    )
  }

  formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  startTimer() {
    if (this.isRunning) return;

    this.timer = this.createIntervalFrom(this.savedValue).subscribe((val) => {
      this.savedValue = val;
      this.count = this.formatTime(val);
      this.cdr.detectChanges();
    })
    this.isRunning = true;
  }

  stopTimer() {
    this.timer?.unsubscribe();
    this.savedValue = 0;
    this.count = '00:00:00';
    this.isRunning = false;
  }

  waitTimer() {
    const currentTime = Date.now();
    const diff = currentTime - this.lastClickTime;

    if (diff <= 300) {
      if (this.timer) {
        this.timer.unsubscribe();
        this.isRunning = false;
      }
    }

    this.lastClickTime = currentTime;
  }

  resetTimer() {
    this.timer?.unsubscribe();
    this.savedValue = 0;
    this.count = '00:00:00';
    this.isRunning = false;
    this.startTimer();
  }
  
  buttonCLicked() {
    if (this.isRunning) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  ngOnDestroy() {
    this.timer?.unsubscribe();
  }
}