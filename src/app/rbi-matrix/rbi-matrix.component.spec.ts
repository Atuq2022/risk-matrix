import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbiMatrixComponent } from './rbi-matrix.component';

describe('RbiMatrixComponent', () => {
  let component: RbiMatrixComponent;
  let fixture: ComponentFixture<RbiMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbiMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbiMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
