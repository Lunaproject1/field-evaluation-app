# FIELD EVALUATION APP — SOP OFICIAL v2.3
**Atualizado em 26-11-2026: fecho de avaliações com isenções (TUG-69).** Substitui os procedimentos antigos eliminados pelo proprietário. Governa o processo de desenvolvimento; não certifica retroativamente versões da aplicação.

## 1. Governação e fontes
- **GitHub:** `Lunaproject1/field-evaluation-app`, código-fonte e documentação versionada. Branch `main` é a referência publicada; usar branch de trabalho e PR para alterações futuras sempre que possível.
- **Linear:** projeto Field Evaluation App — Physical & Shooting, fonte de verdade de tarefas, decisões, bugs, roadmap, QA, release e aceitação. Cada issue deve apontar para PR/commit, quando aplicável.
- **Ecossistema LUNA:** seguir os princípios de documentação viva, checkpoint de continuidade, auditoria não destrutiva, validação separada de aceitação e gestão de bugs usados no Dossier Técnico Oficial, Estado Atual e TUG-16/TUG-27. Não assumir partilha de backend ou dados com LUNA Training.
- **Esta documentação substitui os SOP/checklists antigos apagados**, não exige a sua recuperação. Alterações futuras às normas devem ser registadas em GitHub e refletidas no Linear.

## 1A. Integração obrigatória no projeto LUNA
- **Field Evaluation App é uma aplicação integrante do projeto global LUNA**, tal como as restantes apps. Mantém repositório, módulos e dados próprios, mas adota as guidelines transversais LUNA, adaptadas ao seu contexto.
- O projeto Linear Field Evaluation App é a área de trabalho específica dentro da organização LUNA. Relacionar as tarefas com iniciativas LUNA quando disponíveis, sem confundir a app com LUNA Training.
- **Leitura obrigatória antes de cada alteração:** guidelines e documentação transversal LUNA em vigor no Linear, além de SOP, SAFE_CHECKLIST, DOSSIER, ROADMAP e issues desta aplicação no GitHub/Linear.
- **GitHub + Linear são obrigatórios em TODAS as atualizações** (funcionalidades, hotfixes, QA, mudanças documentais e releases). Não deixar decisões ou passos exclusivamente no chat.
- **Antes de desenvolver:** abrir/atualizar issue Linear com baseline, pedido, critérios de aceitação, plano, riscos, dependências, tarefas e estado; associar branch/PR GitHub.
- **Durante o desenvolvimento:** manter a issue Linear com checkpoints, passos concluídos, bloqueios, bugs descobertos, decisões e ligações para commits/PRs.
- **Após cada atualização:** atualizar código/documentação e histórico no GitHub; atualizar no Linear issue, roadmap, change log, bug log (incluindo ausência de novos bugs), dossier/estado atual, resultados SAFE, versão, commit, link de PR/deploy, pendentes e próximo passo. A documentação deve permitir retomar trabalho sem ler o chat.
- **Fecho de tarefa:** apenas após registar testes executados vs não executados, aceitação do utilizador, autorização de publicação e estado de entrega. Publicação/merge continuam a exigir autorização explícita.
- **Sincronização documental:** quando uma guideline específica mudar, atualizar primeiro o documento canónico versionado no GitHub e refletir a mesma regra no documento Linear correspondente, confirmando leitura de retorno. Divergências devem ser registadas e corrigidas antes de declarar fecho.
- **Nomenclatura:** usar “Field Evaluation App” como nome técnico existente até decisão explícita de renomeação; referências informais a “Field Training App” não autorizam renomear app, URLs, dados ou repositório.

## 2. Regras permanentes
1. Nunca reconstruir a app de raiz sem pedido explícito; partir sempre do código existente no GitHub.
2. Preservar os módulos Physical e Shooting, as regras de avaliação, registos, exportações, relatórios, sync e histórico. Mudanças fora do âmbito aprovado exigem autorização.
3. **Autorização permanente de publicação para alterações solicitadas:** o proprietário autorizou em 23-11-2026 que as atualizações funcionais que pedir sejam publicadas para teste após validação técnica proporcional, com registo de lacunas SAFE. Não entregar apenas ZIP/PR quando a intenção é testar a app. **Exceções:** alterações destrutivas, migrações arriscadas, exposição de dados pessoais/médicos, alterações de segurança, mudanças não solicitadas ou releases com falhas críticas requerem nova autorização específica. A autorização de teste não equivale a certificação SAFE.
4. Não usar dados pessoais/operacionais reais em issues, relatórios de teste ou commits. Usar dados sintéticos.
5. Não apagar dados históricos para recalcular estatísticas. Migrações devem ser retrocompatíveis e testadas; preservar IDs, datas e snapshots.
6. Manter a interface de utilização e documentação técnica separadas; não introduzir previews nem alterar a apresentação da app fora do pedido.

## 3. Fluxo de desenvolvimento obrigatório
1. **Contexto:** ler este SOP, SAFE_CHECKLIST, DOSSIER e ROADMAP do repositório; consultar issues/documentos Linear relevantes.
2. **Baseline:** ler a versão de `main`, confirmar SHA, versão, SW/cache e estado do último release; registar dependências e áreas afetadas.
3. **Especificação:** criar/atualizar issue Linear com objetivo, critérios de aceitação, não-objetivos, riscos, impacto nos dados, plano de testes e autorização existente.
4. **Implementação:** branch própria a partir da baseline; commits pequenos, revisão de diff, sem mudanças não relacionadas. Se houver incompatibilidade com o histórico, desenhar migração antes de escrever.
5. **Validação:** executar integralmente SAFE_CHECKLIST; documentar comandos/cenários, resultados, limitações e testes em dispositivos reais que estejam pendentes. Verificação de sintaxe nunca equivale a teste funcional.
6. **Entrega:** PR ou build de teste para revisão, com changelog, versão e resultados; publicação segundo a autorização permanente e exceções da secção 2.3. Confirmar read-back do artefacto publicado e cache offline.
7. **Aceitação:** registar feedback e evidência de validação do utilizador; distinguir implementado, tecnicamente testado, validado pelo utilizador e SAFE.
8. **Continuidade:** atualizar Linear (issue, bug log, roadmap e checkpoint) e os documentos GitHub pertinentes após cada alteração.

## 4. Normas de dados e avaliação
- Distinguir conclusão do registo de classificação: quatro resultados registados (zero incluído) ou isenções explícitas fecham o registo. Com isenções: Complete (Exempt) / EXEMPT. Campos realmente vazios continuam pendentes; manualIncomplete é respeitado. Não converter isenções em PASS, ranking ou média de quatro exercícios. Preservar os valores/notas existentes ao marcar uma isenção.
- Combat: PASS exige total >=330 e >=60 em cada exercício aplicável; Non-Combat: total >=280 e >=50 em cada exercício aplicável. Confirmar contra o código antes de mudar lógica.
- Preservar resultados brutos (repetições, tempo, peso), pontos, data, escalão e standards; não atribuir causalidade a variações de pontos quando escalão/regras mudaram.
- Estatísticas devem indicar amostra, datas e exclusões. Não classificar peso como positivo/negativo por si só.
- Callsign não é garantia de identidade única; alterações ao agrupamento longitudinal exigem estratégia explícita de identidade e migração.
- Shooting não é alterado por desenvolvimento do Individual Progress.

## 5. Gestão de incidentes e rollback
- Falhas de perda de dados, corrupção, importação, offline, sync ou exposição de informação são bloqueadores até triagem.
- Registar bug com passos reproduzíveis, ambiente, versão, severidade, causa confirmada ou hipótese, correção e teste de regressão.
- Rollback apenas após verificar compatibilidade do schema e risco de perder dados novos.
- Nunca declarar SAFE nem sucesso de testes que não foram efetivamente executados.

## 6. Referências
- [SAFE_CHECKLIST](SAFE_CHECKLIST.md) · [DOSSIER](DOSSIER.md) · [ROADMAP](ROADMAP.md)
- [Projeto Linear](https://linear.app/tuga1989/project/field-evaluation-app-physical-and-shooting-77b4c7208ae3)
- [LUNA — Estado Atual](https://linear.app/tuga1989/document/luna-estado-atual-e-protocolo-de-continuidade-a99f81650a09)
- [LUNA — Dossier Técnico Oficial](https://linear.app/tuga1989/document/luna-dossier-tecnico-oficial-2713d1eb291d)
- [TUG-16](https://linear.app/tuga1989/issue/TUG-16/luna-training-roadmap-de-desenvolvimento) · [TUG-27](https://linear.app/tuga1989/issue/TUG-27/luna-full-system-audit-v10-auditoria-integral-nao-destrutiva)
