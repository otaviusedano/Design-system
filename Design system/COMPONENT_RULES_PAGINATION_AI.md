# Regras de Componente para IA - Pagination (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Pagination` com fidelidade ao design system Topaz, garantindo navegacao clara entre paginas e controle de quantidade de itens por pagina.

Fonte de referencia:
- Figma `Design System - Topaz`, node `745:13214` (contexto) e instancias de Pagination (ex.: `751:754`, `751:5284`).
- Implementacao local: `src/stories/Pagination.tsx` e `src/stories/pagination.css`.

## Contrato obrigatorio para IA
- Sempre usar `Pagination` quando houver lista/tabela com multiplas paginas.
- Sempre exibir controles de navegacao anterior/proximo.
- Sempre destacar visualmente a pagina atual.
- Sempre impedir navegacao fora dos limites (`< 1` ou `> totalPages`).
- Sempre oferecer controle de `itens por pagina` quando previsto no fluxo.

## Estrutura obrigatoria
- Container principal com dois blocos:
  - seletor de `itens por página`,
  - navegacao de paginas.
- Bloco de itens por pagina:
  - label textual (ex.: `Itens por página:`),
  - trigger do seletor com valor atual,
  - dropdown/lista de opcoes.
- Bloco de navegacao:
  - `nav aria-label="Pagination"`,
  - lista de botoes de paginas,
  - botao `anterior`,
  - botao `proximo`,
  - elipses (`...`) quando houver truncamento.

## Especificacao visual (Figma + codigo local)

### Layout geral
- Distribuicao horizontal entre seletor e paginacao.
- Alinhamento central vertical.
- Gaps pequenos e regulares entre controles.

### Botões de página
- Tamanho base quadrado/compacto.
- Estado default:
  - fundo claro,
  - borda neutra,
  - texto secundario.
- Estado hover:
  - fundo sutilmente destacado,
  - borda/texto com maior contraste.
- Estado ativo:
  - fundo highlight,
  - texto invertido,
  - sem comportamento de hover de item inativo.
- Estado desabilitado:
  - opacidade reduzida e cursor bloqueado.

### Seletor de itens por página
- Trigger com valor atual e icone de seta.
- Ao abrir:
  - borda destacada,
  - dropdown abaixo com opcoes clicaveis.
- Opcao ativa destacada visualmente.

## Variacoes e estados
- Estados de paginacao:
  - inicio (botao anterior desabilitado),
  - meio (ambos habilitados),
  - fim (botao proximo desabilitado).
- Variacao por volume de paginas:
  - poucas paginas: mostrar todas,
  - muitas paginas: mostrar primeira/ultima + janela local + elipses.
- Opcional `showFirstLast` para reforcar primeira/ultima pagina.
- Variacao de `maxVisible` para controlar quantidade de paginas renderizadas.

## Tokens mapeados
- `Color/Surface/highlight = #1e1e68`
- `Color/Surface/disabled = #e0dcdc`
- `Color/Text/invert = #ffffff`
- `Color/Text/highlight = #1e1e68`
- `Color/Text/primary = #242424`
- `Color/Text/secondary = #707070`
- `Color/Icon/highlight = #1e1e68`
- `Color/Icon/secondary = #9c9d9f`
- `Color/Border/highlight = #1e1e68`
- `Color/Border/secondary = #9c9d9f`
- `Spacing/sm = 4`
- `Spacing/base = 8`
- `Spacing/md = 12`
- `Spacing/lg = 16`
- `Radius/xs = 4`

Regra: priorizar aliases semanticos locais (`--text-secondary`, `--surface-highlight`, `--border-highlight`) e usar hex apenas como fallback.

## Acessibilidade obrigatoria
- Bloco de paginas com `<nav aria-label="Pagination">`.
- Botao de pagina ativa com `aria-current="page"`.
- Botões anterior/proximo com `aria-label` explicita.
- Botões desabilitados com atributo `disabled`.
- Trigger do seletor com:
  - `role="button"`,
  - `aria-haspopup="listbox"`,
  - `aria-expanded`.
- Fechamento do dropdown com tecla `Escape`.
- Navegacao por teclado com foco visivel em todos os elementos interativos.

## Regras de comportamento para geracao automatica
- `handlePageChange` deve validar limites e evitar evento redundante na pagina atual.
- Mudar `itens por pagina` deve disparar callback e fechar dropdown.
- Fechar dropdown ao clicar fora.
- Renderizar elipses apenas quando houver lacuna real entre blocos de paginas.
- Em listas curtas, nao usar elipses.
- Em listas longas, manter contexto visual da pagina atual (janela ao redor).

## Checklist de aceite
- [ ] Navegacao anterior/proximo funcionando com limites.
- [ ] Pagina atual destacada e marcada com `aria-current`.
- [ ] Elipses e truncamento coerentes para muitas paginas.
- [ ] Seletor de itens por pagina abre, seleciona e fecha corretamente.
- [ ] Dropdown fecha ao clicar fora e ao pressionar `Escape`.
- [ ] Estados hover/ativo/disabled aplicados.
- [ ] Tokens do design system aplicados.

## API recomendada
```ts
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
  itemsPerPage: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Implementar paginacao com controles completos de navegação.
2. Tratar estados de inicio/meio/fim sem inconsistencias.
3. Garantir acessibilidade no nav e no seletor de itens por pagina.
4. Validar o checklist antes da entrega.
