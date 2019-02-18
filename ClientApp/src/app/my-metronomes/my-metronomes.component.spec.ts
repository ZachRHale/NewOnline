import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMetronomesComponent } from './my-metronomes.component';

describe('MyMetronomesComponent', () => {
  let component: MyMetronomesComponent;
  let fixture: ComponentFixture<MyMetronomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMetronomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMetronomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
