import { useMemo, useState } from 'react'

import { Breadcrumbs } from './stories/Breadcrumbs'
import { Button } from './stories/Button'
import { Card } from './stories/Card'
import { Checkbox } from './stories/Checkbox'
import { DigitalSignature } from './stories/DigitalSignature'
import { Divider } from './stories/Divider'
import { QRCode } from './stories/QRCode'
import { QuotaCard } from './stories/QuotaCard'
import { Select } from './stories/Select'
import { Stepper } from './stories/Stepper'
import { SummaryCard } from './stories/SummaryCard'
import { Tabs } from './stories/Tabs'
import { TextInput } from './stories/TextInput'
import { ValueDisplay } from './stories/ValueDisplay'
import './stories/page.css'

const flowSteps = [
  { id: 'entrada', label: 'Entrada' },
  { id: 'simulacao', label: 'Simulacao' },
  { id: 'selecao', label: 'Selecao' },
  { id: 'confirmacao', label: 'Confirmacao' },
] as const

type FlowStepId = (typeof flowSteps)[number]['id']

const entryHighlights = [
  { label: 'Tempo medio', value: '3 minutos' },
  { label: 'Fluxo', value: '100% digital' },
  { label: 'Cotas disponiveis', value: 'Imovel, auto e servicos' },
]

const simulationSummary = [
  { label: 'Taxa administrativa', value: 'R$ 3.800,00' },
  { label: 'Fundo de reserva', value: 'R$ 1.200,00' },
  { label: 'Seguro', value: 'R$ 480,00' },
]

const selectionOptions = [
  {
    title: 'Cota Flex 300',
    status: { label: 'Recomendado', variant: 'success' as const },
    values: [
      { label: 'Credito', value: 'R$ 300.000,00' },
      { label: 'Parcela inicial', value: 'R$ 1.980,00' },
      { label: 'Prazo', value: '180 meses' },
      { label: 'Taxa', value: '0,12% a.m.' },
    ],
  },
  {
    title: 'Cota Plus 250',
    status: { label: 'Mais rapido', variant: 'info' as const },
    values: [
      { label: 'Credito', value: 'R$ 250.000,00' },
      { label: 'Parcela inicial', value: 'R$ 2.250,00' },
      { label: 'Prazo', value: '144 meses' },
      { label: 'Taxa', value: '0,15% a.m.' },
    ],
  },
  {
    title: 'Cota Start 180',
    status: { label: 'Entrada menor', variant: 'warning' as const },
    values: [
      { label: 'Credito', value: 'R$ 180.000,00' },
      { label: 'Parcela inicial', value: 'R$ 1.390,00' },
      { label: 'Prazo', value: '200 meses' },
      { label: 'Taxa', value: '0,10% a.m.' },
    ],
  },
]

const selectedQuotaSummary = [
  { label: 'Credito escolhido', value: 'R$ 300.000,00' },
  { label: 'Prazo total', value: '180 meses' },
  { label: 'Parcela inicial', value: 'R$ 1.980,00' },
  { label: 'Taxa administrativa', value: '0,12% a.m.' },
]

const confirmationSummary = [
  { label: 'Credito', value: 'R$ 300.000,00' },
  { label: 'Grupo', value: 'Imovel - 2026/01' },
  { label: 'Prazo', value: '180 meses' },
  { label: 'Parcela inicial', value: 'R$ 1.980,00' },
  { label: 'Taxa de adesao', value: 'R$ 450,00' },
]

const buildBreadcrumbs = (current: string) => [
  { id: 'inicio', label: 'Inicio', href: '#' },
  { id: 'autocompra', label: 'Autocompra de consorcios', href: '#' },
  { id: `etapa-${current}`, label: current },
]

function App() {
  const [activeScreen, setActiveScreen] = useState<FlowStepId>('entrada')

  const activeIndex = useMemo(
    () => flowSteps.findIndex((step) => step.id === activeScreen),
    [activeScreen]
  )

  const activeLabel = flowSteps.find((step) => step.id === activeScreen)?.label ?? 'Entrada'

  return (
    <main className="storybook-page">
      <Tabs
        items={flowSteps.map((step) => ({ id: step.id, label: step.label }))}
        value={activeScreen}
        onValueChange={(value) => setActiveScreen(value as FlowStepId)}
      />
      <Divider size="sm" tone="muted" />
      <Breadcrumbs items={buildBreadcrumbs(activeLabel)} />
      <Stepper steps={flowSteps} activeStep={activeIndex} />
      <Divider size="sm" tone="muted" />

      {activeScreen === 'entrada' ? (
        <>
          <Divider label="Visao geral" align="start" />
          <Card
            title="Autocompra de consorcios"
            subtitle="Fluxo 100% digital"
            description="Simule, selecione e confirme sua cota em poucos passos."
            actions={[
              { label: 'Iniciar simulacao', href: '#' },
              { label: 'Ver regras do consorcio', href: '#', variant: 'secondary' },
            ]}
          />
          {entryHighlights.map((item) => (
            <ValueDisplay
              key={item.label}
              label={item.label}
              value={item.value}
              layout="stacked"
              size="medium"
            />
          ))}
          <Divider label="Proximo passo" align="start" />
          <Button label="Ir para simulacao" variant="primary" size="large" />
          <Button label="Quero ser atendido" variant="secondary" size="medium" />
        </>
      ) : null}

      {activeScreen === 'simulacao' ? (
        <>
          <Divider label="Dados da simulacao" align="start" />
          <Select
            label="Categoria do consorcio"
            options={[
              { label: 'Imovel', value: 'imovel' },
              { label: 'Automovel', value: 'automovel' },
              { label: 'Servicos', value: 'servicos' },
            ]}
            defaultValue="imovel"
          />
          <TextInput
            label="Valor do credito"
            placeholder="Digite o valor desejado"
            prefix="R$"
            defaultValue="300000"
            type="number"
          />
          <TextInput
            label="Prazo"
            placeholder="Numero de meses"
            suffix="meses"
            defaultValue="180"
            type="number"
          />
          <TextInput
            label="Entrada"
            placeholder="Valor de entrada"
            prefix="R$"
            defaultValue="20000"
            type="number"
          />
          <TextInput
            label="Renda mensal"
            placeholder="Informe sua renda"
            prefix="R$"
            defaultValue="8500"
            type="number"
          />
          <Checkbox label="Aceito receber contato sobre esta simulacao" defaultChecked />
          <Divider label="Estimativa" align="start" />
          <ValueDisplay
            label="Parcela estimada"
            value="R$ 1.980,00"
            layout="stacked"
            size="large"
          />
          <SummaryCard
            title="Resumo da simulacao"
            items={simulationSummary}
            totalLabel="Parcela"
            totalValue="R$ 1.980,00"
          />
          <Divider label="Acoes" align="start" />
          <Button label="Ver ofertas" variant="primary" size="large" />
          <Button label="Salvar simulacao" variant="secondary" size="medium" />
        </>
      ) : null}

      {activeScreen === 'selecao' ? (
        <>
          <Divider label="Opcoes disponiveis" align="start" />
          {selectionOptions.map((option) => (
            <QuotaCard
              key={option.title}
              title={option.title}
              status={option.status}
              values={option.values}
            />
          ))}
          <Divider label="Resumo da selecao" align="start" />
          <SummaryCard
            title="Cota selecionada"
            items={selectedQuotaSummary}
            totalLabel="Parcela estimada"
            totalValue="R$ 1.980,00"
          />
          <Divider label="Acoes" align="start" />
          <Button label="Continuar para confirmacao" variant="primary" size="large" />
          <Button label="Voltar para simulacao" variant="secondary" size="medium" />
        </>
      ) : null}

      {activeScreen === 'confirmacao' ? (
        <>
          <Divider label="Dados da cota" align="start" />
          <SummaryCard
            title="Confirmacao da autocompra"
            items={confirmationSummary}
            totalLabel="Parcela inicial"
            totalValue="R$ 1.980,00"
          />
          <Divider label="Assinatura digital" align="start" />
          <DigitalSignature
            label="Assinatura"
            placeholder="Clique para assinar"
          />
          <Divider label="Pagamento da adesao" align="start" />
          <QRCode title="Pagamento da taxa de adesao" size="medium" />
          <ValueDisplay
            label="Taxa de adesao"
            value="R$ 450,00"
            layout="inline"
            size="medium"
          />
          <Checkbox label="Li e aceito o regulamento do consorcio" />
          <Divider label="Finalizar" align="start" />
          <Button label="Confirmar autocompra" variant="primary" size="large" />
          <Button label="Salvar e sair" variant="secondary" size="medium" />
        </>
      ) : null}
    </main>
  )
}

export default App
