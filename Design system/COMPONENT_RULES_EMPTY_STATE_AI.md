# Regras de Componente para IA - Empty state (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Empty state` com fidelidade ao design system Topaz, comunicando ausência de dados de forma clara, amigavel e orientada ao usuario.

Fonte de referencia:
- Figma `Design System - Topaz`, node `784:4722` (contexto) e instancias de `Empty state` (ex.: `784:7431`, `784:7460`, `784:7758`).
- Implementacao local: `src/stories/EmptyState.tsx` e `src/stories/empty-state.css`.

## Contrato obrigatorio para IA
- Sempre usar `Empty state` quando nao houver conteúdo para exibir.
- Sempre exibir ícone, título e descrição.
- Sempre manter alinhamento central e hierarquia visual clara.
- Sempre usar mensagem objetiva e acionável (quando apropriado).
- Nunca deixar espaço vazio sem contexto textual.

## Estrutura obrigatoria
- Container principal.
- Ícone de destaque no topo.
- Bloco de conteúdo com:
  - título (`h3`),
  - descrição (`p`).
- Layout em coluna, centralizado horizontalmente.

## Especificacao visual (Figma + codigo local)

### Container
- Fundo claro (`surface/secondary`).
- Borda 1px (`border/primary`).
- Cantos arredondados (`radius/base`).
- Espaçamento interno horizontal e vertical.
- Alinhamento central e texto centralizado.

### Ícone
- Tamanho grande (aprox. `64px`).
- Cor de destaque (`icon/highlight`).
- Deve ser visualmente dominante antes do texto.

### Texto
- Título:
  - maior peso e tamanho (headline curta).
  - cor `text/primary`.
- Descrição:
  - tamanho menor e peso regular.
  - cor `text/secondary`.
- Suporte a texto longo com quebra de linha sem quebrar layout.

## Variacoes e estados
- Variação por largura do container (ex.: larguras diferentes em telas distintas).
- Variação com título curto e descrição curta.
- Variação com título/descrição longos (mantendo legibilidade e centralização).
- Componente é estático por padrão (sem estados de interação obrigatórios).

## Tokens mapeados
- `Color/Icon/highlight = #1e1e68`
- `Color/Text/primary = #242424`
- `Color/Text/secondary = #707070`
- `Color/Surface/secondary = #ffffff`
- `Color/Border/primary = #e0dcdc`
- `Spacing/base = 8`
- `Spacing/md = 12`
- `Spacing/lg = 16`
- `Spacing/xl = 24`
- `Radius/base = 8`

Regra: priorizar aliases semanticos locais (`--icon-highlight`, `--text-primary`, `--surface-secondary`) e usar hex apenas como fallback.

## Acessibilidade obrigatoria
- Título e descrição devem ser texto real (nao imagem).
- Se ícone for decorativo, usar `aria-hidden="true"`.
- Manter contraste minimo entre texto e fundo.
- Evitar mensagens genéricas sem contexto; texto deve informar estado e orientar próximo passo.

## Regras de comportamento para geracao automatica
- O componente deve aparecer somente quando a fonte de dados estiver vazia.
- O título precisa resumir o estado (ex.: “Nenhum resultado encontrado”).
- A descrição deve orientar o usuario (ex.: revisar filtros, tentar outra busca).
- Em caso de texto longo, quebrar em múltiplas linhas sem overflow.
- Preservar proporção e espaçamento entre ícone, título e descrição.

## Checklist de aceite
- [ ] Ícone, título e descrição presentes.
- [ ] Hierarquia visual correta (ícone > título > descrição).
- [ ] Layout centralizado e responsivo.
- [ ] Texto longo sem quebra de layout.
- [ ] Contraste e legibilidade adequados.
- [ ] Tokens do DS aplicados.

## API recomendada
```ts
type EmptyStateProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Exibir `Empty state` sempre que nao houver conteúdo.
2. Usar mensagem clara para reduzir ambiguidade do usuario.
3. Manter consistencia visual com os tokens do Topaz.
4. Validar o checklist antes da entrega.
