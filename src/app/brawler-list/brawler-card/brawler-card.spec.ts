import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrawlerCard } from './brawler-card';

describe('BrawlerCard', () => {
  let component: BrawlerCard;
  let fixture: ComponentFixture<BrawlerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrawlerCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BrawlerCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
