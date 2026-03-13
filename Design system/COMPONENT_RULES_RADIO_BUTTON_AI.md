# Regras de Componente para IA - Radio button (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Radio button` com fidelidade ao design system, semantica correta e acessibilidade.

Fonte de referencia:
- Figma `Design System - Topaz`, node `335:483` (instancias de `Radio button` e `Radio Group`).
- Implementacao local: `src/stories/Radio.tsx` e `src/stories/radio.css`.

## Contrato obrigatorio para IA
- Sempre usar `Radio button` para escolha exclusiva entre opcoes.
- Nunca usar checkbox para opcoes mutuamente exclusivas.
- Sempre agrupar radios relacionados em `Radio Group` com mesmo `name`.
- Manter suporte a helper/error por opcao quando existir validacao.
- Nunca hardcodar estilo quando houver token equivalente.

## Estrutura obrigatoria
- `input type="radio"` real (nativo).
- Controle visual circular:
  - circulo externo (`outer`),
  - ponto interno (`inner`) quando selecionado.
- Label textual associado.
- Helper/error opcional abaixo do label.
- Para multiplas opcoes: container de grupo com label do grupo opcional.

## Especificacao visual base (Figma + DS)

### Layout
- Disposicao: inline-flex com alinhamento central.
- Gap entre controle e label: `Spacing/base` (`8px`).

### Controle circular
- Tamanho base no DS: `18x18`.
- `outer` circular com borda secundaria/primaria.
- `inner` circular menor (aprox. `8x8`) visivel apenas em `checked`.

### Tipografia
- Label:
  - `16px`,
  - `font-weight: 500`,
  - `line-height: 24px`.
- Helper:
  - `14px`,
  - `font-weight: 600`,
  - cor secundaria.
- Error helper:
  - cor negativa.

## Estados obrigatorios

### `default` (unchecked)
- Sem ponto interno.
- Borda padrao.

### `checked`
- Ponto interno visivel.
- Borda em cor de destaque.

### `hover`
- Realce sutil de borda.

### `focus`
- Indicador de foco visivel (ring/outline).

### `error`
- Borda negativa.
- Ponto interno negativo quando selecionado.
- Helper em negativo.

### `disabled`
- Sem interacao.
- Cores reduzidas (controle e texto).

## Radio Group (observado no Figma)
- O Figma mostra blocos de `Radio Group` com:
  - label do grupo,
  - linha de opcoes horizontais,
  - grupos repetidos em secoes diferentes.
- Regra: cada grupo deve compartilhar o mesmo `name` e ter no maximo uma opcao selecionada.

## Tokens mapeados
- `Color/Text/primary = #242424`
- `Color/Text/negative = #f01010`
- `Color/Text/positive = #0dd829`
- `Color/Border/secondary = #9c9d9f`
- `Color/Icon/secondary = #9c9d9f`
- `Color/Icon/highlight = #1e1e68`
- `Color/Icon/invert = #ffffff`
- `Color/Surface/primary = #f5f6f9`
- `Spacing/base = 8`

Regra: priorizar tokens semanticos locais do projeto (`--border-primary`, `--icon-highlight`, `--text-negative` etc.), usando hex apenas como fallback.

## Acessibilidade obrigatoria
- Input nativo `radio`.
- Radios do mesmo grupo com `name` igual.
- Grupo com `fieldset` + `legend` (ou `role="radiogroup"` com rotulo acessivel).
- Em erro: `aria-invalid` + associacao de helper com `aria-describedby`.
- Navegacao por teclado:
  - Tab para entrar no grupo,
  - setas para trocar opcao,
  - Space para selecionar.
- Em `disabled`, aplicar atributo `disabled`.

## Regras de comportamento para geracao automatica
- Nao permitir duas opcoes marcadas no mesmo grupo.
- Nao esconder label de opcoes sem alternativa acessivel.
- Nao remover foco visual.
- Nao converter grupo radio em dropdown sem requisito explicito.

## Checklist de aceite
- [ ] Radio usa `input type="radio"` real.
- [ ] Label associado corretamente.
- [ ] Estados (`default`, `checked`, `hover`, `focus`, `error`, `disabled`) aplicados.
- [ ] Radio Group com `name` compartilhado e selecao unica.
- [ ] Helper/error exibidos corretamente quando aplicavel.
- [ ] Acessibilidade e teclado funcionando.
- [ ] Tokens do DS utilizados.

## API recomendada
```ts
type RadioProps = {
  label?: string;
  helperText?: string;
  errorText?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de criar escolhas exclusivas.
2. Implementar radios com semantica nativa e estados completos.
3. Em grupos, garantir exclusividade por `name`.
4. Validar o checklist de aceite antes de concluir.
