import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreOfPasswordComponent } from './restore-of-password.component';

describe('RestoreOfPasswordComponent', () => {
  let component: RestoreOfPasswordComponent;
  let fixture: ComponentFixture<RestoreOfPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoreOfPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreOfPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
