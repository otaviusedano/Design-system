# Regras de Componente para IA - Button (Topaz Design System)

## Objetivo
Este documento define regras objetivas para que agentes de IA construam o componente `Button` em interfaces geradas automaticamente, com fidelidade ao Figma e consistencia visual.

Fonte de referencia: Figma `Design System - Topaz`, node `228:3309` e subnodes de botao (`252:1688`, `252:1690`, `252:1890`, `252:1892`, `228:3933`).

## Contrato obrigatorio para IA
- Sempre renderizar o `Button` em tela (nunca omitir o componente quando ele existir na especificacao).
- Nunca usar valores hardcoded se existir token correspondente.
- Nunca alterar altura/largura, paddings, raio ou tipografia sem justificativa explicita de responsividade.
- Reutilizar o componente base ao inves de criar variacoes desconectadas.
- Manter hierarquia semantica: texto dentro do botao e icone opcional.

## Especificacao oficial - Button base (`new-chip`)

### Variantes confirmadas no Figma
- `filled/primary`:
  - Fundo: `#1E1E68`
  - Borda: `0.574px solid #1E1E68`
  - Texto: branco
- `outlined/secondary`:
  - Fundo: transparente/branco
  - Borda: `0.574px solid Color/Border/highlight` (`#1E1E68`)
  - Texto: `Color/Text/highlight` (`#1E1E68`)

### Dimensoes e layout
- Padding horizontal: `Spacing/Spacing-16` (`16px`)
- Padding vertical: `Spacing/Spacing-8` (`8px`)
- Gap interno: `Spacing/Spacing-8` (quando houver icone + label)
- Border radius: `2.294px`
- Alinhamento: centralizado em ambos os eixos
- Estrutura: container -> label (e icone opcional)

### Tipografia do label
- Familia: `Montserrat`
- Peso: `500` (Medium)
- Tamanho: `10px`
- Line-height: `1.5`
- Alinhamento: centralizado
- Transformacao: manter texto conforme definido no conteudo (nao forcar uppercase por padrao)

## Variante contextual observada (CTA com icone)
Existe um botao contextual no mesmo frame (`228:3933`) com estilo proprio:
- Fundo: `#0058DB`
- Radius: `4.589px`
- Padding: `9.178px`
- Conteudo com icone + texto em uppercase
- Uso tipografico diferente (`Sora Bold`, `11.472px`)

Regra: tratar esse estilo como `cta/contextual`, nao substituir o `Button` base por ele.

## Tokens mapeados (usar prioridade por nome)
- `Color/Text/highlight = #1e1e68`
- `Color/Border/highlight = #1e1e68`
- `Spacing/Spacing-8 = 8`
- `Spacing/Spacing-16 = 16`

Se o token existir no projeto, usar o alias do projeto. O hexadecimal acima e apenas fallback.

## Acessibilidade obrigatoria
- Elemento semantico: usar `<button>` para acao.
- Nome acessivel: label textual obrigatoria (ou `aria-label` quando botao for somente icone).
- Foco visivel: nao remover `outline` sem reposicao visual equivalente.
- Contraste: manter contraste minimo AA entre texto e fundo.
- Estado desabilitado: aplicar semantica `disabled` (nao apenas estilo visual).

## Regras de comportamento para IA geradora de telas
- Se o layout pedir acao primaria e secundaria lado a lado:
  - Primaria: `filled/primary`
  - Secundaria: `outlined/secondary`
- Se o frame tiver dois botoes no rodape, preservar ordem visual da especificacao.
- Nao trocar rotulos ("Cancelar", "Criar cliente", etc.) sem instrucao.
- Nao inserir icone por suposicao; so usar quando presente no design/briefing.
- Nao comprimir paddings para "caber"; ajustar o container externo, nao o botao.

## Estados visuais
Quando o Figma nao explicitar estados (hover, active, focus, pressed):
- Implementar apenas estado `default` com fidelidade total.
- Incluir `focus-visible` acessivel.
- Nao inventar hover/active com mudancas bruscas de cor.
- Se necessario, derivar variacoes sutis a partir do token base e documentar no PR.

## Checklist de aceite (para IA e revisao humana)
- [ ] O botao existe em tela e esta visivel.
- [ ] Variante correta aplicada (`filled/primary` ou `outlined/secondary`).
- [ ] Padding e raio batem com a especificacao.
- [ ] Tipografia do label esta correta.
- [ ] Tokens foram usados no lugar de valores soltos.
- [ ] Semantica e acessibilidade estao corretas.
- [ ] Nao houve criacao de variante fora do design.

## Formato recomendado de API do componente
```ts
type ButtonVariant = 'filled' | 'outlined' | 'cta';
type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler esta regra antes de renderizar botoes.
2. Escolher variante pelo contexto de acao.
3. Renderizar o componente em tela com tokens oficiais.
4. Validar checklist de aceite antes de concluir.
