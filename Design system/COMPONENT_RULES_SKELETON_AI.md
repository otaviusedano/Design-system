# Regras de Componente para IA - Skeleton (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Skeleton` com fidelidade ao design system, consistencia visual e comportamento correto de carregamento.

Fonte de referencia:
- Figma `Design System - Topaz`, node `449:2452` (guidelines de tamanho e quantidade).
- Subnos de `Skeleton` (ex.: `450:4576`, `450:4555`, `450:4549`).
- Implementacao local: `src/stories/Skeleton.tsx` e `src/stories/Skeleton.css`.

## Contrato obrigatorio para IA
- Sempre usar `Skeleton` para representar estados de carregamento.
- Sempre manter o Skeleton com o mesmo tamanho do elemento final que sera carregado.
- Sempre aplicar Skeleton em todos os elementos relevantes da interface durante loading (nao apenas alguns).
- Nunca usar Skeleton com dimensao aleatoria sem correspondencia com o layout final.
- Nunca exibir conteudo real e Skeleton simultaneamente no mesmo elemento.

## Estrutura obrigatoria
- Container raiz com suporte a multiplos itens (`count`).
- Cada item deve ser um bloco com:
  - largura configuravel,
  - altura configuravel,
  - raio de borda coerente,
  - fundo/gradiente de loading.
- Skeleton deve ser decorativo (`aria-hidden="true"`).

## Especificacao visual base (Figma + DS)

### Forma
- Componente base com cantos arredondados.
- Token observado: `Radius/base = 8`.
- Uso comum em linhas de texto e blocos retangulares.

### Cor e preenchimento
- Base em tons neutros claros de superficie.
- Gradiente suave de destaque para sensacao de carregamento (efeito shimmer/pulse).

### Regras de tamanho (guideline Figma)
- O tamanho do Skeleton deve refletir o tamanho final do componente real.
- Em listas/cards, manter largura total das linhas/barras conforme layout final.
- Em placeholders de cards/tabelas, usar composicao completa de esqueletos (titulo, subtitulo, blocos, etc.).

## Variacoes implementadas no projeto
- `variant`:
  - `text`,
  - `rect`.
- `size`:
  - `sm`,
  - `md`,
  - `lg`.
- `animation`:
  - `pulse`,
  - `shimmer`,
  - `none`.
- Parametros adicionais:
  - `width`,
  - `height`,
  - `radius`,
  - `count`,
  - `gap`.

## Mapeamento de tamanhos locais (referencia do codigo)
- `text`:
  - `sm: 10`,
  - `md: 30`,
  - `lg: 90`.
- `rect`:
  - `sm: 32`,
  - `md: 96`,
  - `lg: 288`.
- Radius padrao:
  - `text`: `6/8/10`,
  - `rect`: `8/12/14` (sm/md/lg).

## Tokens mapeados
- `Radius/base = 8`
- `Color/Surface/primary = #f5f6f9`
- `Color/Border/secondary = #9c9d9f` (contexto de layout de exemplo)
- `Spacing/Spacing-16 = 16` (contexto de espaçamento)

Regra: priorizar tokens semanticos locais (`--surface-secondary`, `--surface-primary`, etc.) e usar fallback apenas quando necessario.

## Acessibilidade obrigatoria
- Skeleton deve ser ignorado por leitores de tela (`aria-hidden="true"`).
- Nao anunciar Skeleton como conteudo final.
- Quando existir regiao de loading global, usar status acessivel separado (fora do Skeleton visual).

## Regras de comportamento para geracao automatica
- Mostrar Skeleton somente durante carregamento.
- Remover Skeleton imediatamente quando os dados estiverem prontos.
- Em loading parcial, aplicar Skeleton apenas aos blocos pendentes.
- Em loading de pagina completa, garantir cobertura coerente de todos os blocos principais.
- Evitar animacao excessiva em grande quantidade de itens quando houver impacto de performance.

## Checklist de aceite
- [ ] Skeleton acompanha dimensoes do elemento final.
- [ ] Todos os elementos relevantes em loading possuem Skeleton.
- [ ] Variacoes `text` e `rect` funcionando.
- [ ] Animacoes `pulse`/`shimmer` aplicadas corretamente (ou `none` quando necessario).
- [ ] Acessibilidade (`aria-hidden`) aplicada.
- [ ] Tokens do DS utilizados.

## API recomendada
```ts
type SkeletonVariant = "text" | "rect";
type SkeletonSize = "sm" | "md" | "lg";
type SkeletonAnimation = "pulse" | "shimmer" | "none";

type SkeletonProps = {
  id?: string;
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  animation?: SkeletonAnimation;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  count?: number;
  gap?: number;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de criar estados de loading.
2. Espelhar dimensoes reais da interface com Skeleton.
3. Cobrir todos os elementos essenciais durante carregamento.
4. Validar o checklist de aceite antes de concluir.
