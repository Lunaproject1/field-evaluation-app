# FIELD EVALUATION APP — ROADMAP, CHANGE LOG E BUG LOG v2.0
**Checkpoint:** 23-11-2026. Integração formal na família LUNA. Roadmap vivo no modelo LUNA Training TUG-16; issues Linear guardam tarefas individuais e decisões.

## Baseline
- [x] v38.52 — Quick Brief aprovado.
- [x] v38.54 — Individual Progress em vista separada no menu lateral.
- [x] v38.55 — pesquisa de callsigns, seleção de datas, gráficos e comparação por exercício. **Utilizador confirmou operacional**.
- [x] Novas normas de governação GitHub + Linear (documentos v2.0, 23-11-2026).
- [ ] SAFE completo da baseline v38.55 — **não executado**.

## Fase 1 — UI/UX Individual Progress (aprovada para desenvolvimento, não para publicação automática)
- [ ] Cabeçalho de perfil e contexto (callsign, número de avaliações, última data, standard).
- [ ] Separadores Overview, Comparison, Exercise Analysis e Report.
- [ ] Cartões: última pontuação, recorde, evolução e estado.
- [ ] Comparação lado a lado de datas selecionadas, métricas brutas e pontos.
- [ ] Responsividade mobile/tablet/desktop, contraste, acessibilidade e não-regressão.

## Fase 2 — Estatística longitudinal (aprovada para desenvolvimento, não para publicação automática)
- [ ] Médias, mínimos, máximos, amplitude e desvio-padrão por exercício e período.
- [ ] Tendência por período com tamanho de amostra e interpretação prudente.
- [ ] Recordes pessoais e data respetiva.
- [ ] Distância aos mínimos Combat/Non-Combat em total e por exercício.
- [ ] Peso corporal em kg e variação percentual, sem juízos normativos.
- [ ] Testar exclusões, incompletos, mudanças de standard/escalão e identidade por callsign.

## Backlog posterior (não aprovado para implementação)
- [ ] Fase 3 — Performance Assessment narrativo e relatórios aprofundados.
- [ ] Comparações agregadas por secção/unidade.
- [ ] Rever identidade estável dos militares além do callsign.
- [ ] Endurecimento do service worker e auditoria de recuperação offline, se testes confirmarem falhas.

## Change log
- **23-11-2026 (integração LUNA):** SOP v2.1 exige GitHub + Linear em cada alteração, com checkpoints, issues, testes, bugs, documentação e continuidade; projeto Linear renomeado para LUNA | Field Evaluation App. Apenas documentação/governação, sem alterações à app. Commit SOP: `1cbd6e4196f4a2c2032d9220af1de45477a04e73`.\n- **23-11-2026:** criado projeto Linear P-TUG-3, quatro documentos de gestão v1.0; após esclarecimento do proprietário, normas antigas são intencionalmente obsoletas, substituídas por SOP/SAFE/Dossier/Roadmap v2.0 no GitHub e Linear. **Sem alterações ao código da aplicação.**

## Bug log
- **Sem novos bugs confirmados nesta operação.**
- **Risco conhecido, por validar:** agrupamento longitudinal por callsign pode misturar identidades coincidentes.
- **Risco conhecido, por validar:** comportamento do SW em HTTP de erro e atualização de cache.
- Riscos não são bugs confirmados; criar issue de bug apenas após reprodução.

## Modelo de release
Versão | Issue | Baseline SHA | Branch/PR | Commit | Alterações | Testes PASS/FAIL/NOT RUN | Dados/migração | Autorização | Publicação | Aceitação | SAFE.

## Modelo de bug
ID | Versão | Ambiente | Passos | Esperado | Observado | Severidade | Impacto | Evidência | Causa confirmada/hipótese | Fix | Teste regressão | Estado.

## Checkpoint de implementação — 23-11-2026 (branch de desenvolvimento)
- **TUG-61 / TUG-62:** código implementado em `feature/tug-61-62-individual-progress`, commit `1c9aa476da8c7fd3825a8ac8a40122cce40dfb60`; app publicada `main` mantém v38.55.
- Fase 1 implementada em branch: perfil do militar, cartões de indicadores, separadores Overview/Comparison/Exercise Analysis/Report, comparação cronológica lado a lado e estilos responsivos.
- Fase 2 implementada em branch: média, mínimo, máximo, amplitude, desvio-padrão populacional, tamanho de amostra, recorde pessoal/data, tendência com 3+ observações, distância aos mínimos por exercício/total e peso descritivo.
- **QA executado:** parse de 5 scripts inline PASS; teste unitário sintético de 3 avaliações para estatísticas/tendência PASS; inspeção de existência do módulo Shooting PASS. **NOT RUN:** testes reais Android/PWA, browser, offline, import/export, sync, regressões completas e SAFE integral. **Estado:** TECH CHECKED, não SAFE.
- **Publicação:** não autorizada; não houve merge nem alteração à aplicação em produção. Aguardar testes de regressão e autorização específica.
- **Bug log:** nenhum bug confirmado neste checkpoint; riscos existentes mantidos.

## Release v38.56 — 23-11-2026
- Autorização explícita do utilizador para publicar e testar imediatamente; PR #1 merged em `main` (`dc638b2c9b96b97ee859d2af790902553c9aee6a`).
- GitHub read-back confirma `index.html` v38.56 e `sw.js` cache v38-56. UI Individual Progress fases 1/2 incluídas.
- QA: sintaxe 5 scripts PASS; estatísticas sintéticas PASS; read-back GitHub PASS. Teste de URL publicada, browser Android, offline, import/export, sync, regressão completa: NOT RUN. **PUBLISHED, NOT SAFE** até validação integral.
- Bug log: sem novos bugs confirmados neste checkpoint.

## Checkpoint 23-11-2026 — TUG-64 / TUG-65
- Structured Individual Performance Report implemented in isolated branch `feature/tug-64-individual-report` commit `953c652150336a4bc709e1db8a73697d25264dd1` (draft PR #2). Five scripts parse PASS; browser/PWA/SAFE NOT RUN. No merge or deployment.
- TUG-65: secure individual training archive and medical report attachments planned; **not implemented**. Requires encrypted storage, secure backup/restore and access controls before accepting third-party health data. Do not put medical data in existing localStorage, sync, Linear or GitHub.
- Bug log: no new confirmed bugs.

## 23-11-2026 — Release v38.57 e política de publicação para testes
- Pedido expresso do utilizador: publicar as alterações solicitadas para teste, sem ficar apenas em ZIP ou PR; atualizar sempre o log GitHub e Linear.
- TUG-64 Individual Performance Report estruturado publicado por PR #2, merge `9d47525c3d56bbbc33273afd75030052769b213a`; index v38.57 e SW v38-57 confirmados em `main`.
- SOP v2.2 e SAFE v2.1 refletem autorização permanente para publicar updates solicitados, exceto alterações destrutivas, sensíveis ou com falhas críticas.
- QA: sintaxe de 5 scripts PASS; verificação estrutural de 5 secções PASS; read-back `main` PASS. Teste de dispositivo/browser, offline, import/export e SAFE completo NOT RUN. Estado PUBLISHED, não SAFE.
- TUG-65 arquivo de relatórios médicos e treinos adaptados permanece pendente, sem guardar dados médicos até segurança adequada.
- Bug log: problema de processo confirmado — entrega anterior apenas em PR/ZIP em vez de publicação de teste. Resolvido por publicação v38.57 e SOP v2.2.
