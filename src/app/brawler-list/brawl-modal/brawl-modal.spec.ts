import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrawlModal } from './brawl-modal';

describe('BrawlModal', () => {
  let component: BrawlModal;
  let fixture: ComponentFixture<BrawlModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrawlModal],
    }).compileComponents();

    fixture = TestBed.createComponent(BrawlModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
