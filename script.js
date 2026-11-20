// Busca simples: esconde as seções que não contêm o texto digitado.
const busca = document.getElementById("busca");
const secoes = document.querySelectorAll("main section");
busca.addEventListener("input", () => {
  const termo = busca.value.trim().toLowerCase();
  secoes.forEach(s => {
    s.classList.toggle("oculto", termo !== "" && !s.textContent.toLowerCase().includes(termo));
  });
});
