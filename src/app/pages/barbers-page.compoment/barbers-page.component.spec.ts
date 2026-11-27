import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbersPageComponent } from './barbers-page.component';

describe('BarbersPageComponent', () => {
  let component: BarbersPageComponent;
  let fixture: ComponentFixture<BarbersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarbersPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BarbersPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
