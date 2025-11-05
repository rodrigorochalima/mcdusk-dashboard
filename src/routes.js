import OverviewViewUpdated from './components/views/OverviewViewUpdated';
import AnalysisView from './components/views/AnalysisView';
import InsightsViewUpdated from './components/views/InsightsViewUpdated';
import LearnView from './components/views/LearnView';
import DiscoveryView from './components/views/DiscoveryView';
import RetirementView from './components/views/RetirementView';
import GuruView from './components/views/GuruView';
import PromotionsView from './components/views/PromotionsView';

export const routes = {
  overview: {
    component: OverviewViewUpdated,
    label: 'Visão Geral',
    icon: '📊'
  },
  analysis: {
    component: AnalysisView,
    label: 'Análise',
    icon: '📈'
  },
  insights: {
    component: InsightsViewUpdated,
    label: 'Insights',
    icon: '💡'
  },
  learn: {
    component: LearnView,
    label: 'Aprenda',
    icon: '🎓'
  },
  discovery: {
    component: DiscoveryView,
    label: 'Descoberta',
    icon: '🔍'
  },
  retirement: {
    component: RetirementView,
    label: 'Previdência',
    icon: '👴'
  },
  guru: {
    component: GuruView,
    label: 'Meu Guru',
    icon: '🧠'
  },
  promotions: {
    component: PromotionsView,
    label: 'Promoções',
    icon: '🏷️'
  }
};

export default routes;
