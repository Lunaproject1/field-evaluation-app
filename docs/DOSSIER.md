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

## 23-11-2026 — v38.58 TUG-65 (publicada para teste)
- Âmbito final: sem fotografias, anexos ou relatórios médicos. Mantêm-se notas funcionais de treino por exercício e por avaliação/data, associadas a `exerciseNotes` e `exerciseExcluded` existentes; sem migração.
- Individual Progress > Report: secção Assessment notes & limitations, com data, exercício, estado e botão para abrir/editar a nota da avaliação correspondente.
- Editor de notas: opção explícita de copiar nota de avaliação anterior do mesmo callsign e exercício, com confirmação; **nunca reutiliza automaticamente** nem altera automaticamente a exclusão. Histórico anterior preservado.
- PR #3 merge `a660323bd067d30e52d41354a4cf6ba4fab8a168`; index v38.58 e SW cache v38-58 confirmados em main.
- QA: parse de 5 scripts JS PASS; verificação estática de secção, listeners e cache PASS; read-back main PASS. Testes browser real, Android/PWA, offline, import/export e SAFE integral NOT RUN. Estado PUBLISHED/TECH CHECKED, não SAFE.
- Riscos: agrupamento por callsign não garante identidade única; informação de limitações pode ser sensível, pelo que se deve evitar diagnósticos e usar apenas restrições funcionais necessárias. A app ainda não dispõe de encriptação/autorização clínica específica.
- Bug log: sem novo bug funcional confirmado; testes de regressão pendentes.

## 23-11-2026 — TUG-66 implementação preliminar v38.59 (não publicada)
- PR #5 draft: https://github.com/Lunaproject1/field-evaluation-app/pull/5; código conservador para sincronização Google Sheets, preservação de conflitos, sem tombstones implícitos, read-back por operação, snapshot/backup exportável, SW reforçado.
- Testes sintéticos isolados PASS: bootstrap, cloud-only, local-only, conflito e igualdade. Sintaxe 5 scripts PASS.
- **Bloqueadores SAFE:** sem testes Google reais, dois dispositivos, offline PWA, restore, conflitos resolvidos pela interface, eliminações explícitas propagadas. App publicada permanece v38.58; sem alterações aos dados reais.
- Dossier técnico completo: `docs/SYNC_IMPLEMENTATION_TUG-66.md`. Bug log: falhas S1/S2 mitigadas na branch; restantes riscos abertos e não declarados resolvidos em produção.

## 26-11-2026 — v38.59 TUG-66 — publicação de teste autorizada
- Base publicada: `20b8b5f84d5176a51abef656418ca8d3f0c991b4` (v38.58); continuação da branch `feature/tug-66-sync-safety-v38-59`, PR #5.
- Sync v3: operações causais append-only com operation ID e pais; sem decisão por relógio local, sem deleções por ausência, conflitos explícitos, read-back e retries idempotentes. Histórico legacy divergente exige revisão. IDs inválidos/duplicados e linhas remotas inválidas bloqueiam sync sem descartar dados.
- Delete confirmado em Physical/Shooting/Notes/Registry/Chevrons gera tombstone. Importações e dispositivos vazios não geram eliminações. Na primeira ligação, versões remotas ausentes localmente exigem revisão; não se recuperam automaticamente registos anteriormente apagados.
- Interface Rever com escolha explícita de versão e arquivo local da versão anterior; Backup e Recuperar fazem merge, preservam divergências e protegem eliminações conhecidas. Janelas desatualizadas pedem recarregamento antes de guardar.
- SW: cache v38-59, apenas HTTP OK; fallback HTML apenas em navegação; ativação limpa apenas caches Field Evaluation App e preserva outras apps.
- QA: testes Chromium headless com sessões isoladas e API Sheets/OAuth simulados; ver `QA_v38_59.md` e `tests/sync-v38-59.cjs`. Não foram feitas chamadas à folha real nem restaurados os dois registos apagados pelo utilizador.
- Estado: release para TESTE autorizada explicitamente em 26-11-2026; **não SAFE**, porque OAuth/Sheets reais, Android/tablet físicos e regressão funcional integral permanecem NOT RUN. Aceitação do proprietário pendente. Merge/deploy e SHA final registados no Linear.
- Bug log: corrigidos os riscos de ausência→delete, descarte de pending, relógio como árbitro, read-back ausente, conflitos sem UI e cache transversal. Risco residual: clientes antigos ainda podem escrever protocolo legacy; v3 preserva esses desvios para revisão. Não reverter para v38.58 sem backup, porque clientes antigos não compreendem causalidade v3.

## 26-11-2026 — v38.60 TUG-67 — current exercise restriction
- Base: v38.59 publicada, merge `fb0177d873fdf0a471fc14cb19cb54d7cec72085`; index.html e sw.js publicados confirmados por SHA-256, HTTP 200 e smoke Chromium sem erros. v38.59 permanece TESTED/PUBLISHED, não SAFE.
- Novo controlo manual no Progresso Individual: Current exercise restriction e checkboxes Pull-ups, Push-ups, Sit-ups, 3200m Run. Estado atual por militar, separado das notas/exclusões de cada avaliação. Desmarcar remove o aviso; não altera scores, classificações, datas, notas ou exclusões históricas.
- Indicador clicável em Records, Station, formulário, notas, relatório individual/operacional, Quick Brief, CSV/imagem e vistas vinculadas de Shooting/Registry/Chevrons. Hash `#progress/<identidade>` abre diretamente o perfil correto e funciona após reload.
- Campo opcional `trainingRestriction` nas avaliações físicas existentes: active, exercises, updatedAt, revision. Sem nova chave/folha, sem migração destrutiva; incluído no sync v3, backup/restore e JSON. Editar e duplicar avaliação preserva flag/identidade quando é o mesmo militar. Não se copiam notas históricas nem se excluem automaticamente exercícios.
- Identidade: IDs explícitos + callsign normalizado distinguem homónimos. IDs antigos auto-gerados (`soldier_...`) podem agrupar por callsign + data de nascimento existentes para preservar histórico após mudança de posto/unidade. Sem DOB não se presume equivalência entre IDs diferentes. Correspondências transversais ambíguas não recebem marcador por inferência.
- Não há campo de diagnóstico, fotografia, anexo ou relatório clínico. Trata-se de uma marcação funcional de exercícios. Identidades existentes podem exigir revisão se os próprios IDs de origem estiverem incorretos; não foi feita deduplicação ou associação de dados reais.
- QA e limitações: ver `QA_v38_60.md`; publicação de teste autorizada pelo pedido. Google live, Android/tablet físicos, auditoria de todos os exportadores e SAFE integral continuam pendentes. Aceitação do utilizador separada.
- Bug log (corrigidos durante desenvolvimento): badge cortado na célula Shooting, refresh local após remover marcação, perda de metadados ao recomputar/duplicar avaliação. Testes de regressão respetivos PASS. Sem novo bug crítico aberto nesta entrega.

## Publicação confirmada — 26-11-2026
v38.60 PUBLISHED/TESTED (sintético), PR #6, merge `c68278cdcfc63f7cce168a632ec7c2a64a103757`, implementação `e5433e9d51e6ed888ddad3effcc462ec0b722a01`. Index e SW servidos com HTTP 200 e SHA-256 igual aos ficheiros testados. Smoke Chromium na URL final: versão v38.60, Physical/Shooting e zero pageerror. Total 42 cenários locais PASS. Não SAFE; Google live, Android físico e aceitação pendentes. Linear TUG-67 e dossier atualizados. Sem alterações aos registos reais.
