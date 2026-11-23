# FIELD EVALUATION APP — SAFE CHECKLIST OFICIAL v2.1
**Nova checklist do projeto, 23-11-2026.** Substitui a checklist antiga eliminada. Cada item deve ser marcado **PASS / FAIL / NOT RUN / N/A** com evidência e justificação. Uma release só é **SAFE** se os gates aplicáveis passarem; testes não realizados não podem ser declarados aprovados.

## A. Fonte e âmbito
- [ ] SOP e documentação atual consultados; SHA/versão da baseline registados.
- [ ] Issue Linear com critérios de aceitação, riscos e autorização de publicação.
- [ ] Diff revisto: alterações só no âmbito autorizado, sem alterações inesperadas a Shooting/Physical.
- [ ] Manifest, versão visível, assets, service worker e chave de cache coerentes.

## B. Código e segurança
- [ ] HTML/JS/CSS passam em verificações sintáticas e análise estática relevante.
- [ ] Arranque e navegação em browser real sem exceções de runtime.
- [ ] Dados importados e campos de texto são validados e escapados antes de renderização.
- [ ] Nenhuma dependência remota crítica impede utilização offline; fontes externas têm fallback.
- [ ] Importações malformadas, datas inválidas, números inválidos e campos desconhecidos não destroem dados.
- [ ] Não foram adicionados segredos, dados reais ou credenciais ao repositório.

## C. Integridade e persistência
- [ ] Criar, editar, reabrir e manter múltiplas avaliações do mesmo militar.
- [ ] Identificadores estáveis e sem colisões; histórico não sobrescrito.
- [ ] Exportar JSON, importar em estado limpo e comparar contagem/conteúdo; import repetido sem duplicação indevida.
- [ ] Testar backup e recuperação antes de alterações de schema.
- [ ] Reinício/reload preserva dados e preferências; sem perda silenciosa.
- [ ] Sync, se aplicável, testa leitura/escrita, duplicados, falhas, conflitos e read-back, sem tocar em dados operacionais.

## D. Regras de avaliação
- [ ] Combat PASS >=330 total e >=60 por exercício; abaixo de qualquer mínimo = NOT PASS.
- [ ] Non-Combat PASS >=280 total e >=50 por exercício; exclusões = NOT ASSESSED quando aplicável.
- [ ] Registos incompletos e ajustados não entram indevidamente em médias, classificações ou comparações.
- [ ] Classificação, cor e labels consistentes no dashboard, relatório, Quick Brief e imagem.
- [ ] Mudança de standard/escalão não é apresentada como evolução física direta.

## E. Individual Progress
- [ ] Pesquisa por callsign e seleção de militar com muitos registos.
- [ ] Seleção de 0/1/2/3/todas as datas, datas repetidas e ordenação cronológica.
- [ ] Comparação de resultados brutos e pontos por exercício; corrida interpreta menor tempo como melhor.
- [ ] Médias, mínimos, máximos, desvio-padrão, amplitude e tendências calculados com amostras corretas.
- [ ] Recordes pessoais e distância aos mínimos coerentes com o standard aplicável.
- [ ] Peso apresentado de modo descritivo e com unidades; dados ausentes/excluídos identificados.
- [ ] Tabelas e gráficos legíveis em ecrãs pequenos, sem overflow ou bloqueio da navegação.

## F. Regressão e PWA
- [ ] Physical: registo, pesquisa, edição, relatórios, exportações e navegação.
- [ ] Shooting: smoke test sem alterações inesperadas.
- [ ] Offline: primeira instalação online, reinício sem rede, navegação, registos e recuperação.
- [ ] Atualização da PWA não serve HTML/JS antigo devido a cache incoerente.
- [ ] Testar Android/PWA e desktop; anotar browser, versão e dispositivo.
- [ ] Sem regressões de acessibilidade básica (teclado, foco, labels, contraste, scroll).

## G. Entrega e aceitação
- [ ] Evidências dos testes e lacunas registadas no Linear.
- [ ] PR/commit, SHA, versão, changelog e rollback descritos.
- [ ] Autorização permanente para publicação de teste aplicável ou autorização específica conforme risco confirmada.
- [ ] Read-back do deploy e smoke test da URL final efetuados.
- [ ] Aceitação do utilizador registada separadamente da validação técnica.
- [ ] Dossier, roadmap, bug log e checkpoint atualizados.

## Critério de estado
**DRAFT**: em desenvolvimento. **TECH CHECKED**: apenas verificações técnicas executadas. **TESTED**: cenários funcionais com evidência. **USER VALIDATED**: confirmação do utilizador. **SAFE**: gates aplicáveis completos e evidenciados. **PUBLISHED**: deployment confirmado, não implica SAFE.

## Modelo de relatório de testes
Versão | Commit | Ambiente | Cenário | Esperado | Observado | PASS/FAIL/NOT RUN/N/A | Evidência | Responsável | Data | Bloqueadores.
