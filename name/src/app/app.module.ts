import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FilterComponent } from './filter/filter.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; 
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule, matFormFieldAnimations} from '@angular/material/form-field';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { CartPreviewComponentComponent } from './cart-preview-component/cart-preview-component.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CartComponent } from './cart/cart.component';



 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailsComponent,
    FilterComponent,
    HeaderComponent,
    CartPreviewComponentComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    AppRoutingModule,
    MatSliderModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }