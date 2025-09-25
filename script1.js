// Menu hamburguer responsivo
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar").querySelector("ul");


menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});


// Formulário de Contato
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();


  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();


  if (!name || !email || !message) {
    alert("Por favor, preencha todos os campos do formulário de contato.");
    return;
  }


  document.getElementById('responseMessage').textContent =
    `Obrigado pelo contato, ${name}! Entraremos em contato via ${email}.`;


  this.reset();
});


// Formulário de Newsletter
document.getElementById('newsletterForm').addEventListener('submit', function (e) {
  e.preventDefault();


  const newsletterEmail = document.getElementById('newsletterEmail').value.trim();


  if (!newsletterEmail) {
    alert("Por favor, insira seu e-mail para assinar a newsletter.");
    return;
  }


  document.getElementById('responseMessage').textContent =
    `Obrigado por assinar nossa newsletter com o e-mail: ${newsletterEmail}`;


  this.reset();
});

