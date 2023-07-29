import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartPreviewComponentComponent } from '../cart-preview-component/cart-preview-component.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  // Function to open the cart preview dialog
  openCartPreview(): void {
    // Open the cart preview dialog using the MatDialog service
    const dialogRef = this.dialog.open(CartPreviewComponentComponent, {
      position: {
        top: '80px', 
        right: '20px', 
      },
      panelClass: 'cart-preview-dialog', 
    });

    // Subscribe to the afterClosed event to perform actions after the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
