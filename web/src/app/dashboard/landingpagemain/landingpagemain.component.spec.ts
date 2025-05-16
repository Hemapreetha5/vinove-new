import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpagemainComponent } from './landingpagemain.component';

describe('LandingpagemainComponent', () => {
  let component: LandingpagemainComponent;
  let fixture: ComponentFixture<LandingpagemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingpagemainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpagemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
