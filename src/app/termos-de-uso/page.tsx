'use client';

import React from 'react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

const TermosDeUsoPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Documento Legal</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight">
              Termos e Condições
              <span className="block text-purple-600">de Uso</span>
            </h1>

            <p className="text-xl text-black/70 leading-relaxed max-w-2xl mx-auto">
              Regulamentação completa do uso da plataforma WAYDRIVE para garantir uma experiência segura e transparente para todos os usuários.
            </p>
          </div>

          {/* Informações da Empresa */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 text-white mb-12">
            <div className="text-center">
              <img
                src="/logo-branco.png"
                alt="Way"
                className="h-16 mx-auto mb-6 filter brightness-0 invert"
              />
              <h2 className="text-2xl font-bold mb-6">WAY DRIVE BR TECNOLOGIA LTDA</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span><strong>CNPJ:</strong> 56.051.643/0001-19</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span><strong>Endereço:</strong> Av. Afonso Pena, 1206 – Natal/RN</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span><strong>CEP:</strong> 59020-265</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span><strong>Telefone:</strong> (84) 92003-9860</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span><strong>E-mail:</strong> contato@waydrivebr.com.br</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span><strong>Site:</strong> www.waydrivebr.com.br</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo dos Termos */}
          <div className="prose max-w-none">

            {/* 1. Introdução */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">1</div>
                <h2 className="text-3xl font-bold text-black">Introdução</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-lg text-black/80 leading-relaxed">
                  Estes Termos e Condições regulam o uso da plataforma WAYDRIVE, de propriedade da WAY DRIVE BR TECNOLOGIA LTDA, que conecta passageiros e motoristas parceiros para a realização de viagens intermediadas por meio de aplicativo móvel.
                </p>
                <p className="text-lg text-black/80 leading-relaxed mt-4">
                  Ao se cadastrar e utilizar os serviços da WAYDRIVE, o usuário declara que leu, compreendeu e aceitou integralmente as disposições deste documento.
                </p>
              </div>
            </section>

            {/* 2. Categorias Disponíveis */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">2</div>
                <h2 className="text-3xl font-bold text-black">Categorias Disponíveis</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-lg text-black/80 leading-relaxed mb-6">
                  A WAYDRIVE disponibiliza aos passageiros diferentes modalidades de transporte, de acordo com a necessidade:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: 'WAY X',
                      desc: 'Corridas econômicas e acessíveis',
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                        </svg>
                      )
                    },
                    {
                      name: 'WAY COMFORT',
                      desc: 'Corridas mais confortáveis, veículos com maior comodidade',
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      )
                    },
                    {
                      name: 'WAY MOTO',
                      desc: 'Corridas rápidas realizadas em motocicletas',
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )
                    },
                    {
                      name: 'WAY MOVE',
                      desc: 'Transporte de cargas e materiais (veículos pick-up e Baú)',
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      )
                    },
                    {
                      name: 'WAY BUGGY',
                      desc: 'Experiência diferenciada em veículos tipo buggy, especialmente para lazer e turismo',
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )
                    }
                  ].map((category) => (
                    <div key={category.name} className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-purple-600">{category.icon}</div>
                        <h3 className="font-bold text-purple-600">{category.name}</h3>
                      </div>
                      <p className="text-sm text-black/70">{category.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Definições */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">3</div>
                <h2 className="text-3xl font-bold text-black">Definições</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="space-y-4">
                  {[
                    { term: 'Plataforma WAYDRIVE', def: 'aplicativo e sistema digital operado pela WAY DRIVE BR TECNOLOGIA LTDA.' },
                    { term: 'Passageiro', def: 'usuário que solicita corridas por meio da plataforma.' },
                    { term: 'Motorista Parceiro', def: 'usuário que aceita realizar corridas mediante remuneração.' },
                    { term: 'Conta de Usuário', def: 'registro pessoal, único e intransferível de cada usuário (motorista ou passageiro).' }
                  ].map((item) => (
                    <div key={item.term} className="flex gap-4">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <strong className="text-purple-600">{item.term}:</strong>
                        <span className="text-black/80 ml-1">{item.def}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Cadastro e Conta do Usuário */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">4</div>
                <h2 className="text-3xl font-bold text-black">Cadastro e Conta do Usuário</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="space-y-4">
                  {[
                    'O cadastro exige informações verdadeiras e atualizadas.',
                    'É vedado o uso de identidade falsa ou de terceiros sem autorização.',
                    'A conta é pessoal e intransferível, sendo vedado compartilhamento de acesso.'
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-black/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. Conduta dos Usuários */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">5</div>
                <h2 className="text-3xl font-bold text-black">Conduta dos Usuários</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Passageiros */}
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Passageiros
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Utilizar o cinto de segurança ou capacete (no caso do WAY MOTO).',
                      'Não portar armas, drogas ou objetos ilícitos.',
                      'Não consumir bebidas alcoólicas abertas ou drogas durante a corrida.',
                      'Zelar pelo bom estado do veículo, evitando danos e sujeira.',
                      'Tratar o motorista com respeito, sem discriminação, assédio ou agressões.'
                    ].map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-black/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Motoristas */}
                <div className="bg-yellow-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Motoristas Parceiros
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Cumprir integralmente o Código de Trânsito Brasileiro.',
                      'Manter CNH, documentos do veículo e seguro válidos.',
                      'Não dirigir sob efeito de álcool, drogas ou substâncias proibidas.',
                      'Não discriminar passageiros por motivo de raça, gênero, religião, idade, nacionalidade ou condição física.',
                      'Manter higiene, cordialidade e profissionalismo.'
                    ].map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-black/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Seções 6-11 */}
            {[
              {
                number: 6,
                title: 'Pagamentos e Tarifas',
                content: [
                  'O valor das corridas será informado previamente ao passageiro pelo aplicativo.',
                  'A WAYDRIVE intermedia o pagamento entre passageiro e motorista, retendo taxa de serviço previamente definida.',
                  'O motorista parceiro receberá os valores líquidos de acordo com as condições estabelecidas em contrato específico.'
                ]
              },
              {
                number: 7,
                title: 'Responsabilidades',
                content: [
                  'A WAYDRIVE atua exclusivamente como intermediadora tecnológica, conectando motoristas e passageiros.',
                  'A empresa não é transportadora, sendo cada corrida de inteira responsabilidade do motorista parceiro que a executa.',
                  'Usuários respondem civil e criminalmente por danos ou ilícitos cometidos durante o uso da plataforma.'
                ]
              },
              {
                number: 8,
                title: 'Penalidades e Encerramento de Conta',
                content: [
                  'Violações destes Termos podem resultar em advertência, bloqueio temporário ou exclusão definitiva da conta.',
                  'Casos graves (fraude, agressão, ilícitos) resultam em desligamento imediato da plataforma.'
                ]
              },
              {
                number: 9,
                title: 'Privacidade e Proteção de Dados',
                content: [
                  'A WAYDRIVE coleta e armazena dados conforme sua Política de Privacidade, em conformidade com a LGPD (Lei 13.709/18).',
                  'Informações pessoais não serão compartilhadas com terceiros sem consentimento, salvo em casos exigidos por lei.'
                ]
              },
              {
                number: 10,
                title: 'Alterações dos Termos',
                content: [
                  'Estes Termos poderão ser atualizados a qualquer momento, sendo comunicados via aplicativo ou site oficial.',
                  'O uso contínuo da plataforma implica na aceitação das alterações.'
                ]
              },
              {
                number: 11,
                title: 'Foro',
                content: [
                  'Para dirimir quaisquer controvérsias, fica eleito o foro da Comarca de Natal/RN, com renúncia de qualquer outro, por mais privilegiado que seja.'
                ]
              }
            ].map((section) => (
              <section key={section.number} className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">{section.number}</div>
                  <h2 className="text-3xl font-bold text-black">{section.title}</h2>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="space-y-4">
                    {section.content.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                        <span className="text-black/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}

            {/* Declaração de Aceite */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <h2 className="text-2xl font-bold">Declaração de Aceite</h2>
                </div>
                <p className="text-lg leading-relaxed max-w-2xl mx-auto">
                  Ao criar uma conta na plataforma WAYDRIVE, o usuário declara que leu, compreendeu e aceitou estes Termos e Condições de Uso.
                </p>
              </div>
            </section>

          </div>

          {/* Navegação Inferior */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-gray-200">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>

            <div className="text-center">
              <p className="text-sm text-black/60">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>

            <a
              href="mailto:contato@waydrivebr.com.br"
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
            >
              Dúvidas?
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermosDeUsoPage;