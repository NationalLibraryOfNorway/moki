import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDetailsComponent } from './production-details.component';

describe('ProductionDetailsComponent', () => {
  let component: ProductionDetailsComponent;
  let fixture: ComponentFixture<ProductionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
