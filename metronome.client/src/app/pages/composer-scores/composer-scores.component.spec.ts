import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposerScoresComponent } from './composer-scores.component';

describe('ComposerScoresComponent', () => {
  let component: ComposerScoresComponent;
  let fixture: ComponentFixture<ComposerScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComposerScoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComposerScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
