import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoEditComponent } from './profile-info-edit.component';

describe('ProfileInfoEditComponent', () => {
  let component: ProfileInfoEditComponent;
  let fixture: ComponentFixture<ProfileInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
