# Regras de Componente para IA - Toast (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Toast` com fidelidade ao design system, semantica correta e acessibilidade.

Fonte de referencia:
- Figma `Design System - Topaz`, nodes `367:665` (contexto), `367:904` (estados e variacoes), `372:1716`, `373:1722`, `387:272`, `387:278`.
- Implementacao local: `src/stories/Toast.tsx` e `src/stories/Toast.css`.

## Contrato obrigatorio para IA
- Sempre usar `Toast` para feedback contextual nao bloqueante.
- Sempre suportar variacao de dispositivo (`desktop` e `mobile`).
- Sempre suportar tipo de aviso (`success` e `error`).
- Sempre renderizar acao de fechar visualmente; quando interativo, usar botao real.
- Nunca remover hierarquia visual de prioridade (borda inferior de estado).

## Estrutura obrigatoria
- Container horizontal principal com:
  - texto de feedback (1 linha com truncamento quando necessario),
  - acao de dismiss no lado direito.
- Borda inferior de `2px` indicando o tipo da mensagem.
- Sombra leve para elevacao visual.

## Especificacao visual base (Figma + DS)

### Layout
- Display horizontal com alinhamento central.
- `gap: 8px`.
- `padding: 16px`.
- Fundo: superficie primaria.
- Sombra: `0 4px 12px 0 rgba(30, 30, 104, 0.12)`.

### Variacoes de tamanho (device)
- `desktop`:
  - largura fixa de referencia: `680px`,
  - `min-width: 680px`,
  - `max-width: 680px`.
- `mobile`:
  - largura fixa de referencia: `343px`,
  - `min-width: 343px`,
  - `max-width: 343px`.

### Tipografia
- Texto principal:
  - `16px`,
  - `font-weight: 700`,
  - `line-height: 24px`,
  - cor primaria.
- Texto deve truncar com reticencias se ultrapassar largura.

### Acao de fechamento
- Icone de fechar (`x` / `times`) com cor secundaria.
- Tamanho visual de referencia do icone: `16px`.

## Estados obrigatorios

### `success`
- Borda inferior em cor positiva (`success`).
- Texto e icone mantem cores base.

### `error`
- Borda inferior em cor negativa (`error`).
- Sem mudar hierarquia do layout.

Regra: `Toast` nao usa variacoes visuais extras de hover/focus no container; foco deve existir apenas para o elemento interativo de dismiss quando houver botao.

## Tokens mapeados
- `Color/Surface/primary = #f5f6f9`
- `Color/Text/primary = #242424`
- `Color/Icon/secondary = #9c9d9f`
- `Color/Border/success = #0dd829`
- `Color/Border/negative = #d80e0e`
- `Spacing/Spacing-8 = 8`
- `Spacing/Spacing-16 = 16`

Regra: priorizar aliases locais (`--color-surface-primary`, `--text-primary`, `--icon-secondary`, `--border-positive`, `--border-negative`) e usar hex apenas como fallback.

## Acessibilidade obrigatoria
- Para `success`, usar:
  - `role="status"`,
  - `aria-live="polite"`.
- Para `error`, usar:
  - `role="alert"`,
  - `aria-live="assertive"`.
- Sempre usar `aria-atomic="true"` no container.
- Se dismiss for clicavel, usar `button` com `aria-label` (ex.: `Fechar`).
- Nao depender apenas de cor para transmitir significado; manter texto de feedback claro.

## Regras de comportamento para geracao automatica
- Exibir mensagem curta e objetiva.
- Permitir dismiss opcional via callback (`onDismiss`).
- Se nao houver callback, manter icone apenas decorativo (nao interativo).
- Em cenarios com multiplos toasts, preservar ordem e espaco consistente entre itens.
- Nao usar toast para erros criticos que exigem bloqueio de fluxo (usar modal/dialog quando aplicavel).

## Checklist de aceite
- [ ] Estrutura com texto + dismiss implementada.
- [ ] Variacoes `success` e `error` funcionando.
- [ ] Variacoes `desktop` (680) e `mobile` (343) funcionando.
- [ ] `role` e `aria-live` corretos por tipo de aviso.
- [ ] Dismiss acessivel quando interativo.
- [ ] Tokens do DS aplicados.

## API recomendada
```ts
type ToastState = "success" | "error";
type ToastDevice = "desktop" | "mobile";

type ToastProps = {
  id?: string;
  className?: string;
  state?: ToastState;
  device?: ToastDevice;
  title: string;
  dismissLabel?: string;
  onDismiss?: () => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de criar feedbacks temporarios.
2. Implementar `Toast` com variacoes de dispositivo e estado.
3. Garantir acessibilidade semantica (`status`/`alert`) e dismiss acessivel.
4. Validar o checklist de aceite antes de concluir.
