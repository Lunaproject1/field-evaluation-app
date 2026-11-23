# FIELD EVALUATION APP — DOSSIER TÉCNICO E CONTINUIDADE v2.0
**Checkpoint:** 23-11-2026. Documento vivo; atualizar após cada release e descoberta relevante.

## 1. Identidade e arquitetura observada
- Repositório: https://github.com/Lunaproject1/field-evaluation-app
- Branch publicada: `main`; app: https://lunaproject1.github.io/field-evaluation-app/
- Baseline observada por leitura de GitHub: título `Field Evaluation App v38.55` em `index.html`; `sw.js` com cache `field-eval-v38-55`.
- Código principal `index.html` (HTML/CSS/JS integrado); `sw.js` service worker; manifest e icon referenciados.
- SW observado: instala assets locais, tenta network-first em GET da mesma origem e usa cache em falha. **Risco a testar:** cache de respostas HTTP com erro e atualização offline; não presumir robustez.
- Uso offline/PWA é objetivo central. Presença de referências externas (ex.: Google Fonts) exige teste de fallback offline.
- Linear e GitHub passam a ser ferramentas de gestão e desenvolvimento. Esta app não é a LUNA Training TUG-16 e não se presume partilha de dados.

## 2. Comportamento funcional conhecido
- Physical: registos por militar/callsign, múltiplas datas, avaliações Combat/Non-Combat, import/export JSON, persistência, imagem, Operational Report, Quick Brief e estatísticas.
- Combat PASS >=330 e >=60 por exercício; Non-Combat PASS >=280 e >=50 por exercício. Avaliações ajustadas/excluídas podem ser NOT ASSESSED; incompletas não contam como resultados completos.
- Individual Progress, menu lateral: pesquisa, seleção de datas, histórico, comparações por exercício, gráfico selecionável, peso e relatório copiável.
- Shooting é módulo independente e fora do âmbito das fases seguintes.
- Identidade por callsign normalizado pode colidir entre militares; risco conhecido para evolução longitudinal.
- O utilizador confirmou v38.55 operacional. Não equivale a auditoria SAFE integral.

## 3. Histórico recente
- v38.52: Quick Brief em formato de mensagem concisa, aprovado.
- v38.53: início do histórico longitudinal.
- v38.54: Individual Progress isolado no menu lateral.
- v38.55: pesquisa de callsign, escolha de avaliações, comparação por exercício, gráficos e relatório; validado funcionalmente pelo utilizador.
- 23-11-2026: governança migrada para GitHub + Linear; SOP/checklist antigos foram apagados intencionalmente por desatualização e substituídos por v2.0. Nenhum código de app alterado nesta operação documental.

## 4. Próximo desenvolvimento aprovado
**Fase 1:** perfil e dashboard visual do militar, separadores, cartões de desempenho, comparação de 2/3/todas as datas lado a lado.
**Fase 2:** estatísticas de tendência e consistência, médias, amplitude/desvio-padrão, recordes pessoais, distância aos mínimos, análise por exercício e peso.
**Não incluído nesta autorização:** publicar automaticamente, alterar Shooting ou implementar a Fase 3 narrativa.

## 5. Decisões, riscos e lacunas
- Preservar Operational Report e Quick Brief aprovados.
- Comparações devem explicitar quando há apenas 1 ou 2 observações; tendências requerem amostra suficiente.
- Separar resultados brutos, pontos e standard; mudanças de escalão podem alterar pontos sem mudança de desempenho bruto.
- Peso é descritivo, não um objetivo corporal.
- Exigir testes de persistência, import/export, SW offline, Android/PWA, runtime e regressão Shooting antes de SAFE.
- Auditoria técnica completa da v38.55 ainda não documentada; não inferir aprovação de seis verificações sintáticas.

## 6. Processo de checkpoint
Em cada entrega: data, versão, issue Linear, baseline SHA, commit/PR, alteração, dados/migração, testes e resultados, limitações, autorização de publicação, feedback e estado SAFE. Registar bugs no ROADMAP e issues próprios.

## 7. Referências
[SOP](SOP.md) · [SAFE](SAFE_CHECKLIST.md) · [ROADMAP](ROADMAP.md) · [Projeto Linear](https://linear.app/tuga1989/project/field-evaluation-app-physical-and-shooting-77b4c7208ae3) · [LUNA Dossier](https://linear.app/tuga1989/document/luna-dossier-tecnico-oficial-2713d1eb291d)

## Checkpoint de desenvolvimento — 23-11-2026
- TUG-61 e TUG-62 implementados em branch isolada `feature/tug-61-62-individual-progress` no commit `1c9aa476da8c7fd3825a8ac8a40122cce40dfb60`.
- Novos separadores, perfil, indicadores, comparação lado a lado, estatísticas descritivas, recordes, tendências e distância aos mínimos. Sem migração ou alteração deliberada de dados; Shooting não modificado.
- QA limitado a parse de scripts e teste sintético de estatísticas. SAFE, browser e Android pendentes. **Não publicado**; `main` permanece v38.55.

## Release v38.56 — 23-11-2026
- PR #1 merged com autorização expressa para disponibilizar a app para teste. Commit merge `dc638b2c9b96b97ee859d2af790902553c9aee6a`.
- Read-back em `main`: index v38.56, service worker field-eval-v38-56. Publicada via GitHub Pages (propagação e browser ainda por confirmar).
- Estado PUBLISHED/TECH CHECKED; não SAFE. QA real, offline, import/export, Shooting, Android e aceitação pendentes.
