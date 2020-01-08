import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMetronomeComponent } from './new-metronome.component';

describe('NewMetronomeComponent', () => {
  let component: NewMetronomeComponent;
  let fixture: ComponentFixture<NewMetronomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMetronomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMetronomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
