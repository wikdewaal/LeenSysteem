import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfhandelenLeningComponent } from './afhandelen-lening.component';

describe('AfhandelenLeningComponent', () => {
  let component: AfhandelenLeningComponent;
  let fixture: ComponentFixture<AfhandelenLeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfhandelenLeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfhandelenLeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
