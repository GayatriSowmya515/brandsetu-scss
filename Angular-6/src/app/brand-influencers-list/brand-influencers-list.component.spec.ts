import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandInfluencersListComponent } from './brand-influencers-list.component';

describe('BrandInfluencersListComponent', () => {
  let component: BrandInfluencersListComponent;
  let fixture: ComponentFixture<BrandInfluencersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandInfluencersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandInfluencersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
