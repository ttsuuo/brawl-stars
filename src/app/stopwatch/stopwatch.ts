import { Component, DestroyRef, ViewChild, ElementRef, inject, AfterViewInit } from '@angular/core';
import { of, map, fromEvent, merge, Subject, Observable, timer, buffer, switchMap, BehaviorSubject, takeUntil, startWith, take, debounceTime, filter, scan } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormatPipe } from '../pipes/format-pipe';

const CLICK_DURATION_MS = 300;
const INITIAL_VALUE = 0;
const TIMER_INTERVAL = 1000;
@Component({
  selector: 'app-stopwatch',
  imports: [CommonModule, FormatPipe],
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.css',
})
export class Stopwatch implements AfterViewInit {
  isRunning = false;

  private loadUserClick$ = new Subject<void>();
  private stopUserClick$ = new Subject<'PAUSE' | 'RESET'>();
  savedTimer$ = new BehaviorSubject<number>(INITIAL_VALUE);

  private timerController$ = merge(
    this.loadUserClick$.pipe(map(() => 'START')),
    this.stopUserClick$
  );

  timer$: Observable<number> = this.timerController$.pipe(
    switchMap((action) => {
      if (action === 'RESET') {
        this.savedTimer$.next(INITIAL_VALUE);
        return of(INITIAL_VALUE);
      }

      if (action === 'START') {
        return timer(TIMER_INTERVAL, TIMER_INTERVAL).pipe(
          map(() => {
            const nextValue = this.savedTimer$.value + 1;
            this.savedTimer$.next(nextValue);
            return nextValue;
          }),
        )
      }

      return of(this.savedTimer$.value);
    }), 
    startWith(INITIAL_VALUE)
  )

  timer = toSignal(this.timer$, {initialValue: null})

  startTimer() {
    this.loadUserClick$.next();
    this.isRunning = true;
  }

  stopTimer() {
    this.stopUserClick$.next('RESET');
    this.isRunning = false;
  }

  resetTimer() {
    this.isRunning = true;
    this.stopUserClick$.next('RESET');
    this.loadUserClick$.next();
  }

  @ViewChild('waitBtn') 
  waitButton!: ElementRef;
  private destroyRef = inject(DestroyRef);

  waitBtnClicked() {
    const click$ = fromEvent(this.waitButton.nativeElement, 'click');

    click$.pipe(
      buffer(click$.pipe(debounceTime(CLICK_DURATION_MS))),
      filter(clicks => clicks.length >= 2),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.isRunning = false;
      this.stopUserClick$.next('PAUSE');
    })
  }
  
  ngAfterViewInit() {
    this.waitBtnClicked()
  }
  
  buttonCLicked() {
    if (this.isRunning) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }
}