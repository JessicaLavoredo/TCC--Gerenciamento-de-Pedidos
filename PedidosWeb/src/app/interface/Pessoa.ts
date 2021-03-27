import { Email } from './email';
import { Endereco } from './endereco';
import { telefone } from './telefone';

export interface Pessoa {
	idPessoa: string;
	Descritivo: string;
	tipoPessoa: string;
	nomeRazao: string;
	apelidoFantasia: string;
	cpfCnpj: string;
	rgInscricao: string;
	dataNascimento: string;
	genero: string;
	inativo: boolean;
	dataInclusao: Date;
	vinculos: string[];
	enderecos: Endereco[];
	telefones: telefone[];
	emails: Email[];
}
