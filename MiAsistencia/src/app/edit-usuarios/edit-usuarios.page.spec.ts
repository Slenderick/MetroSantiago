import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUsuariosPage } from './edit-usuarios.page';

describe('EditUsuariosPage', () => {
  let component: EditUsuariosPage;
  let fixture: ComponentFixture<EditUsuariosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
