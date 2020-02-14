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
      imports: [StoreModule.forRoot({}), StocksFeatureShellModule, NoopAnimationsModule],
      providers: [PriceQueryFacade,
        { provide: FormBuilder, useValue: fb }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    component = fixture.debugElement.componentInstance;
    priceQuery = fixture.debugElement.injector.get(PriceQueryFacade);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fetchQuote()', () => {
    beforeEach(() => {
      spyOn(priceQuery, 'fetchQuote');
    });

    it('should call priceQuery.fetchQuote', async(() => {
      component.stockPickerForm = fb.group({
        symbol: ['AAPL', Validators.required],
        period: ['Two Years', Validators.required]
      });
      component.fetchQuote();
      expect(priceQuery.fetchQuote).toHaveBeenCalledTimes(1);
      expect(priceQuery.fetchQuote).toHaveBeenCalledWith('AAPL', 'Two Years');
    }));
  });

  describe('ngOnInit()', () => {
    it('should call fetchQuote() when change detected', () => {
      fixture.detectChanges();
      spyOn(component, 'fetchQuote');
      component.stockPickerForm.controls['symbol'].setValue('AAPL');
      component.ngOnInit();
      expect(component.fetchQuote).toHaveBeenCalledTimes(1);
    });
  });

});
