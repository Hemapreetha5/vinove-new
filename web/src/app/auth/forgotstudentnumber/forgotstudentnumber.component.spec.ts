import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotstudentnumberComponent } from './forgotstudentnumber.component';

describe('ForgotstudentnumberComponent', () => {
  let component: ForgotstudentnumberComponent;
  let fixture: ComponentFixture<ForgotstudentnumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotstudentnumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotstudentnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
