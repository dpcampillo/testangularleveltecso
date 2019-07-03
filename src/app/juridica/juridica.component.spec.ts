import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuridicaComponent } from './juridica.component';

describe('JuridicaComponent', () => {
  let component: JuridicaComponent;
  let fixture: ComponentFixture<JuridicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuridicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
