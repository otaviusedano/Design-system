# Regras de Componente para IA - Switch (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Switch` com consistencia visual, semantica correta e acessibilidade.

Fonte de referencia:
- Figma `Design System - Topaz`, node `348:1918` (instancias `Switch button`, ex.: `355:2576`, `355:2584`, `355:2589`).
- Implementacao local: `src/stories/Switch.tsx` e `src/stories/Switch.css`.

## Contrato obrigatorio para IA
- Sempre usar `Switch` para alternancia de estado binario imediato (ligado/desligado).
- Nunca usar `Switch` para selecao entre multiplas opcoes (usar `Radio`).
- Sempre manter label associado ao controle.
- Nunca remover estados de foco e desabilitado.
- Reutilizar componente base com props oficiais (`checked`, `defaultChecked`, `disabled`, `onCheckedChange`).

## Estrutura obrigatoria
- `label` envolvente ou associado por `htmlFor`.
- `input type="checkbox"` com `role="switch"`.
- `track` (fundo do switch).
- `thumb` (indicador deslizante).
- Texto de label ao lado.

## Especificacao visual base (Figma + DS)

### Layout
- Disposicao horizontal.
- Gap entre switch e label: `Spacing/base` (`8px`).

### Controle
- Tamanho de referencia no projeto:
  - largura: `30px`,
  - altura: `16px` (track),
  - thumb: `12px`.
- Track com borda arredondada total (pill).
- Thumb circular com transicao horizontal.

### Tipografia
- Label:
  - `16px`,
  - `font-weight: 500`,
  - `line-height: 24px`,
  - cor primaria.

## Estados obrigatorios

### `unchecked` (off)
- Track em superficie desabilitada/neutra.
- Thumb no lado esquerdo.

### `checked` (on)
- Track em cor `pressed/highlight`.
- Thumb no lado direito.
- Contraste adequado entre thumb e track.

### `focus`
- Indicador de foco visivel no track (outline/ring).

### `disabled`
- Sem interacao.
- Cores reduzidas de track/thumb/label.
- Cursor de nao permitido.

Regra: manter transicoes suaves entre `off` e `on`.

## Tokens mapeados
- `Color/Surface/disabled = #e0dcdc`
- `Color/Surface/secondary = #ffffff`
- `Color/Border/secondary = #9c9d9f`
- `Color/Surface/primary = #f5f6f9`
- `Color/Text/primary = #242424`
- `Spacing/base = 8`

Tokens gerais de contexto (quando aplicavel):
- `Color/Text/negative = #f01010`
- `Color/Text/positive = #0dd829`

Regra: usar preferencialmente os aliases semanticos do projeto (`--surface-pressed`, `--surface-disabled`, `--border-secondary`, etc.) e manter hex somente como fallback.

## Acessibilidade obrigatoria
- Input nativo com `role="switch"`.
- Refletir estado com `aria-checked`.
- Label acessivel vinculada ao input.
- Navegacao por teclado:
  - foco via Tab,
  - alternancia via Space.
- Em `disabled`, usar atributo `disabled`.

## Regras de comportamento para geracao automatica
- `Switch` deve disparar mudanca de estado imediata (sem submit obrigatorio).
- Nao usar `switch` para acao destrutiva sem confirmacao quando o dominio exigir.
- Nao esconder label em formulários sem alternativa acessivel.
- Em listas de switches, manter alinhamento e espacamento consistentes.

## Checklist de aceite
- [ ] Switch renderiza com track + thumb + label.
- [ ] Estados `unchecked/checked/focus/disabled` funcionando.
- [ ] `onCheckedChange` (ou equivalente) dispara corretamente.
- [ ] Semantica `role="switch"` e `aria-checked` corretas.
- [ ] Navegacao por teclado funcionando.
- [ ] Tokens do DS aplicados no lugar de valores soltos.

## API recomendada
```ts
type SwitchProps = {
  id?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de criar toggles de estado.
2. Implementar `Switch` com estrutura nativa (`checkbox` + `role="switch"`).
3. Aplicar tokens e estados visuais oficiais.
4. Validar o checklist de aceite antes de concluir.
