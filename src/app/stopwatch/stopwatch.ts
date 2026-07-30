import { Component, DestroyRef, ViewChild, ElementRef, inject, AfterViewInit } from '@angular/core';
import { interval, Subscription, map, fromEvent, merge, Subject, Observable, timer, buffer, switchMap, BehaviorSubject, takeUntil, startWith, take, debounceTime, filter, scan } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-stopwatch',
  imports: [CommonModule],
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.css',
})
export class Stopwatch implements AfterViewInit {
  isRunning = false;
  count = '00:00:00';
  savedValue = 0;

  tryTimer$ = interval(1000)

  private loadUserClick$ = new Subject<void>();
  private stopUserClick$ = new Subject<void>();
  savedTimer$ = new BehaviorSubject<number>(0);
  lastSavedValue: number

  timer$: Observable<number> = this.loadUserClick$.pipe(
    switchMap(() => merge(
      timer(0, 1000).pipe(
        // map(() => {
        //   const nextValue = this.savedTimer$.value + 1;
        //   this.savedTimer$.next(nextValue);
        //   return nextValue;
        // }),
        takeUntil(this.stopUserClick$)
      ),
      this.stopUserClick$.pipe(
        map(() => 0),
        take(1)
      )
    )), 
    startWith(0)
  )


  startCount() {
    this.loadUserClick$.next();
    this.isRunning = true;
  }

  stopCount() {
    this.stopUserClick$.next();
    this.isRunning = false;
  }
  
  @ViewChild('waitBtn') 
  waitButton!: ElementRef;
  private destroyRef = inject(DestroyRef);

  
  waitBtnClicked() {
    const click$ = fromEvent(this.waitButton.nativeElement, 'click');

    const doubleClick$ = click$.pipe(
      buffer(click$.pipe(debounceTime(300))),
      map(clicks => clicks.length),
      filter(clicksLength => clicksLength >= 2),
      takeUntilDestroyed(this.destroyRef)
    )

    doubleClick$.subscribe(() => {
      this.stopCount()
    })
  }
  
  ngAfterViewInit() {
    this.waitBtnClicked()
  }

  timer?: Subscription;
  private lastClickTime = 0;

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
    this.isRunning = true;
    this.loadUserClick$.next();
  }
  
  buttonCLicked() {
    if (this.isRunning) {
      this.stopCount()
    } else {
      this.startCount()
    }
  }

  ngOnDestroy() {
    this.timer?.unsubscribe();
  }
}