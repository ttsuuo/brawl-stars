import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrawlerList } from './brawler-list';

describe('BrawlerList', () => {
  let component: BrawlerList;
  let fixture: ComponentFixture<BrawlerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrawlerList],
    }).compileComponents();

    fixture = TestBed.createComponent(BrawlerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
