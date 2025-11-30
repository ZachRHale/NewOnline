import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComposerComponent } from './create-composer.component';

describe('CreateComposerComponent', () => {
  let component: CreateComposerComponent;
  let fixture: ComponentFixture<CreateComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComposerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
