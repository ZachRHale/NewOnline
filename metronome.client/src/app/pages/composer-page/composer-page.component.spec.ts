import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposerPageComponent } from './composer-page.component';

describe('ComposerPageComponent', () => {
  let component: ComposerPageComponent;
  let fixture: ComponentFixture<ComposerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComposerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComposerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
