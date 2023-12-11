import { TestBed } from '@angular/core/testing';

import { MantenedorUsuariosService } from './mantenedor-usuarios.service';

describe('MantenedorUsuariosService', () => {
  let service: MantenedorUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenedorUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
