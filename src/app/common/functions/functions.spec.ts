import { getErrorMessage } from './functions';

describe('functions', () => {
  describe('getErrorMessage', () => {
    it('should return "Nome é obrigatório!"', () => {
      expect(getErrorMessage('Nome', { required: true })).toEqual(
        'Nome é obrigatório!'
      );
    });

    it('should return "Nome é obrigatório!"', () => {
      expect(getErrorMessage('Nome', { required: true })).toEqual(
        'Nome é obrigatório!'
      );
    });

    it('should return "Nome precisa ter no mínimo 3 caracteres!"', () => {
      expect(
        getErrorMessage('Nome', { minlength: { requiredLength: 3 } })
      ).toEqual('Nome precisa ter no mínimo 3 caracteres!');
    });

    it('should return "Nome não pode estar em branco"', () => {
      expect(getErrorMessage('Nome', { blankString: true })).toEqual(
        'Nome não pode estar em branco'
      );
    });

    it('should return "" in case there is no errros', () => {
      expect(getErrorMessage('Nome', null)).toEqual('');
    });
  });
});
