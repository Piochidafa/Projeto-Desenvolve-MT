# Projeto para o seletivo Desenvolve MT front end 2025 Junior

Este repositório contém uma aplicação **Single Page Application (SPA)** desenvolvida para o teste prático de Desenvolvedor Front-end, consumindo a API pública da Polícia Judiciária Civil de Mato Grosso.

## 👤 Informações do Candidato

- **Nome:** null
- **CPF:** null
- **E-mail:** null
- **Número da inscrição:** null

## 🚀 Como Executar o Projeto

Siga os passos abaixo para executar o projeto localmente utilizando Docker:

1. Acesse o diretório raiz onde se encontra o `Dockerfile`:

2. Rode o comando de instalação das dependencias:

```bash
npm i
```
3. Rode o comando que vai buildar a aplicação e logo em seguida subir no docker:

```bash
npm run docker
```
2. Agora, acesse a aplicação no seu navegador através do endereço:

```
http://localhost:9090
```

### ❗ Observações Importantes

- O objeto de resposta da API  da requisição get https://abitus-api.geia.vip/v1/pessoas/aberto/filtro **não possui uma informação explícita** que indique se uma pessoa está **desaparecida** ou **localizada**, apenas se passar como sobrecarga na requisição.
- Como solução, a aplicação considera critérios como a presença ou ausência de campos (como `dataLocalizacao` ou `status`) para inferir esse status — o que pode não ser 100% preciso.
---

Feito para fins de avaliação técnica.
