# Regras de Layout para IA - Pagina Padrao de Aplicacao (Topaz Design System)

## Objetivo
Este documento define as regras estruturais de layout para uma pagina padrao de aplicacao do Topaz Design System.

O objetivo e permitir que desenvolvedores, geradores de interface e agentes de IA criem paginas com estrutura consistente, espacamento previsivel, hierarquia estavel e posicionamento deterministico de componentes.

Este documento complementa as regras individuais de componentes (`COMPONENT_RULES_*_AI.md`). Quando houver conflito:
- Esta regra define onde e quando o componente deve aparecer na pagina.
- A regra do componente define como o componente deve ser construido internamente.

## Contrato obrigatorio para IA
- Toda pagina padrao deve possuir exatamente uma `Sidebar` persistente.
- A `Sidebar` e o unico componente de navegacao persistente da aplicacao.
- A pagina nao possui `Header`; nenhum layout pode introduzir barra superior global.
- A `Sidebar` deve permanecer visivel o tempo todo no desktop.
- O conteudo principal deve ficar sempre a direita da `Sidebar`.
- A distancia horizontal entre a borda direita visivel da `Sidebar` e o inicio do conteudo da pagina deve ser exatamente `56px`.
- Toda pagina deve possuir exatamente um `Main Content Container`.
- O `Main Content Container` deve controlar o fluxo vertical completo da pagina.
- O layout deve seguir a hierarquia fixa: `Sidebar` -> `Page Container` -> `Context Information` -> `Page Actions` -> `Content Sections`.

## Estrutura global da pagina

### Hierarquia obrigatoria
1. `Sidebar` (navegacao persistente)
2. `Page Container`
3. `Context Information`
4. `Page Actions` (opcional)
5. `Content Sections`

### Regra estrutural base
```txt
Page
|- Sidebar
`- Main Content Container
   |- Context Zone
   |  |- Breadcrumbs
   |  |- Page Title
   |  `- Page Description (optional)
   |- Action Zone (optional)
   `- Content Zone
      |- Section 1
      |- Section 2
      `- Section N
```

### Regras obrigatorias
- A `Sidebar` deve ficar fixa no lado esquerdo da viewport.
- O `Main Content Container` deve ocupar a area a direita da `Sidebar`.
- O `Main Content Container` nunca pode ser renderizado sob a `Sidebar`.
- O `Main Content Container` deve iniciar exatamente `56px` apos a borda direita visivel da `Sidebar`.
- Nenhum componente de pagina pode ser renderizado entre a `Sidebar` e esse offset de `56px`.
- `Breadcrumbs`, `Page Title` e `Page Description` pertencem sempre ao topo do `Main Content Container`.
- `Page Actions`, quando existirem, devem aparecer abaixo do bloco de contexto e acima da primeira secao de conteudo.
- `Content Sections` devem ser renderizadas em fluxo vertical, nunca sobrepostas.

## Estrutura do page container

### Hierarquia interna obrigatoria
```txt
Main Content Container
|- Breadcrumbs
|- Page Title
|- Page Description (optional)
|- Page Actions (optional)
`- Content Sections
```

### Regras de espacamento internas
- `Breadcrumbs` -> `Page Title`: `16px`
- `Page Title` -> `Page Description`: `16px`
- `Page Title` -> `Page Actions`: `16px` quando nao houver descricao
- `Page Description` -> `Page Actions`: `16px`
- `Page Description` -> primeira `Content Section`: `16px` quando nao houver `Page Actions`
- `Page Actions` -> primeira `Content Section`: `16px`
- `Content Section` -> `Content Section`: `32px`

### Regras de container
- O `Main Content Container` deve usar fluxo vertical (`column`).
- Largura: preencher toda a largura disponivel apos descontar a area da `Sidebar` e o offset de `56px`.
- Altura: no minimo a altura visivel da viewport.
- Overflow vertical: permitido no conteudo principal.
- Overflow horizontal: permitido apenas em componentes que o exigem, como `Table`.
- O container nao deve centralizar verticalmente o conteudo da pagina.

## Zonas de layout

### `Navigation Zone`
Contem:
- `Sidebar`

Regras:
- E fixa e persistente.
- Nunca recebe componentes de conteudo.
- Nunca recebe `Toast`, `Tooltip`, `Modal` ou `Digital signature`.

### `Context Zone`
Contem:
- `Breadcrumbs`
- `Page Title`
- `Page Description` (opcional)

Regras:
- Sempre aparece no topo do `Main Content Container`.
- Nunca deve conter formularios, tabelas, cards de dados ou componentes de feedback.
- Deve ser renderizada antes de `Action Zone` e `Content Zone`.

### `Action Zone`
Contem:
- `Button`
- `Dropdown action`
- `Switch button`

Regras:
- E opcional.
- Deve aparecer abaixo da `Context Zone`.
- Deve controlar acoes da pagina atual, nao navegacao global.
- Pode conter uma unica linha de acoes ou multiplas linhas agrupadas por prioridade.

### `Content Zone`
Contem principalmente:
- `Card`
- `Dashboard card`
- `Summary card`
- `Quota card`
- `Chart`
- `Table`
- `Tabs`
- `Stepper`
- `Form fields`
- `Category carousel`
- `Value display`
- `QR code`
- `Empty state`

Regras:
- E a unica zona que pode conter secoes de negocio da pagina.
- Cada secao deve ser separada da proxima por `32px`.
- Pode conter subgrupos internos com `16px` ou `24px`, conforme a regra do tipo de conteudo.

### `Feedback Zone`
Contem:
- `Toast`
- `Tooltip`
- `Loading`
- `Skeleton`

Regras:
- Nao altera a ordem estrutural da pagina.
- Pode sobrepor a `Content Zone`, mas nao substitui a estrutura base da pagina.
- `Toast` e `Tooltip` sao transient UI.
- `Loading` e `Skeleton` sao estados temporarios do conteudo.

### `Overlay Zone`
Contem:
- `Modal`
- `Digital signature`

Regras:
- E renderizada acima de todas as outras zonas.
- Bloqueia interacao com o fundo enquanto estiver ativa.
- Nao participa do fluxo normal do `Main Content Container`.

## Regras de espacamento

### Escala oficial
- `4px`
- `8px`
- `16px`
- `24px`
- `32px`
- `40px`
- `56px`
- `64px`

### Regras de uso
- `4px`: micro-espacos internos, ajustes entre icone e texto, ou agrupamentos muito densos.
- `8px`: espacamento interno compacto entre subelementos pequenos.
- `16px`: elementos fortemente relacionados no mesmo bloco.
- `24px`: espacamento padrao entre campos de formulario e grupos internos de conteudo.
- `32px`: separacao entre secoes principais de conteudo.
- `40px`: padding estrutural interno de containers principais quando um bloco precisar maior respiracao visual.
- `56px`: offset horizontal fixo entre `Sidebar` e `Main Content Container`.
- `64px`: separacao excepcional entre macro-blocos de pagina, apenas quando explicitamente exigido.

### Regras deterministicas
- Usar `16px` para:
  - `Breadcrumbs` -> `Page Title`
  - `Page Title` -> `Page Description`
  - `Page Title` -> `Page Actions`
  - `Label` -> `Input`
  - `Input` -> `Help text`
  - pequenos grupos de controles
- Usar `24px` para:
  - `Form field` -> `Form field`
  - grupos internos de filtros
  - acoes de formulario separadas do ultimo campo
- Usar `32px` para:
  - secao -> secao
  - bloco de filtros -> tabela
  - bloco de cards -> bloco de charts
  - chart -> tabela
  - dashboard section -> dashboard section
- Usar `56px` somente para:
  - `Sidebar` -> inicio do `Main Content Container`

## Regras de colocacao de componentes

### `Breadcrumbs`
- Localizacao tipica: topo da `Context Zone`.
- Containers pai permitidos: `Main Content Container > Context Zone`.
- Espacamento: `16px` abaixo.
- Comportamento: renderizar quando a profundidade de navegacao for maior que `1`.
- Restricoes: o ultimo item nunca e clicavel; nao substituir `Page Title`.

### `Button`
- Localizacao tipica: `Action Zone`, rodape de formulario ou dentro de cards.
- Containers pai permitidos: `Action Zone`, `Card`, `Modal`, `Form section`, `Empty state`.
- Espacamento: `16px` entre botoes relacionados; `24px` antes do grupo de acoes de formulario.
- Comportamento: executa acao primaria ou secundaria.
- Restricoes: nao usar como item de navegacao persistente da pagina.

### `Card`
- Localizacao tipica: `Content Zone`.
- Containers pai permitidos: `Content Section`, `Tabs panel`, grids de conteudo.
- Espacamento: `32px` entre grupos de cards; `16px` entre cards do mesmo grupo.
- Comportamento: agrupa conteudo relacionado.
- Restricoes: padding interno obrigatorio de `24px`; nao substituir `Table` quando os dados forem tabulares.

### `Category carousel`
- Localizacao tipica: topo de secoes exploratorias na `Content Zone`.
- Containers pai permitidos: `Content Section`, `Card`.
- Espacamento: `16px` abaixo do titulo da secao e `32px` para a proxima secao.
- Comportamento: navegacao horizontal entre categorias.
- Restricoes: nao usar como navegacao global da aplicacao.

### `Chart`
- Localizacao tipica: secoes analiticas na `Content Zone`.
- Containers pai permitidos: `Content Section`, `Card`, `Dashboard card`, `Tabs panel`.
- Espacamento: `32px` para tabelas ou outros charts; `16px` para legenda ou filtros locais.
- Comportamento: apresenta metricas visuais.
- Restricoes: deve possuir area minima suficiente; nao comprimir abaixo da legibilidade.

### `Checkbox`
- Localizacao tipica: formularios, filtros e selecao em tabelas.
- Containers pai permitidos: `Form section`, `Filter group`, `Table`.
- Espacamento: `16px` entre checkbox e label associada; `24px` entre grupos.
- Comportamento: selecao multipla booleana.
- Restricoes: nao usar para escolha mutuamente exclusiva.

### `Dashboard card`
- Localizacao tipica: topo de dashboards e secoes de resumo.
- Containers pai permitidos: `Content Section`, grids de dashboard.
- Espacamento: `16px` entre cards do mesmo grid; `32px` para a proxima secao.
- Comportamento: mostra resumo operacional com metricas.
- Restricoes: nao substituir `Summary card` quando o foco for KPI simples.

### `Date picker`
- Localizacao tipica: filtros ou formularios.
- Containers pai permitidos: `Filter group`, `Form section`, `Modal`.
- Espacamento: `16px` entre label e campo; `24px` entre campos.
- Comportamento: seleciona data unica ou intervalo conforme variante do componente.
- Restricoes: nao usar como trigger isolado sem label ou contexto.

### `Divider`
- Localizacao tipica: entre grupos internos de conteudo.
- Containers pai permitidos: `Card`, `Form section`, `Modal`, `Sidebar footer`.
- Espacamento: `16px` acima e `16px` abaixo.
- Comportamento: separacao visual nao interativa.
- Restricoes: nao usar `Divider` para substituir espacamento estrutural de `32px`.

### `Text input`
- Localizacao tipica: filtros e formularios.
- Containers pai permitidos: `Filter group`, `Form section`, `Modal`.
- Espacamento: `16px` entre label e campo; `24px` entre campos.
- Comportamento: captura texto de entrada.
- Restricoes: deve seguir ordem logica de formulario; nao usar sem label quando o campo for critico.

### `Select`
- Localizacao tipica: filtros e formularios.
- Containers pai permitidos: `Filter group`, `Form section`, `Modal`.
- Espacamento: `16px` entre label e controle; `24px` entre controles.
- Comportamento: seleciona uma ou mais opcoes conforme variante.
- Restricoes: nao usar `Radio button` quando a lista for longa e vice-versa.

### `Radio button`
- Localizacao tipica: formularios com escolhas exclusivas.
- Containers pai permitidos: `Form section`, `Card`, `Modal`.
- Espacamento: `16px` entre opcoes no mesmo grupo; `24px` entre grupos.
- Comportamento: selecao unica.
- Restricoes: sempre em grupo nomeado; nao usar para multiplas selecoes.

### `Dropdown action`
- Localizacao tipica: `Action Zone`, header de `Card`, celula de `Table`.
- Containers pai permitidos: `Action Zone`, `Card`, `Table`, `Dashboard card`.
- Espacamento: `16px` do titulo ou do botao adjacente.
- Comportamento: agrupa acoes secundarias.
- Restricoes: nao substituir acao primaria obrigatoria por menu quando a acao principal precisar estar visivel.

### `Empty state`
- Localizacao tipica: `Content Zone`, no lugar do conteudo principal ausente.
- Containers pai permitidos: `Content Section`, `Card`, `Tabs panel`.
- Espacamento: `16px` entre mensagem e acao; `32px` para outras secoes.
- Comportamento: informa ausencia de dados ou estado inicial.
- Restricoes: substitui `Table`, lista ou grid vazio; nao coexistir com dados reais no mesmo bloco.

### `File uploader`
- Localizacao tipica: formularios e modais.
- Containers pai permitidos: `Form section`, `Card`, `Modal`.
- Espacamento: `16px` entre label e uploader; `24px` entre campos relacionados.
- Comportamento: adiciona e gerencia arquivos.
- Restricoes: deve aparecer dentro de um fluxo de formulario; nao usar como acao solta sem contexto.

### `Loading`
- Localizacao tipica: `Feedback Zone` sobre a secao carregada ou sobre a pagina.
- Containers pai permitidos: `Content Section`, `Main Content Container`, `Modal`.
- Espacamento: nao participa do fluxo; sobreposicao.
- Comportamento: indica operacao assincrona em andamento.
- Restricoes: usar quando o carregamento bloquear interacao ou quando nao houver estrutura suficiente para `Skeleton`.

### `Skeleton`
- Localizacao tipica: `Content Zone`, substituindo temporariamente conteudo ainda nao carregado.
- Containers pai permitidos: `Card`, `Table area`, `Dashboard grid`, `Form section`.
- Espacamento: deve ocupar o mesmo espacamento estrutural do conteudo final.
- Comportamento: representa layout esperado durante carregamento.
- Restricoes: usar no lugar do componente futuro; nao combinar com `Loading` centralizado no mesmo bloco sem justificativa.

### `Modal`
- Localizacao tipica: `Overlay Zone`.
- Containers pai permitidos: raiz de overlay da pagina.
- Espacamento: centralizado; conteudo interno segue `16px` e `24px`.
- Comportamento: bloqueia interacao com fundo.
- Restricoes: nao pode ser inserido dentro do fluxo da `Content Zone`.

### `Pagination`
- Localizacao tipica: abaixo de `Table`.
- Containers pai permitidos: `Content Section`, `Card` com listagem.
- Espacamento: `16px` acima quando vier logo apos `Table`.
- Comportamento: controla troca de pagina de dados.
- Restricoes: obrigatoria quando dataset filtrado tiver mais de `10` itens.

### `QR code`
- Localizacao tipica: secoes operacionais, cards ou modais.
- Containers pai permitidos: `Card`, `Modal`, `Content Section`.
- Espacamento: `16px` entre codigo, descricao e acoes associadas.
- Comportamento: exibe informacao escaneavel.
- Restricoes: deve manter area livre para leitura; nao reduzir abaixo do minimo funcional.

### `Sidebar`
- Localizacao tipica: `Navigation Zone`.
- Containers pai permitidos: raiz da pagina.
- Espacamento: offset fixo de `56px` ate o inicio do conteudo.
- Comportamento: navegacao persistente da aplicacao.
- Restricoes: unica navegacao persistente; nunca remover para criar `Header`.

### `Digital signature`
- Localizacao tipica: `Overlay Zone`.
- Containers pai permitidos: raiz de overlay da pagina, normalmente em `Modal` ou fluxo equivalente bloqueante.
- Espacamento: padding interno do fluxo de assinatura em `24px`.
- Comportamento: bloqueia a conclusao do processo ate assinatura/cancelamento.
- Restricoes: nao renderizar embutido como elemento inline da `Content Zone`.

### `Stepper`
- Localizacao tipica: topo de formularios multi-etapa na `Content Zone`.
- Containers pai permitidos: `Content Section`, `Card`, `Modal`.
- Espacamento: `16px` abaixo do titulo da secao; `24px` antes do primeiro grupo de campos.
- Comportamento: indica e controla progresso em etapas.
- Restricoes: usar apenas quando o fluxo tiver `2` ou mais etapas reais.

### `Tabs`
- Localizacao tipica: topo de secoes com alternancia de conteudo.
- Containers pai permitidos: `Content Section`, `Card`.
- Espacamento: `16px` abaixo do titulo da secao; `16px` entre barra de tabs e painel ativo.
- Comportamento: alterna paines sem navegacao global.
- Restricoes: nao substituir `Breadcrumbs` ou `Sidebar`.

### `Summary card`
- Localizacao tipica: topo de dashboard ou secoes de KPI.
- Containers pai permitidos: grids de resumo na `Content Zone`.
- Espacamento: `16px` entre cards; `32px` para a proxima secao.
- Comportamento: mostra indicador sintetico.
- Restricoes: usar para metricas pontuais; nao para grandes conjuntos tabulares.

### `Quota card`
- Localizacao tipica: dashboards, areas de consumo e capacidade.
- Containers pai permitidos: `Content Section`, grids de resumo, `Card`.
- Espacamento: `16px` entre cards relacionados.
- Comportamento: apresenta uso versus limite.
- Restricoes: deve manter comparacao explicita entre valor atual e capacidade maxima.

### `Switch button`
- Localizacao tipica: `Action Zone`, filtros ou formularios.
- Containers pai permitidos: `Action Zone`, `Filter group`, `Form section`, `Card`.
- Espacamento: `16px` entre switch e label; `24px` entre grupos.
- Comportamento: alterna estado booleano imediatamente.
- Restricoes: nao usar para acoes destrutivas ou confirmacoes finais.

### `Table`
- Localizacao tipica: `Content Zone`, geralmente apos filtros.
- Containers pai permitidos: `Content Section`, `Card`, `Tabs panel`.
- Espacamento: `32px` apos blocos de filtros; `16px` ate `Pagination`.
- Comportamento: exibe dados estruturados em linhas e colunas.
- Restricoes: se a tabela existir, nao converter em lista livre; em telas pequenas deve permitir scroll horizontal.

### `Toast`
- Localizacao tipica: `Feedback Zone`, sobre a interface.
- Containers pai permitidos: camada global de feedback da pagina.
- Espacamento: empilhamento com `16px` entre toasts consecutivos.
- Comportamento: aparece no canto superior direito e desaparece automaticamente apos alguns segundos.
- Restricoes: nao substituir mensagem persistente de erro ou validacao inline.

### `Tooltip`
- Localizacao tipica: associado a elementos da `Content Zone`, `Action Zone` ou `Sidebar`.
- Containers pai permitidos: ancora no elemento disparador; camada de overlay leve.
- Espacamento: offset pequeno do elemento ancora; nao participa do fluxo.
- Comportamento: aparece em hover ou focus.
- Restricoes: nao conter informacao critica exclusiva.

### `Value display`
- Localizacao tipica: dashboards, cards de detalhe e secoes de resumo.
- Containers pai permitidos: `Card`, `Dashboard card`, `Summary card`, `Quota card`, `Content Section`.
- Espacamento: `8px` entre label e valor; `16px` para outros displays relacionados.
- Comportamento: apresenta um valor principal com contexto textual.
- Restricoes: nao usar como substituto de campo editavel.

## Padroes de secao de conteudo

### Pagina de tabela de dados
Estrutura obrigatoria:
1. `Breadcrumbs`
2. `Page Title`
3. `Filters`
4. `Table`
5. `Pagination`

Regras:
- `Filters` devem aparecer antes da `Table`.
- `Filters` podem usar `Text input`, `Select`, `Date picker` e `Switch button`.
- Distancia entre `Filters` e `Table`: `32px`.
- `Pagination` deve aparecer imediatamente abaixo da `Table`, com `16px` acima.
- Se o dataset filtrado tiver `0` itens, substituir `Table` + `Pagination` por `Empty state`.

### Pagina de dashboard
Estrutura obrigatoria:
1. grupo de `Summary cards`
2. grupo de `Charts`
3. grupo de `Dashboard cards`
4. `Tables` quando houver detalhamento

Regras:
- Cada grupo principal deve ser tratado como uma `Content Section`.
- Distancia entre grupos principais: `32px`.
- Cards do mesmo grupo usam `16px` entre si.
- Charts devem aparecer antes de tabelas quando a pagina combinar visao analitica e detalhamento.

### Pagina de formulario
Estrutura obrigatoria:
1. `Stepper` (opcional)
2. grupos de campos
3. `Divider` entre grupos, quando necessario
4. acoes de formulario

Regras:
- Campos usam `24px` entre si.
- `Divider` separa grupos internos, nao secoes principais da pagina.
- Acoes finais devem aparecer apos o ultimo grupo de campos.
- Distancia entre ultimo campo/grupo e acoes: `24px`.

### Pagina de empty state
Estrutura obrigatoria:
1. `Breadcrumbs` quando aplicavel
2. `Page Title`
3. `Empty state`
4. acao primaria opcional

Regras:
- O `Empty state` substitui a secao principal de conteudo.
- A acao primaria deve aparecer dentro do proprio bloco do `Empty state` ou imediatamente abaixo dele.
- Nao renderizar `Table`, cards vazios ou graficos sem dados junto com o `Empty state` principal.

## Regras de comportamento dos componentes na pagina

### `Toast`
- Posicao fixa: canto superior direito da viewport.
- Comportamento: desaparece automaticamente apos alguns segundos.
- Uso: feedback breve de sucesso, erro nao bloqueante ou informacao contextual.

### `Modal`
- Posicao fixa: centro da viewport.
- Comportamento: bloqueia a interacao com o fundo.
- Uso: confirmacoes, edicao isolada, acoes criticas.

### `Tooltip`
- Posicao: ancorada ao elemento disparador.
- Comportamento: abre em hover ou focus e fecha ao perder hover/focus.
- Uso: esclarecimento curto e complementar.

### `Loading`
- Posicao: sobre a area afetada ou sobre a pagina inteira.
- Comportamento: indica operacao assincrona em progresso.
- Uso: quando o usuario precisa aguardar para continuar.

### `Skeleton`
- Posicao: exatamente onde o conteudo final sera renderizado.
- Comportamento: substitui temporariamente o conteudo.
- Uso: carregamento inicial de cards, tabelas, listas e formularios.

### `Tabs`
- Posicao: topo da secao de conteudo que controla.
- Comportamento: alterna paineis sem mudar a navegacao global.
- Uso: separar subconjuntos de conteudo relacionados.

## Comportamento responsivo

### Desktop
- `Sidebar` totalmente visivel.
- O offset entre `Sidebar` e `Main Content Container` permanece `56px`.
- Tabelas podem ocupar largura extensa e manter scroll horizontal quando necessario.
- Cards podem ser organizados em grid.

### Tablet
- `Sidebar` pode colapsar para modo somente icone.
- O `Main Content Container` deve continuar respeitando `56px` a partir da borda direita visivel da `Sidebar`.
- Grids de cards devem reduzir colunas antes de reduzir legibilidade.
- Tabelas mantem scroll horizontal quando a largura nao for suficiente.

### Mobile
- `Sidebar` vira drawer em overlay.
- Enquanto aberta, a `Sidebar` sobrepoe o conteudo; enquanto fechada, o conteudo ocupa a largura disponivel.
- `Breadcrumbs`, titulo, acoes e secoes continuam em fluxo vertical.
- Cards devem empilhar verticalmente.
- Tabelas devem ser horizontalmente rolaveis; nao transformar automaticamente em cards sem regra explicita.

## Regras deterministicas para geracao automatica de UI
- Toda pagina deve iniciar pela verificacao da presenca da `Sidebar`.
- Nenhuma pagina pode conter `Header` global.
- Toda pagina deve ter exatamente um `Main Content Container`.
- O `Main Content Container` deve comecar `56px` apos a borda direita visivel da `Sidebar`.
- Se a profundidade de navegacao for maior que `1`, renderizar `Breadcrumbs`.
- `Page Title` deve sempre aparecer abaixo de `Breadcrumbs` quando `Breadcrumbs` existirem.
- `Page Title` e obrigatorio em toda pagina padrao.
- `Page Description` e opcional, mas quando existir deve aparecer abaixo do titulo.
- `Page Actions` sao opcionais, mas quando existirem devem ficar abaixo do bloco de contexto e acima do conteudo.
- `Content Sections` devem ser separadas por `32px`.
- Formularios devem usar `24px` entre campos.
- Grupos de elementos relacionados devem usar `16px`.
- `Table` deve ser precedida por filtros quando a pagina permitir busca ou refinamento.
- `Pagination` e obrigatoria quando o dataset visivel tiver mais de `10` itens.
- `Card` deve usar padding interno de `24px`.
- `Empty state` deve substituir o bloco de conteudo vazio, e nao coexistir com o estado preenchido.
- `Loading` e `Skeleton` nao devem representar o mesmo estado no mesmo bloco ao mesmo tempo.
- `Modal` e `Digital signature` pertencem somente a `Overlay Zone`.
- `Toast` pertence somente a `Feedback Zone`.
- `Tooltip` deve estar sempre ancorado ao elemento disparador.
- `Tabs` trocam conteudo interno de uma secao; nunca substituem `Sidebar` ou `Breadcrumbs`.
- `Stepper` so deve ser usado em fluxos multi-etapa reais.

## Blueprint de exemplo
```txt
Page
|- Sidebar
`- Main Content
   |- Breadcrumbs
   |- Title
   |- Actions
   `- Content
      |- Filters
      |- Table
      `- Pagination
```

## Checklist de aceite
- [ ] A pagina possui `Sidebar` persistente e nenhum `Header` global.
- [ ] O `Main Content Container` inicia exatamente `56px` apos a `Sidebar`.
- [ ] A ordem estrutural esta correta: contexto -> acoes -> conteudo.
- [ ] `Breadcrumbs` aparecem apenas quando a profundidade de navegacao exigir.
- [ ] O `Page Title` esta presente e abaixo de `Breadcrumbs` quando aplicavel.
- [ ] `Content Sections` usam `32px` entre si.
- [ ] Formularios usam `24px` entre campos.
- [ ] `Table` usa `Pagination` quando houver mais de `10` itens.
- [ ] `Toast`, `Tooltip`, `Loading`, `Skeleton`, `Modal` e `Digital signature` aparecem somente nas zonas corretas.
- [ ] Nenhum componente quebra a hierarquia estrutural da pagina.

## Decisao final para geracao por IA
Em qualquer pagina padrao gerada automaticamente, o agente deve:
1. Garantir a presenca da `Sidebar` persistente e a ausencia de `Header`.
2. Criar exatamente um `Main Content Container` com offset horizontal fixo de `56px`.
3. Montar a pagina na ordem `Context Zone` -> `Action Zone` -> `Content Zone`.
4. Aplicar `16px`, `24px` e `32px` apenas nos contextos definidos por esta regra.
5. Validar o checklist de aceite antes de concluir a geracao.
