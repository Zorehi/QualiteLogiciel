import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauMaterielComponent } from './nouveau-materiel.component';

describe('NouveauMaterielComponent', () => {
  let component: NouveauMaterielComponent;
  let fixture: ComponentFixture<NouveauMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauMaterielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
