import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswerfieldComponent } from './answerfield.component';

describe('AnswerfieldComponent', () => {
  let component: AnswerfieldComponent;
  let fixture: ComponentFixture<AnswerfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
