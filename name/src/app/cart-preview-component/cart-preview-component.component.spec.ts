import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPreviewComponentComponent } from './cart-preview-component.component';

describe('CartPreviewComponentComponent', () => {
  let component: CartPreviewComponentComponent;
  let fixture: ComponentFixture<CartPreviewComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartPreviewComponentComponent]
    });
    fixture = TestBed.createComponent(CartPreviewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
