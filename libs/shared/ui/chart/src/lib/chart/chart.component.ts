import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from '../../../../../../../node_modules/rxjs/operators';
import { IChartInfo } from '../chart/interface/chart-info-interface';
import { CHART_INFO_CONSTANT } from '../chart/constant/chart-info-constant';


@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<any>;
  chartData: any;
  public chart: IChartInfo;
  private destroy$ = new Subject();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.chart = CHART_INFO_CONSTANT;
    this.data$.pipe(takeUntil(this.destroy$)).subscribe(newData => (this.chartData = newData));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
