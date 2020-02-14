/**
 * Interface for chart info
 */
export interface IChartInfo {
    title: string,
    type: string,
    data: any[],
    columnNames: string[],
    options: IOptions
}

interface IOptions {
    title: string,
    width: string,
    height: string
  }
