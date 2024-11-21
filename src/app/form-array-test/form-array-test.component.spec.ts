import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayTestComponent } from './form-array-test.component';

describe('FormArrayTestComponent', () => {
  let component: FormArrayTestComponent;
  let fixture: ComponentFixture<FormArrayTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormArrayTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormArrayTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
