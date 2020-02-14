import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StocksComponent } from './stocks.component';
import { FormBuilder, Validators  } from '../../../../../../node_modules/@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StocksFeatureShellModule } from '../stocks-feature-shell.module';


describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  const fb: FormBuilder = new FormBuilder();
  let priceQuery: PriceQueryFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), NoopAnimationsModule, StocksFeatureShellModule],
      providers: [PriceQueryFacade,
        { provide: FormBuilder, useValue: fb }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.debugElement.componentInstance;
    priceQuery = fixture.debugElement.injector.get(PriceQueryFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fetchQuote()', () => {
    it('should call priceQuery.fetchQuote', async(() => {
      spyOn(priceQuery, 'fetchQuote');
      component.stockPickerForm = fb.group({
        symbol: ['AAPL', Validators.required],
        fromDate: ['Sat Feb 01 2020', Validators.required],
        toDate: ['Sat Feb 10 2020', Validators.required]
      });
      component.fetchQuote();
      expect(priceQuery.fetchQuote).toHaveBeenCalledTimes(1);
      expect(priceQuery.fetchQuote).toHaveBeenCalledWith('AAPL', 'Sat Feb 01 2020', 'Sat Feb 10 2020');
    }));
  });

  describe('maxDate()', () => {
    it('should return todayDate if toDate is less than todayDate', async(() => {
      component.todayDate = new Date(2020, 2, 3);
      const mockDate = new Date(2020, 2, 3);
      component.stockPickerForm = fb.group({
        symbol: ['AAPL', Validators.required],
        fromDate: [new Date(2020, 2, 1), Validators.required],
        toDate: [new Date(2020, 2, 10), Validators.required]
      });
      const maxDate = component.maxDate();
      expect(maxDate).toEqual(mockDate);
    }));
    it('should return toDate if toDate is not less than todayDate', async(() => {
      component.todayDate = new Date(2020, 2, 10);
      const mockDate = new Date(2020, 2, 7);
      component.stockPickerForm = fb.group({
        symbol: ['AAPL', Validators.required],
        fromDate: [new Date(2020, 2, 3), Validators.required],
        toDate: [new Date(2020, 2, 7), Validators.required]
      });
      const maxDate = component.maxDate();
      expect(maxDate).toEqual(mockDate);
    }));
  });
  
});

