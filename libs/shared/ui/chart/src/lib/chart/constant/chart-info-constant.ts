import { IChartInfo } from '../interface/chart-info-interface';

/**
 * chart data mock
 */
export const CHART_INFO_CONSTANT: IChartInfo  = {
    title: '',
    type: 'LineChart',
    data: [],
    columnNames: ['period', 'close'],
    options: { title: `Stock price`, width: '600', height: '400' }
  };
