import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilListComponent } from './profil-list.component';

describe('ProfilListComponent', () => {
  let component: ProfilListComponent;
  let fixture: ComponentFixture<ProfilListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
