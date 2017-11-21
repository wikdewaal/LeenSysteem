import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UitgeleendeHardwareComponent } from './uitgeleende-hardware.component';

describe('UitgeleendeHardwareComponent', () => {
  let component: UitgeleendeHardwareComponent;
  let fixture: ComponentFixture<UitgeleendeHardwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UitgeleendeHardwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UitgeleendeHardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
