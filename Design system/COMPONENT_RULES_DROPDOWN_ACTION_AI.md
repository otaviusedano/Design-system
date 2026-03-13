# Regras de Componente para IA - Dropdown Action (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Dropdown action` com fidelidade visual, comportamento correto e acessibilidade.

Fonte de referencia:
- Figma `Design System - Topaz`, node `299:4570`.
- Subnodes principais: `301:3170` (container), `301:3171` (trigger), `301:3172` (menu), `301:3173/3176/3179` (acoes).
- Implementacao existente: `src/stories/DropdownAction.tsx` e `src/stories/dropdown-action.css`.

## Contrato obrigatorio para IA
- Sempre usar `Dropdown action` para acoes contextuais de card/lista.
- Nunca substituir por links inline quando ha mais de uma acao.
- Trigger deve ser icone-only e abrir menu contextual.
- Manter ordem das acoes conforme contexto de negocio.
- Acao destrutiva (`Deletar`) deve ficar visualmente diferenciada em negativo.

## Estrutura obrigatoria
- `Trigger button` (icone de tres pontos/kebab ou equivalente do DS).
- `Menu container` posicionado relativo ao trigger.
- Lista de `Action items`.
- Cada item com:
  - icone (opcional, mas presente no design),
  - label textual,
  - estado visual (default/hover/focus/pressed).

## Especificacao visual (extraida do Figma)

### Trigger
- Tamanho: `28px x 28px` no node de referencia.
- Borda: `1px solid Color/Border/highlight` (`#1e1e68`).
- Radius: `radius/xs` (fallback exportado `3px`).
- Cor do icone: `Color/Icon/highlight`.
- Em estado ativo/pressed: fundo `Color/Surface/pressed`, icone invertido.

### Menu
- Fundo: `Color/Surface/secondary` (`#ffffff`).
- Borda: `1px solid Color/Border/primary` (`#e0dcdc`).
- Radius: `6px` (fallback exportado).
- Sombra: `0px 3px 8px rgba(0,0,0,0.15)`.
- Padding interno: `Spacing/lg` (`16px`).
- Gap vertical entre itens: `Spacing/base` (`8px`).

### Item de acao
- Padding: `Spacing/sm` (`4px`) vertical e `Spacing/base` (`8px`) horizontal.
- Gap entre icone e texto: `Spacing/base` (`8px`).
- Texto padrao: `Color/Text/highlight`.
- Icone padrao: `Color/Icon/highlight`.
- Tipografia do label: `Montserrat SemiBold`.
- Acao destrutiva (`Deletar`): `Color/Text/negative` + `Color/Icon/negative`.

## Acoes padrao observadas
- `Detalhes` (neutra)
- `Editar` (neutra, com estados de interacao evidentes)
- `Deletar` (destrutiva)

Regra: manter semantica das acoes; nao trocar "Deletar" de posicao sem necessidade de produto.

## Estados de interface

### Trigger
- `default`: borda e icone highlight.
- `hover/focus`: manter leitura de foco e interacao.
- `pressed/active`: fundo pressed + texto/icone invertidos.

### Menu item
- `default`: transparente.
- `hover`: realce suave de superficie.
- `focus`: indicador de foco visivel.
- `pressed`: fundo pressed + texto invertido (exceto regras destrutivas, quando aplicavel).

## Tokens mapeados
- `Color/Icon/invert = #ffffff`
- `Color/Surface/pressed = #181853`
- `Color/Icon/highlight = #1e1e68`
- `Color/Text/highlight = #1e1e68`
- `Color/Icon/negative = #f01010`
- `Color/Text/negative = #f01010`
- `Color/Surface/secondary = #ffffff`
- `Color/Border/primary = #e0dcdc`
- `Spacing/base = 8`
- `Spacing/sm = 4`
- `Spacing/lg = 16`

Regra: sempre preferir token semantico do projeto; hex apenas fallback.

## Acessibilidade obrigatoria
- Trigger com `button`, `aria-haspopup="menu"` e `aria-expanded`.
- Menu com `role="menu"`.
- Itens com `role="menuitem"`.
- Navegacao por teclado:
  - abrir (`Enter`/`Space`),
  - navegar itens (setas),
  - selecionar (`Enter`),
  - fechar (`Esc`).
- Foco visivel em trigger e item.
- Rotulo acessivel do trigger (ex.: "Abrir menu de acoes").

## Regras de comportamento para geracao automatica
- Nao abrir menu por padrao sem contexto (exceto telas de exemplo de estado aberto).
- Nao usar `cursor: default` em ambiente de produto final interativo.
- Nao esconder item destrutivo dentro de submenu sem necessidade.
- Em listas longas, garantir sobreposicao correta (`z-index`) do menu.
- Evitar clipping do menu por container com `overflow: hidden`.

## Checklist de aceite
- [ ] Trigger renderiza corretamente e abre o menu.
- [ ] Menu usa estrutura e tokens oficiais.
- [ ] Itens aparecem com icone + label legiveis.
- [ ] Estado destrutivo (`Deletar`) esta em negativo.
- [ ] Estados `hover/focus/pressed` estao implementados.
- [ ] Navegacao por teclado e ARIA estao corretos.
- [ ] Nao ha hardcode de cor/espacamento fora do sistema.

## API recomendada
```ts
type DropdownActionState = 'default' | 'hover' | 'focus' | 'pressed';
type DropdownActionVariation = 'closed' | 'opened';

type DropdownActionItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  onSelect: () => void;
};

type DropdownActionProps = {
  state?: DropdownActionState;
  variation?: DropdownActionVariation;
  items?: DropdownActionItem[];
  onOpenChange?: (open: boolean) => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de montar menus de acao.
2. Aplicar trigger + menu + itens com tokens oficiais.
3. Preservar semantica das acoes (principalmente destrutivas).
4. Validar o checklist de aceite antes de concluir.
