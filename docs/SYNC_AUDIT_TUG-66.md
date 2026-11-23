# TUG-66 — Auditoria de integridade de sincronização (23-11-2026)
**Baseline:** v38.58, index.html blob b15bf21f11e5e070fccb9c80085cc70370945a29, sw.js blob a5f11233926a6f9637c2eaccd66c8e650d39452d.
**Método:** leitura estática de index.html, sw.js, SOP v2.2, SAFE v2.1, dossier e roadmap. Nenhum dado real foi consultado ou modificado. Não houve teste de OAuth/Google Sheets nem dispositivo real.

## Arquitetura encontrada
A aplicação já possui sincronizador integrado via Google OAuth e Google Sheets API, com spreadsheet fixo, aba Records (A:G), seis chaves localStorage e registos de alterações em formato append-only. A autenticação é manual e token apenas em memória. Service worker serve a PWA offline. Não é uma sincronização nativa do Google Drive por ficheiro: é uma folha Google Sheets no Drive.

## Achados prioritários
- **CRÍTICO S1 — apagamentos implícitos:** mark() transforma qualquer ausência face a meta.known em evento deleted. Importações, dispositivo com subconjunto local, falhas de parsing e mudanças de armazenamento podem gerar tombstones sem intenção do utilizador.
- **CRÍTICO S2 — perda de edições concorrentes:** se remote.ts > pending.at, pending local é eliminado sem guardar a edição divergente; clocks de dispositivos não são fiáveis.
- **ALTO S3 — upload sem read-back:** após append, pending é limpo sem reler e confirmar a versão de cada registo. A confirmação HTTP não demonstra convergência.
- **ALTO S4 — corrida entre clientes:** leitura, escolha de vencedor e append não são transação; duas sessões simultâneas podem divergir e uma edição pode ficar oculta pelo last-write-wins.
- **ALTO S5 — IDs frágeis:** rid() usa fallback callsign/nome/JSON, com risco de colisão; ausência de ID estável em dados antigos exige migração não destrutiva.
- **ALTO S6 — parsing silencioso:** loadEntries() devolve [] após erro JSON, mascarando corrupção; não há quarentena/backup automático antes de mutações.
- **MÉDIO S7 — estado enganador:** 'Google sincronizado' aparece sem comparação de hashes/contagens e sem reconciliação de conflitos.
- **MÉDIO S8 — SW:** cacheia GET mesmo quando resposta HTTP não é OK e devolve index.html como fallback para recursos não HTML.

## Regras para correção
1. Nunca converter ausência local em eliminação. Eliminar apenas mediante ação explícita, com tombstone identificado, confirmado e recuperável.
2. IDs globais estáveis por registo; preservar IDs antigos e construir mapa de migração antes de alterações.
3. Snapshot imutável + log de alterações, revisão/versão por registo, origem e carimbo de servidor; conflito divergente guardado em ambos os lados, sem last-write-wins silencioso.
4. Upload idempotente com operationId, read-back por operação e comparação de hashes antes de marcar como confirmado.
5. Isolar dados de teste em folha/ambiente sintético; backup imutável e restore testado, sem restaurar os dois registos intencionalmente apagados.
6. Testar matriz: dois dispositivos offline, criação concorrente, edição concorrente, eliminação explícita, token expirado, falha parcial, relógio desalinhado, duplicação de requests, corrupção JSON, reload PWA, Physical e Shooting.
7. Antes de permitir escrita cloud com protocolo novo, validar migração e compatibilidade retroativa. Não publicar uma correção que arrisque dados reais sem testes reais.

## Resultado SAFE
PASS: leitura baseline, identificação de mecanismo, auditoria estática e documentação.
FAIL (segurança de dados, código atual): eliminação implícita; perda silenciosa de edição concorrente; falta de read-back.
NOT RUN: Google Sheets real, OAuth, browser runtime, Android/tablet, offline, import/export, backup/restore, regressão funcional, testes em dois dispositivos.
**Estado: AUDITED / BLOCKED FOR SAFE SYNC.** Não declarar sincronização segura. A app publicada continua v38.58. Nenhum dado real alterado.
