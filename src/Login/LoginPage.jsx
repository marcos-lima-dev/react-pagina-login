import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [dadosDoFormulario, setDadosDoFormulario] = useState({
    email: '',
    senha: ''
  });
  const [errosDoFormulario, setErrosDoFormulario] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar os dados do formulário
    const erros = {};

    // Validação do email
    if (!dadosDoFormulario.email.trim()) {
      erros.email = 'O e-mail é obrigatório';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(dadosDoFormulario.email)) {
      erros.email = 'E-mail inválido';
    }

    // Validação da senha
    if (!dadosDoFormulario.senha.trim()) {
      erros.senha = 'A senha é obrigatória';
    } else if (dadosDoFormulario.senha.length < 6) {
      erros.senha = 'A senha deve ter no mínimo 6 caracteres';
    }

    setErrosDoFormulario(erros);

    // Se não houver erros, enviar o formulário
    if (Object.keys(erros).length === 0) {
      // Aqui você pode adicionar a lógica de autenticação
      console.log('Formulário enviado:', dadosDoFormulario);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosDoFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Verifica se o formulário é válido
  const formValido = Object.keys(errosDoFormulario).length === 0;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-lg">
        {/* Cabeçalho */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Bem-vindo</h2>
          <p className="mt-2 text-gray-600">Faça login para acessar sua conta</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Campo de E-mail */}
          <div className="relative">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={dadosDoFormulario.email}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errosDoFormulario.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="seu@email.com"
              />
            </div>
            {errosDoFormulario.email && (
              <div className="text-red-500 text-sm mt-1">{errosDoFormulario.email}</div>
            )}
          </div>

          {/* Campo de Senha */}
          <div className="relative">
            <label htmlFor="senha" className="text-sm font-medium text-gray-700 block mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={mostrarSenha ? 'text' : 'password'}
                id="senha"
                name="senha"
                value={dadosDoFormulario.senha}
                onChange={handleChange}
                className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errosDoFormulario.senha ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {mostrarSenha ? <EyeOff className="h-5 w-5" /> : <Eye className="h -5 w-5" />}
              </button>
            </div>
            {errosDoFormulario.senha && (
              <div className="text-red-500 text-sm mt-1">{errosDoFormulario.senha}</div>
            )}
          </div>

          {/* Lembrar-me e Esqueceu a Senha */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="lembrar-me"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="lembrar-me" className="ml-2 block text-sm text-gray-700">
                Lembrar-me
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Esqueceu a senha?
            </a>
          </div>

          {/* Botão de Enviar */}
          <button
            type="submit"
            disabled={!formValido}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              formValido
                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Entrar
          </button>

          {/* Link de Cadastro */}
          <p className="text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;