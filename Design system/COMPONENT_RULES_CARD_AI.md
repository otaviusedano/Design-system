# Regras de Componente para IA - Card (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Card` com fidelidade ao Figma e consistencia com o design system.

Fonte de referencia:
- Figma `Design System - Topaz`, node `261:3863`.
- Subnodes de card: instancias `306:5003`/`306:4940` e variacao com menu de acoes `313:4618`.
- Implementacao local: `src/stories/Card.tsx` e `src/stories/card.css`.

## Contrato obrigatorio para IA
- Sempre usar o componente `Card` para agrupamento de conteudo contextual.
- Nunca recriar um layout card "na mao" quando o componente existe.
- Preservar estrutura semantica de cabecalho + corpo (e area de acoes quando houver).
- Manter tokens do DS para borda, espacamento, tipografia e cores.
- Respeitar variacao funcional (`multiple-actions` ou `simple-action`) conforme contexto.

## Estrutura obrigatoria
- Container externo do card.
- Header com:
  - icone opcional + titulo,
  - area de acoes (tag + acao principal).
- Content area (bloco de conteudo interno).
- Em cards de lista, pode haver divider e itens informativos adicionais.

## Variacoes funcionais confirmadas

### `multiple-actions`
- Header com `Tag` + botao de acao (icone 3 pontos/plus conforme instancia).
- Acao abre menu contextual (`Dropdown action`) quando aplicavel.

### `simple-action`
- Header com `Tag` + link/botao textual `Detalhes`.
- Sem menu expandido por padrao.

Regra: nao misturar comportamentos das variacoes no mesmo card sem instrucao explicita.

## Especificacao visual base (Figma + DS)

### Container
- Fundo: `Color/Surface/secondary` (`#ffffff`).
- Borda: `1px` com `Color/Border/primary` (`#e0dcdc`).
- Radius: `8px`.
- Padding: `Spacing/lg` (`16px`).
- Gap vertical interno: `Spacing/base` (`8px`).

### Header
- Layout horizontal com `space-between`.
- Gap interno entre grupos: `Spacing/md` (`12px`).
- Titulo:
  - icone highlight,
  - texto `Montserrat Bold`, `18px`, `line-height 24px`.

### Tag no header
- Surface: `Color/Tag/Surface/purple` (`#9864e2`).
- Text: `Color/Tag/Text/purple` (`#2f0f5c`).
- Padding: `4px 8px`.
- Radius pill (`56px` fallback).
- Tipografia: `12px`, `SemiBold`, `line-height 16px`.

### Acoes no header
- Botao icon-only:
  - `44x44`,
  - borda com `Color/Border/highlight`,
  - icone `Color/Icon/highlight`.
- Estado pressed/ativo (quando houver): usar `Color/Surface/pressed` e icone invertido.

### Content area
- Largura 100%.
- Altura minima de referencia: `80px`.
- Fundo: `Color/Surface/primary` (`#f5f6f9`).
- Borda tracejada com highlight.
- Radius: `8px`.
- Conteudo centralizado.

## Tokens mapeados
- `Color/Surface/secondary = #ffffff`
- `Color/Border/primary = #e0dcdc`
- `Color/Border/highlight = #1e1e68`
- `Color/Surface/primary = #f5f6f9`
- `Color/Surface/pressed = #181853`
- `Color/Icon/highlight = #1e1e68`
- `Color/Icon/invert = #ffffff`
- `Color/Text/highlight = #1e1e68`
- `Color/Tag/Surface/purple = #9864e2`
- `Color/Tag/Text/purple = #2f0f5c`
- `Spacing/base = 8`
- `Spacing/sm = 4`
- `Spacing/md = 12`
- `Spacing/lg = 16`

Regra: usar aliases do projeto sempre que existirem; valores hex sao fallback.

## Acessibilidade obrigatoria
- Usar estrutura semantica (`article`, `header`, regioes internas).
- Titulo com heading apropriado ao contexto (`h3` ou equivalente).
- Acoes clicaveis devem ser botao real (`button`) com nome acessivel.
- Em menu de acoes, aplicar semantica de menu (`role="menu"` e `menuitem`) quando aberto.
- Garantir foco visivel em acao principal e links de detalhes.

## Regras de comportamento para geracao automatica
- Nao substituir `Tag` por texto puro no header.
- Nao remover borda/raio para "simplificar visual".
- Nao colocar texto longo sem estrategia de overflow.
- Em listas de cards, manter espacamento vertical consistente.
- Em `multiple-actions`, nao exibir menu aberto por padrao em telas finais (exceto demonstracao de estado).

## Checklist de aceite
- [ ] Card renderizado com estrutura completa (header + content).
- [ ] Variacao correta aplicada (`simple-action` ou `multiple-actions`).
- [ ] Titulo, tag e area de acoes seguem especificacao.
- [ ] Content area preserva fundo, borda e alinhamento.
- [ ] Tokens foram usados no lugar de valores soltos.
- [ ] Acessibilidade das acoes e heading esta correta.

## API recomendada
```ts
type CardVariation = 'multiple-actions' | 'simple-action';

type CardProps = {
  title?: string;
  tagLabel?: string;
  content?: React.ReactNode;
  variation?: CardVariation;
  icon?: React.ReactNode;
  onActionClick?: () => void;
  onDetailsClick?: () => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de montar cards.
2. Escolher a variacao correta pelo fluxo da tela.
3. Renderizar header, tag, acoes e content com tokens oficiais.
4. Validar o checklist de aceite antes de concluir.
