import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongPage } from './song.page';

describe('SongPage', () => {
  let component: SongPage;
  let fixture: ComponentFixture<SongPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
