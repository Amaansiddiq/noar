import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMasterComponent } from './category-master.component';

describe('CategoryMasterComponent', () => {
  let component: CategoryMasterComponent;
  let fixture: ComponentFixture<CategoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
