# Regras de Componente para IA - Stepper (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Stepper` com fidelidade ao design system, clareza de progresso e navegacao previsivel.

Fonte de referencia:
- Figma `Design System - Topaz`, node `528:2433` (contexto) e instancias de Stepper (ex.: `553:7145`, `553:7280`, `553:8123`).
- Implementacao local: `src/stories/Stepper.tsx` e `src/stories/Stepper.css`.

## Contrato obrigatorio para IA
- Sempre usar `Stepper` para indicar progresso sequencial por etapas.
- Sempre diferenciar visualmente etapas `completed`, `current` e `upcoming`.
- Sempre manter conexao visual entre etapas por linhas de progresso.
- Sempre oferecer navegacao lateral quando houver janela de etapas visiveis.
- Nunca ocultar a etapa atual sem indicacao clara.

## Estrutura obrigatoria
- Container externo (`stepper-shell`) com borda e fundo.
- Botao de navegacao esquerda.
- Trilha central de etapas (`ol` / lista ordenada).
- Botao de navegacao direita.
- Cada etapa deve conter:
  - linha esquerda,
  - marcador circular (numero/check),
  - linha direita,
  - label textual (ex.: `Etapa`).

## Especificacao visual base (Figma + DS)

### Container
- Borda `1px` em `Color/Border/primary`.
- Radius `8px`.
- Fundo `Color/Surface/primary` ou `Color/Surface/secondary` conforme bloco.
- Layout horizontal com navs laterais fixas.

### Navegacao lateral
- Largura observada: `56px` por lado.
- Estado ativo:
  - cor de icone primaria,
  - fundo de superficie.
- Estado desabilitado:
  - cor secundaria,
  - sem interacao.

### Marcadores de etapa
- Tamanho observado: `24px` (circular).
- `completed`:
  - icone de check em cor positiva.
- `current`:
  - fundo highlight,
  - numero em cor invertida,
  - label destacada.
- `upcoming`:
  - fundo/contorno neutro,
  - numero e label em cor secundaria.

### Linhas de conexao
- Espessura: `2px`.
- Trechos concluidos em `Color/Border/success`.
- Trechos pendentes em `Color/Border/primary`/`secondary`.

## Variacoes funcionais observadas
- `device`:
  - `desktop` (largura maior, mais etapas visiveis),
  - `mobile` (janela reduzida de etapas).
- `totalSteps` dinamico.
- `currentStep` dinamico.
- Navegacao por janela de etapas quando total > visiveis.

Implementacao local:
- `desktop`: ate 4 etapas visiveis.
- `mobile`: ate 2 etapas visiveis.

## Tokens mapeados
- `Color/Icon/primary = #242424`
- `Color/Icon/secondary = #9c9d9f`
- `Color/Icon/positive = #0dd829`
- `Color/Surface/secondary = #ffffff`
- `Color/Surface/primary = #f5f6f9`
- `Color/Surface/highlight = #1e1e68`
- `Color/Border/primary = #e0dcdc`
- `Color/Border/secondary = #9c9d9f`
- `Color/Border/success = #0dd829`
- `Color/Text/primary = #242424`
- `Color/Text/secondary = #707070`
- `Color/Text/highlight = #1e1e68`
- `Color/Text/invert = #ffffff`
- `Spacing/base = 8`

Regra: priorizar aliases semanticos locais (`--border-success`, `--surface-highlight`, `--text-secondary`) e usar hex apenas como fallback.

## Acessibilidade obrigatoria
- Estruturar etapas em lista ordenada (`ol/li`) quando possivel.
- Marcar etapa atual com `aria-current="step"`.
- Botoes de navegacao com `aria-label` descritivo:
  - "Mostrar passos anteriores",
  - "Mostrar próximos passos".
- Garantir estado `disabled` real nos botoes inativos.
- Preservar foco visivel em navegacao por teclado.

## Regras de comportamento para geracao automatica
- `currentStep` deve ser limitado ao intervalo valido `[1, totalSteps]`.
- Em `completed`, mostrar check no marcador.
- Em `current`, destacar marcador e label.
- Em `upcoming`, manter estilo neutro.
- Em resize, recalcular janela de etapas visiveis e disponibilidade das setas.

## Checklist de aceite
- [ ] Estrutura com navegações laterais + trilha central implementada.
- [ ] Estados `completed/current/upcoming` renderizam corretamente.
- [ ] `aria-current="step"` aplicado na etapa atual.
- [ ] Setas habilitam/desabilitam conforme janela de etapas.
- [ ] Variacoes desktop/mobile funcionando.
- [ ] Tokens do DS utilizados.

## API recomendada
```ts
type StepperDevice = "desktop" | "mobile";

type StepperProps = {
  id?: string;
  totalSteps?: number;
  currentStep?: number;
  device?: StepperDevice;
  stepLabel?: string;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de criar fluxos por etapas.
2. Implementar `Stepper` com estados visuais e navegacao completos.
3. Garantir acessibilidade e consistencia entre desktop e mobile.
4. Validar o checklist de aceite antes de concluir.
