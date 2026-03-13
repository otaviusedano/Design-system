# Regras de Componente para IA - Tag (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem o componente `Tag` com fidelidade ao Figma e consistencia no design system.

Fonte de referencia:
- Figma `Design System - Topaz`, node `273:2195` e instancias de `Tag` (ex.: `286:585`, `286:1293`, `286:1621`).
- Implementacao do projeto em `src/stories/Tag.tsx` e `src/stories/tag.css`.

## Contrato obrigatorio para IA
- Sempre usar `Tag` para rotulos curtos, filtros e status compactos.
- Nunca substituir `Tag` por botao ou badge generico sem instrucao.
- Manter formato pill (borda totalmente arredondada).
- Reutilizar o componente base com props (`variant`, `size`, `deletable`, `readOnly`).
- Nunca hardcodar cores se houver token de tag.

## Especificacao visual base

### Estrutura obrigatoria
- Container da tag.
- Label textual.
- Botao de remocao opcional (`xmark`) quando a tag for removivel.

### Medidas e layout (Figma)
- Layout: `inline-flex`, alinhamento central.
- Gap interno base: `Spacing/base` (`8px`).
- Padding: `Spacing/base` (`8px`) horizontal e `Spacing/sm` (`4px`) vertical.
- Raio: `radius/full` (pill completo; valor exportado com fallback `56px`).
- Altura visual observada: ~`16px` no frame de exemplo (escala do node).

### Tipografia
- Familia: `Montserrat`.
- Peso: `SemiBold` (`600`).
- Tamanho: `12px`.
- Line-height: `16px`.
- Label em uma linha (`nowrap`).

## Variantes de cor (confirmadas no Figma)

### `gray`
- Texto: `Color/Tag/Text/gray` = `#242424`
- Fundo: `Color/Tag/Surface/gray` = `#e0dcdc`

### `water`
- Texto: `Color/Tag/Text/water green` = `#005c39`
- Fundo: `Color/Tag/Surface/water green` = `#4df0b2`

### `sky`
- Texto: `Color/Tag/Text/sky blue` = `#004759`
- Fundo: `Color/Tag/Surface/sky blue` = `#4dd9ff`

### `purple`
- Texto: `Color/Tag/Text/purple` = `#2f0f5c`
- Fundo: `Color/Tag/Surface/purple` = `#9864e2`

Regra: no codigo final, usar tokens do projeto; hex acima e fallback.

## Variantes funcionais
- `deletable = true`: exibe botao de fechar/remover.
- `deletable = false`: somente label.
- `readOnly = true`: sem acao de remocao e estilo estavel.

Regra: nao exibir icone de remocao se a tag nao for removivel.

## Tamanhos
Padrao do componente no projeto:
- `md`
- `lg`

Regra: manter `md` como default, usar `lg` apenas quando o layout pedir destaque.

## Acessibilidade obrigatoria
- Se `deletable`, o `x` deve ser botao real com `aria-label` descritivo.
- Nao depender so de cor para indicar estado sem texto.
- Preservar contraste minimo AA entre texto e fundo.
- Em `readOnly`, nao oferecer interacao de remocao.

## Regras de comportamento para geracao automatica
- Nao quebrar label em multiplas linhas.
- Nao truncar tag sem estrategia clara (overflow com tooltip, se necessario).
- Em listas de filtros, manter espacamento consistente entre tags.
- Nao trocar a cor da variante por criterio estetico local.
- Se houver acao de remover, conectar ao evento de dominio correto.

## Checklist de aceite
- [ ] Tag renderizada com formato pill.
- [ ] Variante de cor correta aplicada via token.
- [ ] Tamanho (`md`/`lg`) correto para o contexto.
- [ ] Label legivel em linha unica.
- [ ] Botao de remocao aparece apenas quando `deletable=true`.
- [ ] Acessibilidade do botao de remocao implementada.
- [ ] Nao ha valores visuais soltos fora do token system.

## API recomendada
```ts
type TagVariant = 'purple' | 'sky' | 'water' | 'gray' | 'red';
type TagSize = 'md' | 'lg';

type TagProps = {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  deletable?: boolean;
  readOnly?: boolean;
  onDelete?: () => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de criar filtros/status em formato de tag.
2. Selecionar variante por semantica de negocio (nao por preferencia visual).
3. Aplicar tokens oficiais e estrutura do componente base.
4. Validar o checklist de aceite antes de concluir.
