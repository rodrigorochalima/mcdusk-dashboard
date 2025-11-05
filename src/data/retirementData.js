/**
 * Dados de previdência
 * Este arquivo contém todos os dados relacionados à previdência privada
 */

// Dados gerais da previdência
export const retirementSummary = {
  total: 125000.00,
  monthlyContribution: 1500.00,
  targetAge: 65,
  currentAge: 35,
  targetAmount: 2500000.00,
  projectedAmount: 2100000.00,
  completionPercent: 84,
};

// Planos de previdência
export const retirementPlans = [
  {
    id: 'plan1',
    name: 'Plano PGBL Banco XYZ',
    value: 75000.00,
    monthlyContribution: 1000.00,
    returnRate: 8.5, // 8.5% ao ano
    type: 'PGBL',
    taxRegime: 'Progressivo',
    startDate: '2018-05-10',
  },
  {
    id: 'plan2',
    name: 'Plano VGBL Seguradora ABC',
    value: 50000.00,
    monthlyContribution: 500.00,
    returnRate: 7.8, // 7.8% ao ano
    type: 'VGBL',
    taxRegime: 'Regressivo',
    startDate: '2020-03-15',
  },
];

// Histórico de aportes
export const contributionHistory = [
  { year: 2018, value: 8000.00 },
  { year: 2019, value: 12000.00 },
  { year: 2020, value: 15000.00 },
  { year: 2021, value: 18000.00 },
  { year: 2022, value: 18000.00 },
  { year: 2023, value: 18000.00 },
  { year: 2024, value: 13500.00 }, // Até setembro de 2024
];

// Projeção para aposentadoria
export const retirementProjection = [
  { age: 35, value: 125000.00 },
  { age: 40, value: 350000.00 },
  { age: 45, value: 650000.00 },
  { age: 50, value: 1050000.00 },
  { age: 55, value: 1550000.00 },
  { age: 60, value: 2100000.00 },
  { age: 65, value: 2500000.00 },
];
