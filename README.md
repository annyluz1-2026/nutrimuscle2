# Nutrimuscle - Site de Nutrição

Um site web completo desenvolvido com HTML, CSS e JavaScript puro, baseado nos designs fornecidos. O site inclui funcionalidades de login, navegação entre seções, banco de dados simulado e interface responsiva.

## 🚀 Funcionalidades

### ✅ Autenticação
- Sistema de login com validação
- Usuários pré-cadastrados no banco de dados
- Funcionalidade "Esqueceu senha"
- Persistência de login no localStorage

### ✅ Navegação
- Menu hambúrguer responsivo
- Navegação entre 5 seções principais:
  - **Login**: Formulário de autenticação
  - **Formulário**: Campos editáveis para dados do usuário
  - **Usuários**: Grid de avatares com informações dos profissionais
  - **Contato**: Paisagem com informações de contato
  - **Receitas**: Cards de receitas com detalhes

### ✅ Interface Visual
- Design fiel aos mockups fornecidos
- Logo do abacate animado
- Paleta de cores verde natural
- Padrão de fundo com vegetais
- Animações e transições suaves
- Layout responsivo para mobile e desktop

### ✅ Banco de Dados Simulado
- Usuários com credenciais de acesso
- Informações de profissionais de nutrição
- Dados de contato organizados
- Receitas com ingredientes e categorias
- Persistência no localStorage

## 🔧 Como Usar

### 1. Abrir o Site
Abra o arquivo `index.html` em qualquer navegador web moderno.

### 2. Fazer Login
Use uma das credenciais pré-cadastradas:

**Administrador:**
- Email: `admin@nutrimuscle.com`
- Senha: `123456`

**Usuário Teste:**
- Email: `user@nutrimuscle.com`
- Senha: `password`

### 3. Navegar pelo Site
- Clique no menu hambúrguer (☰) no canto superior direito
- Selecione qualquer seção do menu para navegar
- Interaja com os elementos clicáveis em cada seção

### 4. Funcionalidades por Seção

#### Login
- Preencha email e senha
- Use o botão 👁 para mostrar/ocultar senha
- Clique em "Esqueceu senha" para recuperação
- Clique "Entrar" para autenticar

#### Usuários
- Clique em qualquer avatar para ver informações do profissional
- Cada avatar representa um nutricionista diferente

#### Contato
- Clique nos círculos verdes para ver informações de contato
- Cada círculo representa um meio de comunicação diferente

#### Formulário
- Clique nas linhas para editar campos do formulário
- Os dados são salvos automaticamente no localStorage

#### Receitas
- Clique nos cards para ver detalhes das receitas
- Informações incluem ingredientes e categoria

## 📁 Estrutura do Projeto

```
nutrimuscle/
├── index.html          # Estrutura HTML principal
├── style.css           # Estilos CSS completos
├── script.js           # Lógica JavaScript e banco de dados
└── README.md           # Este arquivo de instruções
```

## 🎨 Design

O site foi desenvolvido seguindo fielmente os designs fornecidos:
- Header verde com logo do abacate e título "NUTRIMUSCLE"
- Menu hambúrguer funcional
- Cards com bordas arredondadas e sombras
- Padrão de fundo sutil com vegetais
- Paleta de cores naturais (verdes e bege)
- Footer com logo e texto "CONTATO"

## 💾 Banco de Dados

O sistema utiliza um banco de dados simulado em JavaScript com:

### Usuários
- 2 usuários pré-cadastrados para teste
- Autenticação por email/senha
- Dados persistidos no localStorage

### Profissionais
- 8 nutricionistas com especialidades diferentes
- Informações de experiência e área de atuação

### Contatos
- 8 meios de comunicação diferentes
- WhatsApp, Email, Redes Sociais, etc.

### Receitas
- 3 receitas de exemplo
- Categorizadas por tipo (Bebidas, Pratos, Sobremesas)

## 🔒 Segurança

**Nota:** Este é um projeto de demonstração. Em um ambiente de produção:
- Senhas devem ser criptografadas
- Autenticação deve ser feita no servidor
- Dados sensíveis não devem ficar no frontend

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🌟 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos, animações e responsividade
- **JavaScript ES6+**: Lógica, DOM e banco de dados simulado
- **LocalStorage**: Persistência de dados no navegador

## 🚀 Próximos Passos

Para evolução do projeto, considere:
- Integração com backend real
- Sistema de cadastro de novos usuários
- Upload de imagens para receitas
- Sistema de favoritos
- Notificações push
- PWA (Progressive Web App)

---

**Desenvolvido com ❤️ seguindo os designs fornecidos**

