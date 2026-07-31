import { Component, DestroyRef, ViewChild, ElementRef, inject, AfterViewInit } from '@angular/core';
import { of, map, fromEvent, merge, Subject, Observable, timer, buffer, switchMap, BehaviorSubject, takeUntil, startWith, take, debounceTime, filter, scan } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormatPipe } from '../pipes/format-pipe';

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
  savedTimer$ = new BehaviorSubject<number>(0);

  private timerController$ = merge(
    this.loadUserClick$.pipe(map(() => 'START')),
    this.stopUserClick$
  );

  timer$: Observable<number> = this.timerController$.pipe(
    switchMap((action) => {
      if (action === 'RESET') {
        this.savedTimer$.next(0);
        return of(0);
      }

      if (action === 'START') {
        return timer(1000, 1000).pipe(
          map(() => {
            const nextValue = this.savedTimer$.value + 1;
            this.savedTimer$.next(nextValue);
            return nextValue;
          }),
        )
      }

      return of(this.savedTimer$.value);
    }), 
    startWith(0)
  )

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
      buffer(click$.pipe(debounceTime(300))),
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