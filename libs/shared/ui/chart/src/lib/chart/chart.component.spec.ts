import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { ChangeDetectorRef } from '../../../../../../../node_modules/@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { SharedUiChartModule } from '../shared-ui-chart.module'


describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiChartModule, GoogleChartsModule.forRoot()],      
      providers: [ChangeDetectorRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
