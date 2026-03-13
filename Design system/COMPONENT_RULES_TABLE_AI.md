# Regras de Componente para IA - Table (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Table` com fidelidade ao design system, legibilidade de dados e acessibilidade.

Fonte de referencia:
- Figma `Design System - Topaz`, node `450:5145` (guidelines) e tabela de referencia `456:33065`.
- Implementacao local: `src/stories/Table.tsx` e `src/stories/Table.css`.

## Contrato obrigatorio para IA
- Sempre usar `Table` para dados estruturados em linhas e colunas.
- Sempre manter hierarquia visual: cabecalho, corpo (linhas), rodape totalizador.
- Sempre respeitar variacoes de colunas visiveis sem quebrar alinhamento.
- Sempre manter legibilidade de status, cliente, produto e acoes.
- Nunca transformar dados tabulares em cards sem requisito explicito.

## Estrutura obrigatoria
- Container raiz com:
  - borda e radius,
  - area de conteudo rolavel horizontal quando necessario,
  - footer de total.
- Colunas principais observadas:
  - selecao (checkbox),
  - status (tag),
  - client (icone + nome + documento),
  - number (alinhado a direita),
  - product (icone + nome + plano),
  - colunas textuais adicionais (`Header`),
  - options (botao de acoes).
- Linhas com alternancia de fundo (zebra) para escaneabilidade.

## Especificacao visual base (Figma + DS)

### Container
- Borda: `1px` em `Color/Border/primary`.
- Radius externo: `8px`.
- Fundo principal: superficie secundaria.
- Overflow horizontal permitido no bloco de conteudo.

### Header
- Altura de referencia: `48px`.
- Fundo `Color/Surface/highlight`.
- Texto invertido (`Color/Text/invert`), peso medio.

### Cells
- Altura de referencia: `56px`.
- Padding horizontal de referencia: `16px`.
- Linha alternada com `Color/Surface/primary`.
- Celas numericas alinhadas a direita.

### Status tag
- `success`:
  - fundo `Color/Tag/Surface/water green`,
  - texto `Color/Tag/Text/water green`.
- `info`:
  - fundo `Color/Tag/Surface/sky blue`,
  - texto `Color/Tag/Text/sky blue`.
- Radius pill: `Radius/full`.

### Footer
- Altura de referencia: `48px`.
- Alinhamento a direita.
- Texto `Total: N` com destaque em `Color/Text/highlight`.

## Variacoes funcionais observadas
- Colunas opcionais por flags (`showColumn1..showColumn6`).
- Diferenca de layout entre versao completa e compacta.
- Linhas com estado de selecao via checkbox.
- Celas com conteudo simples e conteudo composto (icone + 2 linhas de texto).

## Tokens mapeados
- `Color/Surface/highlight = #1e1e68`
- `Color/Surface/secondary = #ffffff`
- `Color/Surface/primary = #f5f6f9`
- `Color/Border/primary = #e0dcdc`
- `Color/Text/invert = #ffffff`
- `Color/Text/primary = #242424`
- `Color/Text/highlight = #1e1e68`
- `Color/Icon/primary = #242424`
- `Color/Icon/highlight = #1e1e68`
- `Color/Icon/secondary = #9c9d9f`
- `Color/Icon/invert = #ffffff`
- `Color/Tag/Surface/water green = #4df0b2`
- `Color/Tag/Text/water green = #005c39`
- `Color/Tag/Surface/sky blue = #4dd9ff`
- `Color/Tag/Text/sky blue = #004759`
- `Spacing/sm = 4`
- `Spacing/base = 8`
- `Spacing/md = 12`
- `Spacing/lg = 16`
- `Radius/xs = 4`
- `Radius/full = 56`

Regra: priorizar variaveis semanticas locais (`--color-surface-highlight`, `--color-text-primary`, etc.) e manter hex apenas como fallback.

## Acessibilidade obrigatoria
- Para dados tabulares reais, preferir semantica nativa:
  - `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.
- Se layout custom sem `<table>`, garantir equivalentes ARIA:
  - `role="table"`, `role="row"`, `role="columnheader"`, `role="cell"`.
- Checkboxes com `aria-label` por linha (ex.: "Selecionar linha 1").
- Botao de opcoes com nome acessivel (`aria-label="Opcoes"`).
- Manter contraste adequado entre header/cell/tag.

## Regras de comportamento para geracao automatica
- Preservar alinhamento vertical entre headers e cells mesmo com colunas ocultas.
- Em datasets maiores, suportar scroll horizontal sem quebrar o footer.
- Nao truncar informacao critica sem estrategia (tooltip/ellipsis controlado).
- Em acao por linha, manter botao de opcoes consistente em todas as linhas.
- Atualizar footer `Total` conforme filtros/paginacao quando aplicavel.

## Checklist de aceite
- [ ] Estrutura header/body/footer implementada.
- [ ] Zebra rows aplicadas corretamente.
- [ ] Status tags (`success`/`info`) renderizadas com tokens corretos.
- [ ] Colunas opcionais nao quebram alinhamento.
- [ ] Selecao por checkbox e botao de opcoes acessiveis.
- [ ] Footer totalizador alinhado e atualizado.
- [ ] Semantica tabular/ARIA correta.

## API recomendada
```ts
type StatusTone = "success" | "info";

type TableRow = {
  id: string;
  selected: boolean;
  status: { label: string; tone: StatusTone };
  client: { name: string; document: string };
  number: string;
  product: { name: string; subtitle: string };
  header1: string;
  header2: string;
  header3: string;
};

type TableProps = {
  className?: string;
  rows?: TableRow[];
  total?: number;
  showColumn1?: boolean;
  showColumn2?: boolean;
  showColumn3?: boolean;
  showColumn4?: boolean;
  showColumn5?: boolean;
  showColumn6?: boolean;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de montar listagens tabulares.
2. Implementar `Table` com estrutura, alinhamento e status consistentes.
3. Aplicar tokens e acessibilidade tabular obrigatoria.
4. Validar o checklist de aceite antes de concluir.
