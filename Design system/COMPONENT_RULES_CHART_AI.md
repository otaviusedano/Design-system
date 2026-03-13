# Regras de Componente para IA - Chart (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Chart` com fidelidade ao design system Topaz, garantindo leitura clara de dados e consistencia entre tipos de grafico.

Fonte de referencia:
- Figma `Design System - Topaz`, node `758:2809` (contexto) e instancias de `Chart` (ex.: `779:12927`, `778:11970`, `779:12452`).
- Implementacao local: `src/stories/Chart.tsx` e `src/stories/chart.css`.

## Contrato obrigatorio para IA
- Sempre usar `Chart` para visualizacao comparativa de dados temporais ou proporcionais.
- Sempre manter eixos/rotulos legiveis quando o tipo exigir.
- Sempre garantir contraste entre series de dados e fundo.
- Sempre manter consistencia visual de legenda com as cores das series.
- Nunca usar estilo de grafico que contradiga o tipo selecionado (`bar`, `line`, `circle`).

## Estrutura obrigatoria
- Container raiz do grafico.
- Para graficos cartesianos (`bar`/`line`):
  - eixo Y com steps percentuais,
  - area de plot com grid,
  - eixo X com meses,
  - legenda opcional.
- Para grafico circular (`circle`):
  - area SVG circular,
  - legenda opcional, centralizada ou ao lado.
- Suporte a variacoes de composicao:
  - `simple`,
  - `type`,
  - `multi`,
  - `multi-type`.

## Especificacao visual (Figma + codigo local)

### Cartesiano
- Linhas de grade discretas (`chart-grid`) para facilitar leitura.
- Eixo Y em texto pequeno/secundario.
- Eixo X com meses (`Jan` a `Dez`) em alinhamento uniforme.
- Barras com cantos superiores arredondados.
- Linha suave (curva) quando `type="line"`.
- Em `multi-type`, area empilhada com multiplas cores.

### Circular
- Segmentos coloridos com proporcao por valor.
- Tamanho adaptado por `size` (`sm`/`md`).
- Legenda associando cor e label.

### Legenda
- Exibir swatch + label.
- Controlar quantidade de itens conforme variacao e toggles (`showPartX`).
- Em `circle`, aceitar legenda ao lado (`withInfoRight`) ou centralizada.

## Variacoes e estados
- `variation`: `simple | multi | type | multi-type`.
- `type`: `bar | line | circle`.
- `size`: `default | sm | md` (especialmente relevante para `circle`).
- `showLegend`: exibe/oculta legenda.
- `withInfoRight`: posicionamento da informacao no layout circular.
- Toggling parcial de series:
  - `showPart1`, `showPart2`, `showPart3`, `showPart4`, `showPart6`.

## Tokens mapeados
- `Color/Text/secondary = #707070`
- `Color/Text/highlight = #1e1e68`
- `Color/Icon/highlight = #1e1e68`
- `Color/Border/primary = #e0dcdc`
- `Color/Border/secondary = #9c9d9f`
- `Color/Chart/surface/green = #56f56c`
- `Spacing/base = 8`
- `Spacing/md = 12`
- `Spacing/lg = 16`
- `Spacing/2xl = 32`
- `Radius/base = 8`
- `Color/Surface/secondary = #ffffff`
- `Color/Surface/primary = #f5f6f9`

Observacao: o codigo local utiliza paleta adicional interna para series (`green`, `red`, `blue`, `skyBlue`, `purple`) quando necessario.

## Acessibilidade obrigatoria
- Fornecer contexto textual do grafico (titulo/descricao) quando inserido em tela real.
- Legenda deve ser legivel e associavel visualmente as series.
- Evitar depender apenas de cor para diferenciar series em cenarios criticos; complementar com labels.
- Elementos decorativos podem usar `aria-hidden="true"`.
- Quando houver tooltip/interacao, garantir leitura de dados equivalente em texto.

## Regras de comportamento para geracao automatica
- `bar + simple`: uma serie principal.
- `bar + multi`: barras agrupadas por periodo.
- `bar + type`: barras empilhadas por categoria.
- `line + simple/type`: linha suavizada com area opcional.
- `line + multi-type`: areas empilhadas suavizadas.
- `circle`: distribuição proporcional por fatias.
- `showLegend=false` remove apenas legenda, sem afetar plot.
- Respeitar toggles de partes para montar legenda/series visiveis.

## Checklist de aceite
- [ ] Tipo e variação corretos para o contexto dos dados.
- [ ] Eixos e labels legiveis (quando aplicavel).
- [ ] Legenda coerente com as cores das series.
- [ ] Contraste suficiente entre dados, grid e fundo.
- [ ] Layout circular/cartesiano aplicado corretamente.
- [ ] Tamanhos e toggles funcionando conforme props.
- [ ] Tokens do DS aplicados.

## API recomendada
```ts
type ChartVariation = "simple" | "multi" | "type" | "multi-type";
type ChartType = "bar" | "line" | "circle";
type ChartSize = "default" | "sm" | "md";

type ChartProps = {
  className?: string;
  variation?: ChartVariation;
  type?: ChartType;
  size?: ChartSize;
  showLegend?: boolean;
  withInfoRight?: boolean;
  showPart1?: boolean;
  showPart2?: boolean;
  showPart3?: boolean;
  showPart4?: boolean;
  showPart6?: boolean;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Selecionar o tipo de `Chart` mais adequado ao objetivo analitico.
2. Preservar legibilidade de eixos, series e legenda.
3. Aplicar tokens e paleta consistente com o DS Topaz.
4. Validar o checklist antes da entrega.
