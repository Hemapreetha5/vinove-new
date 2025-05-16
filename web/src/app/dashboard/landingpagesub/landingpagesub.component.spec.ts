import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpagesubComponent } from './landingpagesub.component';

describe('LandingpagesubComponent', () => {
  let component: LandingpagesubComponent;
  let fixture: ComponentFixture<LandingpagesubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingpagesubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpagesubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
