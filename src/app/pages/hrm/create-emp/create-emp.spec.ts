import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmp } from './create-emp';

describe('CreateEmp', () => {
  let component: CreateEmp;
  let fixture: ComponentFixture<CreateEmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
