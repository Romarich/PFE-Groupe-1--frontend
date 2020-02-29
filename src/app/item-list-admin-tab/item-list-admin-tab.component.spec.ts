import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemListAdminTabComponent} from './item-list-admin-tab.component';

describe('ItemListAdminTabComponent', () => {
  let component: ItemListAdminTabComponent;
  let fixture: ComponentFixture<ItemListAdminTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListAdminTabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListAdminTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
